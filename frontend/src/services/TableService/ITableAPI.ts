

export interface ITableAPIPath {
    ALL_TABLE_GET: string;
    CREATE_TABLE_POST: string;
    DETAIL_TABLE_GET: string;
    DELETE_TABLE_POST: string;
    ALL_PUBLIC_TYPE_GET: string;
    ALL_TABLE_USER_GET: string;
}

export const TableAPIPath: ITableAPIPath = {
    ALL_TABLE_GET: "table/",
    CREATE_TABLE_POST: "table/",
    DETAIL_TABLE_GET: "table/",
    DELETE_TABLE_POST: "delete/",

    ALL_PUBLIC_TYPE_GET: "table/publicType/",

    ALL_TABLE_USER_GET: "table/tableUser/", 
}

export interface TableAPIParams {
    page_size?: string | undefined;
    url?: string | undefined;
}