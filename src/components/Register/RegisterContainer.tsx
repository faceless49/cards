import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerTC, setEmailError, setPasswordError} from "../../reducers/registration";
import {AppRootStateType} from "../../redux/store";
import {Navigate} from "react-router-dom";
import {Registration} from "./Registration";



export type RegistrationContainerTypeProps = {}

export const RegistrationContainer: React.FC = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [replayPassword, setReplayPassword] = useState<string>('')

    const emailError = useSelector<AppRootStateType, string | null>(state => state.register.emailError)
    const passwordError = useSelector<AppRootStateType, string | null>(state => state.register.passwordError)
    const isRegistration = useSelector<AppRootStateType, boolean>(state => state.register.isRegistration)
    const errorRequestValue = useSelector<AppRootStateType, null | string>(state => state.register.errorRequestValue)

    const onChangeEmail = (value: string) => {
        setEmail(value)
        dispatch(setEmailError(''))
    }
    const onChangePassword = (value: string) => {
        setPassword(value)
        dispatch(setPasswordError(null))
    }
    const onChangeReplayPassword = (value: string) => {
        setReplayPassword(value)
    }
    const onClickCancel = () => {
        console.log('onClickCancel')
    }

    const onClickHandler = () => {
        const data = {
            email: email,
            password: password,
        }
        if (email === '') {
            return dispatch(setEmailError('Required'))
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return dispatch(setEmailError('Invalid email address'))
        }
        if (password.length < 8) {
            return dispatch(setPasswordError('Password should be more than 8 characters'))
        }
        if (!emailError && !passwordError) {
            dispatch(registerTC(data))
        }
    }
    if (isRegistration) {
        return <Navigate to={"/login"}/>
    }
    return (
        <div>

            <Registration onClickHandler={onClickHandler}
                          onClickCancel={onClickCancel}
                          onChangeEmail={onChangeEmail}
                          onChangePassword={onChangePassword}
                          email={email}
                          password={password}
                          emailError={emailError}
                          passwordError={passwordError}
                          errorRequestValue={errorRequestValue}
                          replayPassword={replayPassword}
                          onChangeReplayPassword={onChangeReplayPassword}
            />
        </div>

    )

}
