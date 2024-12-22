import React from 'react'
import { productType } from '../types'
import { formatCurrency } from '../utils'
import { useNavigate, Form, redirect, ActionFunctionArgs, useFetcher } from 'react-router-dom'
import { deleteProduct } from '../services/productServices'


export const action = async ({ params }: ActionFunctionArgs) => {
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect("/")
    }
}



const ProductDetails = ({ product }: { product: productType }) => {

    const navigate = useNavigate()

    const availability = product.availability ? "Disponible" : "No disponible"

    const fetcher = useFetcher()

    return (
        <tr className="border-b text-center">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">

                <fetcher.Form method="POST">
                    <button
                        type='submit'
                        name='availability'
                        value={product.availability.toString()}
                        className={`${product.availability ? `text-black` : `text-red-600`}
                        border border-gray-300 py-1 px-2 rounded w-full uppercase font-semibold text-sm`}
                    >
                        {availability}
                    </button>

                    <input type="hidden" name="id" value={product.id} />
                </fetcher.Form>

            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className='flex gap-3 items-center justify-center'>

                    <button
                        onClick={() => {
                            navigate(`productos/editar/${product.id}`)
                        }}
                        className='bg-orange-400  py-1 px-2 rounded font-semibold text-white'>Editar</button>



                    <Form
                        method="POST"
                        action={`productos/eliminar/${product.id}`}
                        onSubmit={(e) => {
                            if (!confirm("Eliminar")) {
                                e.preventDefault()
                            }
                        }}>




                        <button
                            type="submit"
                            className='bg-red-600 py-1 px-2 rounded font-semibold text-white'>
                            Borrar
                        </button>
                    </Form>



                </div>
            </td>
        </tr>
    )
}

export default ProductDetails