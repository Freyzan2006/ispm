
import { SearchAPI, TableAPI } from "../api/EAPI";
import axiosConfig from "../api/axiosConfig";
import { IPagination, ISearchFiled, ITablesApiResponse } from "../../store/slices/tablesSlice/Itables";
import { TableAPIParams } from "./ITableAPI";

import { PAGINATION_SIZE } from "../api/config";
import BaseService from "../BaseService";






class TableAPIService extends BaseService {
    async fetchTables(params: TableAPIParams): Promise<ITablesApiResponse> {
        params.url = this.adjustUrlForProduction(params.url);
      
       

      
        
        const response = await axiosConfig.get<ITablesApiResponse>(params.url || TableAPI.ALL_TABLE_GET + "?page=1" + `&page_size=${params.page_size || PAGINATION_SIZE}`);
        
        
       
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