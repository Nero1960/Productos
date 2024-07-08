import request from 'supertest'
import server from '../../server'
import { describe, expect, test } from '@jest/globals'

describe('POST //api/products/', () => {

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
            price: 200
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors')


    })
})