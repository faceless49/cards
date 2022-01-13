//@ts-ignore
import s from "./Subtitle.module.scss";

interface SubtitleProps {
    subtitle: string
}

//Заголовок

export default function Subtitle(props: SubtitleProps) {

    return (
        <div className={s.subtitleWrap}>
            <h3 className={s.subtitle}>{props.subtitle}</h3>    
        </div>
    )

}