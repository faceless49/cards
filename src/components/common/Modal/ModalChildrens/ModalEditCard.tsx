import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import {
  AddCardDataType,
  RequestUpdateCardType,
  UpdateCardDataType,
} from "../../../../api/cards-api";
import { addCardTC } from "../../../../reducers/cards";

export const ModalEditCard = (props: ModalEditCardType) => {
  const [questionValue, setQuestionValue] = useState("");
  const [answerValue, setAnswerValue] = useState("");
  const dispatch = useDispatch();
  const onEditCard = () => {
    if (cardId) {
      const card: RequestUpdateCardType = {
        _id: cardId,
        question: questionValue,
        answer: answerValue,
      };
    }

    dispatch(addCardTC({ card }));
    props.setModalActive(false);
    setQuestionValue("");
    setAnswerValue("");
  };

  return (
    <div>
      <h2>Card info</h2>
      <fieldset>
        <legend>Question</legend>
        <input
          type="text"
          value={questionValue}
          onChange={(e) => setQuestionValue(e.currentTarget.value)}
        />
      </fieldset>
      <fieldset>
        <legend>Answer</legend>
        <input
          type="text"
          value={answerValue}
          onChange={(e) => setAnswerValue(e.currentTarget.value)}
        />
      </fieldset>
      <div>
        <button onClick={() => props.setModalActive(false)}>Cancel</button>
        <button onClick={onEditCard}>Save</button>
      </div>
    </div>
  );
};

type ModalEditCardType = {
  cardsPack_id: string;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  action: any;
};
