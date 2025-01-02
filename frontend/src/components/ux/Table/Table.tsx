




import { RootState } from "../../../store/store"
import { useAppSelector } from "../../../store/useAppDispatch"

import Download from "../Download/Download"

import { ITableComponent } from "./ITable"
import TableBody from "./TableBody/TableBody"

import TableHead from "./TableHead/TableHead"

import { useFetchTables } from "../../../hooks/useFetchTables"

export const headingTitleTable = ["№", "Название научной работы", "Тип публикации", 
    "Информация об издании", "Кол-во страниц", "Соавторы", 
    "Дата создания публикации на сайте", "Дата обновления публикации на сайте"
];

import css from "./Table.module.scss"


const Table: React.FC<ITableComponent> = ({ isBelongsUser }) => {

    



    
    const isHaveTable = useAppSelector((state: RootState) => state.tables.tables.length);
   

   

    useFetchTables({ isBelongsUser });
    
    
    // overflow-x: hidden;
    // overflow-x-auto
    return (
        <div className = {`${css.Table}  pb-5 flex flex-col gap-2 items-center p-3 overflow-y-auto max-h-[800px] min-h-[300px] `}>
            <table className="table adaptive-table">
                { isHaveTable ? <TableHead headingTitleTable = { headingTitleTable } /> : <></> }
                <TableBody />
            </table> 
            { isHaveTable ? <Download /> : <></> }
        </div>
    )
    
}



export default Table