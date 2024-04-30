const Appbar = () => {

    // const { data } = useQuery({
    //     queryKey: ['userData'],
    //     queryFn: async () => {
    //         const response: UsersType = await axios.get('http://localhost:3001/api/v1/user/bulk')
    //         return response.user
    //     }
    // })

    return (
        <div className="w-full px-10 py-2 h-14 border-b">
            <div className="flex justify-between items-center h-full">
                <div className="font-bold text-xl">
                    Payments App
                </div>
                <div className="flex font-semibold items-center space-x-4 justify-center">
                    <div>Hello, User</div>
                    <div className="flex justify-center items-center rounded-full bg-slate-200 h-10 w-10 text-center">
                        U
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appbar
