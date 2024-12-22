import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage';
import { editProduct, getProductById } from '../services/productServices';
import { productType } from '../types';
import ProductForm from '../components/ProductForm';


export const loader = async ({ params }: LoaderFunctionArgs) => {

    if (params.id !== undefined) {
        const product = await getProductById(+params.id)
        console.log(product);
        if (!product) {
            return redirect("/")
        }
        return product
    }


}


export const action = async ({ request, params }: ActionFunctionArgs) => {
    let error;

    const data = Object.fromEntries(await request.formData())

    if (Object.values(data).includes("")) {
        error = "Los campos son obligatorios"
    }

    if (error) {
        return error
    }

    if (params.id !== undefined) {
        await editProduct(data, +params.id)
    }


    return redirect("/")
}


const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]


const EditProduct = () => {

    const error = useActionData()

    const product = useLoaderData() as productType



    return (
        <>
            <div className='bg-white p-11 shadow-md'>
                <div className=' flex justify-between items-center'>
                    <h2 className='text-3xl font-bold text-gray-500'>Editar Producto</h2>
                    <Link to="/">
                        <button className='bg-blue-700 text-white font-semibold rounded-md p-2 hover:bg-blue-800'>
                            Volver a productos
                        </button>
                    </Link>
                </div>


                <Form
                    method='PATCH'
                    className="mt-10"
                >

                    <div className="mb-4">
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </div>

                    <ProductForm product={product} />

                    <div className="mb-4">
                        <label
                            className="text-gray-800"
                            htmlFor="availability"
                        >Disponibilidad:</label>
                        <select
                            id="availability"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            name="availability"
                            defaultValue={product?.availability.toString()}
                        >
                            {availabilityOptions.map(option => (
                                <option key={option.name} value={option.value.toString()}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="submit"
                        className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                        value="Editar Producto"
                    />
                </Form>

            </div>

        </>

    )
}

export default EditProduct