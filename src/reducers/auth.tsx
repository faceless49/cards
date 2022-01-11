import {authApi, LoginParamsType} from "../api/login-api";
import {Dispatch} from "react";
import {ActionsType} from "./loginReducer";
import {registerApi, RegisterParamsType} from "../api/register-api";

const initialState = {
  
}
type InitialStateType = typeof initialState

export const authReducer = (state:InitialStateType = initialState, action: AuthActionsType):InitialStateType => {
  switch (action.type) {
    default:
      return state
  }
};


export const registerTC = (data: RegisterParamsType) => (dispatch: Dispatch<AuthActionsType>) => {

  registerApi.register(data)
      .then((res) => {
      debugger
        console.log(res)
      })

}
type AuthActionsType = any