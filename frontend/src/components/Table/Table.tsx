
import { ITableComponent } from "./ITable"
import TableBody from "./TableBody/TableBody"
import TableHead from "./TableHead/TableHead"


const Table: React.FC<ITableComponent> = ({ isBelongsUser }) => {



    return (
        <div className = "overflow-x-auto ">
            <table className="table p-5 adaptive-table">
                <TableHead />
                <TableBody isBelongsUser = { isBelongsUser } />
            </table>

    

        </div>

    )
}

export default Table