
import { FaCloudDownloadAlt } from "react-icons/fa";


import axiosConfig from "../../../services/api/axiosConfig";
import { useAppSelector } from "../../../store/useAppDispatch";

import { EAlertType } from "../../../store/slices/alertSlice/alertSlice";
import { RootState } from "../../../store/store";
import { Button } from "../../ui/ui";
import { EButton, ITypeBtn } from "../../ui/Button/EButton";
import useAlert from "../../../hooks/useAlert";
import { useState } from "react";

import { RiLoader4Fill } from "react-icons/ri";

import css from "./Download.module.scss"

const Download: React.FC = () => {



    const [ isDownloading, setIsDownloading ] = useState<boolean>(false);
    const showAlert = useAlert();
  

    const { tables } = useAppSelector((state: RootState) => state.tables)

    async function downloadTable() {

        try {
            setIsDownloading(true);
            console.log(isDownloading)

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
            showAlert("Тема успешно изменена", EAlertType.SUCCESSFUL);

          
        } catch (err) {
            showAlert("Не получилось скачать таблицу, попробуйте позже.", EAlertType.ERROR);
            setIsDownloading(false);
        } finally {
            setIsDownloading(false); // Устанавливаем в `false` в любом случае
            console.log("Downloading finished:", false);
        }
    }

    
    

    return (
        <Button disabled = { isDownloading } onClick = { downloadTable } type = { ITypeBtn.BUTTON } styled = { `${EButton.GREEN} w-1/2  ${isDownloading && "opacity-30  hover:scale-100"}` }>
            { isDownloading ? <RiLoader4Fill className = { css.icon } /> : <FaCloudDownloadAlt />} 
            { isDownloading ? "Идёт скачивание таблицы" : "Скачать таблицу" }
        </Button>
    )
} 

export default Download;
