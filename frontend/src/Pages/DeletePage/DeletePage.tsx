import { redirect, useNavigate, useParams } from 'react-router-dom';

import { GrStatusGood } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from '../../state/useAppDispatch';
import { RootState } from '../../state/store';
import { ITable } from '../../state/tables/Itables';
import { Loading, MyLink } from '../../widgets/Widgets';
import { useEffect, useState } from 'react';
import axiosConfig from '../../state/api/axiosConfig';




const DeletePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const tables = useAppSelector((state: RootState) => state.tables.tables);
    
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);

    // Поиск таблицы в Redux по ID
    const [table, setTable] = useState(tables.find((el: ITable) => el.id.toString() === id));

    useEffect(() => {
        const fetchTable = async () => {
            // setLoading(true);
            try {
                const response = await axiosConfig.get(`table/${id}/`);
                // dispatch(setTable(response.data)); // Обновление состояния в Redux
                setTable(response.data)
                console.log("update")
                return response.data
            } catch (err) {
                setError('Ошибка загрузки данных');
            } 
        };

        // Если таблица не найдена в Redux, выполняем запрос
        if (!table) {
            fetchTable();
        }
    }, [id, table, dispatch]);

    // // Показать сообщение о загрузке
    // if (loading) {
    //     return <p>Загрузка...</p>;
    // }

    // Показать сообщение об ошибке
    if (error) {
        return <p>{error}</p>;
    }

    // Проверка, если таблица не загружена (на случай, если Redux обновился, но данные не пришли)
    if (!table) {
        return <p>Таблица не найдена</p>;
    }

    const onDelete = async () => {
        
        // const response = await axiosConfig.delete(`table/${id}/`, {
        //     headers: {
        //         'Authorization': `JWT ${localStorage.getItem('access_token')}`
        //     }
        // });
        // console.log(response.data)
        // return response.data
        navigate("/")
        
    };

    return (
        <main className = 'flex justify-center items-center gap-5 flex-col'>
            <h2 className = ' text-2xl text-black dark:text-white'>Вы уверены что хотите удалить запись ?</h2>

            <div className = 'text-black dark:text-white font-medium'>
                <hr />
                <span>№</span>
                <hr />
                <h2>Название научной работы: { table.name }</h2>
                <hr />
                <p>Тип публикации: { table.Type }</p>
                <hr />
                <p className = 'flex justify-center flex-col items-center'>
                    <span>Информация об издании:</span>
                    <span><b>Название:</b>{ table.title }</span>
                    <span><b>Дата публикации:</b>{ table.data }</span>
                    <span><b>Томов:</b> { table.tom }.</span>
                    <span><b>Страницы: от</b> { table.page_start } <b>до</b> { table.page_end }</span>
                </p>
                <hr />
                <p>Кол-во страниц: { table.pages }</p>
                <hr />
                <p>Соавторы: { table.Co_authors }</p>
                <hr />
                <p>Дата создания публикации на сайте: { table.created_at }</p>
                <hr />
                <p>Дата обновления публикации на сайте: { table.updated_at }</p>
                <hr />
            </div>

            <div className = 'flex justify-center items-center gap-4'>
                <button onClick = { onDelete } className = 'transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-red-600 shadow-lg shadow-red-500/50 flex justify-center items-center text-white gap-3'>
                    <GrStatusGood /> Да
                </button>
                <MyLink to = "/" styled = 'transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center text-white gap-3'>
                    <RxCross1 /> Нет
                </MyLink>
            </div>

        </main>
    )
}

export default DeletePage;