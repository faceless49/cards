import { Dispatch } from "react";
import { authApi, ForgotParamsType, LoginParamsType } from "../api/login-api";

export const initialState: InitialStateType = {
  isLoggedIn: false,
};

export const loginReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
      case 'login/FORGOT':

      default:
      return state;
  }
};

// action creators

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

export const sendPassword = (email: string, from: string, message: string) => ({
  type: "login/FORGOT",
  email,
  from,
  message,
} as const);

//thunks creators

export const loginTC =
  (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authApi.login(data).then((res) => {
      /*dispatch(setIsLoggedInAC(true))*/
      console.log(res);
    });
  };

/*
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {

    authApi.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))

            } else {

            }
        })
}*/

//types

export type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof sendPassword>;

type InitialStateType = {
  isLoggedIn: boolean;
};
