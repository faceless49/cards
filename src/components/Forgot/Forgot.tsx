import React, { ChangeEvent, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { SuperInputText } from "../common/SuperInputText/SuperInputText";
import { forgotPassword } from "../../reducers/restore";

export const Forgot = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onClickSend = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className="forgot-wrapper">
      <h1>It-Incubator</h1>

      <h2>Forgot Your Password?</h2>

      <div>
        <SuperInputText defaultValue={"Email"} onChange={onChangeEmail} />
      </div>

      <div>
        <SuperButton onClick={onClickSend}> Send Instructions</SuperButton>
      </div>

      <div>Did you remember your password</div>
    </div>
  );
};
