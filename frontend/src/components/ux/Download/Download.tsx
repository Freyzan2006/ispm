
import { FaCloudDownloadAlt } from "react-icons/fa";


import axiosConfig from "../../../services/api/axiosConfig";
import { useAppDispatch, useAppSelector } from "../../../store/useAppDispatch";

import { EAlertType, setMessageAlert, setShowAlert, setTypeAlert } from "../../../store/slices/alertSlice/alertSlice";
import { RootState } from "../../../store/store";
import { Button } from "../../ui/ui";
import { EButton, ITypeBtn } from "../../ui/Button/EButton";
const Download: React.FC = () => {

    const dispatch = useAppDispatch();
   
  

    const { tables } = useAppSelector((state: RootState) => state.tables)

    async function downloadTable() {
        const response = await axiosConfig.post("download/", { data: tables }, {
            responseType: 'blob', 
        });
       

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'table.docx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Освобождение URL после использования
        

        dispatch(setShowAlert());
        dispatch(setMessageAlert("Вы успешно скачали таблицу"));
        dispatch(setTypeAlert(EAlertType.SUCCESSFUL));
    }

    
    

    return (
        <Button onClick = { downloadTable } type = { ITypeBtn.BUTTON } styled = { `${EButton.GREEN} w-1/2` }>
            <FaCloudDownloadAlt /> Скачать таблицу
        </Button>
    )
} 

export default Download;
