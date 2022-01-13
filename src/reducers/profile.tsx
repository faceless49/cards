export type profileInitialStateType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    token?: string
    created: Date | null
    updated: Date | null
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error: string
}


const initialState: profileInitialStateType = {
    _id: '',
    email: 'someEmail@gmail.com',
    name: 'Andrey',
    avatar: '',
    publicCardPacksCount: 0,
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
    token: '',
    created: null,
    updated: null,

}
type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET-PROFILE-DATA":
            return {...state, ...action.data}
        case "PROFILE/UPDATE-PROFILE-DATA":
            return {...state, name: action.data}
        case "PROFILE/SET-PROFILE-ERROR":
            return {...state, error: action.error}
        case "PROFILE/SET-PROFILE-DELETE-DATA":
            return initialState
        default:
            return state
    }
};

export const setProfileData = (data: profileInitialStateType) => {
    return {type: 'PROFILE/SET-PROFILE-DATA', data} as const
}
export const updateProfileData = (data: string) => {
    return {type: 'PROFILE/UPDATE-PROFILE-DATA', data} as const
}
export const setProfileError = (error: string) => {
    return {type: 'PROFILE/SET-PROFILE-ERROR', error} as const
}
export const setProfileDeleteData = () => {
    return {type: 'PROFILE/SET-PROFILE-DELETE-DATA'} as const
}


type ProfileActionsType =
    ReturnType<typeof setProfileData> |
    ReturnType<typeof updateProfileData> |
    ReturnType<typeof setProfileError> |
    ReturnType<typeof setProfileDeleteData>