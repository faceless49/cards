import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
//@ts-ignore
import s from "../../../../styles/common/ModalStyles.module.scss";
//@ts-ignore
import crossBtn from "../../../../images/cross.svg";
import { SuperInputText } from "../../SuperInputText/SuperInputText";
import { SuperButton } from "../../SuperButton/SuperButton";
//@ts-ignore
import style from "../../Modal/Modal.module.scss";

export const ModalWithOneInput = (props: ModalWithOneInputPropsType) => {
  const [packValue, setPackValue] = useState("");
  const dispatch = useDispatch();

  const sendAddPack = () => {
    dispatch(props.action(packValue));
    props.setModalActive(false);
    setPackValue("");
  };

  return (
    <div className={s.ModalShape}>
      <div className={s.titleBox}>
        <h2 className={s.modalTile}>Add new pack</h2>
        <button
          className={s.crossBtn}
          onClick={() => props.setModalActive(false)}
        >
          <img src={crossBtn} alt="" />
        </button>
      </div>

      <div className={s.ModalContent}>
        <fieldset className={style.formInner}>
          <legend className={style.InputLegend}>Name pack</legend>
          <SuperInputText
            style={{ width: "100%" }}
            type="text"
            value={packValue}
            onChange={(e) => setPackValue(e.currentTarget.value)}
            placeholder="Name Pack"
          />
        </fieldset>

        <div className={style.btnBox}>
          <SuperButton
            className={style.btnLight}
            style={{ width: "124px" }}
            onClick={() => props.setModalActive(false)}
          >
            Cancel
          </SuperButton>
          <SuperButton
            className={style.btnRight}
            style={{ width: "127px" }}
            onClick={sendAddPack}
          >
            Save
          </SuperButton>
        </div>
      </div>
    </div>
  );
};

type ModalWithOneInputPropsType = {
  action: Function;
  setModalActive: Dispatch<SetStateAction<boolean>>;
};
