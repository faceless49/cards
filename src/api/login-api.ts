import { instance } from "./index";
import { AxiosResponse } from "axios";

export const authApi = {
  /*  login(data: LoginParamsType) {
    return instance.post<CommonResponseType<{ userId?: number | undefined }>>(
      "auth/login",
      data
    );
  },*/
  login(data: LoginParamsType) {
    return instance.post<
      LoginParamsType,
      AxiosResponse<CommonResponseType, LoginParamsType>,
      LoginParamsType
    >(`auth/login`, data);
  },
};

//Types

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type CommonResponseType<T = {}> = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  publicCardPacksCount: number;
  token?: string;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error: string;
};
/*
export type profileInitialStateType = {
  _id: string
  email: string
  name: string
  avatar: string
  publicCardPacksCount: number
  token?: string
  created: Date | null
  updated: Date | null
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error: string
}*/
