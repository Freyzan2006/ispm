
import { useEffect } from "react";
import { searchTablesPaginationThunk, tablesPaginationThunk, tablesThunk, tablesUserPaginationThunk } from "../../../store/slices/tablesSlice/tablesThunk";
import { RootState } from "../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../store/useAppDispatch";

import { RiPagesLine } from "react-icons/ri";

import css from "./Pagination.module.scss";

import { GrNext } from "react-icons/gr";
import { IoChevronBackSharp } from "react-icons/io5";
import { Button } from "../../ui/ui";

import { PAGINATION_SIZE } from "../../../services/api/config";
import { ChangePagination, SetCurrentPage, SetMaxPaginationCount } from "../../../store/slices/paginationSlice/paginationSlice";

import { IProps } from "./IPagination"; 
import { EButton, ITypeBtn } from "../../ui/Button/EButton";

const Pagination: React.FC<IProps> = ({ isBelongsUser, isSearch }) => {

    const dispatch = useAppDispatch();
    const { nextPage, previousPage, count, tables } = useAppSelector((state: RootState) => state.tables);

    const { paginationCount, maxPaginationCount, minPaginationCount, currentPage } = useAppSelector((state: RootState) => state.pagination)

    
    const { id } = useAppSelector((state: RootState) => state.user)

    const { searchName, searchPublicType, searchUser, searchDate } = useAppSelector((state: RootState) => state.search); 
    
    useEffect(() => {
        dispatch(SetCurrentPage(1));

        if (count > 0 && count <= 100) 
          dispatch(SetMaxPaginationCount(count));
        
    }, [count, dispatch]);
  
    

    const handlePageChange = (url: string | null, pageNumber: number) => {
        dispatch(SetCurrentPage(pageNumber))
        
        if (url) {
            dispatch(tablesThunk({ url: url }))
        }

    };


    const handlePagination = (value: string) => {
        const pageSize = +value;
        dispatch(ChangePagination(pageSize));
        // dispatch(ChangePagination(+value));

        if ( isBelongsUser ) {
            dispatch(tablesUserPaginationThunk({ userId: id, page_size: pageSize }))
        } else if ( isSearch ) {
            
            dispatch(searchTablesPaginationThunk({ searchName, searchPublicType, searchUser, searchDate, page_size: pageSize }))
        } else {
            dispatch(tablesPaginationThunk({ page_size: String(pageSize) }));
        }
    }

    const paginationSize = PAGINATION_SIZE;
    const countTableInPage = tables.length;

    return (
        <section className = { css.pagination }>
            <Button onClick={() => handlePageChange(previousPage, currentPage - 1)} type = { ITypeBtn.BUTTON } styled = { `${EButton.IS_ACTIVE} ${!previousPage ? EButton.RED : EButton.GREEN}` } disabled = {!previousPage} >
                <IoChevronBackSharp /> { currentPage - 1 <= 0 ? '' : currentPage - 1 }
            </Button>

            <span className = " dark:text-white text-slate-900 flex justify-center items-center flex-row">Сейчас <RiPagesLine />: { currentPage }</span>
            <span className = " dark:text-white text-slate-900 flex justify-center items-center flex-row">Сейчас записей <RiPagesLine />: { countTableInPage }</span>
            <span className = " dark:text-white text-slate-900 flex justify-center items-center flex-row">Всего записей <RiPagesLine />: { count }</span>

            <div className= { `${css.pagination__control} text-black dark:text-white` }>
                <label htmlFor="paginationControl">Записей на странице: { paginationCount }</label>
                <div className = "flex justify-center items-center gap-3">
                    <span>{ minPaginationCount }</span>
                    <input id = "paginationControl" className = { `${css.pagination__input} ` } onChange = { (e) => handlePagination(e.target.value) } value = { paginationCount } min = { minPaginationCount } max = { maxPaginationCount } step="1" type="range" />
                    <span>{ maxPaginationCount }</span>
                </div>
            </div>
           
            
            <Button onClick={() => handlePageChange(nextPage, currentPage + 1)} type = { ITypeBtn.BUTTON } styled = { `${EButton.IS_ACTIVE} ${!nextPage ? EButton.RED : EButton.GREEN}` } disabled = {!nextPage} >
                <GrNext /> { count / paginationSize ? currentPage + 1 : '' }
            </Button>
        </section>
    )
}

export default Pagination;