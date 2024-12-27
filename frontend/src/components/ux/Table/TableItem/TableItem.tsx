




import { RiDeleteBin6Fill } from "react-icons/ri";

import { MdOutlinePublishedWithChanges } from "react-icons/md";



import { useEffect } from "react";

import { useLocation } from "react-router-dom";
import { RootState } from "../../../../store/store";
import { IAuthor, ITable } from "../../../../store/slices/tablesSlice/Itables";
import { useAppDispatch, useAppSelector } from "../../../../store/useAppDispatch";
import { ParseDate } from "../../../../utils/ParseDate";
import { publicTypeFetch } from "../../../../store/slices/publicTypeSlice/publicTypeFetch";
import { MyLink } from "../../../ui/ui";
import { LoadingContent } from "../../../layout/layout";


const TableItem: React.FC<ITable> = ({ id, Type, name, title, data, tom, issue, page_start, page_end, pages, authors, created_at, updated_at, for_user }) => {
    
    
    
    const userId = useAppSelector((state: RootState) => state.user.id );
    const dispatch = useAppDispatch()
  
    const parse_created_at = ParseDate(created_at);
    const parse_updated_at = ParseDate(updated_at); 

    const typePublication = useAppSelector(( state: RootState ) => state.publicTypes.publicTypes);
    const titleTypePublic = typePublication.find(el => el.id == Type);
   
   
    const parseAuthors = JSON.parse(authors as any);

    useEffect(() => {
        dispatch(publicTypeFetch())
    }, [])
    
    const location = useLocation();


    return (
        <tr className = "text-black dark:text-white" >
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900" scope="row">{ id || <LoadingContent w = "50px" h = "50px" /> }</td>
          
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900">{ name || <LoadingContent w = "50px" h = "50px" /> }</td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900">{ titleTypePublic?.title || <LoadingContent w = "50px" h = "50px" /> }</td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900 leading-loose">
                {
                    title ? (
                        <>
                            <span>{ title },</span>
                            <span>{ data }, </span>
                            <span>{ tom },</span>
                            <span>{ issue || "Нету" }</span>
                        </>
                    ) : <LoadingContent w = "50px" h = "50px" />
                }
                

            </td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900">
                {
                    pages ?
                    (<><b>от</b> { page_start }  <b>до</b> { page_end } всего { pages }</>)
                    : <LoadingContent w = "50px" h = "50px" />
                }
                
            </td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900">
               
                
                
                {
                    parseAuthors.map((author: IAuthor, index: number) => (
                        <div key = { index } className = "flex gap-3 flex-row justify-center items-center w-full">
                            {
                                author.first_name ? (
                                <>
                                    <p>{ author.first_name }</p>
                                    <p>{ author.last_name[0] }.</p>
                                    <p>{ author.patronymic[0] }.</p>
                                    <br />
                                </>
                                ) : <LoadingContent w = "50px" h = "50px" />
                            }
                        </div>
                    )) 
                }
                  
            </td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900">
                {
                    parse_created_at.day 
                    ?
                    (
                        <>
                        { parse_created_at.day }/{ parse_created_at.month }/{ parse_created_at.year } { `${parse_created_at.hours}:${parse_created_at.minutes}` }
                        </>
                    )
                    : <LoadingContent w = "50px" h = "50px" />
                }
                
                
            </td>
            <td className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900">
                {
                    parse_updated_at.day 
                    ?
                    (
                        <>
                        { parse_updated_at.day }/{ parse_updated_at.month }/{ parse_updated_at.year } { `${parse_updated_at.hours}:${parse_updated_at.minutes}` }
                        </>
                    ) : <LoadingContent w = "50px" h = "50px" />
                }
            </td>

            {
                userId == for_user && location.pathname.split("/")[1] != "delete"
                ? (
                    <td className = "flex flex-col gap-3 justify-center p-1 dark:bg-slate-900">
                        <p><MyLink to = {`/change/${id}`} styled="transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-yellow-500 shadow-lg shadow-yellow-500/50 flex justify-center items-center text-white gap-3"><MdOutlinePublishedWithChanges /> Изминить</MyLink></p> 
                        <p><MyLink to = {`/delete/${id}`} styled="transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-red-600 shadow-lg shadow-red-500/50 flex justify-center items-center text-white gap-3"><RiDeleteBin6Fill /> Удалить</MyLink></p> 
                    </td> 
                ) : <td></td>
                
            }
        </tr>
    )
}

export default TableItem;