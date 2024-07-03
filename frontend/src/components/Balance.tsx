import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { REACT_APP_BACKEND_URL } from "../utils/interface"

const Balance = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['balance'],
        queryFn: async () => {
            const token = localStorage.getItem('token')
            const response = await axios(`${REACT_APP_BACKEND_URL}/api/v1/account/balance`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data) {
                const balanceObj: { balance: string } = response.data
                return balanceObj
            }
        }
    })

    return (
        <div className="font-bold px-10 mt-4 text-lg">
            Your balance: {
                isLoading ?
                    <Skeleton height={20} width={40} />
                    : data && Math.floor(parseInt(data?.balance))}
        </div>
    )
}

export default Balance
