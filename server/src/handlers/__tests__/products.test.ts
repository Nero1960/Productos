import request from 'supertest'
import server from '../../server'
import { describe, expect, jest, test } from '@jest/globals'

describe('POST /api/products/', () => {

    test('should display validation errors', async () => {
        const response = await request(server).post('/api/products/').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');

    })

    test('should validate that price greater than 0', async () => {
        const response = await request(server).post('/api/products/').send({
            name: 'Monitor Testing',
            price: 0
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
    })

    test('should create a new product', async () => {
        const response = await request(server).post('/api/products/').send({
            name: 'Monitor Testing',
            price: 200,
            availability: true
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors')


    })
})

describe('GET /api/products', () => {
    test('should check if /api/products url exists', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(404);
    })

    test('Get a json response with products', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');

        expect(response.body).not.toHaveProperty('errors')
        expect(response.status).not.toBe(400);
    })
})

describe('GET /api/products:id', () => {
    test('should return to 400 response for a non-existent product', async () => {
        const productId = 2000;
        const response = await request(server).get(`/api/products/${productId}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    })


    test('should check valid ID in the URL', async () => {
        const productId = "string";
        const response = await request(server).get(`/api/products/${productId}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID No valido')

    })

    test('get a JSON response for a single product', async () => {
        const response = await request(server).get(`/api/products/1`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {
    test('should display validation error messages when updating products', async () => {
        const response = await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

    })

    test('should validate the price when updating products', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "monitor curvo",
            price: -400,
            availability: true
        })

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

    })

    test('should check a valid ID in the URL', async() => {
        const response = await request(server).put(`/api/products/INVALID_ID`).send({
            name: "Monitor Test",
            price: 200
        })

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
    })

    test('should return a 4040 response for a non-existent product', async () => {
        const idProduct = 2000;
        const response = await request(server).put(`/api/products/${idProduct}`).send({
            name: "Monitor Test",
            price: 200
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual('El producto no existe')
    })

    test('should update an existing products', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "Monitor Test Actualizado",
            price: 200,
            availability: true
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.msg).toEqual('Producto Actualizado')
    })
})

describe('PATCH /api/products/:id', () => {
    
    test('should return a 404 response for a non existing product', async() => {
        const response = await request(server).patch('/api/products/6000');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toEqual('El producto no existe')

    })

    test('should update the product availability', async () => {
        jest.setTimeout(10000); // Aumenta el tiempo de espera a 10 segundos
    
        const response = await request(server).patch('/api/products/1').send({
            availability: false // Asegúrate de enviar el cuerpo de la solicitud
        });
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('msg');
        expect(response.body.msg).toEqual('Actualizado Correctamente');
        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(404);
    });
    
})

describe('DELETE /api/products/:id', () => {
    test('should check a valid ID', async () => {
        const response = await request(server).delete(`/api/products/no-validate`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
    })

    test('should return to 400 response for a non-existent product', async() => {
        const response = await request(server).delete('/api/products/3000');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toEqual('El producto no existe')
    })

    test('should delete a product without problems', async () => {
        const response = await request(server).delete('/api/products/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('msg')
        expect(response.body.msg).toEqual('Producto eliminado correctamente')
    })
})