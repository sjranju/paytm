import { UserType } from "../utils/interface"
import { useNavigate } from "react-router-dom"

const User = ({ user }: { user: UserType }) => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-between mt-2 w-full">
            <div className="flex items-center space-x-1">
                <div className="h-9 w-9 bg-blue-900 rounded-full flex items-center justify-center mr-2 font-semibold text-white">
                    {user.firstName[0]}
                </div>
                <div className="">{user.firstName}</div>
                <div className="">{user.lastName}</div>
            </div>
            <button className="bg-blue-900 text-white py-1.5 px-4 rounded-md font-semibold text-sm h-auto hover:bg-blue-800"
                onClick={() => navigate('/send?id=' + user._id + '&name=' + user.firstName)}
            >Send Money</button>
        </div>
    )
}

export default User
