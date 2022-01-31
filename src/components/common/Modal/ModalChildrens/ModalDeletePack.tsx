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

export const ModalDeletePack = (props: ModalWithOneInputPropsType) => {
  const deletePack = () => {
    props.action(props.packId);
    props.setModalActive(false);
  };

  return (
    <div className={s.ModalShape}>
      <div className={s.titleBox}>
        <h2 className={s.modalTile}>Delete Pack</h2>
        <button
          className={s.crossBtn}
          onClick={() => props.setModalActive(false)}
        >
          <img src={crossBtn} alt="" />
        </button>
      </div>

      <div className={s.ModalContent}>
        Do you really want to remove {props.packName} ? All cards will be
        excluded from this course.
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
            onClick={deletePack}
          >
            Delete
          </SuperButton>
        </div>
      </div>
    </div>
  );
};

type ModalWithOneInputPropsType = {
  action: Function;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  packId: string | null;
  packName: string | number | readonly string[] | undefined;
};
