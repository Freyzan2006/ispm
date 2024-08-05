import { useEffect, useState } from "react";

import css from "./SearchPage.module.scss"

import { FaSearch } from "react-icons/fa";

import Table from "../../components/Table/Table";
import Pagination from "../../components/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../state/useAppDispatch";

import { searchTablesThunk } from "../../state/tables/tablesThunk";

import { fetchUsers } from "../../state/api/usersFetch";
import { RootState } from "../../state/store";
import { publicTypeFetch } from "../../state/publicType/publicTypeFetch"; 




import { yearsRage } from "../../utils";


const SearchPage: React.FC = () => {
    const [searchName, setSearchName] = useState<string>("");
    const [ searchPublicType, setSearchPublicType ] = useState<string>("");
    const [ searchUser, setSearchUser ] = useState<string>("");
    const [searchDate, setSearchDate] = useState<string>("");
    const [searchCoauthor, setSearchCoauthor] = useState<string>("");

    const dispatch = useAppDispatch();
    const { users, status, error } = useAppSelector((state: RootState) => state.users);
    const { publicTypes } = useAppSelector((state: RootState) => state.publicTypes)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
            dispatch(publicTypeFetch())
        }
    }, []);

    const handlerSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(searchTablesThunk({ searchName, searchPublicType, searchUser, searchDate, searchCoauthor }));
       
    };



    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error loading users: {error}</div>;

    return (
        <main className="flex justify-center items-center flex-col gap-5">
            <form className={`${css.SearchPage}`} onSubmit={handlerSubmit}>
                <h1 className="text-black dark:text-white text-2xl">Поиск</h1>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                    <input
                        placeholder="Название публикации"
                        type="text"
                        className={css.SearchPage__search}
                        onChange={(e) => setSearchName(e.target.value)}
                        value={searchName}
                    />

                    <select className = { css.SearchPage__selector } value={searchPublicType || ''} onChange = { (e) => setSearchPublicType(e.target.value) }>
                        <option value = { '' }>
                            --------
                        </option>
                        {publicTypes.map((el, index) => (
                            <option value={el.id} key={index}>
                                {el.title}
                            </option>
                        ))}
                    </select>

                   
                    <select className = { css.SearchPage__selector } value = { searchUser || '' } onChange = { (e) => setSearchUser(e.target.value) }>
                        <option value = { '' }>
                            --------
                        </option>
                        {users.map((el, index) => (
                            <option value={el.id} key={index}>
                                {el.username}
                            </option>
                        ))}
                    </select>
         
                    <select className = { css.SearchPage__selector } value={searchDate || ''} onChange = { (e) => setSearchDate(e.target.value) }>
                        <option value = { '' }>
                            --------
                        </option>
                        {yearsRage.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                        ))}
                    </select>

                    <input
                        placeholder="Соавтор"
                        type="text"
                        className={css.SearchPage__search}
                        onChange={(e) => setSearchCoauthor(e.target.value)}
                        value={searchCoauthor}
                    />
                </div>

                <button
                    type="submit"
                    className={`transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center text-white gap-3`}
                >
                    <FaSearch /> Поиск
                </button>
            </form>

         
            <Table />
            <Pagination />
        </main>
    );
};

export default SearchPage;