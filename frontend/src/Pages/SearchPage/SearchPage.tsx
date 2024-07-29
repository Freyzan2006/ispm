import { useState } from "react";

import css from "./SearchPage.module.scss"

import { FaSearch } from "react-icons/fa";

const SearchPage: React.FC = () => {
    const [searchType, setSearchType] = useState<string>("");
    const [searchName, setSearchName] = useState<string>("");

    const handlerSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        console.log("search");
    }

    return (
        <main className = "flex justify-center items-center">
            <form className = { `${css.SearchPage} ` } onSubmit = { handlerSubmit }>
                <h1 className = "text-black dark:text-white  text-2xl">Поиск</h1>
                <div className = "flex justify-center items-center gap-4 flex-wrap">
                    <input placeholder = "Тип" type="text" 
                        className = { css.SearchPage__search } 
                        onChange = { (e) => setSearchType(e.target.value) }
                        value = { searchType }
                    />

                    <input placeholder = "Название записи" type="text" 
                        className = { css.SearchPage__search } 
                        onChange = { (e) => setSearchName(e.target.value) }
                        value = { searchName }
                    />

                    <input placeholder = "Пользователя записи" type="text" 
                        className = { css.SearchPage__search } 
                        onChange = { (e) => setSearchName(e.target.value) }
                        value = { searchName }
                    />
                </div>

 
                <button type = "submit" className = { `transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center text-white gap-3` }><FaSearch /> Войти</button>
            </form>

        </main>
    )
}

export default SearchPage;