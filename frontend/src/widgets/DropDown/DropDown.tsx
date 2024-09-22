
import { useState } from "react";
import css from "./DropDown.module.scss";

interface IProps {
    children: React.ReactNode;
    intro: React.ReactNode;
}

import { FaArrowAltCircleUp } from "react-icons/fa";
import Button from "../Button/Button";
import { EButton, ITypeBtn } from "../Button/EButton";

const DropDown: React.FC<IProps> = ({ children, intro , ...props }) => {
    const [ isActive, setIsActive ] = useState<boolean>(false);

    const handlerShowSetting = () => setIsActive(!isActive);

    return (
        <div { ...props } className = { css.DropDown }>

            <button className = {"text-black dark:text-white text-2xl " + css.DropDown__intro} onClick = { handlerShowSetting }>
                { intro }
            </button>
            
            <div className = { `${css.DropDown__content} ${ isActive ? css.active : "" } bg-blue-500 dark:bg-slate-800` }>
                {
                    children
                }
                
                <Button onClick = { handlerShowSetting } type = { ITypeBtn.BUTTON } styled = { EButton.BLUE } >
                    <FaArrowAltCircleUp />
                </Button>
            </div>


        </div>
    )
}

export default DropDown;