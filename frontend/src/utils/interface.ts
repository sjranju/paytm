export type UserType = {
    _id: string,
    userName: string,
    password: string,
    firstName: string,
    lastName: string,
}

export type UsersType = {
    user: UserType[]
}