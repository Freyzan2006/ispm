
import css from "./Menu.module.scss";

import { FaHome, FaBars, FaSearch, FaUserCircle, FaSignOutAlt, FaDoorOpen } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import { toggleActive } from "../../state/menu/menuSlice";
import { isScreenDimming } from "../../state/screenDimming/screenDimmingSlice";
import { useAppDispatch, useAppSelector } from '../../state/useAppDispatch';
import { RootState } from '../../state/store';
import Theme from "../Theme/Theme";
import MyLink from "../../widgets/MyLink/MyLink";
import { clearTokens } from "../../state/auth/authSlice";
import { useEffect } from "react";
import { userThunk } from "../../state/user/userThunk";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { EButton, ITypeBtn } from "../Button/EButton";
import { EMyLink } from "../MyLink/EMyLink";
import { EPath } from "../../Routers/ERouters";
import { EAlertType, setMessageAlert, setShowAlert, setTypeAlert } from "../../state/alert/alertSlice";
import DropDown from "../DropDown/DropDown";
import { IoMdSettings } from "react-icons/io";

import { MdOutlineAnimation } from "react-icons/md";
import { isBgAnimation } from "../../state/bgAnimation/bgAnimationSlice";

const Menu: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAction = useAppSelector((state: RootState) => state.menu.isActive);    
    const accessToken = useAppSelector((state: RootState) => state.auth.accessToken);
    const user = useAppSelector((state: RootState) => state.user);
    
    

    useEffect(() => {
        if (accessToken) 
            dispatch(userThunk(accessToken))
    }, [dispatch, accessToken])

    function handlerMenuMedia() {
        dispatch(toggleActive())
        dispatch(isScreenDimming())
    }

    function handlerLogout() {
        dispatch(clearTokens());
        navigate(EPath.LOGIN);

        dispatch(setShowAlert());
        dispatch(setMessageAlert("Вы вышли из аккаунта "));
        dispatch(setTypeAlert(EAlertType.SUCCESSFUL));
    }


    function handlerAnimationBg() {
        dispatch(isBgAnimation());

        dispatch(setShowAlert());
        dispatch(setMessageAlert("Анимация успешна изменина"));
        dispatch(setTypeAlert(EAlertType.SUCCESSFUL));
    }



    return (
        <div className = { `${css.myMenu} ${isAction ? `${css.active} bg-blue-600 dark:bg-slate-900` : ""}`}>
           

            <Button type = { ITypeBtn.BUTTON } onClick = { handlerMenuMedia } styled = { `${EButton.GREEN} ${css.myMenuBtn} ${css.isScreenDimmingBtn}` }>
                { isAction ? <RxCross2 /> : <FaBars /> }
            </Button>

            <menu className={ `${css.myMenuEl}`}>
                <li><MyLink to = { EPath.HOME } styled = { EMyLink.LINK }><FaHome /> Главная страница</MyLink></li>
                <li><MyLink to = { EPath.ABOUT } styled = { EMyLink.LINK }><FaCircleQuestion /> Об проекте</MyLink></li>
            </menu>  

            <div className={ `${css.myMenuEl}`}>
                
                <DropDown intro = { <IoMdSettings /> }>
                    <div className = "flex flex-col justify-center items-center gap-1 text-black dark:text-white ">
                        <h3>Тема сайта: Светлая/Тёмная</h3>
                        <Theme />
                    </div>

                    <div className = "flex flex-col justify-center items-center gap-1 text-black dark:text-white ">
                        <h3>Анимация на заднем фоне: Вкл/Выкл</h3>
                        <Button onClick = { handlerAnimationBg} type = { ITypeBtn.BUTTON } styled = { EButton.BLUE }>
                            <MdOutlineAnimation />
                        </Button>
                        
                    </div>
                    
                </DropDown>

                {
                    accessToken ? (
                        <div className = { css.myMenuEl }>
                            <MyLink to = { EPath.SEARCH } styled = { EMyLink.BLUE }><FaSearch /> Поиск</MyLink>
                            <MyLink to = { EPath.USER } styled = { EMyLink.GREEN }><FaUserCircle /> { user.username } { user.is_staff || "(Админ)" }</MyLink>
                        
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





