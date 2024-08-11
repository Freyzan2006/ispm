import { EStatus } from "../api/EAPI";

export interface ISearchFiled {
    searchName: string;
    searchDate: string;
    searchCoauthor: string;
    searchPublicType: string;
    searchUser: string;
    page_size: number;
}

export interface ITablesApiResponse {
    results: ITable[];
    next: string | null;
    previous: string | null;
    count: number;
}

export interface ITablesState  {
    tables: ITable[];
    status: EStatus| null;
    error: string | null;
    nextPage: string | null,
    previousPage: string | null,
    count: number,
}
  
export interface ITable {
    id: number;
    Type: number;
    name: string;
    title: string;
    data: number;
    tom: number;
    issue: number;
    page_start: number;
    page_end: number;
    pages: number;
    Co_authors: string;
    created_at: string;
    updated_at: string;
    for_user: number;
}