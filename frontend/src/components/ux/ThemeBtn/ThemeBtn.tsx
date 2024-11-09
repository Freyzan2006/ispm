

import css from "./ThemeBtn.module.scss";



import React from "react";




import { ETheme } from "../../../store/slices/themeSilce/ETheme";
import { EAlertType } from "../../../store/slices/alertSlice/alertSlice";

import useAlert from "../../../hooks/useAlert";
import useTheme from "../../../hooks/useTheme";



const ThemeBtn: React.FC = () => {
    const [ theme, setTheme ] = useTheme();
    const showAlert = useAlert();
    
    const handleThemeChange = () => {
        setTheme();
        showAlert("Тема успешно изменена", EAlertType.SUCCESSFUL);
    };

    return (
        <div className= { `${css.toggle} ${css.toggle__daynight}` }>
            <input checked = { theme === ETheme.LIGHT ? false : true } onChange={handleThemeChange} type="checkbox" id= { `${css.toggle__daynight}` } className= { `${css.toggle__checkbox}` } />
            <label className= { `${css.toggle__btn}` } htmlFor= { `${css.toggle__daynight}` }><span className= { `${css.toggle__feature}` }></span></label>
        </div>
    );
};



export default ThemeBtn;



