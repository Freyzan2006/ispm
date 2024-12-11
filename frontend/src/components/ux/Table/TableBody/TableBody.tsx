import { useEffect, useMemo } from "react";





import TableItem from "../TableItem/TableItem";




import { ITableComponent } from "../ITable";




import { BiSad } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../../store/useAppDispatch";
import { RootState } from "../../../../store/store";
import { tablesThunk, tablesUserThunk } from "../../../../store/slices/tablesSlice/tablesThunk";
import { EStatus } from "../../../../services/api/EAPI";
import { LoadingContent } from "../../../layout/layout";
import { ErrorAlert } from "../../ux";
import { ITable } from "../../../../store/slices/tablesSlice/Itables";


// const TableBody: React.FC<ITableComponent> = ({ isBelongsUser }) => {
 

//     const dispatch = useAppDispatch();
//     const { tables, status } = useAppSelector((state: RootState) => state.tables);

//     const userId = useAppSelector((state: RootState) => state.user.id)

//     useEffect(() => {
//         try {
//             if (isBelongsUser) {
//                 if (userId !== undefined) {
//                     dispatch(tablesUserThunk({ userId }));
//                 } else {
//                     console.error('User ID is undefined');
//                 }
//             } else {
//                 dispatch(tablesThunk({}));
//             }
//         } catch(err) {
//             console.log("HHh")
//         }

        
        
//     }, [dispatch, userId, isBelongsUser]) 

    

//     if (status === EStatus.LOADING) return <tbody><tr><td><LoadingContent /></td></tr></tbody>;
//     if (status === EStatus.FAILED) return <tbody><tr><td><ErrorAlert errorMessage = "Таблица временно не работает" /></td></tr></tbody>;

    

//     if (tables) {
//         return (  
//             <tbody>
//                 {
//                     tables.map((el: ITable, index) => <TableItem key = { index } { ...el } />)
//                 }           
//             </tbody>
//         )
//     } else {
//         return (
//             <tbody>
//                 <tr>
//                     <td className = "flex justify-center items-center gap-2">
//                         <h2 className = "text-black dark:text-white bg-yellow-500 p-5 rounded-md">
//                             Записи не найдены <BiSad />
//                         </h2>
//                     </td>
//                 </tr>
//             </tbody>
//         )
//     }
    
// }



const TableBody: React.FC<ITableComponent> = ({ isBelongsUser }) => {
    const dispatch = useAppDispatch();
    const { tables, status } = useAppSelector((state: RootState) => state.tables);
    const userId = useAppSelector((state: RootState) => state.user.id);

    useEffect(() => {
        if (isBelongsUser && userId !== undefined) {
            dispatch(tablesUserThunk({ userId }));
        } else if (!isBelongsUser) {
            dispatch(tablesThunk({}));
        }
    }, [dispatch, userId, isBelongsUser]);

    // Мемоизация JSX-элементов таблицы
    const tableRows = useMemo(() => {
        if (!tables) return null;
        return tables.map((el: ITable, index) => <TableItem key={index} {...el} />);
    }, [tables]);

    if (status === EStatus.LOADING) {
        return (
            <tbody>
                <tr>
                    <td>
                        <LoadingContent />
                    </td>
                </tr>
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