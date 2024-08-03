

import { RootState } from "../../../state/store";
import { ITable } from "../../../state/tables/Itables";
import { useAppSelector } from "../../../state/useAppDispatch";

import { RiDeleteBin6Fill } from "react-icons/ri";

import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { MyLink } from "../../../widgets/Widgets";

const TableItem: React.FC<ITable> = ({ id, Type, name, title, data, tom, issue, page_start, page_end, pages, Co_authors, created_at, updated_at, for_user }) => {

   
    const userId = useAppSelector((state: RootState) => state.user.id );
  

    return (
        <tr className = "text-black dark:text-white" >
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950" scope="row">{ id }</td>
            {/* {% comment %} <th class = "border-2 p-3 border-blue-950">{{ t.for_user_id }}</th> {% endcomment %} */}
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950">{ name }</td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950">{ Type }</td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 leading-loose">
                <span><b>Название:</b>{ title }.</span>
                <span><b>Дата публикации:</b>{ data } </span>
                <span><b>Томов:</b> { tom }.</span>
                <span><b>Страницы: от</b> { page_start } <b>до</b> { page_end }</span>
            </td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950">{ pages }</td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950">{ Co_authors }</td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950">{ created_at }</td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950">{ updated_at }</td>

            {
                userId == for_user 
                ? (
                    <td className = "flex flex-col gap-3 justify-center p-1">
                        <p><MyLink to = {`change/${id}`} styled="transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-yellow-500 shadow-lg shadow-yellow-500/50 flex justify-center items-center text-white gap-3"><RiDeleteBin6Fill /> Изминить</MyLink></p> 
                        <p><MyLink to = {`delete/${id}`} styled="transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-red-600 shadow-lg shadow-red-500/50 flex justify-center items-center text-white gap-3"><MdOutlinePublishedWithChanges /> Удалить</MyLink></p> 
                    </td> 
                ) : <td></td>
                
            }
        </tr>
    )
}

export default TableItem;