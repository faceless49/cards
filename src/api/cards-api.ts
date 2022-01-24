import { instance } from "./index";
import { CardType } from "../reducers/cards";

type CardsResponseType = {
  cards: Array<CardType>;
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};

export const cardsApi = {
  requestCards(cardsPack_id: string, optionals?: string) {
    let queryString = `cards/card?cardsPack_id=${cardsPack_id}`;
    if (optionals) {
      queryString = queryString.concat(optionals);
    }
    return instance.get<CardsResponseType>(queryString);
  },
};
