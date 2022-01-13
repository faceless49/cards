import {instance} from "./index";


export const registerApi = {
    register(data: RegisterRequestType) {
        return instance.post('auth/register', data)
    },
}

export type RegisterRequestType = {
    email: string;
    password: string;
}
//
// export type RegisterResponseType = {
//     error?: string;
//     addUser:{}
// }