import { useEffect } from "react";
import tablesFetch from "../../../api/tablesFetch";
import { RootState } from "../../../reduxToolkit/store";
import { useAppDispatch, useAppSelector } from "../../../reduxToolkit/useAppDispatch";

import { ITable } from "../../../reduxToolkit/tables/Itables";
import TableItem from "../TableItem/TableItem";

const TableBody: React.FC = () => {
    const dispatch = useAppDispatch();
    const tables = useAppSelector<ITable[]>((state: RootState) => state.tables.tables);    
    // const tables = useAppSelector<ITable[]>((state: RootState) => state.tables.error);   

    useEffect(() => {
        dispatch(tablesFetch())
    }, [dispatch]) 

    return (
        <tbody>
            {
                tables.map((el: ITable, index) => <TableItem key = { index } { ...el } />)
            }
        </tbody>

    )
}

export default TableBody;