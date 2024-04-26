import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './pages/signup.js'
import Signin from './pages/signin.js'
import Dashboard from './pages/dashboard.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SendMoney from './components/SendMoney.js'

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />
  }, {
    path: '/signin',
    element: <Signin />
  }, {
    path: '/dashboard',
    element: <Dashboard />
  }, {
    path: '/send',
    element: <SendMoney />
  }
])

const queryClient = new QueryClient

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
