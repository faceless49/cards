import { Dispatch } from "react";
import { authApi, LoginParamsType } from "../api/login-api";

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

    default:
      return state;
  }
};

// action creators

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

//thunks creators

export const loginTC =
  (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authApi.login(data).then((res) => {
      /*dispatch(setIsLoggedInAC(true))*/
      console.log(res);
    });
  };

//types

export type ActionsType = ReturnType<typeof setIsLoggedInAC>;

type InitialStateType = {
  isLoggedIn: boolean;
};
