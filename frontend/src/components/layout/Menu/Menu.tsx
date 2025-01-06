
import css from "./Menu.module.scss";

import { FaHome, FaBars, FaSearch, FaUserCircle, FaSignOutAlt, FaDoorOpen } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";





import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";
import { EButton, ITypeBtn } from "../../ui/Button/EButton";
import { EMyLink } from "../../ui/MyLink/EMyLink";

import DropDown from "../../ui/DropDown/DropDown";
import { IoMdSettings } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../../store/useAppDispatch";
import { RootState } from "../../../store/store";
import useAlert from "../../../hooks/useAlert";
import useLogout from "../../../hooks/useLogout";
import { toggleActive } from "../../../store/slices/menuSlice/menuSlice";
import { isScreenDimming } from "../../../store/slices/screenDimmingSlice/screenDimmingSlice";
import { EPath } from "../../../routers/ERouters";
import { EAlertType } from "../../../store/slices/alertSlice/alertSlice";
import useGetUser from "../../../hooks/useGetUser";
import { MyLink } from "../../ui/ui";
import { AnimationBtn, ThemeBtn } from "../../ux/ux";
import { useState } from "react";







const Menu: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isMedia, setIsMedia] = useState<boolean>(false); 

    const isAction = useAppSelector((state: RootState) => state.menu.isActive);    
    const accessToken = useAppSelector((state: RootState) => state.auth.accessToken);
    const user = useAppSelector((state: RootState) => state.user);
    
    const showAlert = useAlert();
    const logout = useLogout();

    useGetUser()

    function handlerMenuMedia() {
        dispatch(toggleActive())
        dispatch(isScreenDimming())
        setIsMedia(!isMedia);
    }

    function handlerLogout() {
        logout();
        navigate(EPath.LOGIN);
        showAlert("Вы вышли из аккаунта", EAlertType.SUCCESSFUL);
    }



   

   

    return (
        <div className = { `${css.myMenu}  ${isAction ? `${css.active}  bg-blue-600 dark:bg-slate-900  ` : ""}`}>
           

            <Button type = { ITypeBtn.BUTTON } onClick = { handlerMenuMedia } styled = { `${EButton.GREEN} ${css.myMenuBtn} ${css.isScreenDimmingBtn}` }>
                { isAction ? <RxCross2 /> : <FaBars /> }
            </Button>

            <menu className={ `${css.myMenuEl}`}>
                <li><MyLink onClick = { isMedia ? handlerMenuMedia : () => {} } to = { EPath.HOME } styled = { EMyLink.LINK }><FaHome /> Главная страница</MyLink></li>
                <li><MyLink onClick = { isMedia ? handlerMenuMedia : () => {} } to = { EPath.ABOUT } styled = { EMyLink.LINK }><FaCircleQuestion /> О проекте</MyLink></li>
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


                
                <MyLink onClick = { isMedia ? handlerMenuMedia : () => {} } to = { EPath.SEARCH } styled = { EButton.BLUE + " " + "myLinkSearch" }><FaSearch /> Поиск</MyLink>

                

                {
                    accessToken ? (
                        <div className = { css.myMenuEl }>
                            <MyLink onClick = { isMedia ? handlerMenuMedia : () => {} } to = { EPath.USER } styled = { EButton.GREEN }><FaUserCircle /> { user.username } { user.is_staff && "(Админ)" }</MyLink>

                            

                            <Button type = { ITypeBtn.BUTTON } onClick = { () => { handlerLogout(); isMedia && handlerMenuMedia() } } styled = { EButton.RED }>
                                <FaSignOutAlt /> Выход
                            </Button>
                        </div>
                    ) : (
                        <MyLink onClick = { isMedia ? handlerMenuMedia : () => {} } to = { EPath.LOGIN } styled = { EButton.BLUE }>Вход <FaDoorOpen /></MyLink>
                    )
                }
            </div>
        </div>
    )
}

export default Menu;





