export interface User {
    id: string
    name: string
    lastname: string
    username: string
    password: string
    photo: string
    isActive: boolean
    roles: Roles[]
}

export interface UserList {
    id: number;
    name: string;
    lastname: string;
    username: string;
    password: string;
    photo: string;
    isActive: boolean;
    isDelete: boolean;
    created_at: string;
    updated_at: string;
    roles: Roles[];
}

export interface Roles {
    id: number
    nombre: string
    isActive: boolean
    estado: boolean
}

export interface TokenUser {
    id: number;
    username: string;
    rol: number;
    iat: number;
    exp: number;
}