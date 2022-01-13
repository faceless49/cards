import React, { ChangeEvent, useEffect, useState } from "react";
import "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { SuperInputText } from "../common/SuperInputText/SuperInputText";
import { loginTC } from "../../reducers/loginReducer";
import { AppRootStateType } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { SuperCheckbox } from "../common/SuperCheckbox/SuperCheckbox";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.login.isLoggedIn
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn]);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onChangeRememberMe = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("remember me");
    /*setChecked(e.currentTarget.value);*/ //  todo checkbox RememberMe create
  };

  const onClickLogin = () => {
    const data = {
      email: username,
      password: password,
      rememberMe: true,
    };
    dispatch(loginTC(data));
  };

  const onClickForgotPassword = () => {
    return navigate("/restore");
  };

  const onClickSignUp = () => {
    return navigate("/registration");
  };

  return (
    <div className="login-wrapper">
      <h1>It-Incubator</h1>

      <h2>Sign In</h2>

      <div>
        <p>Username</p>
        <SuperInputText value={username} onChange={onChangeUsername} />
        <p>Password</p>
        <SuperInputText
          type={"password"}
          value={password}
          onChange={onChangePassword}
        />
        <p>remember me</p>
        <SuperCheckbox type={"checkbox"} onChange={onChangeRememberMe} />
      </div>

      <div>
        <SuperButton onClick={onClickForgotPassword}>
          {" "}
          Forgot password
        </SuperButton>
      </div>

      <div>
        <SuperButton onClick={onClickLogin}>Login</SuperButton>
      </div>

      <p>Don't have an account?</p>

      <div>
        <SuperButton onClick={onClickSignUp}>Sign Up</SuperButton>
      </div>
    </div>
  );
};
