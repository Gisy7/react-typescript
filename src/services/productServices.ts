import axios from "axios";
import { productFormEditSchema, productFormSchema, productsSchema, productType } from "../types";
import { productSchema } from '../types/index';
import { z } from "zod";


export const getProducts = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/`
        const { data } = await axios.get(url)


        const validate = productsSchema.safeParse(data.data)


        if (validate.success) {


            return validate.data
        } else {
            throw new Error("No se han podido obtener los productos")
        }

    } catch (error) {
        console.error(error)
    }
}


export const getProductById = async (id: productType["id"]) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/${id}`
        const { data } = await axios.get(url)


        const validate = productSchema.safeParse(data.data)


        if (validate.success) {
            return validate.data
        } else {
            throw new Error("No se han podido obtener los productos")
        }

    } catch (error) {
        console.error(error)
    }
}

type dataProduct = {
    [k: string]: FormDataEntryValue;
}


export const addProduct = async (data: dataProduct) => {
    try {
        const validate = productFormSchema.safeParse({
            name: data.name,
            price: +data.price
        })

        if (validate.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/`
            await axios.post(url, validate.data)

        } else {
            throw new Error("Datos no validos")
        }
    } catch (error) {
        console.error(error);
    }
}


export const editProduct = async (data: dataProduct, id: productType["id"]) => {
    try {


        const numberSchema = z.string().transform(v => parseFloat(v));
        const price = numberSchema.parse(data.price)

        const booleanSchema = z.string().transform(v => v.toLowerCase() === "true");
        const boolean = booleanSchema.parse(data.availability)


        const validate = productFormEditSchema.safeParse({
            name: data.name,
            price: price,
            availability: boolean
        })

        console.log(validate);

        if (validate.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/${id}`
            await axios.put(url, validate.data)

        } else {
            throw new Error("Datos no validos")
        }
    } catch (error) {
        console.error(error);
    }
}


export const editAvailabilityProduct = async (id: productType["id"]) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/${id}`
        await axios.patch(url)
    } catch (error) {
        console.error(error);
    }


}


export const deleteProduct = async (id: productType["id"]) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/${id}`
        await axios.delete(url)


    } catch (error) {
        console.error(error);
    }
}