import { ReactElement } from 'react'
import { useErrorBoundary } from 'react-error-boundary'

const ErrorBoundary = ({ children }: { children: ReactElement }) => {
    const { resetBoundary } = useErrorBoundary()

    // if (error) {
    return (
        <div>
            <h1>Something went wrong</h1>
            <button onClick={resetBoundary}>Try again</button>
        </div>
    )
    // }
    return children
}

export default ErrorBoundary
