import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"

const Dashboard = () => {

    return (
        <div>
            <Appbar />
            <div className="min-h-screen flex flex-col space-y-6 bg-sky-50">
                <Balance />
                <Users />
            </div>
        </div>
    )
}

export default Dashboard
