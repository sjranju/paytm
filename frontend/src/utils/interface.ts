export type UserType = {
    _id: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
}

export type UsersType = {
    user: UserType[]
}

export const REACT_APP_BACKEND_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://paytm-application-backend.netlify.app'