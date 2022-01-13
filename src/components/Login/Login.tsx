//@ts-ignore
import s from "./Login.module.scss";
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../redux/store";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { SuperInputText } from "../common/SuperInputText/SuperInputText";
import { loginTC, setIsLoggedInAC } from "../../reducers/loginReducer";
import Title from "../common/Title/Title";
import Subtitle from "../common/Subtitle/Subtitle";

export const Login = () => {
    const dispatch = useDispatch();

    /*const storeIsLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)*/
    /* const storeUsername = useSelector<AppRootStateType, string>(state => state.login.username)
    const storePassword = useSelector<AppRootStateType, string>(state => state.login.password)*/


    /*    const [value, setValue] = useState<boolean>(storeIsLoggedIn)*/
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    const onChangeUsername =
        (e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.currentTarget.value)
        }

    const onChangePassword =
        (e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.currentTarget.value)
        }

    const onClickForgotPassword = () => {
        return console.log('redirect')
    }
    const onClickSignUp = () => {
        return console.log('redirect')
    }

    const onClickLogin = () => {
        const data = {
            email: username,
            password: password,
            rememberMe: true, //  todo checkbox create
        }
        dispatch(loginTC(data))
    }

    return (

        <div className={s.loginWrapper}>

            <Title />
            <Subtitle subtitle="Sign in" />

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

