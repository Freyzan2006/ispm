import { useMemo } from "react";





import TableItem from "../TableItem/TableItem";









import { BiSad } from "react-icons/bi";
import { useAppSelector } from "../../../../store/useAppDispatch";
import { RootState } from "../../../../store/store";

import { EStatus } from "../../../../services/api/EAPI";

import { ErrorAlert } from "../../ux";
import { ITable } from "../../../../store/slices/tablesSlice/Itables";

const TableBody: React.FC = () => {

    const { tables, status } = useAppSelector((state: RootState) => state.tables);
  
    const { paginationCount } = useAppSelector((state: RootState) => state.pagination);
    

    // Мемоизация JSX-элементов таблицы
    const tableRows = useMemo(() => {
        if (!tables) return null;
        return tables.map((el: ITable, index) => <TableItem key={index} {...el} />);
    }, [tables]);

    const temp: ITable[] = [
            
    ]
    for ( let i = 0; i < paginationCount; i++ ) {
        temp.push({
            id: 0, 
            Type: 0, 
            name: "", 
            title: "",
            data: 0,
            tom: 0,
            issue: 0,
            page_start: 0,
            page_end: 0,
            pages: 0,
            authors: JSON.stringify([{ first_name: "", last_name: "", patronymic: "" }]),
            created_at: "",
            updated_at: "",
            for_user: 0
        
        })
    }

    // 


    if (status === EStatus.LOADING) {

        
        return (
            <tbody>
                { temp.map((el: ITable, index) => <TableItem key={index} { ...el } />) }
            </tbody>
        );
    }

    if (status === EStatus.FAILED) {
        return (
            <tbody>
                <tr>
                    <td>
                        <ErrorAlert errorMessage="Таблица временно не работает" />
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {tables && tableRows ? (
                tableRows
            ) : (
                <tr>
                    <td className="flex justify-center items-center gap-2">
                        <h2 className="text-black dark:text-white bg-yellow-500 p-5 rounded-md">
                            Записи не найдены <BiSad />
                        </h2>
                    </td>
                </tr>
            )}
        </tbody>
    );
};

export default TableBody;