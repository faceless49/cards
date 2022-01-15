import { instance } from "./index";

export const authApi = {
  login(data: LoginParamsType) {
    return instance.post<CommonResponseType<{ userId?: number }>>(
      "auth/login",
      data
    );
  },
};

//Types

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  error?: string;
};

export type CommonResponseType<T = {}> = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
};
