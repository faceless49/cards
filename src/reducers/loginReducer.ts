import { Dispatch } from "react";
import { authApi, LoginParamsType } from "../api/login-api";
import { setProfileData } from "./profile";

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
    authApi
      .login(data)
      .then((res) => {
        dispatch(setIsLoggedInAC(true));
        dispatch(setProfileData(res.data));
      })
      .catch((err) => {
        const error = err.response
          ? err.response.data.error
          : err.message + " , more details in console";
        console.log("Error: ", { ...err });

        dispatch(setErrorAC(error));
      });
  };

//types

export type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setProfileData>;

type InitialStateType = {
  isLoggedIn: boolean;
  error: string | null;
};
