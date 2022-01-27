import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import {
  AddCardDataType,
  RequestUpdateCardType,
  UpdateCardDataType,
} from "../../../../api/cards-api";
import { addCardTC } from "../../../../reducers/cards";

export const ModalEditCard = (props: ModalEditCardType) => {
  const { question, answer, action, setModalActive } = props;

  const [questionValue, setQuestionValue] = useState("");
  const [answerValue, setAnswerValue] = useState("");
  const onEditCard = () => {
    action(questionValue, setQuestionValue);
    setModalActive(false);
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
          value={questionValue === null ? question : questionValue}
          onChange={(e) => setQuestionValue(e.currentTarget.value)}
        />
      </fieldset>
      <fieldset>
        <legend>Answer</legend>
        <input
          type="text"
          value={answerValue === null ? answer : answerValue}
          onChange={(e) => setAnswerValue(e.currentTarget.value)}
        />
      </fieldset>
      <div>
        <button onClick={() => setModalActive(false)}>Cancel</button>
        <button onClick={onEditCard}>Save</button>
      </div>
    </div>
  );
};

type ModalEditCardType = {
  setModalActive: Dispatch<SetStateAction<boolean>>;
  action: any;
  question: string;
  answer: string;
};
