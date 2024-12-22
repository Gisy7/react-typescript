import { z } from "zod";

export const productFormSchema = z.object({
    name: z.string(),
    price: z.number()
})

export const productFormEditSchema = z.object({
    name: z.string(),
    price: z.number(),
    availability: z.boolean()
})


export const productSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    availability: z.boolean()
})
export type productType = z.infer<typeof productSchema>

export const productsSchema = z.array(productSchema)
export type productsType = z.infer<typeof productsSchema>




