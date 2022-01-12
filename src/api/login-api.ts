import { instance } from "./index";

export const authApi = {
  login(data: LoginParamsType) {
    return instance.post<CommonResponseType<{ userId?: number }>>(
      "auth/login",
      data
    );
  },
  forgot(data: ForgotParamsType) {
    return instance.post<CommonResponseType>("auth/forgot", data);
  },
  /*    me() {
            return instance.get<CommonResponseType<{id: number, email: string, login:string}>>('auth/me')
        },*/
  /*  logout(){
        return instance.delete<CommonResponseType<{userId?:number}>>('auth/me')
    }*/
};

// {
//     email: "nya@nya.nya", // кому восстанавливать пароль
//       from: "test-front-admin <ai73a@yandex.by>", // можно указать разработчика фронта)
//   message: `<div style="background-color: lime; padding: 15px">
//
//
//
// }

//Types

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ForgotParamsType = {
  email: string;
  from: string;
  message: string;
};
export type CommonResponseType<T = {}> = {
  /* resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T*/
};
