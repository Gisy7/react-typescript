import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"

import NewProduct from "./view/NewProduct"


import Products, { action as actionAvailabilityProducts, loader as loaderProducts } from "./view/Products"
import { action as newProductAction } from "./view/NewProduct"
import EditProduct, { action as actionEditProduct, loader as loaderEditProduct } from "./view/EditProduct"
import { action as actionDeleteProduct } from "./components/ProductDetails"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: loaderProducts,
                action: actionAvailabilityProducts

            },
            {
                path: "productos/nuevo",
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: "productos/editar/:id",
                element: <EditProduct />,
                loader: loaderEditProduct,
                action: actionEditProduct

            },
            {
                path: "productos/eliminar/:id",
                action: actionDeleteProduct

            },
        ]
    },

])
