import {instance} from "./index";
import {AxiosResponse} from "axios";

export const packsApi = {
    getPacks(data?: GetPacksRequestType) {
        return instance.get<GetPacksRequestType, AxiosResponse<GetPacksResponseType, GetPacksRequestType>, GetPacksRequestType>
        (`cards/pack`, {params: data})
    },
    addPack(name: string) {
        return instance.post<{}, AxiosResponse<{}, AddPackRequestType>, AddPackRequestType>
        (`cards/pack`, {cardsPack: {name}})
    },
    deletePack(packId: string) {
        return instance.delete<{ packId: string }>(`cards/pack`, {params: {id: packId}})
    },
    updatePack(packId: string, name: string) {
        return instance.put<UpdatePackType>(`cards/pack`, {cardsPack: {_id: packId, name}})
    },

}

export type GetPacksRequestType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: '0updated' | '1updated'
    page?: number
    pageCount?: number
    user_id?: string // whose packs
}

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

export type GetPacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type AddPackRequestType = {
    cardsPack: {
        name: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}
export type UpdatePackType = {
    cardsPack: {
        id: string
        name: string
    }
}