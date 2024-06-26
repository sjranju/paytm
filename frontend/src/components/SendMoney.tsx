import { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters, AiOutlineCheckCircle } from "react-icons/ai"
import { useSearchParams } from "react-router-dom"
import useTransferAmount from "../utils/useTransferAmout"
import { AxiosError } from "axios"

const SendMoney = () => {

    const [amount, setAmount] = useState<number | undefined>(undefined)
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const isValid = amount && amount > 0
    const transferAmount = useTransferAmount()

    useEffect(() => {
        setAmount(undefined)
    }, [transferAmount.isError])

    return (
        <div className="bg-sky-50 min-h-screen w-full flex flex-col justify-center items-center">
            <div className="w-1/3 py-10 px-12 border rounded-md flex flex-col shadow-2xl bg-blue-50">
                <div className="flex flex-col space-y-4 justify-center">
                    <div className="font-bold text-xl text-center">
                        Send Money
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="h-9 w-9 bg-blue-800 rounded-full flex items-center justify-center text-white font-semibold">
                            {name && name[0].toUpperCase()}
                        </div>
                        <div className="font-semibold text-lg">
                            {name}
                        </div>
                    </div>
                    <div className="font-semibold">Amount (in Rs)</div>
                    <input type="number" placeholder="Enter amount" id='amount' value={amount?.toString() || 0} onChange={(e) => setAmount(parseInt(e.target.value))}
                        className="outline-none px-1 py-1.5 border rounded-md"></input>

                    {
                        transferAmount.isPending ?
                            <AiOutlineLoading3Quarters size={30} color='darkblue' width={30} className='animate-spin flex justify-center items-center mx-auto' />
                            : transferAmount.isError ?
                                <>
                                    <div className="text-red-500 text-sm text-center">{transferAmount.error instanceof AxiosError ? transferAmount.error.response?.data.message : transferAmount.error.message}</div>
                                    <button disabled={!isValid} className={`${isValid ? 'bg-blue-800 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-600'} py-1.5 rounded-md font-bold`}
                                        onClick={() =>
                                            amount && id &&
                                            transferAmount.mutate({ amount, id })}>Reinitiate Transfer</button>
                                </>
                                : transferAmount.isSuccess ?
                                    <div className="bg-green-600 shadow-lg font-bold rounded-lg py-1.5 text-center text-white flex flex-row items-center justify-center space-x-1">
                                        <p>Success</p>
                                        <AiOutlineCheckCircle color="white" size={20} />
                                    </div>
                                    : <button disabled={!isValid} className={`${isValid ? 'bg-blue-800 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-600'} py-1.5 rounded-md font-bold`}
                                        onClick={() =>
                                            amount && id &&
                                            transferAmount.mutate({ amount, id })}>Initiate Transfer</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default SendMoney
