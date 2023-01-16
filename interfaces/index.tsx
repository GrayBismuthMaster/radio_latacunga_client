export interface TableUsers{
    _id : string;
    area: string​​
    email: string
    estado: boolean
    nombre: string
    roles: Array<Rol>
    username: string
}
export interface Rol {
    _id : string
    nombreRol : string
}