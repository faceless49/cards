import React, {ChangeEvent, useState} from 'react'
import './login.module.css';
import {useDispatch} from "react-redux";
import {SuperButton} from "../common/SuperButton/SuperButton";
import {SuperInputText} from "../common/SuperInputText/SuperInputText";
import {loginTC} from "../../reducers/loginReducer";

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

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onClickSignUp = () => {
    return console.log("redirect");
  };


    const onClickLogin = () => {
        const data = {
            email: username,
            password: password,
            rememberMe: true, //  todo checkbox create
        }
        dispatch(loginTC(data))
    }
  const onClickForgotPassword = () => {
    return navigate("/restore");
  };

  const onClickSignUp = () => {
    return navigate("/registration");
  };

    return (

    <div className={s.loginWrapper}>

        <Title/>
        <Subtitle subtitle="Sign in"/>

            <div className={s.formBox} style={{ textAlign: "left", marginBottom: "38px" }}>
                <p className={s.span}>Email</p>
                <SuperInputText value={username} onChange={onChangeUsername} />
                <p className={s.span}>Password</p>
                <SuperInputText type={'password'} value={password} onChange={onChangePassword} />
            </div>


                <SuperButton onClick={onClickForgotPassword}>
                    {" "}
                    Forgot password
                </SuperButton>


            {/* <Navlink className={s.linkTransparent} onClick={onClickForgotPassword}>Forgot password</Navlink> */}

            <div>
                <SuperButton onClick={onClickLogin} style={{ marginTop: '92px' }}>Login</SuperButton>
            </div>

            <span>Don't have an account?</span>

            <div>
                <SuperButton onClick={onClickSignUp}>Sign Up</SuperButton>
            </div>

        </div>)
}

