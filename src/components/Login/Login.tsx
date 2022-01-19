import React, { ChangeEvent, useEffect, useState } from "react";
// @ts-ignore
import s from "../../styles/common/AuthStyles.module.scss";
// @ts-ignore
import style from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../redux/store";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { SuperInputText } from "../common/SuperInputText/SuperInputText";
import { loginTC } from "../../reducers/loginReducer";
import { NavLink, useNavigate } from "react-router-dom";
import Title from "../common/Title/Title";
import Subtitle from "../common/Subtitle/Subtitle";
import { SuperCheckbox } from "../common/SuperCheckbox/SuperCheckbox";
// @ts-ignore
import eyeIcon from "../../images/eyeIcon.svg";

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

  const [username, setUsername] = useState<string>("faceless49@ya.ru");
  const [password, setPassword] = useState<string>("Qwerty1234");
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


  return (
    <div className={s.AuthShape} style={{ paddingTop: "30px" }}>
      <Title />
      <Subtitle subtitle="Sign in" />
      <div>{error}</div>
      {status === "loading" && <span>{status}</span>}
      <form className={style.FormBox}>
        <div
          className={s.formWrap}
          style={{ textAlign: "left", marginBottom: "38px" }}
        >
          <label className={s.InputLabel}>Email</label>
          <SuperInputText
            style={{ width: "100%", marginBottom: "24px" }}
            value={username}
            disabled={disabled}
            placeholder="j&johnson@gmail.com"
            onChange={onChangeUsername}
          />
          <label className={s.InputLabel}>Password</label>
          <SuperInputText
            style={{ width: "100%", marginBottom: "5px" }}
            type={eye}
            value={password}
            disabled={disabled}
            placeholder="*********"
            onChange={onChangePassword}
          />

          <div className={style.psRelative}>
            <button className={style.EyeButton} onClick={openEye}>
              <img src={eyeIcon} />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <SuperCheckbox onChange={rememberMeHandler}>
              Remember me
            </SuperCheckbox>
            <NavLink
              className={s.LinkBasic}
              to={"/restore"}
              style={{ marginLeft: "0" }}
            >
              Forgot Password
            </NavLink>
          </div>
        </div>

        <SuperButton
          onClick={onClickLogin}
          style={{ marginTop: "65px", marginBottom: "30px" }}
          disabled={disabled}
        >
          Login
        </SuperButton>

        <div className={style.linkWrap}>
          <span className={style.textLight} style={{ marginBottom: "10px" }}>
            Don't have an account?
          </span>
          <NavLink className={s.LinkActive} to={"/registration"}>
            Sign Up
          </NavLink>
        </div>
      </form>
    </div>
  );
});
