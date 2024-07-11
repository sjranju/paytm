import axios from "axios"
import { useState } from "react"
import { REACT_APP_BACKEND_URL, UsersType } from "../utils/interface"
import User from "./User"
import { useDebounce } from "use-debounce"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useQuery } from "@tanstack/react-query"
import useAuth from "../utils/useAuth"

const Users = () => {

    const [filter, setFilter] = useState<string>('')
    const { data: userData } = useAuth()
    const { data: filteredData, isLoading } = useQuery({
        queryKey: ['filteredUsers'],
        queryFn: async () => {
            const token = localStorage.getItem('token')
            const response = await axios.get(REACT_APP_BACKEND_URL + `/api/user/bulk?filter=` + filter,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            )
            if (response.data) {
                const usersData: UsersType = response.data
                return usersData.user.filter(user => user.username !== userData?.username)
            }
        }
    })
    const [debouncedusers] = useDebounce(filteredData, 1000, { leading: true })

    return isLoading ?
        <>
            <Skeleton height={25} width={'80%'} style={{ marginLeft: '30px' }} />
            <Skeleton height={25} width={'80%'} style={{ marginLeft: '30px' }} />
            <Skeleton height={25} width={'80%'} style={{ marginLeft: '30px' }} />
            <Skeleton height={25} width={'80%'} style={{ marginLeft: '30px' }} />
        </>
        : (
            <div className="px-10 flex flex-col space-y-4">
                <div className="font-bold text-lg">
                    Users
                </div>
                <input placeholder="Search users..." type={"text"} value={filter}
                    onChange={e => setFilter(e.target.value)} className="w-full outline-none border p-2 rounded-md mt-2 text-sm" />
                {
                    debouncedusers && debouncedusers.map((user) =>
                        <User user={user} key={user._id} />
                    )
                }
            </div>
        )
}

export default Users
