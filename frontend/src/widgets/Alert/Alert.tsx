
import { GrStatusGood } from "react-icons/gr";
import { MdError } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";

import css from "./Alert.module.scss";
import { useAppDispatch, useAppSelector } from "../../state/useAppDispatch";
import { RootState } from "../../state/store";
import { useEffect } from "react";
import { EAlertType, setShowAlert } from "../../state/alert/alertSlice";

const Alert: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isActive, time, type, message } = useAppSelector((state: RootState) => state.alert)

    useEffect(() => {
        if (!isActive) {
            return
        }
        const timerId = setTimeout(() => {
            dispatch(setShowAlert())
        }, time); 

        return () => {
            clearTimeout(timerId);
        }

    }, [dispatch, isActive]);

    const typeMessage = 
    EAlertType.SUCCESSFUL == type && "Успешно выполнено !" 
    || 
    EAlertType.ERROR == type && "Извините не получилось сделать !"
    || 
    EAlertType.WARNING == type && "Предупреждение !"
    || 
    EAlertType.INFO == type && "Информация !"

    const bgTypeMessage =     
    EAlertType.SUCCESSFUL == type && "bg-green-500"
    || 
    EAlertType.ERROR == type && "bg-red-500"
    || 
    EAlertType.WARNING == type && "bg-yellow-500"
    || 
    EAlertType.INFO == type && "bg-blue-500"

    const colorTypeMessage =     
    EAlertType.SUCCESSFUL == type && "text-green-500"
    || 
    EAlertType.ERROR == type && "text-red-500"
    || 
    EAlertType.WARNING == type && "text-yellow-500"
    || 
    EAlertType.INFO == type && "text-blue-500"

    const typeIcon = 
    EAlertType.SUCCESSFUL == type && <GrStatusGood size = { 30 } color="green" />
    || 
    EAlertType.ERROR == type && <MdError size = { 30 } color="red" />
    || 
    EAlertType.WARNING == type && <IoIosWarning size = { 30 } color="yellow" />
    || 
    EAlertType.INFO == type && <FaInfoCircle size = { 30 } color="blue" />

    return (
  
            
        
        <div className={ `${css.toast}  bg-white dark:bg-slate-800  ${ isActive && css.active }` }>

            <div className= { css.toast_content }>
                
                { typeIcon }
            
                <div className= { css.message }>
                    <span className = { `${css.text } ${css.text_2} ${ colorTypeMessage }` }>{ typeMessage }</span>
                    <span className = { `${css.text } ${css.text_2} ${ colorTypeMessage }` }>{ message }</span>
                </div>
            </div>
        
            <div className = { `${css.progress} ${ isActive && css.active } ${ bgTypeMessage } ` }></div>
        </div>
        
    
    )
}

//   toast.classList.add("active");
//   progress.classList.add("active");

export default Alert;


// {% load static %}

// <link rel="stylesheet" href="{% static 'css/components/alert.css' %}">

{/* <div class="toast">

    <div class="toast-content">
        <i class="fas fa-solid fa-check check"></i>
    
        <div class="message">
        <span class="text text-1">Успешно выполнено !</span>
        <span class="text text-2">Тема изменена</span>
        </div>
    </div>
    <i class="fa-solid fa-xmark close"></i>
    <div class="progress"></div>
</div> */}
    


// <script src = "{% static 'js/alertController.js' %}"></script>



// const button = document.querySelector(".alertBtn"),
//   toast = document.querySelector(".toast");
// (closeIcon = document.querySelector(".close")),
//   (progress = document.querySelector(".progress"));

// let timer1, timer2;

// button.addEventListener("click", () => {
//   button.disabled = true;
//   button.style.opacity = 0.5;
//   toast.classList.add("active");
//   progress.classList.add("active");

//   timer1 = setTimeout(() => {
//     toast.classList.remove("active");
//   }, 2000); //1s = 1000 milliseconds

//   timer2 = setTimeout(() => {
//     progress.classList.remove("active");
//     button.disabled = false;
//     button.style.opacity = 1;
//   }, 2300);
// });

// closeIcon.addEventListener("click", () => {
//   toast.classList.remove("active");

//   setTimeout(() => {
//     progress.classList.remove("active");
//   }, 300);

//   clearTimeout(timer1);
//   clearTimeout(timer2);
// });