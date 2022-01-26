//@ts-ignore
import s from './ErrorPage.module.scss';
import React from 'react';
//@ts-ignore
import logo from '../../images/logo.svg';
import { useLocation } from 'react-router-dom';

export const ErrorPage: React.FC = (): JSX.Element => {
    const pathname = useLocation().pathname;

    return (
        <>
            <div className={s.logo404Wrapper}>
                <div className={s.four}>4</div>
                <div className={s.zero}><img className={s.logo} src={logo} alt='logo'/></div> 
                <div className={s.four}>4</div>
            </div>
                    <div className={s.messageWrapper}>
                        <div>Oops, this page</div>
                        <div className={s.pageName}>{pathname}</div>
                        <div> was not found!</div>
                        <div>Either something went wrong or the page doesn't exist anymore.</div>
                    </div>
                    <div className={s.buttonWrapper}>
                        <button className={s.goHomeButton}>Go Home</button>
                    </div>
        </>
    )
}
