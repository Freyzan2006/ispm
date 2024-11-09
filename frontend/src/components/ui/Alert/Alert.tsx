
import { GrStatusGood } from "react-icons/gr";
import { MdError } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";

import css from "./Alert.module.scss";


import { useEffect } from "react";
import { RootState } from "../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../store/useAppDispatch";
import { EAlertType, setShowAlert } from "../../../store/slices/alertSlice/alertSlice";


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


export default Alert;


