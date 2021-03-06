import { useAppSelector } from "../../redux/store";
//@ts-ignore
import s from "./Cards.module.scss";
import Subtitle from "../common/Subtitle/Subtitle";
//@ts-ignore
import img1 from "../../images/ArrowBtn.svg";
// import { Paginator } from "../Paginator/Paginator";
import { CardType, editCardTC, fetchCardsTC } from "../../reducers/cards";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { Modal } from "../common/Modal/Modal";
import { SearchField } from "../SearchField/SearchField";
import { UpdateCardDataType } from "../../api/cards-api";
import { ModalWithTwoInput } from "../common/Modal/ModalChildrens/ModalWithTwoInput";

export const Cards = () => {
  const cards = useAppSelector<Array<CardType>>((state) => state.cards.cards);

  const [cardId, setCardId] = useState<string | null>(null);
  const [packId, setPackId] = useState<string | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const [editModalActive, setEditModalActive] = useState(false);
  const [question, setQuestion] = useState<string>("");
  const [searchValue, setSearchValue] = useState("");
  const [answer, setAnswer] = useState<string>("");

  const { cardsPack_id } = useParams<{ cardsPack_id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCardsTC(cardsPack_id || ""));
  }, [dispatch, cardsPack_id]);

  const addCardHandler = () => {
    setModalActive(true);
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

  const onPrevPage = () => {
    navigate("/");
  };
  const cardsElems = cards.map((card) => {
    return (
      <tr className={s.tr} key={card._id}>
        <td className={s.td}>{card.question}</td>
        <td className={s.td}>{card.answer}</td>
        <td className={s.td}>{card.updated}</td>
        <td className={s.td}>{card.grade}</td>
      </tr>
    );
  });
  return (
    <>
      <div className={s.cardsList}>
        <div className={s.titleBox}>
          <button className={s.rowBtn} onClick={onPrevPage}>
            <img className={s.arrowImg} src={img1}></img>
          </button>

          <Subtitle style={{ margin: "0" }} subtitle="Packs Name" />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ width: "750px" }}>
            <SearchField
              searchValue={searchValue}
              setSearchValue={onChangeSearchValue}
            />
          </div>

          <SuperButton onClick={addCardHandler} style={{ width: "184px" }}>
            Add new card
          </SuperButton>
        </div>

        <div className={s.tableCards}>
          <table className={s.table}>
            <thead className={s.tableHeader}>
              <tr className={s.tr}>
                <th className={s.th}>Question</th>
                <th className={s.th} style={{ textAlign: "center" }}>
                  Answer
                </th>
                <th className={s.th} style={{ textAlign: "center" }}>
                  Last Updated
                </th>
                <th className={s.th} style={{ textAlign: "center" }}>
                  Grade
                </th>
              </tr>
            </thead>

            <tbody>
              {cards.length > 1 ? (
                cardsElems
              ) : (
                <p className={s.centerText}>
                  {" "}
                  This pack is empty. Click add new card to fill this pack
                </p>
              )}
            </tbody>
          </table>
        </div>

        <div className={s.SelectWrap}>
          {/* paginator */}

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span> Show </span>
            <select style={s.SelectBox}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>Cards per Page</span>
          </div>
        </div>

        <Modal active={modalActive} setActive={setModalActive}>
          {cardsPack_id ? (
            <ModalWithTwoInput
              question={question}
              answer={answer}
              setModalActive={setEditModalActive}
              action={editPackRequestHandler}
            />
          ) : (
            ""
          )}
        </Modal>
      </div>
    </>
  );
};
