import React, { ChangeEvent, useEffect, useState } from "react";
import "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { SuperInputText } from "../common/SuperInputText/SuperInputText";
import { loginTC } from "../../reducers/loginReducer";
import { AppRootStateType } from "../../redux/store";
import { useNavigate } from "react-router-dom";

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

  /* const storeUsername = useSelector<AppRootStateType, string>(state => state.login.username)
     const storePassword = useSelector<AppRootStateType, string>(state => state.login.password)*/

  /*    const [value, setValue] = useState<boolean>(storeIsLoggedIn)*/
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onClickForgotPassword = () => {
    //todo create redirects
    return navigate("/restore");
  };
  const onClickSignUp = () => {
    // todo create redirects
    return navigate("/registration");
  };

  const onClickLogin = () => {
    const data = {
      email: username,
      password: password,
      rememberMe: true, //  todo checkbox RememberMe create
    };
    dispatch(loginTC(data));
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
