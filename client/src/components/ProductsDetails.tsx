import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from 'react-router-dom'
import { ProductType } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from '../services/ProductService';

export async function action({ params }: ActionFunctionArgs) {
    if (params.idProducts !== undefined) {
        await deleteProduct(+params.idProducts)
        return redirect('/');
    }

}

const ProductsDetails = ({ product }: { product: ProductType }) => {


    const isAvailable = product.availability;
    const navigate = useNavigate();
    const fetcher = useFetcher();
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}

            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}

            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form action="" method='POST'>
                    <button
                        type='submit'
                        name='availability'
                        id='availability'
                        value={isAvailable ? 0 : 1}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-sm uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                        {isAvailable ? 'Disponible' : 'NO Disponible'}
                    </button>

                    <input type="hidden" id='idProducts' name='idProducts' value={product.idProducts} />

                </fetcher.Form>

            </td>
            <td className="p-3 text-lg text-gray-800 ">

                <div className="flex gap-2 items-center">
                    <button className='bg-indigo-500 text-white rounded-lg w-full p-2 uppercase text-xs font-bold text-center' onClick={() => navigate(`/producto/${product.idProducts}/editar`)}>Editar</button>

                    <Form className='w-full' method='POST' action={
                        `producto/${product.idProducts}/eliminar`
                    } onSubmit={(e: React.FormEvent<HTMLFormElement>
                    ) => {
                        if (!confirm('Eliminar?')) {
                            e.preventDefault();
                        }
                    }}>
                        <input type="submit" value={'Eliminar'} className='bg-red-500 text-white rounded-lg w-full p-2 uppercase text-xs font-bold text-center' />

                    </Form>
                </div>

            </td>
        </tr>
    )
}

export default ProductsDetails