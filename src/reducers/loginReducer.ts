import { authApi, LoginParamsType } from "../api/login-api";
import {
  setProfileData,
  setProfileDeleteData,
  setProfileError,
} from "./profile";
import { Dispatch } from "redux";
import axios from "axios";

export const initialState: InitialStateType = {
  isLoggedIn: false,
  error: null,
  status: "idle",
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
    case "login/SET-STATUS":
      return { ...state, status: action.status };
    default:
      return state;
  }
};

// action creators
export const setErrorAC = (error: string | null) =>
  ({ type: "login/SET-ERROR", error } as const);
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);
export const setStatusAC = (
  status: "loading" | "succeeded" | "failed" | "idle"
) => ({ type: "login/SET-STATUS", status } as const);

//thunks creators

export const loginTC =
  (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setErrorAC(null));
    dispatch(setStatusAC("loading"));
    authApi
      .login(data)
      .then((res) => {
        dispatch(setProfileData(res.data));
        dispatch(setIsLoggedInAC(true));
        dispatch(setStatusAC("succeeded"));
      })
      .catch((err) => {
        const error = err.response
          ? err.response.data.error
          : err.message + " , more details in console";
        console.log("Error: ", { ...err });

        dispatch(setErrorAC(error));
        dispatch(setStatusAC("failed"));
      });
  };

export const logOut = () => async (dispatch: Dispatch) => {
  try {
    await authApi.LogOut();
    dispatch(setProfileDeleteData());
    dispatch(setIsLoggedInAC(false));
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      dispatch(setProfileError(err.response.data.error));
    }
  } finally {
    // dispatch loading (false)
  }
};

//types

export type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setProfileData>
  | ReturnType<typeof setStatusAC>;

type InitialStateType = {
  isLoggedIn: boolean;
  error: string | null;
  status: "loading" | "succeeded" | "failed" | "idle";
};
