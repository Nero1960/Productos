import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom'
import { getProducts, updateAvailability } from '../services/ProductService'
import ProductsDetails from '../components/ProductsDetails';
import { ProductType } from '../types';

export async function loader() {

    const products = await getProducts();
    return products;

}

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    console.log(data)
    await updateAvailability(+data.idProducts, +data.availability)
    return null
    
}
const Products = () => {
    const products = useLoaderData() as ProductType[];

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Productos</h2>
                <Link
                    className='rounded bg-indigo-600 p-3 text-white font-bold shadow-sm hover:bg-indigo-600 duration-300'
                    to={'/producto/nuevo'}
                >
                    Agregar Producto
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

                        {products.map(product => (
                            <ProductsDetails
                                product={product}
                                key={product.idProducts}
                            />
                        ))}

                    </tbody>
                </table>
            </div>


        </>
    )
}

export default Products