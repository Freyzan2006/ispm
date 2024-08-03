import { useEffect } from "react";
import { tablesThunk } from "../../../state/tables/tablesThunk";

import { useAppDispatch, useAppSelector } from "../../../state/useAppDispatch";

import { ITable } from "../../../state/tables/Itables";
import TableItem from "../TableItem/TableItem";

import { RootState } from "../../../state/store";

import { TablesAPI } from "../../../state/api/api";
import { ITableComponent } from "../ITable";
import { tablesUserThunk } from "../../../state/tables/tablesThunk";
import { TableAPI } from "../../../state/api/EAPI";

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
            dispatch(tablesThunk(TablesAPI));
        }
 

        
        
    }, [dispatch, userId, isBelongsUser]) 



    if (status === 'loading') return <tbody><tr><td>Loading...</td></tr></tbody>;
    if (status === 'failed') return <tbody><tr><td>{error}</td></tr></tbody>;

   
    return (  
    

        <tbody>
            {
                tables.map((el: ITable, index) => <TableItem key = { index } { ...el } />)
            }           
        </tbody>
    )
    
}

export default TableBody;