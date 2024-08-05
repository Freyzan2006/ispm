import { useEffect } from "react";
import { tablesThunk } from "../../../state/tables/tablesThunk";

import { useAppDispatch, useAppSelector } from "../../../state/useAppDispatch";

import { ITable } from "../../../state/tables/Itables";
import TableItem from "../TableItem/TableItem";

import { RootState } from "../../../state/store";


import { ITableComponent } from "../ITable";
import { tablesUserThunk } from "../../../state/tables/tablesThunk";



import { BiSad } from "react-icons/bi";

const TableBody: React.FC<ITableComponent> = ({ isBelongsUser }) => {
 

    const dispatch = useAppDispatch();
    const { tables, status, error } = useAppSelector((state: RootState) => state.tables);

    const userId = useAppSelector((state: RootState) => state.user.id)

    useEffect(() => {
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
 

        
        
    }, [dispatch, userId, isBelongsUser]) 



    if (status === 'loading') return <tbody><tr><td>Loading...</td></tr></tbody>;
    if (status === 'failed') return <tbody><tr><td>{error}</td></tr></tbody>;

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