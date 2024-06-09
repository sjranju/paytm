import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useSearchParams } from "react-router-dom"

const SendMoney = () => {

    const [amount, setAmount] = useState<number>(0)
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const isValid = amount > 0

    const useTransferAmount = useMutation({
        mutationKey: ['transferAmount'],
        mutationFn: async () => {
            axios.post('http://localhost:3001/api/v1/account/transfer', {
                to: id,
                amount: amount
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
        },
    })

    return (
        <div className="w-3/12 p-10 border rounded-md flex flex-col items-center justify-center mx-auto mt-36 shadow-xl">
            <div className="flex flex-col space-y-4 justify-center w-full">
                <div className="font-bold text-xl text-center">
                    Send Money
                </div>
                <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center">
                        {name && name[0].toUpperCase()}
                    </div>
                    <div className="font-semibold text-lg">
                        {name}
                    </div>
                </div>
                <input type="number" placeholder="Enter amount" id='amount' onChange={(e) => setAmount(parseInt(e.target.value))}
                    className="outline-none px-1 py-1.5 border rounded-md"></input>

                {
                    useTransferAmount.isPending ?
                        <AiOutlineLoading3Quarters size={30} color='darkblue' width={30} className='animate-spin flex justify-center items-center mx-auto mt-32' />
                        : useTransferAmount.isError ?
                            <div className="text-red-500 text-xs">{useTransferAmount.error.message}</div>
                            : useTransferAmount.isSuccess ? <div className="bg-green-600 text-white font-bold rounded-lg py-1.5 px-4 text-center">Success</div>
                                : <button disabled={!isValid} className={`${isValid ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'} py-1.5 rounded-md font-bold`}
                                    onClick={() => useTransferAmount.mutate()}>Initiate Transfer</button>
                }
            </div>
        </div>
    )
}

export default SendMoney
