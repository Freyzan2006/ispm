
import { useState } from "react";
import css from "./LoginPage.module.scss";

import { FaEye } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../state/useAppDispatch";
import { RootState } from "../../state/store";
import { login } from "../../state/auth/authThunk";
import { redirect, useNavigate } from "react-router-dom";
import { EPath } from "../../Routers/ERouters";



const LoginPage: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch();
    const status = useAppSelector((state: RootState) => state.auth.status);
    const navigate = useNavigate();

    const [ isShowPassword, setIsShowPassword ] = useState<boolean>(false);

    const handlerSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (!username || !password)
            return

        try {
            await dispatch(login({ username, password })).unwrap();
        } catch (error) {
            console.error('Failed to login:', error);
        }


        navigate(EPath.HOME)
    }

    return (
        <main className = "flex justify-center items-center">
            <form className = { `${css.LoginPage} ` } onSubmit = { handlerSubmit }>
                <h1 className = "text-black dark:text-white  text-2xl">Вход в Аккаунт</h1>
                <input placeholder = "Имя" type="text" 
                    className = { css.LoginPage__login } 
                    onChange = { (e) => setUsername(e.target.value) }
                    value = { username }
                />
                <div className = "w-full flex justify-center items-center gap-5">
                    <input placeholder = "Пароль" type = { isShowPassword ? "text" : "password" } 
                        className = { css.LoginPage__password } 
                        onChange = { (e) => setPassword(e.target.value) }
                        value = { password }
                    />
                    <button type = "button" onClick = { () => setIsShowPassword(!isShowPassword) } className = "transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center text-white gap-3">
                        { isShowPassword ? <FaEyeSlash /> : <FaEye /> }
                    </button>
                </div>
                <button   type = "submit" className = { `${css.LoginPage__submit} transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center text-white gap-3` }><FaUser /> Войти</button>
            </form>

        </main>
    )
}

export default LoginPage;