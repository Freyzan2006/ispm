
import { FaCloudDownloadAlt } from "react-icons/fa";
import Button from "../../widgets/Button/Button";
import { EButton, ITypeBtn } from "../../widgets/Button/EButton";
import { useEffect, useState } from "react";
import axiosConfig from "../../state/api/axiosConfig";
import { useAppDispatch, useAppSelector } from "../../state/useAppDispatch";
import { RootState } from "../../state/store";
import { EAlertType, setMessageAlert, setShowAlert, setTypeAlert } from "../../state/alert/alertSlice";
const Download: React.FC = () => {
    const [ download, setDownload ] = useState();
    const dispatch = useAppDispatch();
   
    async function featch() {
        const response = await axiosConfig.get("download/");
        console.log(response.data)
        setDownload(response.data)
    }

    const { tables } = useAppSelector((state: RootState) => state.tables)

    async function featch2() {
        const response = await axiosConfig.post("download/", { data: tables }, {
            responseType: 'blob', // Указываем, что ожидаем бинарный ответ
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
        <Button onClick = { featch2 } type = { ITypeBtn.BUTTON } styled = { `${EButton.GREEN} w-1/2` }>
            <FaCloudDownloadAlt /> Скачать таблицу
        </Button>
    )
} 

export default Download;
