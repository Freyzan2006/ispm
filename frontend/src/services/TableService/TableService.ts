// import axiosConfig from "../../store/slices/api/axiosConfig";
// import { ITablesApiResponse } from "../../store/slices/tablesSlice/Itables";
// import BaseService from "../BaseService";

import { SearchAPI, TableAPI } from "../api/EAPI";
import axiosConfig from "../api/axiosConfig";
import { IPagination, ISearchFiled, ITablesApiResponse } from "../../store/slices/tablesSlice/Itables";
import { TableAPIParams } from "./ITableAPI";

// import { TableAPIPath, ITableAPIPath, TableAPIParams } from "./ITableAPI";

// class TableService extends BaseService {
//     urls: ITableAPIPath;

//     constructor(urls: ITableAPIPath) {
//         super();
//         this.urls = urls;
//     }

//     async getItems(params: TableAPIParams) : Promise<ITablesApiResponse> {
//         const page_size = params.page_size ? `?page_size=${params.page_size}` : ""; 
      
//         const url = params.url || this.urls.ALL_TABLE_GET;

//         const urlWithParams = `${url || this.urls.ALL_TABLE_GET}${page_size}`;

//         console.log(urlWithParams)

//         const response = await axiosConfig<ITablesApiResponse>(urlWithParams);

//         return response.data;

//         // const urlWithParams = `${url || TableAPI.ALL_TABLE_GET}${page_size ? `?page_size=${page_size}` : ""}`;
        
//         // const response = await axiosConfig.get<ITablesApiResponse>(urlWithParams);
//         // return response.data;
//     }

//     async getItem(id: number) {
        
//     }
// }

// export const tableService = new TableService(TableAPIPath);





class TableAPIService {
    async fetchTables(params: TableAPIParams): Promise<ITablesApiResponse> {
        const response = await axiosConfig.get<ITablesApiResponse>(params.url || TableAPI.ALL_TABLE_GET, { params });
        return response.data;
    }

    async fetchUserTables(userId: number | null, pageSize?: number): Promise<ITablesApiResponse> {
        const response = await axiosConfig.get<ITablesApiResponse>(TableAPI.ALL_TABLE_USER_GET, {
            params: { for_user: userId, page_size: pageSize }
        });
        return response.data;
    }

    async fetchUserTablesNoPagination(userId: number | null): Promise<ITablesApiResponse> {
        const response = await axiosConfig.get<ITablesApiResponse>(TableAPI.ALL_TABLE_USER_GET, {
            params: { for_user: userId }
        });
        return response.data;
    }

    async searchTables(params: ISearchFiled): Promise<ITablesApiResponse> {
        const response = await axiosConfig.get<ITablesApiResponse>(SearchAPI.SEARCH_GET, { params });
        return response.data;
    }

    async searchTablesWithPagination(params: IPagination): Promise<ITablesApiResponse> {
        const { page_size, ...searchParams } = params;
        const response = await axiosConfig.get<ITablesApiResponse>(SearchAPI.SEARCH_GET, {
            params: { ...searchParams, page_size }
        });
        return response.data;
    }
}

export const tableAPIService = new TableAPIService();