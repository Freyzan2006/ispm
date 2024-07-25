import TableBody from "./TableBody/TableBody"
import TableHead from "./TableHead/TableHead"


const Table: React.FC = () => {
    return (
        <div className = "overflow-x-auto ">
            <table className="table p-5 adaptive-table">
                <TableHead />
                <TableBody />
            </table>
        </div>

    )
}

export default Table