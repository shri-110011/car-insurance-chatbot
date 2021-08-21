export interface LoggedInUser {
    email: string,
    userName: string,
    isAdmin: boolean,
    token?: string,
    tokenValidity?: boolean,
    expiresIn?: number
}