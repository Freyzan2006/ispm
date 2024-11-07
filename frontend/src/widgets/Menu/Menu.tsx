
import css from "./Menu.module.scss";

import { FaHome, FaBars, FaSearch, FaUserCircle, FaSignOutAlt, FaDoorOpen } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import { toggleActive } from "../../state/menu/menuSlice";
import { isScreenDimming } from "../../state/screenDimming/screenDimmingSlice";
import { useAppDispatch, useAppSelector } from '../../state/useAppDispatch';
import { RootState } from '../../state/store';
import ThemeBtn from "../ThemeBtn/ThemeBtn";
import MyLink from "../../widgets/MyLink/MyLink";

import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { EButton, ITypeBtn } from "../Button/EButton";
import { EMyLink } from "../MyLink/EMyLink";
import { EPath } from "../../Routers/ERouters";
import { EAlertType } from "../../state/alert/alertSlice";
import DropDown from "../DropDown/DropDown";
import { IoMdSettings } from "react-icons/io";



import AnimationBtn from "../AnimationBtn/AnimationBtn";
import useGetUser from "../../hooks/useGetUser";
import useAlert from "../../hooks/useAlert";
import useLogout from "../../hooks/useLogout";




const Menu: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAction = useAppSelector((state: RootState) => state.menu.isActive);    
    const accessToken = useAppSelector((state: RootState) => state.auth.accessToken);
    const user = useAppSelector((state: RootState) => state.user);
    
    const showAlert = useAlert();
    const logout = useLogout();

    useGetUser()

    function handlerMenuMedia() {
        dispatch(toggleActive())
        dispatch(isScreenDimming())
    }

    function handlerLogout() {
        logout();
        navigate(EPath.LOGIN);
        showAlert("Вы вышли из аккаунта", EAlertType.SUCCESSFUL);
    }



   



    return (
        <div className = { `${css.myMenu} ${isAction ? `${css.active} bg-blue-600 dark:bg-slate-900` : ""}`}>
           

            <Button type = { ITypeBtn.BUTTON } onClick = { handlerMenuMedia } styled = { `${EButton.GREEN} ${css.myMenuBtn} ${css.isScreenDimmingBtn}` }>
                { isAction ? <RxCross2 /> : <FaBars /> }
            </Button>

            <menu className={ `${css.myMenuEl}`}>
                <li><MyLink to = { EPath.HOME } styled = { EMyLink.LINK }><FaHome /> Главная страница</MyLink></li>
                <li><MyLink to = { EPath.ABOUT } styled = { EMyLink.LINK }><FaCircleQuestion /> О проекте</MyLink></li>
            </menu>  

            <div className={ `${css.myMenuEl}`}>
                
                <DropDown intro = { <IoMdSettings /> } >
                    <div className = "flex flex-col justify-center items-center gap-5">
                        <div className = "flex flex-row justify-center items-center gap-8 text-black dark:text-white ">
                            <h3>Тема:</h3>
                            <ThemeBtn />
                        </div>

                        <div className = "flex flex-row justify-center items-center gap-1 text-black dark:text-white ">
                            <h3>Анимация:</h3>
                            <AnimationBtn />
                            
                            
                        </div>
                    </div>
                    
                </DropDown>

                <MyLink to = { EPath.SEARCH } styled = { EMyLink.BLUE }><FaSearch /> Поиск</MyLink>

                {
                    accessToken ? (
                        <div className = { css.myMenuEl }>
                            <MyLink to = { EPath.USER } styled = { EMyLink.GREEN }><FaUserCircle /> { user.username } { user.is_staff && "(Админ)" }</MyLink>
                        
                            <Button type = { ITypeBtn.BUTTON } onClick = { handlerLogout } styled = { EButton.RED }>
                                <FaSignOutAlt /> Выход
                            </Button>
                        </div>
                    ) : (
                        <MyLink to = { EPath.LOGIN } styled = { EMyLink.BLUE }>Вход <FaDoorOpen /></MyLink>
                    )
                }
            </div>
        </div>
    )
}

export default Menu;





