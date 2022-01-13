import { instance } from "./index";

export const restoreAPI = {
  forgotPassword(requestData: ForgotRequestType) {
    return instance.post<ForgotResponseType>(`auth/forgot`, requestData);
  },
  recoveryPassword(requestData: RecoverRequestType) {
    return instance.post<RecoverRequestType>(
      "auth/set-new-password",
      requestData
    );
  },
};

export type ForgotRequestType = {
  email: string;
  from: string;
  message: string;
};

export type ForgotResponseType = {
  info: string;
  success: boolean;
  answer: boolean;
  html: boolean;
};

export type RecoverRequestType = {
  password: string;
  resetPasswordToken: string;
};

export type SetNewPasswordRequestType = {
  password: string
  resetPasswordToken: string
}