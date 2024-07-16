import {PropsWithChildren} from 'react'

const ErrorMessage = ({children} : PropsWithChildren) => {
  return (
    <div className='text-center my-4 bg-red-600 text-white uppercase p-3 font-bold'>{children}</div>
  )
}

export default ErrorMessage