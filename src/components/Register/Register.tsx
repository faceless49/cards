import React, {useState} from "react";
import {SuperButton} from "../common/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {registerTC} from "../../reducers/auth";

export type RegisterTypeProps = {}

export const Register: React.FC = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const onClickRegister = () => {
        const data = {
            email: email,
            password: password,
        }
        dispatch(registerTC(data))
    }
    return (
   <div>
       <SuperButton onClick={onClickRegister}>Login</SuperButton>
   </div>
    )

}
