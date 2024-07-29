

import { useState } from "react";
import tablesFetch from "../../api/tablesFetch";
import { RootState } from "../../reduxToolkit/store";
import { useAppDispatch, useAppSelector } from "../../reduxToolkit/useAppDispatch";

import { RiPagesLine } from "react-icons/ri";

import css from "./Pagination.module.scss";

import { GrNext } from "react-icons/gr";
import { IoChevronBackSharp } from "react-icons/io5";

const Pagination: React.FC = () => {

    const dispatch = useAppDispatch();
    const { nextPage, previousPage, count } = useAppSelector((state: RootState) => state.tables);

    const [ currentPage, setCurrentPage ] = useState<number>(1);

    const handlePageChange = (url: string | null, pageNumber: number) => {
        if (url) {
            setCurrentPage(pageNumber);
            console.log(url)
            dispatch(tablesFetch(url));
        }
    };

    return (
        <div className = { css.pagination }>
            <button
                onClick={() => handlePageChange(previousPage, currentPage - 1) }
                disabled={!previousPage}
                className = "  disabled:bg-red-800 disabled:shadow-red-500/50 transition disabled:hover:scale-100 hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center text-white gap-3"
            >
                <IoChevronBackSharp />
            </button>
            <span className = " dark:text-white text-slate-900 flex justify-center items-center flex-row">Сейчас <RiPagesLine />: { currentPage }</span>
            <span className = " dark:text-white text-slate-900 flex justify-center items-center flex-row">Всего <RiPagesLine />: { count }</span>
            <button
                onClick={() => handlePageChange(nextPage,  currentPage + 1) }
                disabled={!nextPage}

                className = "disabled:bg-red-800 disabled:shadow-red-500/50 transition disabled:hover:scale-100 hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center text-white gap-3"
            >
                <GrNext />
            </button>
        </div>
    )
}

export default Pagination;