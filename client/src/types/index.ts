import {productSchema, ProductSchema} from '../schema/newProduct.schema'
import {z} from 'zod'


export type product = z.infer<typeof productSchema>;

export type ProductType = z.infer<typeof ProductSchema>;
