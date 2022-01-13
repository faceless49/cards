import {Dispatch} from "react";
import {registerApi, RegisterRequestType} from "../api/register-api";

const initialState = {
    emailError: null as null | string,
    passwordError: null as null | string,
    isRegistration: false,
    isFetching: false,
    errorRequestValue: null as null | string
}
type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationActionsType): InitialStateType => {
    switch (action.type) {
        case 'registration/EMAIL-ERROR':
            return {...state, emailError: action.error}
        case  'registration/PASSWORD-ERROR':
            return {...state, passwordError: action.error}
        case 'registration/IS-REGISTRATION' :
            debugger
            return {...state, isRegistration: action.isRegistration}
        case 'registration/TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'registration/ERROR-REQUEST':
            return {...state, errorRequestValue: action.errorRequestValue}
        default:
            return state
    }
};
export type SetEmailErrorType = ReturnType<typeof setEmailError>
export const setEmailError = (error: null | string) =>
    ({type: 'registration/EMAIL-ERROR', error} as const)

export type SetPasswordErrorType = ReturnType<typeof setPasswordError>
export const setPasswordError = (error: null | string) =>
    ({type: 'registration/PASSWORD-ERROR', error} as const)

export type ToggleIsRegistrationType = ReturnType<typeof toggleIsRegistration>
export const toggleIsRegistration = (isRegistration: boolean) =>
    ({type: 'registration/IS-REGISTRATION', isRegistration} as const)

export type ToggleIsFetchingType = ReturnType<typeof toggleIsFetching>
export const toggleIsFetching = (isFetching: boolean) =>
    ({type: 'registration/TOGGLE-IS-FETCHING', isFetching} as const)

export type SetErrorRequestType = ReturnType<typeof setErrorRequest>
export const setErrorRequest = (errorRequestValue: string) =>
    ({type: 'registration/ERROR-REQUEST', errorRequestValue} as const)

export const registerTC = (data: RegisterRequestType) => (dispatch: Dispatch<RegistrationActionsType>) => {
    dispatch(toggleIsFetching(true))
    debugger
    registerApi.register(data)
        .then(() => {
            dispatch(toggleIsRegistration(true))
        })
        .catch(e => {
            dispatch(setErrorRequest(e.response.data.error))
            console.log(e.response.data.error)
        })
        .finally(() => {
            dispatch(toggleIsFetching(false))
        })

}
type RegistrationActionsType =
    SetEmailErrorType
    | SetPasswordErrorType
    | ToggleIsRegistrationType
    | ToggleIsFetchingType
    | SetErrorRequestType