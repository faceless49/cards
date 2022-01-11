
import {instance} from "./index";

export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<CommonResponseType<{userId?:number}>>('auth/login', data)
    },
    /*    me() {
            return instance.get<CommonResponseType<{id: number, email: string, login:string}>>('auth/me')
        },*/
    logout(){
        return instance.delete<CommonResponseType<{userId?:number}>>('auth/me')
    }
}



//Types

export type LoginParamsType = {
    email: string;
    password: string;
    captcha?: string;
}

export type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}