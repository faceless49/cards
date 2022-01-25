// @ts-ignore
import s from "./Modal.module.scss";
import { Dispatch, ReactChild, SetStateAction } from "react";

export const Modal = (props: ModalPropsType) => {
  return (
    <div
      className={props.active ? `${s.modal} ${s.active}` : `${s.modal}`}
      onClick={() => {
        props.setActive(false);
      }}
    >
      <div
        className={
          props.active ? `${s.modalContent} ${s.active}` : `${s.modalContent}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
};

// types

type ModalPropsType = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: ReactChild;
};
