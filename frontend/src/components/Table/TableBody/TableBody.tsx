import { useEffect } from "react";
import tablesFetch from "../../../api/tablesFetch";

import { useAppDispatch, useAppSelector } from "../../../reduxToolkit/useAppDispatch";

import { ITable } from "../../../reduxToolkit/tables/Itables";
import TableItem from "../TableItem/TableItem";

import { RootState } from "../../../reduxToolkit/store";

import { TablesAPI } from "../../../api/api";

const TableBody: React.FC = () => {
    // const dispatch = useAppDispatch();
    // const tables = useAppSelector<ITable[]>((state: RootState) => state.tables.tables);    
    
    // useEffect(() => {
    //     dispatch(tablesFetch())
    // }, [dispatch]) 

    const dispatch = useAppDispatch();
    const { tables, status, error } = useAppSelector((state: RootState) => state.tables);

    useEffect(() => {
        dispatch(tablesFetch(TablesAPI))
    }, [dispatch]) 



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