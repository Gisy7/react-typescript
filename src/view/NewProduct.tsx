import React from 'react'
import { Link, Form, useActionData, ActionFunctionArgs, redirect } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage';
import { addProduct } from '../services/productServices';
import ProductForm from '../components/ProductForm';


export const action = async ({ request }: ActionFunctionArgs) => {
    let error;

    const data = Object.fromEntries(await request.formData())


    if (Object.values(data).includes("")) {
        error = "Los campos son obligatorios"
    }

    if (error) {
        return error
    }

    await addProduct(data)

    return redirect("/")
}



const NewProduct = () => {

    const error = useActionData()

    return (
        <>
            <div className='bg-white p-11 shadow-md'>
                <div className=' flex justify-between items-center'>
                    <h2 className='text-3xl font-bold text-gray-500'>Registrar Producto</h2>
                    <Link to="/">
                        <button className='bg-blue-700 text-white font-semibold rounded-md p-2 hover:bg-blue-800'>
                            Volver a productos
                        </button>
                    </Link>
                </div>


                <Form
                    method='POST'
                    className="mt-10"
                >

                    <div className="mb-4">
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </div>

                    <ProductForm />
                    <input
                        type="submit"
                        className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                        value="Registrar Producto"
                    />
                </Form>

            </div>

        </>

    )
}

export default NewProduct