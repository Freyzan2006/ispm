
import css from "./TableHead.module.scss";

const TableHead: React.FC = () => {
    return (    
        <thead className= { css.adaptive_table_head }>
            <tr className = "text-black dark:text-white">
                <th className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900" scope="col">№</th> 
                <th className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900" scope="col">Название научной работы</th> 
                <th className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900" scope="col">Тип публикации</th> 
                <th className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900" scope="col">Информация об издании</th> 
                <th className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900" scope="col">Кол-во страниц</th>  
                <th className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900" scope="col">Соавторы</th>
                <th className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900" scope="col">Дата создания публикации на сайте</th>
                <th className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900" scope="col">Дата обновления публикации на сайте</th>
            </tr>
        </thead>
    )
}

export default TableHead;