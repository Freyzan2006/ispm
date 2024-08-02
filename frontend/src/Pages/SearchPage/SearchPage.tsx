import { useEffect, useState } from "react";

import css from "./SearchPage.module.scss"

import { FaSearch } from "react-icons/fa";

import Table from "../../components/Table/Table";
import Pagination from "../../components/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../reduxToolkit/useAppDispatch";

import { searchTablesFetch } from "../../api/seatchTablesFetch";
import axiosConfig from "../../api/axiosConfig";
import { fetchUsers } from "../../api/usersFetch";
import { RootState } from "../../reduxToolkit/store";
import { publicTypeFetch } from "../../api/publicTypeFetch";


interface ISearchFiled {
    searchName: string;
    searchDate: string;
    searchCoauthor: string;
    searchTitle: string;
    searchUser: string;
}

const SearchPage: React.FC = () => {
    const [searchName, setSearchName] = useState<string>("");
    const [searchDate, setSearchDate] = useState<string>("");
    const [searchCoauthor, setSearchCoauthor] = useState<string>("");

    const dispatch = useAppDispatch();
    const { users, status, error } = useAppSelector((state: RootState) => state.users);
    const { publicTypes, status2, error2 } = useAppSelector((state: RootState) => state.publicTypes)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
            dispatch(publicTypeFetch())
        }
    }, []);

    const handlerSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(searchTablesFetch({ searchName, searchDate, searchCoauthor }));
        console.log("search");
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

                    <select className = { css.SearchPage__selector } name="" id="">
                        {publicTypes.map((el, index) => (
                            <option value={el.id} key={index}>
                                {el.title}
                            </option>
                        ))}
                    </select>

                   
                    <select className = { css.SearchPage__selector } name="" id="">
                        {users.map((el, index) => (
                            <option value={el.id} key={index}>
                                {el.username}
                            </option>
                        ))}
                    </select>

                    <input
                        placeholder="Год издания"
                        type="text"
                        className={css.SearchPage__search}
                        onChange={(e) => setSearchDate(e.target.value)}
                        value={searchDate}
                    />

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
                    <FaSearch /> Войти
                </button>
            </form>

         
            <Table />
            <Pagination />
        </main>
    );
};

export default SearchPage;