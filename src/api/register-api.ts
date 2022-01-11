import {instance} from "./index";


export const registerApi = {
    register(data: RegisterParamsType) {
        return instance.post('auth/register', data)
    },
}

export type RegisterParamsType = {
    email: string;
    password: string;
    // rememberMe?:boolean;
}