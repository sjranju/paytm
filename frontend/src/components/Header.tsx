import React from 'react'

const Header = ({ label }: { label: string }) => {

    return (
        <div className='text-xl font-bold'>
            {label}
        </div>
    )
}

export default Header
