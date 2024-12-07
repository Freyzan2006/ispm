


import { RootState } from "../../../store/store"
import { useAppSelector } from "../../../store/useAppDispatch"
import Download from "../Download/Download"
import { ITableComponent } from "./ITable"
import TableBody from "./TableBody/TableBody"

import TableHead from "./TableHead/TableHead"


const Table: React.FC<ITableComponent> = ({ isBelongsUser }) => {

    const isTable: number = useAppSelector((state: RootState) => state.tables.tables).length;

    return (
        <div className = "overflow-x-auto pb-5 flex flex-col gap-2 items-center p-3 overflow-y-auto max-h-[800px]">
            <table className="table p-5 adaptive-table">
                { isTable ? <TableHead /> : <></> }
                <TableBody isBelongsUser = { isBelongsUser } />
            </table>

            { isTable ? <Download /> : <></> }

            
        </div>

    )
}



export default Table