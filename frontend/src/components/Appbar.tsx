import { useState } from "react"
import useAuth from "../utils/useAuth"
import { useNavigate } from "react-router-dom"

const Appbar = () => {

    const [openModal, setOpenModal] = useState(false)
    const { data, isSuccess, isLoading } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="relative w-full px-10 py-2 h-14 border-b text-white bg-blue-900">
            <div className="flex justify-between items-center h-full">
                <div className="font-bold text-xl">
                    Payments App
                </div>
                <div className="flex font-semibold items-center space-x-4 justify-center">
                    <div>Hello, <span className={`${isLoading && 'animate-pulse'}`}>{isSuccess && data?.firstName}</span></div>
                    <button className="flex justify-center items-center rounded-full bg-blue-100 h-9 w-9 text-blue-900 text-center font-semibold"
                        onClick={() => setOpenModal(true)}>
                        {data?.firstName[0].toUpperCase()}
                    </button>
                </div>
            </div>
            <button className={`${openModal ? 'absolute top-12 right-10 z-10' : 'hidden'} py-1.5 px-4 font-semibold border rounded-md bg-white text-black`}
                onClick={() => {
                    localStorage.removeItem('token')
                    navigate('/signin')
                }}>
                Logout
            </button>
        </div>
    )
}

export default Appbar
