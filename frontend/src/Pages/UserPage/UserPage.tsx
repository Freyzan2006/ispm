

import { EPath } from "../../Routers/ERouters";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import { RootState } from "../../state/store";
import { useAppSelector } from "../../state/useAppDispatch";
import { EButton } from "../../widgets/Button/EButton";
import { MyLink } from "../../widgets/Widgets";

import { MdAdminPanelSettings } from "react-icons/md";

import { FaPlus } from "react-icons/fa";
const UserPage: React.FC = () => {

    const { is_staff } = useAppSelector((state: RootState ) => state.user);

    return (
        
        <main className = "flex flex-col gap-5">
            <div className = " flex justify-center items-center gap-5 flex-wrap">
                <MyLink to = { EPath.ADD } styled = { EButton.GREEN }>
                    <FaPlus /> Добавить запись 
                </MyLink>

                {
                    is_staff || (
                    <a target = "_blank" href = { EPath.ADMIN_DISPLAY } className = { EButton.GREEN }>
                        <MdAdminPanelSettings /> Перейти в админ панель 
                    </a>
                    )
                }
            </div>

            <Table isBelongsUser = { true } />  
            <Pagination isBelongsUser = { true } />
        </main>
      
    )
}

export default UserPage;