

import { RootState } from "../../state/store"
import { useAppSelector } from "../../state/useAppDispatch"
import { MyLink } from "../../widgets/Widgets"
import Download from "../Download/Download"
import ErrorAlert from "../ErrorAlert/ErrorAlert"
import LoadingContent from "../LoadingContent/LoadingContent"
import { ITableComponent } from "./ITable"
import TableBody from "./TableBody/TableBody"

import TableHead from "./TableHead/TableHead"


const Table: React.FC<ITableComponent> = ({ isBelongsUser }) => {

    const isTable: number = useAppSelector((state: RootState) => state.tables.tables).length;

    return (
        <div className = "overflow-x-auto pb-5 flex flex-col gap-2 items-center  p-3">
            <table className="table p-5 adaptive-table">
                { isTable ? <TableHead /> : <></> }
                <TableBody isBelongsUser = { isBelongsUser } />
            </table>

            { isTable ? <Download /> : <>
            <LoadingContent />
            <ErrorAlert errorMessage="Записей в таблице не найдено " />
            </>  }
        </div>

    )
}



export default Table