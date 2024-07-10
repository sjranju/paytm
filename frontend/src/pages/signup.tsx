import axios from "axios"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Header from "../components/Header"
import InputBox from "../components/InputBox"
import SubHeader from "../components/SubHeader"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { REACT_APP_BACKEND_URL } from "../utils/interface"

const Signup = () => {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    return (
        <div className="bg-blue-50 h-screen flex justify-center">
            <div className="flex flex-col items-center justify-center bg-white py-7 px-6 w-3/12 m-auto rounded-lg space-y-4">
                <div className="flex flex-col items-center space-y-1">
                    <Header label={'Sign Up'} />
                    <SubHeader content="Enter your information to create an account" />
                </div>
                <InputBox onChange={e => setFirstName(e.target.value)} label="First Name" placeholder="John" type='text' />
                <InputBox onChange={e => setLastName(e.target.value)} label="Last Name" placeholder="Doe" type='text' />
                <InputBox onChange={e => setUsername(e.target.value)} label="Email" placeholder="johndoe@gmail.com" type='text' />
                <InputBox onChange={e => setPassword(e.target.value)} label="Password" placeholder="" type='password' />
                <Button label='Sign Up' onclick={async () => {
                    const response = await axios.post(REACT_APP_BACKEND_URL + '/api/v1/user/signup', {
                        firstName,
                        lastName,
                        username,
                        password
                    })
                    if (response.status !== 200) {
                        setError(response.data.message)
                    } else {
                        localStorage.setItem("token", response.data.token)
                        navigate('/')
                    }
                }} />
                {error &&
                    <div className="text-sm font-semibold text-red-600">
                        {error}
                    </div>
                }
                <BottomWarning label="Already have an account?" to="signin" linkText='Sign In' />
            </div>
        </div>
    )
}

export default Signup
