import React, { ChangeEvent } from "react";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { SuperInputText } from "../common/SuperInputText/SuperInputText";
//@ts-ignore
import s from "../../styles/common/AuthStyles.module.scss";
//@ts-ignore
import style from "./Register.module.scss";
import Subtitle from "../common/Subtitle/Subtitle";
import Title from "../common/Title/Title";

export type RegistrationTypeProps = {
  onClickHandler: () => void;
  onChangeEmail: (value: string) => void;
  onChangeReplayPassword: (value: string) => void;
  onChangePassword: (value: string) => void;
  email: string;
  password: string;
  emailError: null | string;
  passwordError: null | string;
  onClickCancel: () => void;
  errorRequestValue: null | string;
  replayPassword: string;
};

export const Registration: React.FC<RegistrationTypeProps> = ({
  onClickHandler,
  onChangeEmail,
  onChangePassword,
  email,
  password,
  emailError,
  passwordError,
  onClickCancel,
  errorRequestValue,
  replayPassword,
  onChangeReplayPassword,
}) => {
  const onChangeEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeEmail(e.currentTarget.value);
  };

  const onChangePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
    onChangePassword(e.currentTarget.value);
  };

  const onChangeReplayPasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeReplayPassword(e.currentTarget.value);
  };

  return (
    <div className={s.AuthShape}>
      <Title />
      <Subtitle subtitle="Sign up" />
      <form className={style.FormBox}>
        <div className={style.InputBox} style={{ textAlign: "left" }}>
          <div style={{ color: "red" }}>{errorRequestValue}</div>

          <label className={s.InputLabel}>Email</label>
          <SuperInputText
            style={{ width: "100%", marginBottom: "24px" }}
            type={"email"}
            value={email}
            placeholder="j&johnson@gmail.com"
            onChange={onChangeEmailValue}
          />
          <div style={{ color: "red" }}>{emailError}</div>

          <label className={s.InputLabel}>Password</label>
          <SuperInputText
            style={{ width: "100%", marginBottom: "24px" }}
            type={"password"}
            value={password}
            placeholder="*********"
            onChange={onChangePasswordValue}
          />
          <div style={{ color: "red" }}>{passwordError}</div>

          <label className={s.InputLabel}>Confirm password</label>
          <SuperInputText
            style={{ width: "100%" }}
            type={"password"}
            value={replayPassword}
            placeholder="*********"
            onChange={onChangeReplayPasswordValue}
          />
        </div>

        <div className={style.btnWrap}>
          <SuperButton className={style.btnLight} onClick={onClickCancel}>
            Cancel
          </SuperButton>
          <SuperButton className={style.btnRight} onClick={onClickHandler}>
            Register
          </SuperButton>
        </div>
      </form>
    </div>
  );
};
