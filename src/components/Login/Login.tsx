import React, { ChangeEvent, useEffect, useState } from "react";
// @ts-ignore
import s from '../../styles/common/AuthStyles.module.scss';
// @ts-ignore
import style from './Login.module.scss';
import { NavLink, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../redux/store";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { SuperInputText } from "../common/SuperInputText/SuperInputText";
import { loginTC, setIsLoggedInAC } from "../../reducers/loginReducer";
import { useNavigate } from "react-router-dom";
import Title from "../common/Title/Title";
import Subtitle from "../common/Subtitle/Subtitle";

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

  const onClickLogin = () => {
    const data = {
      email: username,
      password: password,
      rememberMe: true, //  todo checkbox create
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
    <div className={s.AuthShape}>
      <Title />
      <Subtitle subtitle="Sign in" />

      <div className={s.formBox} style={{ textAlign: "left", marginBottom: "38px" }}>
        <label className={s.InputLabel}>Email</label>
        <SuperInputText style={{width:"100%"}} value={username} placeholder="j&johnson@gmail.com" onChange={onChangeUsername} />
        <label className={s.InputLabel}>Password</label>
        <SuperInputText style={{width:"100%"}}
          type={"password"}
          value={password}
          placeholder="*********"
          onChange={onChangePassword}
        />
      </div>

      {/* <SuperButton onClick={onClickForgotPassword}>
        {" "}
        Forgot password
      </SuperButton> */}

      <NavLink className={s.LinkBasic} to={"/restore"}>Forgot Password</NavLink>

        <SuperButton onClick={onClickLogin} style={{ marginTop: "92px", marginBottom:"30px"}}>
          Login
        </SuperButton>
      
      <div className={style.linkWrap}>
        <span className={style.textLight} style={{marginBottom:"10px"}}>Don't have an account?</span>
        <NavLink className={s.LinkActive} to={"/registration"}>Sign Up</NavLink>
      </div>

    </div>
  );
};
