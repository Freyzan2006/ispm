
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
import { fetchUserData } from "../../state/api/userFetch";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { EButton, ITypeBtn } from "../Button/EButton";
import { EMyLink } from "../MyLink/EMyLink";
import { EPath } from "../../Routers/ERouters";


const Menu: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAction = useAppSelector((state: RootState) => state.menu.isActive);    
    const accessToken = useAppSelector((state: RootState) => state.auth.accessToken);
    const user = useAppSelector((state: RootState) => state.user);

    useEffect(() => {
        if (accessToken) 
            dispatch(fetchUserData(accessToken))
    }, [dispatch, accessToken])

    function handlerMenuMedia() {
        dispatch(toggleActive())
        dispatch(isScreenDimming())
    }

    function handlerLogout() {
        dispatch(clearTokens())
        navigate(EPath.LOGIN)
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
                <Theme />
                {
                    accessToken ? (
                        <div className = { css.myMenuEl }>
                            <MyLink to = { EPath.SEARCH } styled = { EMyLink.BLUE }><FaSearch /> Поиск</MyLink>
                            <MyLink to = { EPath.USER } styled = { EMyLink.GREEN }><FaUserCircle /> { user.username }</MyLink>
                        
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





