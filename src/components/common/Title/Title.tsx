//@ts-ignore
import s from './Title.module.scss';
import { CSSProperties } from "react";

interface TitleProps {
    style?: CSSProperties | undefined
}

export default function Title(props: TitleProps) {

    return (
        <div className={s.title}>
            <h2 className={s.headline} style={props.style}>It-incubator</h2>
        </div>
    )

}