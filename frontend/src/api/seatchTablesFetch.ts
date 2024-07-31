import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';


import { TablesAPI } from './api';
import { ITablesState } from '../reduxToolkit/tables/Itables';

 
import axiosConfig from './axiosConfig';





// Асинхронный экшен для получения всех данных
export const searchTablesFetch: AsyncThunk<ITablesState[], string, {}> = createAsyncThunk<ITablesState[], string>('table/searchFetchAllTableData', async ({ searchName, searchDate, searchCoauthor }) => {


    const response = await axiosConfig.get("search/", {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access_token')}`
        },
        params: {
            searchName: searchName,
            
            searchDate: searchDate,

            searchCoauthor: searchCoauthor
        }
    })

    console.log(response.data)

    return response.data;
});



