import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { setNewPassword } from "../../reducers/restore";
import { SuperInputText } from "../common/SuperInputText/SuperInputText";
import { SuperButton } from "../common/SuperButton/SuperButton";
import { useAppSelector } from "../../redux/store";

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
    <div>
      <form>
        <div>
          <h3>Create new password</h3>
        </div>
        <div>
          <SuperInputText
            value={password}
            onChange={onChangeNewPassword}
            type={"password"}
            placeholder={"New password"}
          />
        </div>
        <p>Create new password and log in with it afterwards</p>
        <div>
          <SuperButton onClick={submitNewPassword}>Create new password</SuperButton>
        </div>
      </form>
    </div>
  );
};
