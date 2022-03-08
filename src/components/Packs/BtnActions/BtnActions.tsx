//@ts-ignore
import s from "./BtnActions.module.scss";

type BtnActionsPropsType = {
  onClick: () => void;
  style: any;
  name: string;
  key?: string;
};
export default function BtnActions(props: BtnActionsPropsType) {
  return (
    <button
      className={s.btn}
      style={props.style}
      key={props.key}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}
