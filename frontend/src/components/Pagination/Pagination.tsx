

import { useEffect, useState } from "react";
import { searchTablesPaginationThunk, searchTablesThunk, tablesPaginationThunk, tablesThunk, tablesUserPaginationThunk } from "../../state/tables/tablesThunk";
import { RootState } from "../../state/store";
import { useAppDispatch, useAppSelector } from "../../state/useAppDispatch";

import { RiPagesLine } from "react-icons/ri";

import css from "./Pagination.module.scss";

import { GrNext } from "react-icons/gr";
import { IoChevronBackSharp } from "react-icons/io5";
import Button from "../../widgets/Button/Button";
import { EButton, ITypeBtn } from "../../widgets/Button/EButton";
import { PAGINATION_SIZE } from "../../state/api/config";
import { ChangePagination, SetCurrentPage, SetMaxPaginationCount } from "../../state/pagination/paginationSlice";

import { IProps } from "./IPagination"; 

const Pagination: React.FC<IProps> = ({ isBelongsUser, isSearch }) => {

    const dispatch = useAppDispatch();
    const { nextPage, previousPage, count, tables } = useAppSelector((state: RootState) => state.tables);

    const { paginationCount, maxPaginationCount, minPaginationCount, currentPage } = useAppSelector((state: RootState) => state.pagination)

    
    const { id } = useAppSelector((state: RootState) => state.user)

    const { searchName, searchPublicType, searchUser, searchCoauthor, searchDate } = useAppSelector((state: RootState) => state.search); 
    
    useEffect(() => {
        if (count > 0 && count <= 100) {
          dispatch(SetMaxPaginationCount(count));
        }
    }, [count, dispatch]);
  
    

    const handlePageChange = (url: string | null, pageNumber: number) => {
        
        dispatch(SetCurrentPage(pageNumber))
        
        if (url) {
            console.log(url)
           
            dispatch(tablesThunk({ url: url }))
        }
       
        // if (url && paginationCount == PAGINATION_SIZE) {
        //     dispatch(tablesThunk({ url: url }));
        //     console.log("1: ", url)
        // }
        // else if (url && paginationCount) {
        //     dispatch(tablesThunk({ url: url, page_size: paginationCount.toString() }));
        //     console.log("2: ", paginationCount)
        // }
    };


    const handlePagination = (value: string) => {
        dispatch(ChangePagination(+value));

        if ( isBelongsUser ) {
            dispatch(tablesUserPaginationThunk({ userId: id, page_size: +value }))
        } else if ( isSearch ) {
            
            dispatch(searchTablesPaginationThunk({ searchName, searchPublicType, searchUser, searchDate, searchCoauthor, page_size: +value }))
        } else {
            dispatch(tablesPaginationThunk({ page_size: value }));
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