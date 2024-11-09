

import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/useAppDispatch";
import css from "./ScreenDimming.module.scss";

const ScreenDimming: React.FC = () => {
    const isAction = useAppSelector((state: RootState) => state.screenDimming.isActive);    

    

    return (
        <div className = {`${css.screenDimming} ${ isAction ? css.active  : "" }`}></div>
    )
}

export default ScreenDimming;


