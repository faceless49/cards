import {authApi, LoginParamsType} from "../api/login-api";
import {setProfileData, setProfileDeleteData, setProfileError} from "./profile";
import {Dispatch} from "redux";
import axios from "axios";

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
            return {...state, isLoggedIn: action.value};
        case "login/SET-ERROR":
            return {...state, error: action.error};
        default:
            return state;
    }
};

// action creators
export const setErrorAC = (error: string | null) =>
    ({type: "login/SET-ERROR", error} as const);
export const setIsLoggedInAC = (value: boolean) =>
    ({type: "login/SET-IS-LOGGED-IN", value} as const);

//thunks creators

export const loginTC =
    (data: LoginParamsType) => (dispatch: Dispatch) => {
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
                console.log("Error: ", {...err});

                dispatch(setErrorAC(error));
            });
    };

export const logOut = () => async (dispatch:Dispatch) => {
  try {
    await authApi.LogOut();
    dispatch(setProfileDeleteData());
    dispatch(setIsLoggedInAC(false))

  } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
          dispatch(setProfileError(err.response.data.error))
      }
  } finally {
      // dispatch loading (false)
  }
}

//types

export type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setProfileData>;

type InitialStateType = {
    isLoggedIn: boolean;
    error: string | null;
};
