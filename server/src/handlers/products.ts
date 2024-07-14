import { Request, Response } from 'express'
import Products from '../models/Products.model';


export const getProducts = async (request: Request, response: Response) => {

    const products = await Products.findAll({
        order: [
            ['price', 'DESC']
        ]
    });

    return response.status(200).json({ data: products });
}

export const getProductById = async (request: Request, response: Response) => {
    const { idProducts } = request.params;

    const product = await Products.findByPk(idProducts);

    if (!product) {
        const error = new Error('Producto no encontrado');
        return response.status(400).json({ error: error.message });
    }

    response.status(200).json({ data: product });

}

export const createProduct = async (request: Request, response: Response) => {

    const products = await Products.create(request.body);
    response.status(201).json({ data: products });
}

export const updateProduct = async (request: Request, response: Response) => {
    const { idProducts } = request.params;

    const product = await Products.findByPk(idProducts);

    if (!product) {
        const error = new Error('El producto no existe');
        return response.status(400).json({ data: error.message })
    }

    //actualizar
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


}

export const updateAvailability = async (request: Request, response: Response) => {

    const { idProducts } = request.params;

    const product = await Products.findByPk(idProducts);

    if (!product) {
        const error = new Error('El producto no existe');
        return response.status(400).json({ errors: error.message })
    }

    //actualizar
    product.availability = request.body.availability;
    await product.save();
    response.status(200).json({ msg: 'Actualizado Correctamente', product })

}

export const deleteProduct = async (request: Request, response: Response) => {

    const { idProducts } = request.params;

    const product = await Products.findByPk(idProducts);

    if (!product) {
        const error = new Error('El producto no existe');
        return response.status(400).json({ data: error.message })
    }

    //eliminar el producto
    await product.destroy();
    response.status(200).json({ msg: 'Producto eliminado correctamente' })

}