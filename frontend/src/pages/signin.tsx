import React from 'react'
import Header from '../components/Header'
import SubHeader from '../components/SubHeader'

function Signin() {
    return (
        <div className='bg-blue-100 h-screen flex justify-center'>
            <div className="flex flex-col items-center justify-center bg-white p-6 w-3/12 m-auto">
                <Header label={'Sign in'} />
                <SubHeader content='Enter your credentials to access your account' />
            </div>
        </div>
    )
}

export default Signin
