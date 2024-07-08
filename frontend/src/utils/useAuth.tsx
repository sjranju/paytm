import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { REACT_APP_BACKEND_URL } from './interface'

const useAuth = () => {
    const { data, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const response = await axios(`${REACT_APP_BACKEND_URL}/api/v1/user/me`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            })
            const { username, firstName }: { username: string, firstName: string } = response.data
            return { username, firstName }
        }
    })
    return ({ data, isLoading, isError, isSuccess, error })
}

export default useAuth
