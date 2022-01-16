import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {SuperInputText} from "../common/SuperInputText/SuperInputText";
import {updateProfileInfo} from "../../reducers/profile";
import {SuperButton} from "../common/SuperButton/SuperButton";
import {Navigate} from 'react-router-dom'

export const Profile = () => {
    const profileName = useSelector<AppRootStateType, string>(store => store.profile.name);
    const profileEmail = useSelector<AppRootStateType, string>(store => store.profile.email);
    const profileAvatar = useSelector<AppRootStateType, string>(store => store.profile.avatar);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(store => store.login.isLoggedIn);

    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState(profileName);
    const [editName, setEditName] = useState(false)

    const editNameHandler = () => setEditName(true);

    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value.trim());

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditName(false);
            onSubmitName();
        }
    }

    const onSubmitName = () => {
        if (name && (name !== profileName)) {
            dispatch(updateProfileInfo({name}));
        }
        if (name.trim() === '') {
            setName(profileName);
        }
    }

    const onClickSaveHandler = () => {
        setEditName(false);
        onSubmitName()
    }

    const selectAllHandler = (e: ChangeEvent<HTMLInputElement>) => e.currentTarget.select();

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    return (
        <div>
            <h1>Personal Information</h1>
            <div className={'avatar'}>
                <img src={profileAvatar ? profileAvatar : ')'} alt={'avatar'}/>
            </div>
            <div className={'profileInfo'}>
                {
                    editName ?
                        <SuperInputText type={'text'}
                                        value={name}
                                        onChange={changeNameHandler}
                                        onFocus={selectAllHandler}
                                        onKeyPress={onEnterHandler}
                                        autoFocus
                        />
                        :
                        <span>
                            Name : {profileName}
                        </span>
                }
            </div>

            <div className={'profileInfo'}> Email: {profileEmail}</div>

            <SuperButton onClick={editNameHandler}>Edit</SuperButton>
            <SuperButton onClick={onClickSaveHandler}>Save</SuperButton>
        </div>
    )
}
