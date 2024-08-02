import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';


import { TablesAPI } from './api';
import { ITablesState } from '../reduxToolkit/tables/Itables';

 
import axiosConfig from './axiosConfig';
import { useAppSelector } from '../reduxToolkit/useAppDispatch';
import { RootState } from '../reduxToolkit/store';





// Асинхронный экшен для получения всех данных
export const tablesFetch: AsyncThunk<ITablesState[], string, {}> = createAsyncThunk<ITablesState[], string>('table/fetchAllTableData', async (url) => {
    

    const response = await axiosConfig.get(`${ url ? url  : TablesAPI}`, {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access_token')}`
            // 'Authorization': `JWT ${accessToken}`
        }
    });
    return response.data;
});


export const tablesUserFetch = createAsyncThunk<ITablesState, { url: string, userId: number }>(
    'table/fetchUserTableData',
    async ({ url, userId }) => {
        
        const response = await axiosConfig.get(`${TablesAPI}tableUser`, { params: { for_user: userId } });
        return response.data;
    }
  );

export default tablesFetch;
