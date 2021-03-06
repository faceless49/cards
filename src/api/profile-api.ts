import {instance} from "./index";
import {AxiosResponse} from "axios";

export const profileApi = {
    mePut(data: MePutRequestType) {
        return instance.put<MePutRequestType, AxiosResponse<MePutResponseType, MePutRequestType>,MePutRequestType>(`auth/me`, data)
    },
}

export type UserResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error: string;
    token?: string
}

export type MePutRequestType = {
    name?: string
    avatar?: string
}

export type MePutResponseType = {
    updatedUser: UserResponseType
    error?: string
}