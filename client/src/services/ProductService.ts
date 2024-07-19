import { productSchema, ProductSchemaArray, ProductSchema } from "../schema/newProduct.schema";
import axios from 'axios'
import { ProductType } from "../types";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export const addProduct = async (data: ProductData) => {

    console.log(data)

    try {
        const result = productSchema.safeParse({
            name: data.name,
            price: +data.price
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/`;

            await axios.post(url, {
                name: result.data.name,
                price: result.data.price
            })

        } else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
    }

}

export const getProducts = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/`;
        const { data } = await axios(url);


        const result = ProductSchemaArray.safeParse(data.data);


        if (result.success) {
            return result.data;
        } else {
            throw new Error('Ha ocurrido un error');
        }

    } catch (error) {
        console.log(error)
    }

}

export const getProductsByID = async (id: ProductType['idProducts']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios(url);

        const result = productSchema.safeParse(data.data);

        if (result.success) {
            return result.data;
        } else {
            throw new Error('Ha ocurrido un error');
        }

    } catch (error) {
        console.log(error)
    }

}

export const updateProduct = async (data: ProductData, id: ProductType['idProducts']) => {
    try {

        const result = ProductSchema.safeParse({
            idProducts: id,
            name: data.name,
            price: +data.price,
            availability: +data.availability
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, result.data);

        } else {
            throw new Error('Hubo un error..')
        }

    } catch (error) {
        console.log(error)
    }

}

export const deleteProduct = async (id: ProductType['idProducts']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.log(error)
    }

}

export const updateAvailability = async (id: ProductType['idProducts'], availability: ProductType['availability']) => {
    try {
        console.log(id)
        console.log(availability)
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url, {
            availability
        });

    } catch (error) {
        console.log(error)
        
    }

}