// @ts-ignore
import s from "../../styles/common/AuthStyles.module.scss";
// @ts-ignore
import style from "./NewPassword.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { setNewPassword } from "../../reducers/restore";
import { SuperInputText } from "../common/SuperInputText/SuperInputText";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { useAppSelector } from "../../redux/store";
import Title from "../common/Title/Title";
import Subtitle from "../common/Subtitle/Subtitle";

export const NewPassword = () => {
  const { token } = useParams<{ token: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");

  const changePasswordSuccess = useAppSelector(
    (state) => state.restore.newPassword
  );
  const onChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const submitNewPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (token) {
      dispatch(setNewPassword(password, token));
    }
  };

  useEffect(() => {
    if (changePasswordSuccess) {
      navigate("/approve");
    }
  }, [changePasswordSuccess]);
  return (
    <div className={s.AuthShape}>
      <Title />
      <Subtitle subtitle="Create new password" />
      <form className={style.FormBox}>
        <SuperInputText
          style={{ width: "100%", marginBottom: "30px" }}
          value={password}
          onChange={onChangeNewPassword}
          type={"password"}
          placeholder={"New password"}
        />

        <p
          className={style.textLight}
          style={{ textAlign: "left", marginBottom: "90px" }}
        >
          Create new password and we will send you further instructions to email
        </p>
        <div>
          <SuperButton
            style={{ marginBottom: "45px" }}
            onClick={submitNewPassword}
          >
            Create new password
          </SuperButton>
        </div>
      </form>
    </div>
  );
};
