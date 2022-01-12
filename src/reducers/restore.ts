import { Dispatch } from "redux";
import {ForgotRequestType, restoreAPI} from '../api/restoreApi';

type InitialStateType = typeof initialState;

const initialState = {
  email: null as string | null,
  restoreEmailSendSuccess: false,
};

export const restoreReducer = (
  state: InitialStateType = initialState,
  action: RestoreActionsType
): InitialStateType => {
  switch (action.type) {
    case "restore/SET-RECEIVER-EMAIL": {
      return { ...state, email: action.email };
    }
    case "restore/EMAIL-SEND-SUCCESS": {
      return { ...state, restoreEmailSendSuccess: action.success };
    }
    default:
      return state;
  }
};

const recoveryMessageAddress = "test-front-admin <ai73a@yandex.by>"
const recoveryMessage = `<div style="padding: 15px">Password recovery link:<a href='http://localhost:3000/#/set-new-password/$token$'>click here</a></div>`
export const setReceiverEmail = (email: string) => {
  return { type: "restore/SET-RECEIVER-EMAIL", email } as const;
};
export const emailSendSuccess = (success: boolean) => {
  return { type: "restore/EMAIL-SEND-SUCCESS", success } as const;
};


export const forgotPassword = (email: string) => async (dispatch: Dispatch<RestoreActionsType>) => {
  try {
    let requestObj: ForgotRequestType = {
      email: email,
      from: recoveryMessageAddress,
      message: recoveryMessage
    }
    const response = await restoreAPI.forgotPassword(requestObj)
    dispatch(setReceiverEmail(email))
    dispatch(emailSendSuccess(response.data.success))
    console.log(response.data.info)
  } catch(e) {
    console.log(e)
  }
};

export type RestoreActionsType = ReturnType<typeof setReceiverEmail> | ReturnType<typeof emailSendSuccess>