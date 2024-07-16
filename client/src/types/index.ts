import {productSchema} from '../schema/newProduct.schema'
import {z} from 'zod'


export type product = z.infer<typeof productSchema>;
