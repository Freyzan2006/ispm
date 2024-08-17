
import { EPath } from "../../Routers/ERouters";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import { EButton } from "../../widgets/Button/EButton";
import { MyLink } from "../../widgets/Widgets";

import { FaPlus } from "react-icons/fa";
const UserPage: React.FC = () => {
    return (
        
        <main className = "flex flex-col gap-5">
            <div className = " flex justify-center items-center ">
                <MyLink to = { EPath.ADD } styled = { EButton.GREEN }>
                    <FaPlus /> Добавить запись 
                </MyLink>
            </div>

            <Table isBelongsUser = { true } />  
            <Pagination isBelongsUser = { true } />
        </main>
      
    )
}

export default UserPage;