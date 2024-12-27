import { useNavigate, useParams } from 'react-router-dom';

import { GrStatusGood } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from '../../store/useAppDispatch';
import { ITable } from '../../store/slices/tablesSlice/Itables';
import { useEffect, useState } from 'react';
import axiosConfig from '../../services/api/axiosConfig';
import { RootState } from '../../store/store';
import TableHead from '../../components/ux/Table/TableHead/TableHead';
import TableItem from '../../components/ux/Table/TableItem/TableItem';
import { MyLink } from '../../components/ui/ui';
import { headingTitleTable } from '../../components/ux/Table/Table';






const DeletePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const tables = useAppSelector((state: RootState) => state.tables.tables);
    
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);


    const [table, setTable] = useState(tables.find((el: ITable) => el.id.toString() === id));



    useEffect(() => {
        const fetchTable = async () => {
            try {
                const response = await axiosConfig.get(`table/${id}/`);
                setTable(response.data)
                return response.data
            } catch (err) {
                setError('Ошибка загрузки данных');
            } 
        };

        if (!table) fetchTable();
        
    }, [id, table, dispatch]);

    if (error) return <p>{error}</p>;
    
    if (!table) return <p>Таблица не найдена</p>;

    const onDelete = async () => {
        
        const response = await axiosConfig.delete(`table/${id}/`, );

        navigate("/")
        return response.data
    };
    
    return (
        <main className = 'flex justify-center items-center gap-5 flex-col'>
            <h2 className = ' text-2xl text-black dark:text-white'>Вы уверены что хотите удалить запись ?</h2>

            <table>
                <TableHead headingTitleTable = { headingTitleTable } />
                <tbody>
                    <TableItem { ...table }  />
                </tbody>
            </table>

           

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