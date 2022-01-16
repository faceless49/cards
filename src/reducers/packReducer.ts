import {GetPacksRequestType} from "../api/packs-api";

export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: Date
    updated: Date
    more_id: string
    __v: number
}
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

type PackActionsType = ReturnType<typeof setPacksData>
    | ReturnType<typeof clearPacksData>
    | ReturnType<typeof setPacksError>
    | ReturnType<typeof setPacksSortData>