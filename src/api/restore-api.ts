import {instance} from './index';

export const restoreAPI = {
  forgotPassword(requestData: ForgotRequestType) {
    return instance.post<ForgotResponseType>(`auth/forgot`, requestData)
  },
}


export type ForgotRequestType = {
  email: string
  from: string
  message: string
}

export type ForgotResponseType = {
  info: string
  success: boolean
  answer: boolean
  html: boolean
}