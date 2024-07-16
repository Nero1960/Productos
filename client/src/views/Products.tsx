import { Link } from 'react-router-dom'
const Products = () => {
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


        </>
    )
}

export default Products