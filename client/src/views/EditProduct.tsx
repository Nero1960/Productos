import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getProductsByID, updateProduct } from "../services/ProductService"
import { ProductType } from "../types";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params.idProducts)

  if (params.idProducts !== undefined) {
    const product = await getProductsByID(+params.idProducts);

    if (!product) {
      //throw new Response('', {status: 404, statusText: 'No encontrado'});
      return redirect('/')
    }

    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {

  const data = Object.fromEntries(await request.formData())
  console.log(data)

  let error = ''

  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios'
  }

  if (error.length) {
    return error;
  }

  if (params.idProducts !== undefined) {
    await updateProduct(data, +params.idProducts);
    return redirect('/');

  }
}

const availabilityOptions = [
  { name: 'Disponible', value: 1 },
  { name: 'No Disponible', value: 0 }
]

const EditProduct = () => {

  const error = useActionData() as string;
  const product = useLoaderData() as ProductType;


  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Editar Producto</h2>
        <Link
          className='rounded bg-indigo-600 p-3 text-white font-bold shadow-sm hover:bg-indigo-600 duration-300'
          to={'/'}
        >
          Volver a Productos
        </Link>

      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}


      <Form
        className="mt-10"
        method="POST"

      >

        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="name"
          >Nombre Producto:</label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
            defaultValue={product.name}
          />
        </div>
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="price"
          >Precio:</label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
            defaultValue={product.price}
          />
        </div>

        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="availability"
          >Disponibilidad:</label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product.availability}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value}>{option.name}</option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Actualizar Producto"
        />
      </Form>
    </>
  )
}

export default EditProduct