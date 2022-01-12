import { SuperInputText } from "../common/SuperInputText/SuperInputText";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../reducers/restore";
import {AppRootStateType, useAppSelector} from '../../redux/store';
import {Route} from 'react-router-dom';

export const Forgot = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();

  const emailSuccess = useAppSelector<boolean>(state => state.restore.restoreEmailSendSuccess)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setEmail(e.currentTarget.value);
  };
  const onClickHandler = () => {
    dispatch(forgotPassword(email));
  };

  if (emailSuccess) {
    return <Route element={'check-email'}/>
  }

  return (
    <div>
      <h2>It-incubator</h2>
      <h3>Forgot your password?</h3>
      <SuperInputText onChange={onChangeHandler}/>
      <SuperButton onClick={onClickHandler}>Send Instructions</SuperButton>
      <div>
        <span>Did you remember your password</span>
      </div>
    </div>
  );
};
