import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom'
import { editAvailabilityProduct, getProducts } from '../services/productServices';
import ProductDetails from '../components/ProductDetails';
import { productType } from '../types';
import { productsType } from '../types/index';

export const loader = async () => {
    const products = await getProducts()
    return products
}


export const action = async ({ request }: ActionFunctionArgs) => {
    console.log("desde availability");
    const { id } = Object.fromEntries(await request.formData())

    editAvailabilityProduct(id)
    return {}
}

const Products = () => {

    const products = useLoaderData()

    console.log(products);

    return (

        <>
            <div className='bg-white p-11 shadow-md flex justify-between items-center'>
                <h2 className='text-3xl font-bold text-gray-500'>Productos</h2>
                <Link to="productos/nuevo">
                    <button className='bg-blue-700 text-white font-semibold rounded-md p-2 hover:bg-blue-800'>
                        Agregar Producto
                    </button>
                </Link>

            </div>

            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product: productType) => {
                            return <ProductDetails
                                key={product.id}
                                product={product} />
                        })}
                    </tbody>
                </table>
            </div>
        </>

    )
}

export default Products