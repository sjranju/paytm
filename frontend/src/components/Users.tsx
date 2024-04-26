import axios from "axios"
import { useEffect, useState } from "react"
import { UserType, UsersType } from "../utils/interface"
import User from "./User"

const Users = () => {

    const [filter, setFilter] = useState<string>('')
    const [users, setUsers] = useState<UserType[]>([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:3001/api/v1/user/bulk?filter=' + filter,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then((response) => {
            const usersData: UsersType = response.data
            console.log(usersData.user)
            setUsers(usersData.user)
        })
    }, [])

    return (
        <div className="px-10 ">
            <div className="font-bold text-lg">
                Users
            </div>
            <input placeholder="Search users..." type={"text"} value={filter}
                onChange={e => setFilter(e.target.value)} className="w-full outline-none border p-2 rounded-md mt-2 text-sm" />
            {
                users.map((user) =>
                    <User user={user} key={user._id} />
                )
            }
        </div>
    )
}

export default Users
