
import css from "./Menu.module.scss";

import { FaHome, FaBars, FaSearch, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import { toggleActive } from "../../reduxToolkit/menu/menuSlice";
import { isScreenDimming } from "../../reduxToolkit/screenDimming/screenDimmingSlice";
import { useAppDispatch, useAppSelector } from '../../reduxToolkit/useAppDispatch';
import { RootState } from '../../reduxToolkit/store';
import Theme from "../Theme/Theme";
import MyLink from "../../widgets/MyLink/MyLink";


const Menu: React.FC = () => {
    const dispatch = useAppDispatch();
    const isAction = useAppSelector((state: RootState) => state.menu.isActive);    


    return (
        <div className = { `${css.myMenu} ${isAction ? css.active : ""}  gap-5 pt-2 pb-2 ${isAction ? "bg-blue-600 dark:bg-slate-900" : ""}`}>
            <button onClick = { () => {
                dispatch(toggleActive())
                dispatch(isScreenDimming())
            } } className = {`${css.myMenuBtn} ${css.isScreenDimmingBtn} transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center text-white gap-3`}>
                { isAction ? <RxCross2 /> : <FaBars /> }
            </button>

            <menu className={ `${css.myMenuEl}`}>
                <li><MyLink to = "/"><FaHome /> Главная страница</MyLink></li>
                <li><MyLink to = "/About"><FaCircleQuestion /> Об проекте</MyLink></li>
            </menu>  

            { isAction }
            
            
            <div className={ `${css.myMenuEl}`}>
                
                <Theme />

                <div className = { css.myMenuEl + " gap-5"}>
                    <a href = "{% url 'search' %}" className="transition gap-5 hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-cyan-500 shadow-lg shadow-cyan-500/50 flex justify-center items-center text-white"><FaSearch /> Поиск</a>
                    <a href = "{% url 'user' request.user.username request.user.id %}" className="transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center text-white gap-3"><FaUserCircle /> User</a>
                    <form action="{% url 'logout' %}" method="post">
                    
                        <button type="submit" className="transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-red-600 shadow-lg shadow-red-500/50 flex justify-center items-center text-white gap-3"><FaSignOutAlt /> Выход</button>
                    </form>
                </div>
                
                {/* <a href="{% url 'login' %}" className="transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-cyan-500 shadow-lg shadow-cyan-500/50 flex justify-center items-center text-white gap-3">Вход <FaDoorOpen /></a> */}
                
            </div>
        </div>
        

    )
}

export default Menu;


// const isShowMenuBtn = document.querySelector(".myMenuBtn");

// function isShowMenu() {
//     const menuEl = document.querySelector(".myMenu")
//     if (menuEl.classList.contains("active")) {
//         menuEl.classList.remove("active");
//         isShowMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
//     }
//     else {
//         menuEl.classList.add("active");
//         isShowMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
//     }
// }




// isShowMenuBtn.addEventListener('click', () => {
//     isShowMenu();
// })
