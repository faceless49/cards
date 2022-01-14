//@ts-ignore
import s from '../../styles/common/AuthStyles.module.scss';
//@ts-ignore
import style from './Register.module.scss';
import React, {ChangeEvent} from "react";
import {SuperButton} from "../common/SuperButton/SuperButton";
import {SuperInputText} from "../common/SuperInputText/SuperInputText";
import Subtitle from '../common/Subtitle/Subtitle';
import Title from '../common/Title/Title';




export type RegistrationTypeProps = {
    onClickHandler: () => void
    onChangeEmail: (value: string) => void
    onChangeReplayPassword: (value: string) => void
    onChangePassword: (value: string) => void
    email: string
    password: string
    emailError: null | string
    passwordError: null | string
    onClickCancel: () => void
    errorRequestValue: null | string
    replayPassword: string
}

export const Registration: React.FC<RegistrationTypeProps> =
    ({
         onClickHandler,
         onChangeEmail, onChangePassword, email, password,
         emailError, passwordError,
         onClickCancel, errorRequestValue,
         replayPassword,
         onChangeReplayPassword
     }) => {

        const onChangeEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
            onChangeEmail(e.currentTarget.value)
        }


        const onChangePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
            onChangePassword(e.currentTarget.value)
        }

        const onChangeReplayPasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
            onChangeReplayPassword(e.currentTarget.value)
        }

        return (
            <div className={s.AuthShape}>

                <Title/>
                <Subtitle subtitle="Sign up" />
                <div style={{textAlign:"left"}}>
                    <div style={{color: 'red'}}>
                        {errorRequestValue}
                    </div>
                    <p>Email</p>
                    <SuperInputText style={{width:"100%"}} type={'email'} value={email} onChange={onChangeEmailValue}/>
                    <div style={{color: 'red'}}>{emailError}</div>
                    <p>Password</p>
                    <SuperInputText style={{width:"100%"}} type={'password'} value={password} onChange={onChangePasswordValue}/>
                    <div style={{color: 'red'}}>{passwordError}</div>
                    <p>Confirm password</p>
                    <SuperInputText style={{width:"100%"}} type={'password'} value={replayPassword} onChange={onChangeReplayPasswordValue}/>

                </div>

                <div className={style.btnWrap}> 
                <SuperButton className={style.btnLeft} onClick={onClickCancel}>Cancel</SuperButton>
                <SuperButton className={style.btnRight} onClick={onClickHandler}>Register</SuperButton>
                </div>

            </div>

        )

    }
