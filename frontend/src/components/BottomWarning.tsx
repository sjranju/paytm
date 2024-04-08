import { Link } from 'react-router-dom'

type BottomWarningProps = {
    label: string,
    to: string,
    linkText: string
}

const BottomWarning = ({ label, to, linkText }: BottomWarningProps) => {
    return (
        <div className='text-sm'>
            {label}
            <Link to={`/${to}`} className='ml-1 underline font-semibold'>
                {linkText}
            </Link>
        </div>
    )
}

export default BottomWarning
