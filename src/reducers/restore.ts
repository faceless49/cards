import { Dispatch } from "redux";
import { ForgotRequestType, restoreAPI } from "../api/restore-api";

const initState = {
  email: null as string | null,
  emailSuccess: false,
};
type InitStateType = typeof initState;

export const restoreReducer = (
  state: InitStateType = initState,
  action: RestoreActionsType
) => {
  switch (action.type) {
    case "restore/SET-EMAIL":
      return { ...state, email: action.email };
    case "restore/GET-EMAIL-SUCCESS":
      return { ...state, emailSuccess: action.success };
    default:
      return state;
  }
};

// AC

export const setReceiverEmail = (email: string) =>
  ({ type: "restore/SET-EMAIL", email } as const);

export const getEmailSuccess = (success: boolean) =>
  ({ type: "restore/GET-EMAIL-SUCCESS", success } as const);
// TC

let recoveryMessageAddress = `<div style="padding: 15px">Password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>click here</a></div>`;
let recoveryMessage = "test-front-admin <ai73a@yandex.by>";
export const forgotPassword =
  (email: string) => async (dispatch: Dispatch<RestoreActionsType>) => {
    try {
      let requestObj: ForgotRequestType = {
        email: email,
        from: recoveryMessageAddress,
        message: recoveryMessage,
      };
      const response = await restoreAPI.forgotPassword(requestObj);
      dispatch(setReceiverEmail(email));
      dispatch(getEmailSuccess(response.data.success));
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

type RestoreActionsType =
  | ReturnType<typeof setReceiverEmail>
  | ReturnType<typeof getEmailSuccess>;