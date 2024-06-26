import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

type amountData = {
    amount: number,
    id: string
}

const useTransferAmount = () => {
    const navigate = useNavigate()

    const transferAmountMutation = useMutation({
        mutationKey: ['transferAmount'],
        mutationFn: async (accountData: amountData) =>
            await axios.post('http://localhost:3001/api/v1/account/transfer', {
                to: accountData.id,
                amount: accountData.amount
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
        ,
        onSuccess: () => {
            setTimeout(() => {
                navigate('/dashboard')
            }, 1000);
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                console.log(error.response?.data)
                throw error.response
            }
        },
    })
    return (transferAmountMutation)
}

export default useTransferAmount
