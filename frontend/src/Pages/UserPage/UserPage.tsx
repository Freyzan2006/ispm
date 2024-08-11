
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";


const UserPage: React.FC = () => {
    return (
        
        <main className = "flex flex-col gap-3">
            <Table isBelongsUser = { true } />  
            <Pagination isBelongsUser = { true } />
        </main>
      
    )
}

export default UserPage;