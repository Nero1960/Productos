import { productSchema } from "../schema/newProduct.schema";
import axios from 'axios'

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export const addProduct = async (data : ProductData) => {


    try {
        const result = productSchema.safeParse({
            name: data.name,
            price: +data.price
        });
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/`;

            const { data } = await axios.post(url, {
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