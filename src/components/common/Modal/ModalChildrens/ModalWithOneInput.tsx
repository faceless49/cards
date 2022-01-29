import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";

export const ModalWithOneInput = (props: ModalWithOneInputPropsType) => {
  const [packValue, setPackValue] = useState("");
  const dispatch = useDispatch();

  const sendAddPack = () => {
    dispatch(props.action(packValue));
    props.setModalActive(false);
    setPackValue("");
  };

  return (
    <div>
      <h2>Add new pack</h2>
      <fieldset>
        <legend>Name pack</legend>
        <input
          type="text"
          value={packValue}
          onChange={(e) => setPackValue(e.currentTarget.value)}
        />
      </fieldset>
      <div>
        <button onClick={() => props.setModalActive(false)}>Cancel</button>
        <button onClick={sendAddPack}>Save</button>
      </div>
    </div>
  );
};

type ModalWithOneInputPropsType = {
  action: Function;
  setModalActive: Dispatch<SetStateAction<boolean>>;
};
