// @ts-ignore
import s from '../../styles/common/AuthStyles.module.scss';
// @ts-ignore
import style from './Forgot.module.scss';
import {NavLink, useNavigate} from "react-router-dom";
import React, {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {SuperButton} from "../common/SuperButton/SuperButton";
import {SuperInputText} from "../common/SuperInputText/SuperInputText";
import {forgotPassword} from "../../reducers/restore";
import {useAppSelector} from "../../redux/store";
import Title from "../common/Title/Title";
import Subtitle from "../common/Subtitle/Subtitle";

export const Forgot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailSuccess = useAppSelector<boolean>(
    (state) => state.restore.emailIsSuccess
  );

  useEffect(() => {
    if (emailSuccess) {
      navigate("/approve");
    }
  }, []);

  const [email, setEmail] = useState<string>("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const submitEmail = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className={s.AuthShape} style={{paddingBottom: "30px"}}>
      <Title />
      <Subtitle subtitle="Forgot Your Password?"/>

      <form className={style.FormBox}>
        <SuperInputText placeholder={"Email"} style={{width:"100%"}} onChange={onChangeEmail} />
        
        <p className={style.textLight} style={{textAlign:"left", marginTop:"30px"}}>
            Enter your email address and we will send you further instructions
        </p>

        <SuperButton style={{marginTop:"90px", marginBottom:"30px"}} onClick={submitEmail}>Send Instructions</SuperButton>
      
        <div className={style.linkWrap}>
          <span className={style.textLight} style={{textAlign:"center"}}>Did you remember your password?</span>
          <NavLink className={s.LinkActive} to={"/login"} style={{marginTop:"15px"}}>Try logging in</NavLink>
        </div>
      </form>

    </div>
  );
};
