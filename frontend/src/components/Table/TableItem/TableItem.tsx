

import { RootState } from "../../../state/store";
import { ITable } from "../../../state/tables/Itables";
import { useAppSelector } from "../../../state/useAppDispatch";

import { RiDeleteBin6Fill } from "react-icons/ri";

import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { MyLink } from "../../../widgets/Widgets";
import { ParseDate } from "../../../utils/ParseDate";

import { IAuthor } from "../../../state/tables/Itables";

const TableItem: React.FC<ITable> = ({ id, Type, name, title, data, tom, issue, page_start, page_end, pages, authors, created_at, updated_at, for_user }) => {

   
    const userId = useAppSelector((state: RootState) => state.user.id );
  
    const parse_created_at = ParseDate(created_at);
    const parse_updated_at = ParseDate(updated_at); 

   
    const parseAuthors = JSON.parse(authors);
    

    return (
        <tr className = "text-black dark:text-white " >
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900" scope="row">{ id }</td>
          
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900">{ name }</td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900">{ Type }</td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900 leading-loose">
                <span><b>Название:</b>{ title }.</span>
                <span><b>Дата публикации:</b>{ data } </span>
                <span><b>Томов:</b> { tom }.</span>
                <span><b>Страницы: от</b> { page_start } <b>до</b> { page_end }</span>
                <span><b>Номер: </b>{ issue || "Нету" }</span>
            </td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900">{ pages }</td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900">
                <div className="flex flex-row justify-between items-center w-full">
                    <p>№</p>
                    <p>Фамилия:</p>
                    <p>Имя:</p>
                    <p>Отчества:</p>
                </div>
                
                { parseAuthors.map((author: IAuthor, index: number) => (
                    <div key = { index } className = "flex gap-3 flex-row justify-between items-center w-full">
                        <b>{ index + 1 }.</b>
                        <p>{ author.last_name }</p>
                        <p>{ author.first_name }</p>
                        <p>{ author.patronymic }</p><br />
                    </div>
                )) }
            </td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900">{ parse_created_at.day }/{ parse_created_at.month }/{ parse_created_at.year } { `${parse_created_at.hours}:${parse_created_at.minutes}` }</td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900">{ parse_updated_at.day }/{ parse_updated_at.month }/{ parse_updated_at.year } { `${parse_updated_at.hours}:${parse_updated_at.minutes}` }</td>

            {
                userId == for_user 
                ? (
                    <td className = "flex flex-col gap-3 justify-center p-1 dark:bg-slate-900">
                        <p><MyLink to = {`change/${id}`} styled="transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-yellow-500 shadow-lg shadow-yellow-500/50 flex justify-center items-center text-white gap-3"><RiDeleteBin6Fill /> Изминить</MyLink></p> 
                        <p><MyLink to = {`delete/${id}`} styled="transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-red-600 shadow-lg shadow-red-500/50 flex justify-center items-center text-white gap-3"><MdOutlinePublishedWithChanges /> Удалить</MyLink></p> 
                    </td> 
                ) : <td></td>
                
            }
        </tr>
    )
}

export default TableItem;