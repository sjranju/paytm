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