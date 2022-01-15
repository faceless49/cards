import { Dispatch } from "react";
import { authApi, LoginParamsType } from "../api/login-api";

export const initialState: InitialStateType = {
  isLoggedIn: false,
  error: null,
};

export const loginReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    case "login/SET-ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

// action creators
export const setErrorAC = (error: string | null) =>
  ({ type: "login/SET-ERROR", error } as const);
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

//thunks creators

export const loginTC =
  (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authApi.login(data).then((res) => {
      dispatch(setIsLoggedInAC(true));
    });
    /*     .catch((error) => {
        dispatch(setErrorAC("Some error occurred"));
      });*/
  };

//types

export type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setErrorAC>;

type InitialStateType = {
  isLoggedIn: boolean;
  error: string | null;
};
