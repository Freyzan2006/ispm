

import css from "./LoginPage.module.scss";


import { FaUser } from "react-icons/fa";

import { useAppDispatch } from "../../store/useAppDispatch";

import { login } from "../../store/slices/authSlice/authThunk";
import { useNavigate } from "react-router-dom";
import { EPath } from "../../routers/ERouters";
import { EAlertType } from "../../store/slices/alertSlice/alertSlice";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button, InputField } from "../../components/ui/ui";
import { EButton, ITypeBtn } from "../../components/ui/Button/EButton";
import useAlert from "../../hooks/useAlert";



interface IFrom {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {


    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const { handleSubmit, control, formState: { errors, isSubmitting  } } = useForm<IFrom>({
        mode: "onChange",
    });


    const showAlert = useAlert();
  


    const onSubmit: SubmitHandler<IFrom> = async ({ username, password }) => {
        try {
            await dispatch(login({ username, password })).unwrap();

            showAlert(`Добро пожаловать ${username}`, EAlertType.SUCCESSFUL);
            navigate(EPath.HOME)
        
        } catch (error) {

            showAlert("Проверьте пожалуйста свой логин и пароль", EAlertType.ERROR);
            
            console.error('Failed to login:', error);
        }  
    }

    return (
        <main className = "flex justify-center items-center">
            <form className = { `${css.LoginPage} ` } onSubmit = { handleSubmit(onSubmit) }>
                <h1 className = "TEXT_COLOR  text-2xl">Вход в Аккаунт</h1>

                <InputField 
                    width = { 300 }
                    placeholder = "Логин" 
                    errorMessage = { errors.username?.message } 
                    label="Логин" name = "username" 
                    control = { control } 
                    validationRules = {{
                        required: '"Логин" обязательно',
                        minLength: { value: 2, message: 'Минимальная длина 2 символа' },
                        maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                    }}
                />

                <div className = "flex justify-center gap-5">

                    <InputField 
                        width = { 300 }
                        placeholder = "Пароль" 
                        errorMessage = { errors.password?.message } 
                        label="Пароль" name = "password" 
                        control = { control } 
                        validationRules = {{
                            required: '"Пароль" обязательно',
                            minLength: { value: 2, message: 'Минимальная длина 2 символа' },
                            maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                        }}
                        type = { "password" }
                        
                    />
                    
                    {/* <Button onClick = { () => setIsShowPassword(!isShowPassword) } type = { ITypeBtn.BUTTON } styled = { `${EButton.GREEN}` }>
                        { isShowPassword ? <FaEyeSlash /> : <FaEye /> }
                    </Button> */}

                </div>
                <Button disabled = { isSubmitting } type = { ITypeBtn.SUBMIT } styled = { EButton.GREEN }>
                    { isSubmitting ? <>Идёт загрузка...</> : <><FaUser /> Войти </> }
                </Button>

                {/* <button type = "submit" className = { `${css.LoginPage__submit} transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center text-white gap-3` }><FaUser /> Войти</button> */}
            </form>

        </main>
    )
}

export default LoginPage;