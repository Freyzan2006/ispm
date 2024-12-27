

import css from "./TableHead.module.scss";

interface IProps {
    headingTitleTable: string[]
}

const TableHead: React.FC<IProps> = ({ headingTitleTable }) => {
    

    return (    
      
            
        <thead className= { css.adaptive_table_head }>
            <tr className = "text-black dark:text-white">

                {
                    headingTitleTable.map((title, index)  =>  
                        <th key = { index } className = "border-2 p-3 border-blue-600 dark:border-blue-950 dark:bg-slate-900" scope="col">
                            { title }
                        </th> 
                    )        
                }
            </tr>
        </thead>
            
            
        
        
    )
}

export default TableHead;