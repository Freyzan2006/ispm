import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../api/axiosConfig';

import { ISearchFiled, ITablesApiResponse } from './Itables';

import { SearchAPI, TableAPI } from '../api/EAPI';



export const tablesThunk = createAsyncThunk<ITablesApiResponse, {}, { rejectValue: string }>(
    'table/fetchAllTableData',
    async ({}, { rejectWithValue }) => {
        try {
            const response = await axiosConfig.get<ITablesApiResponse>(`${TableAPI.ALL_TABLE_GET}`, {
                // headers: {
                //     'Authorization': `${KeyWordJWT.KEY} ${localStorage.getItem('access_token')}`
                // }
            });

          
            
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch tables');
        }
    }
);

export const tablesUserThunk = createAsyncThunk<ITablesApiResponse, { userId: number | null }, { rejectValue: string }>(
    'table/fetchUserTableData',
    async ({ userId }, { rejectWithValue }) => {
        try {
            const response = await axiosConfig.get<ITablesApiResponse>(TableAPI.ALL_TABLE_USER_GET, {
                params: { for_user: userId },
                // headers: {
                //     'Authorization': `${KeyWordJWT.KEY} ${localStorage.getItem('access_token')}`
                // }
            });

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch user tables');
        }
    }
);








export const searchTablesThunk = createAsyncThunk<ITablesApiResponse, ISearchFiled, {}>(
    'table/searchFetchAllTableData', 
    async ({ searchName, searchDate, searchCoauthor }) => {


    const response = await axiosConfig.get(SearchAPI.SEARCH_GET, {
        // headers: {
        //     'Authorization': `JWT ${localStorage.getItem('access_token')}`
        // },
        params: {
            searchName: searchName,
            
            searchDate: searchDate,

            searchCoauthor: searchCoauthor
        }
    })

   

    return response.data;
});