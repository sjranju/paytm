import axios from "axios"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const SendMoney = () => {

    const [amount, setAmount] = useState<number>(0)
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get('name')

    return (
        <div className="w-3/12 px-10 py-6 border rounded-md flex flex-col items-center justify-center mx-auto mt-36 shadow-xl">
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
                <button className="bg-green-600 py-1 rounded-md text-white font-bold"
                    onClick={() => {
                        axios.post('http://localhost:3001/api/v1/account/transfer', {
                            to: id,
                            amount: amount
                        }, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                    }}>Initiate Transfer</button>
            </div>
        </div>
    )
}

export default SendMoney
