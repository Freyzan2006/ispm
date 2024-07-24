

export interface ITablesState  {
    tables: ITable[];
    status: string | null;
    error: string | null;
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