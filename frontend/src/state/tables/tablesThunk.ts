import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../api/axiosConfig';

import { ISearchFiled, ITablesApiResponse } from './Itables';

import { SearchAPI, TableAPI } from '../api/EAPI';


export const tablesPaginationThunk = createAsyncThunk<ITablesApiResponse, { url?: string, page_size?: string }, { rejectValue: string }>(
    'table/fetchAllTableData',
    async ({ url, page_size }, { rejectWithValue }) => {
        try {
            const urlWithParams = `${url || TableAPI.ALL_TABLE_GET}${page_size ? `?page_size=${page_size}` : ""}`;
            const response = await axiosConfig.get<ITablesApiResponse>(urlWithParams);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch tables');
        }
    }
);



export const tablesThunk = createAsyncThunk<ITablesApiResponse, { url?: string }, { rejectValue: string }>(
    'table/fetchAllTableData',
    async ({ url }, { rejectWithValue }) => {
        try {
            const urlNow = url || TableAPI.ALL_TABLE_GET;
           
            const response = await axiosConfig.get<ITablesApiResponse>(`${urlNow}`);
            console.log(`${urlNow}`)
            
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

            });

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch user tables');
        }
    }
);

export const searchTablesThunk = createAsyncThunk<ITablesApiResponse, ISearchFiled, {}>(
    'table/searchFetchAllTableData', 
    async ({ searchName, searchPublicType, searchUser, searchDate, searchCoauthor }) => {


    const response = await axiosConfig.get(SearchAPI.SEARCH_GET, {

        params: {
            searchName: searchName,
            searchPublicType: searchPublicType,
            searchDate: searchDate,
            searchUser: searchUser,
            searchCoauthor: searchCoauthor
        }
    })

    return response.data;
});