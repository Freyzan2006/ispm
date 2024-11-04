import { useEffect } from "react";
import { tablesThunk } from "../../../state/tables/tablesThunk";

import { useAppDispatch, useAppSelector } from "../../../state/useAppDispatch";

import { ITable } from "../../../state/tables/Itables";
import TableItem from "../TableItem/TableItem";

import { RootState } from "../../../state/store";


import { ITableComponent } from "../ITable";
import { tablesUserThunk } from "../../../state/tables/tablesThunk";



import { BiSad } from "react-icons/bi";
import { EStatus } from "../../../state/api/EAPI";
import ErrorAlert from "../../ErrorAlert/ErrorAlert";
import WarningAlert from "../../warningAlert/WarningAlert";
import LoadingContent from "../../LoadingContent/LoadingContent";

const TableBody: React.FC<ITableComponent> = ({ isBelongsUser }) => {
 

    const dispatch = useAppDispatch();
    const { tables, status, error } = useAppSelector((state: RootState) => state.tables);

    const userId = useAppSelector((state: RootState) => state.user.id)

    useEffect(() => {
        try {
            if (isBelongsUser) {
                if (userId !== undefined) {
                    // Передайте объект с `url` и `userId` как указано в `createAsyncThunk`
                    dispatch(tablesUserThunk({ userId }));
                } else {
                    console.error('User ID is undefined');
                }
            } else {
                dispatch(tablesThunk({}));
            }
        } catch(err) {
            console.log("HHh")
        }

        
        
    }, [dispatch, userId, isBelongsUser]) 

    

    if (status === EStatus.LOADING) return <tbody><tr><td><LoadingContent /></td></tr></tbody>;
    if (status === EStatus.FAILED) return <tbody><tr><td><ErrorAlert errorMessage = "Таблица временно не работает" /></td></tr></tbody>;

    

    if (tables) {
        return (  
            <tbody>
                {
                    tables.map((el: ITable, index) => <TableItem key = { index } { ...el } />)
                }           
            </tbody>
        )
    } else {
        return (
            <tbody>
                <tr>
                    <td className = "flex justify-center items-center gap-2">
                        <h2 className = "text-black dark:text-white bg-yellow-500 p-5 rounded-md">
                            Записи не найдены <BiSad />
                        </h2>
                    </td>
                </tr>
            </tbody>
        )
    }
    
}

export default TableBody;