import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Signup from './pages/signup.js'
import Signin from './pages/signin.js'
import Dashboard from './pages/dashboard.js'
import SendMoney from './components/SendMoney.js'
import ProtectedRoute from './utils/ProtectedRoute.js'
import App from './App.js'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      },
      {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/signin',
        element: <Signin />
      }, {
        path: '/send',
        element: <ProtectedRoute>
          <SendMoney />
        </ProtectedRoute>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>,
)
