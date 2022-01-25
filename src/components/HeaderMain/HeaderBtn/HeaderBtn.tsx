//@ts-ignore
import s from "./HeaderBtn.module.scss"

export default function HeaderBtn(props: any) {

  return (
    
      <button className={s.headerBtn}>
        <img src={props.img} alt="" />
        {props.name}
      </button>
    
  );
}