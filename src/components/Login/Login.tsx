import React, { ChangeEvent, useEffect, useState } from "react";
// @ts-ignore
import s from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../redux/store";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { SuperInputText } from "../common/SuperInputText/SuperInputText";
import { loginTC } from "../../reducers/loginReducer";
import { NavLink, useNavigate } from "react-router-dom";
import Title from "../common/Title/Title";
import Subtitle from "../common/Subtitle/Subtitle";
import { SuperCheckbox } from "../common/SuperCheckbox/SuperCheckbox";

export const Login = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.login.isLoggedIn
  );
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.login.error
  );
  const status = useSelector<AppRootStateType, string>(
    (state) => state.login.status
  );

  const disabled = status === "loading";

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [eye, setEye] = useState<string>("password");

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const openEye = () => {
    setEye(eye === "password" ? "text" : "password");
  };
  const rememberMeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
  };

  const onClickLogin = () => {
    const data = {
      email: username,
      password: password,
      rememberMe: checked,
    };
    dispatch(loginTC(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn]);

  const onClickSignUp = () => {
    return navigate("/registration");
  };

  return (
    <div className={s.loginWrapper}>
      <Title />
      <Subtitle subtitle="Sign in" />
      <div
        className={s.formBox}
        style={{ textAlign: "left", marginBottom: "38px" }}
      >
        {status === "loading" && <span>{status}</span>}
        {error && <span>{error}</span>}
        <p className={s.span}>Email</p>
        <SuperInputText
          value={username}
          disabled={disabled}
          onChange={onChangeUsername}
        />
        <p className={s.span}>Password</p>
        <SuperInputText
          disabled={disabled}
          type={eye}
          value={password}
          onChange={onChangePassword}
        />
      </div>
      {/*//todo eye icon here*/}
      <SuperButton onClick={openEye}> eye icon </SuperButton>
      <SuperCheckbox onChange={rememberMeHandler}>
        {" "}
        Remember me
      </SuperCheckbox>{" "}
      <NavLink to={"/restore"} className={s.linkTransparent}>
        Forgot password
      </NavLink>
      <div>
        <SuperButton onClick={onClickLogin} style={{ marginTop: "92px" }}>
          Login
        </SuperButton>
      </div>
      <span>Don't have an account?</span>
      <div>
        <SuperButton onClick={onClickSignUp}>Sign Up</SuperButton>
      </div>
    </div>
  );
});
