import { z } from 'zod'

export const productSchema = z.object({
    name: z.string(),
    price: z.number()
})

export const ProductSchema = z.object({
    idProducts: z.number(),
    name: z.string(),
    price: z.number(),
    availability: z.number()
})

export const ProductSchemaArray = z.array(
    z.object(
        {
            idProducts: z.number(),
            name: z.string(),
            price: z.number(),
            availability: z.number()
        }
    )
)