import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import {
  AddCardDataType,
  RequestUpdateCardType,
  UpdateCardDataType,
} from "../../../../api/cards-api";
import { addCardTC } from "../../../../reducers/cards";
//@ts-ignore
import s from '../../../../styles/common/AuthStyles.module.scss';
//@ts-ignore
import style from '../../Modal/Modal.module.scss';
import Subtitle from "../../Subtitle/Subtitle";
import { SuperInputText } from "../../SuperInputText/SuperInputText";
import { SuperButton } from "../../SuperButton/SuperButton";

export const ModalWithTwoInput = (props: ModalWithTwoInputs) => {
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
    <div className={s.AuthShape} style={{paddingTop:"35px", width:"466px"}}>
      <Subtitle subtitle="Card info" style={{marginBottom:"30px"}}/>

      <fieldset className={style.formBox}>
      <legend className={style.InputLegend}>Question</legend>
        <SuperInputText style={{ width: "100%"}}
          type="text"
          value={questionValue === null ? question : questionValue}
          onChange={(e) => setQuestionValue(e.currentTarget.value)}
        />
        <a className={style.formLink} href="/">+ Attach file</a>
      </fieldset>

      <fieldset className={style.formBox} style={{marginBottom:"0"}}>
      <legend className={style.InputLegend}>Answer</legend>
        <SuperInputText style={{ width: "100%"}}
          type="text"
          value={answerValue === null ? answer : answerValue}
          onChange={(e) => setAnswerValue(e.currentTarget.value)}
        />
        <a className={style.formLink} style={{marginBottom:"10px"}} href="/">+ Attach file</a>
      </fieldset>

      <div className={style.btnWrap} style={{marginTop:"80px"}}>
        <SuperButton className={style.btnLight} onClick={() => setModalActive(false)}>Cancel</SuperButton>
        <SuperButton className={style.btnRight} onClick={onEditCard}>Save</SuperButton>
      </div>
    </div>
  );
};

type ModalWithTwoInputs = {
  setModalActive: Dispatch<SetStateAction<boolean>>;
  action: any;
  question: string;
  answer: string;
};
