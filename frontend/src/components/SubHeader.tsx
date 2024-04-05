import React from 'react'

function SubHeader({ content }: { content: string }) {
    return (
        <div className='font-medium text-sm text-gray-500'>
            {content}
        </div>
    )
}

export default SubHeader
