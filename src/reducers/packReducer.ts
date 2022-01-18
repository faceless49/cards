import {GetPacksRequestType, packsApi, PackType} from "../api/packs-api";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunk} from "../redux/store";
import axios from "axios";


export type InitialStatePackPageType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    error: string
    user_id: string
    token: string
}
const initialState: InitialStatePackPageType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    error: '',
    user_id: '',
    token: '',
}


export const packReducer = (state = initialState, action: PackActionsType): InitialStatePackPageType => {
    switch (action.type) {
        case "PACK/SET-PACKS-DATA":
            return {...state, ...action.data}
        case "PACK/CLEAR-PACKS":
            return initialState
        case "PACK/SET-ERROR":
            return {...state, error: action.error}
        case "PACK/SET-SORT":
            if (action.sortType === 'name') {
                if (action.sort === 'up') {
                    return {
                        ...state, cardPacks: [...state.cardPacks.sort((a, b) => {
                            let nameOne = a.name.toLocaleLowerCase();
                            let nameTwo = b.name.toLocaleLowerCase();
                            if (nameOne < nameTwo) return -1;
                            else if (nameOne > nameTwo) return 1;
                            else return 0
                        })]
                    }
                } else {
                    return {
                        ...state, cardPacks: [...state.cardPacks.sort((a, b) => {
                            let nameOne = a.name.toLocaleLowerCase();
                            let nameTwo = b.name.toLocaleLowerCase();
                            if (nameOne > nameTwo) return -1;
                            else if (nameOne < nameTwo) return 1;
                            else return 0
                        })]
                    }
                }
            } else if (action.sortType === 'cardsCount') {
                if (action.sort === 'up') {
                    return {
                        ...state, cardPacks: [...state.cardPacks.sort((a, b) => {
                            let nameOne = a.cardsCount;
                            let nameTwo = b.cardsCount;
                            if (nameOne > nameTwo) return -1;
                            else if (nameOne < nameTwo) return 1;
                            else return 0
                        })]
                    }
                } else {
                    return {
                        ...state, cardPacks: [...state.cardPacks.sort((a, b) => {
                            let nameOne = a.cardsCount;
                            let nameTwo = b.cardsCount;
                            if (nameOne < nameTwo) return -1;
                            else if (nameOne > nameTwo) return 1;
                            else return 0
                        })]
                    }
                }
            } else if (action.sortType === 'updated') {
                if (action.sort === 'up') {
                    return {
                        ...state, cardPacks: [...state.cardPacks.sort((a, b) => {
                            let nameOne = a.updated;
                            let nameTwo = b.updated;
                            if (nameOne > nameTwo) return -1;
                            else if (nameOne < nameTwo) return 1;
                            else return 0;
                        })]
                    }
                } else {
                    return {
                        ...state, cardPacks: [...state.cardPacks.sort((a, b) => {
                            let nameOne = a.updated;
                            let nameTwo = b.updated;
                            if (nameOne < nameTwo) return -1;
                            else if (nameOne > nameTwo) return 1;
                            else return 0
                        })]
                    }
                }
            }
            return state
        default:
            return state
    }
}

export const setPacksData = (data: GetPacksRequestType) => ({type: 'PACK/SET-PACKS-DATA', data} as const)
export const clearPacksData = () => ({type: 'PACK/CLEAR-PACKS'} as const)
export const setPacksError = (error: string) => ({type: 'PACK/SET-ERROR', error} as const)
export const setPacksSortData = (sort: 'up' | 'down', sortType: 'name' | 'cardsCount' | 'updated') =>
    ({type: 'PACK/SET-SORT', sort, sortType} as const)

//Thunks

export const getPacks = (someParams?: string) =>
    async (dispatch: Dispatch, getState: ()=> AppRootStateType) => {
    //dispatch(диспатч на лоадинг)
        dispatch(setPacksError(''));
        try {
            const response = await packsApi.getPacks({
                page: getState().packPage.page,
                user_id: getState().packPage.user_id,
                pageCount: getState().packPage.pageCount,
                packName: someParams && someParams,
            })
            dispatch(setPacksData(response.data))
        }
        catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                dispatch(setPacksError(err.response.data.error))
            } else if (axios.isAxiosError(err)) {
                dispatch(setPacksError(err.message))
            }
            // finally {
            //     //dispatch(диспатч на лоадинг)
            // }
        }
}

export const addPack = (name:string): AppThunk => async (dispatch) => {
    //dispatch(диспатч на лоадинг)
    try {
        await packsApi.addPack(name)
        dispatch(getPacks())
    }
    catch (err) {
        if (axios.isAxiosError(err) && err.response){
            dispatch(setPacksError(err.response.data.error))
        } else if (axios.isAxiosError(err)) {
            dispatch(setPacksError(err.message))
        }
    } // finally {
    //     //dispatch(диспатч на лоадинг)
    // }
}

export const deletePack = (packId: string): AppThunk =>
    async (dispatch) => {
        //dispatch(диспатч на лоадинг)
        try {
            await packsApi.deletePack(packId);
            dispatch(getPacks());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                dispatch(setPacksError(error.response.data.error));
            } else if (axios.isAxiosError(error)) {
                dispatch(setPacksError(error.message));
            }
        } // finally {
        //     //dispatch(диспатч на лоадинг)
        // }
    }

export const updatePack = (packId: string, name: string): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        //dispatch(диспатч на лоадинг)
        try {
            await packsApi.updatePack(packId, name);
            dispatch(getPacks());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                dispatch(setPacksError(error.response.data.error));
            } else if (axios.isAxiosError(error)) {
                dispatch(setPacksError(error.message));
            }
        } // finally {
        //     //dispatch(диспатч на лоадинг)
        // }
    }

type PackActionsType = ReturnType<typeof setPacksData>
    | ReturnType<typeof clearPacksData>
    | ReturnType<typeof setPacksError>
    | ReturnType<typeof setPacksSortData>