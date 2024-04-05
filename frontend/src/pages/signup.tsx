import Header from "../components/Header"
import SubHeader from "../components/SubHeader"

const Signup = () => {
    return (
        <div className="bg-blue-100 h-screen flex justify-center">
            <div className="flex flex-col items-center justify-center bg-white p-6 w-3/12 m-auto">
                <Header label={'Sign up'} />
                <SubHeader content="Enter your information to create an account" />
            </div>
        </div>
    )
}

export default Signup
