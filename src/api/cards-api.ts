import { instance } from "./index";
import { CardType } from "../reducers/cards";

export const cardsApi = {
  requestCards(cardsPack_id: string, optionals?: string) {
    let requestString = `cards/card?cardsPack_id=${cardsPack_id}`;
    if (optionals) {
      requestString = requestString.concat(optionals);
    }
    return instance.get<CardsResponseType>(requestString);
  },
  addCard(data: RequestAddCardType) {
    return instance.post(`cards/card`, data);
  },
  removeCard(id: string) {
    return instance.delete(`cards/card/?id=${id}`);
  },
  updateCard(data: RequestUpdateCardType) {
    return instance.put(`cards/card`, data);
  },
};

type CardsResponseType = {
  cards: Array<CardType>;
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};

export type AddCardDataType = {
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  rating?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
  type?: string;
};

export type RequestUpdateCardType = {
  _id: string;
  question?: string;
  comments?: string;
};

export type RequestAddCardType = {
  card: AddCardDataType;
};
