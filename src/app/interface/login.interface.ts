import {User} from './user.interface'
export interface LoginResponse {
    message: string,
    user: User,
    token: string
}

export interface LoginRequest {
    username: string,
    password: string,
}