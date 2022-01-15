import { instance } from "./index";
import { AxiosResponse } from "axios";

export const authApi = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<CommonResponseType>>(
      `auth/login`,
      data
    );
  },
};

//Types

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type CommonResponseType = {
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
