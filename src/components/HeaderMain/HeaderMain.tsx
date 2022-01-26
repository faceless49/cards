//@ts-ignore
import s from './HeaderMain.module.scss';
import HeaderBtn from './HeaderBtn/HeaderBtn';
// import Title from '../common/Title/Title';
//@ts-ignore
import imgPackList from "../../images/imgPackList.svg";
//@ts-ignore
import imgProfile from "../../images/imgProfile.svg";



export default function HeaderMain() {

    return (
        <div className={s.headerMain}>
            <div className="container">
                <div className={s.wrapper}>
                    
                <h1 className={s.title}>It-incubator</h1>
                    
                    <div className={s.btnWrap}>
                        <HeaderBtn name="Pack list" img={imgPackList}  alt="img-PackList"/>
                        <HeaderBtn name="Profile" img={imgProfile}  alt="img-Profile"/>
                    </div>
                </div>
            </div>
        </div>
    );
}