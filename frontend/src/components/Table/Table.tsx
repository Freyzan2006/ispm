
import Download from "../Download/Download"
import { ITableComponent } from "./ITable"
import TableBody from "./TableBody/TableBody"

import TableHead from "./TableHead/TableHead"


const Table: React.FC<ITableComponent> = ({ isBelongsUser }) => {



    return (
        <div className = "overflow-x-auto pb-5 flex flex-col gap-2 items-center">
            <table className="table p-5 adaptive-table">
                <TableHead />
                <TableBody isBelongsUser = { isBelongsUser } />
            </table>

            <Download />
        </div>

    )
}

export default Table