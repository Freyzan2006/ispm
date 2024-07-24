import TableBody from "./TableBody/TableBody"
import TableHead from "./TableHead/TableHead"


const Table: React.FC = () => {
    return (
        <table className="table p-5 adaptive-table">
            <TableHead />
            <TableBody />
        </table>
    )
}

export default Table