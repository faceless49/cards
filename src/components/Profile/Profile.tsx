//@ts-ignore
import s from '../../styles/common/AuthStyles.module.scss';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
//@ts-ignore
import style from './profile.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {SuperInputText} from "../common/SuperInputText/SuperInputText";
import {updateProfileInfo} from "../../reducers/profile";
import {SuperButton} from "../common/SuperButton/SuperButton";
import {logOut} from "../../reducers/loginReducer";
import {Navigate} from 'react-router-dom';
import Subtitle from '../common/Subtitle/Subtitle';

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

    const onClickLogOutHandler = () => dispatch(logOut())

    const selectAllHandler = (e: ChangeEvent<HTMLInputElement>) => e.currentTarget.select();

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    return (
        <div className={s.AuthShape} style={{paddingTop:"36px"}}>
            <Subtitle subtitle="Personal Information" style={{marginBottom:"15px"}}/>
            <div className={'avatar'}>
                <img src={profileAvatar ? profileAvatar : 'http://s1.iconbird.com/ico/2013/11/504/w128h1281385326502profle.png'} alt={'avatar'}/>
            </div>


            <div className={style.profileInfo}>
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

            <div className={style.btnWrap}>
                <SuperButton style={{background:"#D7D8EF", color:"#21268F"}} onClick={editNameHandler}>Edit</SuperButton>
                <SuperButton onClick={onClickSaveHandler}>Save</SuperButton>
                <SuperButton onClick={onClickLogOutHandler}>Log out</SuperButton>
            </div>




        </div>
    )
}
