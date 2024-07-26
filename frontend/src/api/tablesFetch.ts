import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { TablesAPI } from './api';
import { ITablesState } from '../reduxToolkit/tables/Itables';

 
import axiosConfig from './axiosConfig';

// Создайте асинхронный экшен для получения данных с сервера
export const tablesFetch: AsyncThunk<ITablesState[], string, {}> = createAsyncThunk<ITablesState[], string>('table/fetchTableData', async (url: string = TablesAPI) => {
    // Выполните запрос к API
    const response = await axiosConfig.get(url);
    // Возвращаем данные в формате, который будет обработан в extraReducers
    return response.data;
});


export default tablesFetch;
