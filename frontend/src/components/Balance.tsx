import axios from "axios"
import { useEffect, useState } from "react"

const Balance = () => {

    const [balance, setBalance] = useState<string>('')

    useEffect(() => {
        const getBalance = async () => {
            const token = localStorage.getItem('token')
            const response = await axios('http://localhost:3001/api/v1/account/balance', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data) {
                const balanceObj: { balance: string } = response.data
                setBalance(balanceObj.balance)
            }
        }

        getBalance()
    }, [])

    return (
        <div className="font-bold px-10 mt-4 text-lg">
            Your balance - {Math.floor(parseInt(balance))}
        </div>
    )
}

export default Balance
