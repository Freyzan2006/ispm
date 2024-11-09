
import { MdOutlineAnimation } from "react-icons/md";
import css from "./AnimationBtn.module.scss";
import { EAlertType } from "../../../store/slices/alertSlice/alertSlice";
import useAlert from "../../../hooks/useAlert";
import useAnimation from "../../../hooks/useAnimation";

const AnimationBtn: React.FC = () => {



	const [ animation, setAnimation ] = useAnimation()
	const showAlert = useAlert();

	function handlerAnimationBg() {
		setAnimation();
		showAlert("Анимация успешна изменена", EAlertType.SUCCESSFUL);
    }

    return (
        <>
		<div className= { `${css.toggle} ${css.toggle__push}  ${css.toggle__push__glow}` } >
			<input type="checkbox" id= { `${css.toggle__push__glow}` } className= { `${css.toggle__checkbox}` } 
				checked = { animation || false } 
				onChange={ handlerAnimationBg }
			/>
			<label className= { `${css.toggle__btn}` } htmlFor= { `${css.toggle__push__glow}` } data-label-on="on"  data-label-off="off">
				<MdOutlineAnimation />
			</label>
		</div>

        </>
    )
}

export default AnimationBtn;