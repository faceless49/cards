import {Dispatch} from "react"
import {authApi, LoginParamsType} from "../api/login-api";


export const initialState: InitialStateType = {
    _id: '1',
    username: 'someEmail@gmail.com',
    password: 'some password',
    rememberMe: false,
    isLoggedIn: false
}


export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/LOGIN-USERNAME':
            return {...state, username: action.username}
        case 'login/LOGIN-PASSWORD':
            return {...state, password: action.password}
        default:
            return state
    }
}

// action creators

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const usernameLoginAC = (username: string) =>
    ({type: 'login/LOGIN-USERNAME', username} as const)

export const passwordLoginAC = (password: string) =>
    ({type: 'login/LOGIN-PASSWORD', password} as const)


//thunks creators

/*export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {

    authApi.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))

            } else {

            }
        })

}*/
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
    ReturnType<typeof setIsLoggedInAC> |
    ReturnType<typeof usernameLoginAC> |
    ReturnType<typeof passwordLoginAC>

type InitialStateType = {
    _id: string,
    username: string,
    password: string,
    rememberMe: boolean,
    isLoggedIn: boolean
}

