
import { useAppDispatch } from "../state/useAppDispatch";
import { EAlertType, setMessageAlert, setShowAlert, setTypeAlert } from "../state/alert/alertSlice";




const useAlert = () => {
    const dispatch = useAppDispatch();

   
    return (message: string, typeMessage: EAlertType) => {
        dispatch(setShowAlert());
        dispatch(setMessageAlert(message));
        dispatch(setTypeAlert(typeMessage));
    };
}   

export default useAlert;