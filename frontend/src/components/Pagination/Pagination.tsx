

import { useEffect, useState } from "react";
import { tablesThunk } from "../../state/tables/tablesThunk";
import { RootState } from "../../state/store";
import { useAppDispatch, useAppSelector } from "../../state/useAppDispatch";

import { RiPagesLine } from "react-icons/ri";

import css from "./Pagination.module.scss";

import { GrNext } from "react-icons/gr";
import { IoChevronBackSharp } from "react-icons/io5";
import Button from "../../widgets/Button/Button";
import { EButton, ITypeBtn } from "../../widgets/Button/EButton";
import { PAGINATION_SIZE } from "../../state/api/config";
import { ChangePagination, SetMaxPaginationCount } from "../../state/pagination/paginationSlice";

const Pagination: React.FC = () => {

    const dispatch = useAppDispatch();
    const { nextPage, previousPage, count, tables } = useAppSelector((state: RootState) => state.tables);

    const { paginationCount, maxPaginationCount, minPaginationCount } = useAppSelector((state: RootState) => state.pagination)

    const [ currentPage, setCurrentPage ] = useState<number>(1);


    
    useEffect(() => {
        if (count > 0) {
          dispatch(SetMaxPaginationCount(count));
        }
    }, [count, dispatch]);
  
    

    const handlePageChange = (url: string | null, pageNumber: number) => {
        if (url) {
            setCurrentPage(pageNumber);
            dispatch(tablesThunk({ url }));
        }
    };

    // const { userId } = useAppSelector((state: RootState) => state.user.id)

    const handlePagination = (value: string) => {
        dispatch(ChangePagination(+value));

        dispatch(tablesThunk({ page_size: value }));
    }

    const paginationSize = PAGINATION_SIZE;
    const countTableInPage = tables.length;

    return (
        <section className = { css.pagination }>
            <Button onClick={() => handlePageChange(previousPage, currentPage - 1)} type = { ITypeBtn.BUTTON } styled = { EButton.IS_ACTIVE } disabled = {!previousPage} >
                <IoChevronBackSharp /> { currentPage - 1 <= 0 ? '' : currentPage - 1 }
            </Button>

            <span className = " dark:text-white text-slate-900 flex justify-center items-center flex-row">Сейчас <RiPagesLine />: { currentPage }</span>
            <span className = " dark:text-white text-slate-900 flex justify-center items-center flex-row">Сейчас записей <RiPagesLine />: { countTableInPage }</span>
            <span className = " dark:text-white text-slate-900 flex justify-center items-center flex-row">Всего записей <RiPagesLine />: { count }</span>

            <div className= { `${css.pagination__control} text-black dark:text-white` }>
                <label htmlFor="paginationControl">записей на странице: { paginationCount }</label>
                <div className = "flex justify-center items-center gap-3">
                    <span>{ minPaginationCount }</span>
                    <input id = "paginationControl" className = { css.pagination__input } onChange = { (e) => handlePagination(e.target.value) } value = { paginationCount } min = { minPaginationCount } max = { maxPaginationCount } step="1" type="range" />
                    <span>{ maxPaginationCount }</span>
                </div>
            </div>
           
            
            <Button onClick={() => handlePageChange(nextPage, currentPage + 1)} type = { ITypeBtn.BUTTON } styled = { EButton.IS_ACTIVE } disabled = {!nextPage} >
                <GrNext /> { count / paginationSize ? currentPage + 1 : '' }
            </Button>
        </section>
    )
}

export default Pagination;