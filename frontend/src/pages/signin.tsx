import { useEffect, useState } from 'react'
import BottomWarning from '../components/BottomWarning'
import Button from '../components/Button'
import Header from '../components/Header'
import InputBox from '../components/InputBox'
import SubHeader from '../components/SubHeader'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { REACT_APP_BACKEND_URL } from '../utils/interface'

function Signin() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')?.length) {
            navigate('/')
        }
    }, [])

    return (
        <div className='h-screen flex justify-center bg-blue-50'>
            <div className="flex flex-col items-center justify-center bg-white rounded-md p-8 w-3/12 m-auto space-y-4 shadow-xl">
                <div className='flex flex-col items-center space-y-1'>
                    <Header label={'Sign in'} />
                    <SubHeader content='Enter your credentials to access your account' />
                </div>
                <InputBox onChange={e => setUsername(e.target.value)} label="Email" placeholder="johndoe@gmail.com" type='text' />
                <InputBox onChange={e => setPassword(e.target.value)} label="Password" placeholder="" type='password' />
                <Button label='Sign In' onclick={async () => {
                    const response = await axios.post(REACT_APP_BACKEND_URL + '/api/v1/user/signin', {
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
                {
                    error &&
                    <div className="text-sm font-semibold text-red-600">
                        {error}
                    </div>
                }
                <BottomWarning label="Don't have an account?" to='signup' linkText='Sign Up' />
            </div>
        </div>
    )
}

export default Signin
