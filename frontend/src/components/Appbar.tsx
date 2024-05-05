import useAuth from "../utils/useAuth"

const Appbar = () => {

    const { data, isSuccess, isLoading } = useAuth()

    return (
        <div className="w-full px-10 py-2 h-14 border-b">
            <div className="flex justify-between items-center h-full">
                <div className="font-bold text-xl">
                    Payments App
                </div>
                <div className="flex font-semibold items-center space-x-4 justify-center">
                    <div>Hello, <span className={`${isLoading && 'animate-pulse'}`}>{isSuccess && data?.username}</span></div>
                    <div className="flex justify-center items-center rounded-full bg-slate-200 h-10 w-10 text-center">
                        {data?.username[0].toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appbar
