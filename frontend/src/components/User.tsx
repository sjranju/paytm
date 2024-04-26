import { UserType } from "../utils/interface"
import { useNavigate } from "react-router-dom"

const User = ({ user }: { user: UserType }) => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-between mt-2 w-full">
            <div className="flex items-center space-x-1">
                <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center mr-2 font-semibold">{user.firstName[0]}</div>
                <div className="">{user.firstName}</div>
                <div className="">{user.lastName}</div>
            </div>
            <button className="bg-black text-white py-2 px-6 rounded-md font-semibold text-md hover:bg-gray-800"
                onClick={() => navigate('/send?id=' + user._id + '&name=' + user.firstName)}
            >Send Money</button>
        </div>
    )
}

export default User
