import { EPath } from "../../routers/ERouters";
import Pagination from "../../components/ux/Pagination/Pagination";
import { useAppSelector } from "../../store/useAppDispatch";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { RootState } from "../../store/store";
import { EButton } from "../../components/ui/Button/EButton";
import { MyLink } from "../../components/ui/ui";
import { Table } from "../../components/ux/ux";
import { NotFoundPage } from "../Page";

const UserPage: React.FC = () => {

    const { is_staff, username } = useAppSelector((state: RootState ) => state.user);

    if ( !username )
        return <NotFoundPage />

    return (
        
        <main className = "flex flex-col gap-5">
            <div className = " flex justify-center items-center gap-5 flex-wrap">
                <MyLink to = { EPath.ADD } styled = { EButton.GREEN }>
                    <FaPlus /> Добавить запись 
                </MyLink>

                {
                    is_staff && (
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