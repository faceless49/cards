import { Dispatch } from "redux";
import {
  AddCardDataType,
  cardsApi,
  RequestUpdateCardType,
} from "../api/cards-api";
import { AppRootStateType } from "../redux/store";
import { ThunkAction } from "redux-thunk";

export type CardType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  rating: number;
  shots: number;
  type: string;
  user_id: string;
  created: string;
  updated: string;
  __v: number;
  _id: string;
};
type QueryParamsType = {
  [key: string]: string;
};

type InitStateType = typeof initState;

const initState = {
  cards: [] as Array<CardType>,
  queryParams: {
    cardAnswer: "",
    cardQuestion: "",
    min: "",
    max: "",
    sortCards: "",
    page: "",
    pageCount: "",
  } as QueryParamsType,
  cardsTotalCount: 0 as number,
  maxGrade: 0 as number,
  minGrade: 0 as number,
  page: 1 as number,
  pageCount: 0 as number,
  currentPage: 1 as number,
  packUserId: null as string | null,
  cardsPack_id: "",
  isInitialize: false,
};
export const cardsReducer = (
  state: InitStateType = initState,
  action: ActionsType
) => {
  switch (action.type) {
    case "cards/FETCH-CARDS":
      return {
        ...state,
        cards: action.cards,
        packUserId: action.packUserId,
        cardsPack_id: action.cardsPack_id,
        currentPage: action.currentPage,
        pageCount: action.pageCount,
        cardsTotalCount: action.cardsTotalCount,
      };
    case "cards/SET-PAGES":
      return {
        ...state,
        page: action.page,
      };
    case "cards/SET-INIT":
      return { ...state, isInitialize: true };
    default:
      return state;
  }
};

// action creators

export const setInit = () => {
  return { type: "cards/SET-INIT" } as const;
};

export const fetchCards = (
  cards: Array<CardType>,
  packUserId: string,
  cardsPack_id: string,
  currentPage: number,
  pageCount: number,
  cardsTotalCount: number
) => {
  return {
    type: "cards/FETCH-CARDS",
    cards,
    packUserId,
    cardsPack_id,
    currentPage,
    pageCount,
    cardsTotalCount,
  } as const;
};

export const setPages = (page: number) => {
  return { type: "cards/SET-PAGES", page } as const;
};

export const addCard = (cardsPack_id: string) =>
  ({
    type: "cards/ADD-CARD",
    cardsPack_id,
  } as const);
export const removeCard = (id: string) =>
  ({ type: "cards/REMOVE-CARD", id } as const);

// thunk creators

export const fetchCardsTC =
  (cardsPack_Id: string): ThunkType =>
  async (dispatch, getState: () => AppRootStateType) => {
    try {
      const { queryParams } = getState().cards;

      if (cardsPack_Id !== getState().cards.cardsPack_id) {
        for (const key in queryParams) {
          queryParams[key] = "";
        }
      }

      let optionalString = "";
      for (const key in queryParams) {
        if (queryParams[key] !== "")
          optionalString = optionalString.concat(`&${key}=${queryParams[key]}`);
      }

      const response = await cardsApi.requestCards(
        cardsPack_Id,
        optionalString
      );
      dispatch(
        fetchCards(
          response.data.cards,
          response.data.packUserId,
          cardsPack_Id,
          response.data.page,
          response.data.pageCount,
          response.data.cardsTotalCount
        )
      );
      dispatch(
        setPages(
          response.data.cardsTotalCount % response.data.pageCount !== 0 ||
            response.data.cardsTotalCount === 0
            ? Math.floor(
                response.data.cardsTotalCount / response.data.pageCount + 1
              )
            : response.data.cardsTotalCount / response.data.pageCount
        )
      );
    } catch (e) {
      console.log(e);
    } finally {
      setInit();
    }
  };

export const addCardTC =
  (data: AddCardDataType): ThunkType =>
  async (dispatch) => {
    try {
      await cardsApi.addCard(data);
      dispatch(fetchCardsTC(data.cardsPack_id));
    } catch (e) {
      console.log(e);
    }
  };

export const removeCardTC =
  (id: string, cardsPack_id: string): ThunkType =>
  async (dispatch) => {
    try {
      await cardsApi.removeCard(id);
      dispatch(fetchCardsTC(cardsPack_id));
    } catch (e) {
      console.log(e);
    }
  };

export const editCardTC =
  (data: RequestUpdateCardType, cardsPack_id: string): ThunkType =>
  async (dispatch) => {
    try {
      await cardsApi.updateCard(data);
      dispatch(fetchCardsTC(cardsPack_id));
    } catch (e) {
      console.log(e);
    }
  };

type ActionsType =
  | ReturnType<typeof fetchCards>
  | ReturnType<typeof setPages>
  | ReturnType<typeof addCard>
  | ReturnType<typeof removeCard>
  | ReturnType<typeof setInit>;

type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>;
