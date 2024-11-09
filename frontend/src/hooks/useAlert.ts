
import { useAppDispatch } from "../store/useAppDispatch";
import { EAlertType, setMessageAlert, setShowAlert, setTypeAlert } from "../store/slices/alertSlice/alertSlice";




const useAlert = () => {
    const dispatch = useAppDispatch();

   
    return (message: string, typeMessage: EAlertType) => {
        dispatch(setShowAlert());
        dispatch(setMessageAlert(message));
        dispatch(setTypeAlert(typeMessage));
    };
}   

export default useAlert;