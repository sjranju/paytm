import { Navigate, useLocation } from 'react-router-dom'
import useAuth from './useAuth'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const location = useLocation()
    const { data, isError, isLoading, error } = useAuth()

    if (isLoading) {
        return <AiOutlineLoading3Quarters size={30} color='darkblue' width={30} className='animate-spin flex justify-center items-center mx-auto mt-32' />
    } else {
        if (isError) {
            if (!data?.username) {
                return <Navigate to='/signup' />
            }
            return <div className='text-red-600'>{error?.message}</div>
        } else {
            if (location.pathname === '/signin') {
                return <Navigate to='/dashboard' />
            }
            return children
        }
    }
}

export default ProtectedRoute
