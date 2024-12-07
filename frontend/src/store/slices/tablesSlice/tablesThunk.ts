// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axiosConfig from '../api/axiosConfig';

// import { ISearchFiled, ITablesApiResponse } from './Itables';

// import { SearchAPI, TableAPI } from '../api/EAPI';

// import { tableService } from '../../../services/TableService/TableService';
// import { TableAPIParams } from '../../../services/TableService/ITableAPI';


// export const tablesPaginationThunk = createAsyncThunk<ITablesApiResponse, { url?: string, page_size?: string }, { rejectValue: string }>(
//     'table/fetchAllTableData',
//     async ({ url, page_size }, { rejectWithValue }) => {
//         try {
//             const params: TableAPIParams = {
//                 page_size: page_size,
//                 url: url
//             }

//             return tableService.getItems(params);
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data || 'Запрос на получение таблицы не сработал');
//         }
//     }
// );



// export const tablesThunk = createAsyncThunk<ITablesApiResponse, { url?: string }, { rejectValue: string }>(
//     'table/fetchAllTableData',
//     async ({ url }, { rejectWithValue }) => {
//         try {
//             // const urlNow = url || TableAPI.ALL_TABLE_GET;
            
          
//             // const response = await axiosConfig.get<ITablesApiResponse>(`${urlNow}`);
            
           
            
//             // return response.data;

//             const params: TableAPIParams = {
//                 url: url
//             }

//             return tableService.getItems(params);
//         } catch (error: any) {
           
//             return rejectWithValue(error.response?.data || 'Failed to fetch tables');
//         }
//     }
// );

// export const tablesUserPaginationThunk = createAsyncThunk<ITablesApiResponse, { userId: number | null, page_size: number }, { rejectValue: string }>(
//     'table/fetchUserTableData',
//     async ({ userId, page_size }, { rejectWithValue }) => {
//         try {

          

//             const response = await axiosConfig.get<ITablesApiResponse>(TableAPI.ALL_TABLE_USER_GET, {
//                 params: { for_user: userId, page_size: page_size },

//             });

//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data || 'Failed to fetch user tables');
//         }
//     }
// );

// export const tablesUserThunk = createAsyncThunk<ITablesApiResponse, { userId: number | null }, { rejectValue: string }>(
//     'table/fetchUserTableData',
//     async ({ userId }, { rejectWithValue }) => {
//         try {
//             const response = await axiosConfig.get<ITablesApiResponse>(TableAPI.ALL_TABLE_USER_GET, {
//                 params: { for_user: userId },

//             });

//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data || 'Failed to fetch user tables');
//         }
//     }
// );


// export const searchTablesPaginationThunk = createAsyncThunk<ITablesApiResponse, ISearchFiled, {}>(
//     'table/searchFetchAllTableData', 
//     async ({ searchName, searchPublicType, searchUser, searchDate, searchCoauthorFirstName, searchCoauthorPatronymic, searchCoauthorLastName, searchTitle, page_size }) => {
    
//         const isPagination = {page_size: page_size} || null;

//         const response = await axiosConfig.get(SearchAPI.SEARCH_GET, {

//             params: {
//                 searchName: searchName,
//                 searchTitle: searchTitle,
//                 searchPublicType: searchPublicType,
//                 searchDate: searchDate,
//                 searchUser: searchUser,
//                 searchCoauthorLastName: searchCoauthorLastName, 
//                 searchCoauthorFirstName: searchCoauthorFirstName,
//                 searchCoauthorPatronymic: searchCoauthorPatronymic,

//                 ...isPagination 
//             }
//         })

//     return response.data;
// });

// export const searchTablesThunk = createAsyncThunk<ITablesApiResponse, ISearchFiled, {}>(
//     'table/searchFetchAllTableData', 
//     async ({ searchName, searchPublicType, searchUser, searchDate, searchCoauthorFirstName, searchCoauthorPatronymic, searchCoauthorLastName, searchTitle }) => {
    
       
       
//         const response = await axiosConfig.get(SearchAPI.SEARCH_GET, {
            
//             params: {
//                 searchName: searchName,
//                 searchTitle: searchTitle,
//                 searchPublicType: searchPublicType,
//                 searchDate: searchDate,
//                 searchUser: searchUser,
//                 searchCoauthorFirstName: searchCoauthorFirstName, 
//                 searchCoauthorPatronymic: searchCoauthorPatronymic, 
//                 searchCoauthorLastName: searchCoauthorLastName
              
//             }
//         })
//     console.log(response.data)
//     return response.data;
// });









import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITablesApiResponse, ISearchFiled, IPagination } from './Itables';
import { tableAPIService } from '../../../services/TableService/TableService';

export const tablesPaginationThunk = createAsyncThunk<ITablesApiResponse, { url?: string, page_size?: string }, { rejectValue: string }>(
    'table/fetchAllTableData',
    async ({ url, page_size }, { rejectWithValue }) => {
        try {
            return await tableAPIService.fetchTables({ url, page_size });
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Запрос на получение таблицы не сработал');
        }
    }
);

export const tablesThunk = createAsyncThunk<ITablesApiResponse, { url?: string }, { rejectValue: string }>(
    'table/fetchAllTableData',
    async ({ url }, { rejectWithValue }) => {
        try {
            return await tableAPIService.fetchTables({ url });
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch tables');
        }
    }
);

export const tablesUserPaginationThunk = createAsyncThunk<ITablesApiResponse, { userId: number | null, page_size: number }, { rejectValue: string }>(
    'table/fetchUserTableData',
    async ({ userId, page_size }, { rejectWithValue }) => {
        try {
            return await tableAPIService.fetchUserTables(userId, page_size);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch user tables');
        }
    }
);

export const searchTablesThunk = createAsyncThunk<ITablesApiResponse, ISearchFiled, {}>(
    'table/searchFetchAllTableData',
    async (params, { rejectWithValue }) => {
        try {
            return await tableAPIService.searchTables(params);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch search results');
        }
    }
);



export const searchTablesPaginationThunk = createAsyncThunk<ITablesApiResponse, IPagination, {}>(
    'table/searchFetchAllTableData', 
    async (params, { rejectWithValue }) => {
        try {
            return await tableAPIService.searchTablesWithPagination(params);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch search results with pagination');
        }
    }
);


export const tablesUserThunk = createAsyncThunk<ITablesApiResponse, { userId: number | null }, { rejectValue: string }>(
    'table/fetchUserTableData',
    async ({ userId }, { rejectWithValue }) => {
        try {
            return await tableAPIService.fetchUserTablesNoPagination(userId);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch user tables');
        }
    }
);

  





