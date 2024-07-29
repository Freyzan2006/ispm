
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import css from "./UserPage.module.scss";

const UserPage: React.FC = () => {
    return (
        
        <main className = "flex flex-col gap-3">
            <Table isBelongsUser = { true } />  
            <Pagination />
        </main>
      
    )
}

export default UserPage;