//@ts-ignore
import s from "./Subtitle.module.scss";
import { CSSProperties } from "react";

interface SubtitleProps {
    subtitle: string
    style?: CSSProperties | undefined
}

//Заголовок

export default function Subtitle(props: SubtitleProps) {

    return (
            <h3 className={s.subtitle} style={props.style}>{props.subtitle}</h3>    
    )

}