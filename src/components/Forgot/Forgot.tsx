import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { SuperInputText } from "../common/SuperInputText/SuperInputText";
import { forgotPassword } from "../../reducers/restore";
import { useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export const Forgot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailSuccess = useAppSelector<boolean>(
    (state) => state.restore.emailSuccess
  );

  useEffect(() => {
    if (emailSuccess) {
      navigate("/approve");
    }
  }, [emailSuccess]);

  const [email, setEmail] = useState<string>("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const submitEmail = (e: MouseEvent<HTMLButtonElement>) => {
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
        <SuperButton onClick={submitEmail}> Send Instructions</SuperButton>
      </div>

      <div>Did you remember your password</div>
    </div>
  );
};
