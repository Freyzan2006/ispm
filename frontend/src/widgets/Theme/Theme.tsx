
import { FaMoon } from "react-icons/fa";
import css from "./Theme.module.scss";
import { useAppDispatch, useAppSelector } from "../../state/useAppDispatch";
import { RootState } from "../../state/store";

import { MdWbSunny } from "react-icons/md";


import React, { useEffect } from "react";


import { changeTheme, initializeTheme } from "../../state/theme/themeSlice";

import { ETheme } from "../../state/theme/ETheme";
import { EAlertType, setShowAlert, setMessageAlert, setTypeAlert } from "../../state/alert/alertSlice";



const Theme: React.FC = () => {
    const dispatch = useAppDispatch();
    const isTheme = useAppSelector((state: RootState) => state.theme.theme);

    

    

    useEffect(() => {
        dispatch(initializeTheme());

        

        const htmlElement = document.documentElement;

        if (isTheme === ETheme.DARK) {
            htmlElement.classList.add(ETheme.DARK);
            htmlElement.classList.remove(ETheme.LIGHT);
        } else {
            htmlElement.classList.remove(ETheme.DARK);
            htmlElement.classList.add(ETheme.LIGHT);
        }
    }, [dispatch, isTheme]);

    const handleThemeChange = () => {
        dispatch(changeTheme())

        
        dispatch(setShowAlert());
        dispatch(setMessageAlert("Тема успешно изменена"));
        dispatch(setTypeAlert(EAlertType.SUCCESSFUL));
    };

    
    

    return (
        <div className = { css.theme }>
            <button onClick={handleThemeChange} className="transition gap-5 hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-cyan-500 shadow-lg shadow-cyan-500/50 flex justify-center items-center text-white">
                {isTheme === ETheme.LIGHT ? <FaMoon /> : <MdWbSunny />}
            </button>
        </div>
    );
};

export default Theme;



// const html = document.documentElement.classList;
// const ThemeBtn = document.getElementById("ThemeBtn");



// document.addEventListener('DOMContentLoaded', () => {
//     html.add(localStorage.getItem("theme") ? localStorage.getItem("theme") : null)
//     localStorage.getItem("theme") ? ThemeBtn.innerHTML = '<i class="fas fa-sun"></i>' : ThemeBtn.innerHTML = '<i class="fas fa-moon"></i>';
// })

// function changeTheme() {
//     if ( html.contains("dark") ) {
//         html.remove("dark")
//         localStorage.removeItem("theme")
//         ThemeBtn.innerHTML = '<i class="fas fa-moon"></i>'
//     } else {
//         html.add("dark")
//         localStorage.setItem("theme", "dark")
//         ThemeBtn.innerHTML = '<i class="fas fa-sun"></i>'
//     }
// };


// ThemeBtn.addEventListener('click', changeTheme);