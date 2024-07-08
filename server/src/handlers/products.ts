import { Request, Response } from 'express'
import Products from '../models/Products.model';


export const getProducts = async (request: Request, response: Response) => {
    try {

        const products = await Products.findAll();
        return response.status(200).json({ data: products });

    } catch (error) {
        const err = new Error('Oops, error en el servidor');
        return response.status(400).json({ error: err.message });
    }
}

export const getProductById = async (request: Request, response: Response) => {
    const { idProducts } = request.params;

    try {
        const product = await Products.findByPk(idProducts);

        if (!product) {
            const error = new Error('Producto no encontrado');
            return response.status(400).json({ error: error.message });
        }

        response.status(200).json({ data: product });
    } catch (error) {

    }

}

export const createProduct = async (request: Request, response: Response) => {

    try {
        const products = await Products.create(request.body);
        response.status(201).json({ data: products });

    } catch (error) {
        const err = new Error('Oops, Ocurrió un error en el servidor');
        return response.status(400).json({ error: err.message });

    }
}

export const updateProduct = async (request: Request, response: Response) => {
    const { idProducts } = request.params;

    const product = await Products.findByPk(idProducts);

    if (!product) {
        const error = new Error('El producto no existe');
        return response.status(400).json({ data: error.message })
    }

    //actualizar

    try {

        await product.update(request.body); //actualizamos con los datos nuevos
        await product.save();
        response.status(200).json(
            {
                data:
                {
                    msg: 'Producto Actualizado',
                    product
                }
            }
        );

    } catch (error) {
        const err = new Error('Oops! Error en el servidor');
        console.log(error)
        return response.status(400).json({ data: err.message })

    }

}

export const updateAvailability = async (request: Request, response: Response) => {

    const { idProducts } = request.params;

    const product = await Products.findByPk(idProducts);

    if (!product) {
        const error = new Error('El producto no existe');
        return response.status(400).json({ data: error.message })
    }

    //actualizar

    try {

        product.availability = request.body.availability;
        await product.save();
        response.status(200).json({ msg: 'Actualizado Correctamente', product })


    } catch (error) {
        const err = new Error('Oops! Error en el servidor');
        console.log(error)
        return response.status(400).json({ data: err.message })

    }

}

export const deleteProduct = async (request: Request, response: Response) => {

    const { idProducts } = request.params;

    const product = await Products.findByPk(idProducts);

    if (!product) {
        const error = new Error('El producto no existe');
        return response.status(400).json({ data: error.message })
    }

    try {

        await product.destroy();
        response.status(200).json({msg: 'Producto eliminado correctamente'})

    } catch (error) {
        const err = new Error('Oops! Error en el servidor');
        console.log(error)
        return response.status(400).json({ data: err.message })
    }

}