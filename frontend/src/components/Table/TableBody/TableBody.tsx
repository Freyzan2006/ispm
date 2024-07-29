import { useEffect } from "react";
import tablesFetch, { tablesUserFetch } from "../../../api/tablesFetch";

import { useAppDispatch, useAppSelector } from "../../../reduxToolkit/useAppDispatch";

import { ITable } from "../../../reduxToolkit/tables/Itables";
import TableItem from "../TableItem/TableItem";

import { RootState } from "../../../reduxToolkit/store";

import { TablesAPI } from "../../../api/api";
import { ITableComponent } from "../ITable";

const TableBody: React.FC<ITableComponent> = ({ isBelongsUser }) => {
 

    const dispatch = useAppDispatch();
    const { tables, status, error } = useAppSelector((state: RootState) => state.tables);

    const userId = useAppSelector((state: RootState) => state.user.id)

    useEffect(() => {
        if (isBelongsUser) {
            if (userId !== undefined) {
                // Передайте объект с `url` и `userId` как указано в `createAsyncThunk`
                dispatch(tablesUserFetch({ url: TablesAPI, userId }));
            } else {
                console.error('User ID is undefined');
            }
        } else {
            dispatch(tablesFetch(TablesAPI));
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