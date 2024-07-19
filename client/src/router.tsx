import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { action as updateAvailability, loader as productsLoader } from './views/Products';
import NewProduct, {action as newProductAction} from './views/NewProduct';
import EditProduct, {loader as editProductLoader, action as editProductAction} from './views/EditProduct';
import { action as deleteProductAction } from './components/ProductsDetails';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Products/>,
                loader: productsLoader,
                action: updateAvailability
            },

            {
                path: 'producto/nuevo',
                element: <NewProduct/>,
                action: newProductAction
            },

            {
                path: 'producto/:idProducts/editar',
                element: <EditProduct/>,
                loader: editProductLoader,
                action: editProductAction
            },

            {
                path: 'producto/:idProducts/eliminar',
                action: deleteProductAction
            }

        
        ]
        
    },

    

]);