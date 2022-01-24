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
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className={s.AuthShape} style={{ paddingTop: "30px" }}>
      <Title />
      <Subtitle subtitle="Sign in" />
      <div>{error}</div>
      {status === "loading" && <span>{status}</span>}
      
    <div className={style.FormBox}>
      <div className={s.formWrap} style={{ textAlign: "left", marginBottom: "38px" }}>
        <label className={s.InputLabel}>Email</label>
        <SuperInputText
          style={{width:"100%",marginBottom:"24px"}}
          value={username}
          disabled={disabled}
          placeholder="j&johnson@gmail.com"
          onChange={onChangeUsername} />
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
              {/*<img src={eyeIcon} />*/}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.23997 17 6.99997 14.76 6.99997 12C6.99997 9.24 9.23997 6.99999 12 6.99999C14.76 6.99999 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 8.99997 10.34 8.99997 12C8.99997 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                  fill="#2D2E46"
                />
              </svg>
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
      </div>
    </div>
  );
});
