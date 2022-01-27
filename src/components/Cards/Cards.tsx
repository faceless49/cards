import { useAppSelector } from "../../redux/store";
import {
  addCardTC,
  CardType,
  editCardTC,
  fetchCardsTC,
} from "../../reducers/cards";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { Modal } from "../common/Modal/Modal";
import { SearchField } from "../SearchField/SearchField";
import { ModalAddCard } from "../common/Modal/ModalChildrens/ModalAddCard";
import { AddCardDataType, UpdateCardDataType } from "../../api/cards-api";
import { ModalEditCard } from "../common/Modal/ModalChildrens/ModalEditCard";

export const Cards = () => {
  const cards = useAppSelector<Array<CardType>>((state) => state.cards.cards);
  const isInitialize = useAppSelector<boolean>(
    (state) => state.login.isLoggedIn
  );

  const [cardId, setCardId] = useState<string | null>(null);
  const [packId, setPackId] = useState<string | null>(null);

  const [modalActive, setModalActive] = useState(false);
  const [editModalActive, setEditModalActive] = useState(false);

  const [question, setQuestion] = useState<string>("");
  const [searchValue, setSearchValue] = useState("");
  const [answer, setAnswer] = useState<string>("");

  const { cardsPack_id } = useParams<{ cardsPack_id: string }>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCardsTC(cardsPack_id as string));
  }, [dispatch, cardsPack_id]);

  const addCardHandler = () => {
    setModalActive(true);
    if (cardsPack_id) {
      const card: AddCardDataType = {
        cardsPack_id,
        question: "Hello",
        answer: "World",
      };
      dispatch(addCardTC({ card }));
    }
  };

  const editPackRequestHandler = (question: string, answer: string) => {
    if (cardId) {
      let card: UpdateCardDataType = {
        _id: cardId,
        question,
        answer,
      };
      packId && dispatch(editCardTC({ card }, packId));
    }
  };

  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const cardsElems = cards.map((card) => {
    return (
      <tr key={card._id}>
        <td>{card.question}</td>
        <td>{card.answer}</td>
        <td>{card.updated}</td>
        <td>{card.grade}</td>
      </tr>
    );
  });
  return (
    <div>
      <SearchField
        searchValue={searchValue}
        setSearchValue={onChangeSearchValue}
      />
      <SuperButton onClick={addCardHandler} style={{ width: "184px" }}>
        Add new pack
      </SuperButton>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Updated</th>
            <th>Grade </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.length > 1
            ? cardsElems
            : "This pack is empty. Click add new card to fill this pack"}
        </tbody>
      </table>
      <Modal active={modalActive} setActive={setModalActive}>
        {cardsPack_id ? (
          <ModalAddCard
            cardsPack_id={cardsPack_id}
            setModalActive={setEditModalActive}
          />
        ) : (
          ""
        )}
      </Modal>
      <Modal active={modalActive} setActive={setModalActive}>
        {cardsPack_id ? (
          <ModalEditCard
            cardsPack_id={cardsPack_id}
            setModalActive={setModalActive}
            action={editPackRequestHandler}
          />
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};
