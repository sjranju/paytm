import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useAuth = () => {
    const { data, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const response = await axios('http://localhost:3001/api/v1/user/me', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            const username: { username: string } = response.data
            return username
        }
    })
    return ({ data, isLoading, isError, isSuccess, error })
}

export default useAuth
