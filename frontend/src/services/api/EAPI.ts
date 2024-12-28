

// isProduction ? "https://ispm-backend.onrender.com/api/v1/" : http://127.0.0.1:8000/api/v1/

export enum BaseAPI {
    BaseAPI = "https://ispm-backend.onrender.com/api/v1/",

    MAIN_GET = "main/"
}

export enum UserAPI {
    USER_GET = "user/",
    ALL_USERS_GET = "user/allUsers/",
    TOKEN_POST = "user/token/",
    REFRESH_TOKEN_POST = "user/token/refresh/"

}

export enum TableAPI {
    ALL_TABLE_GET = "table/",
    CREATE_TABLE_POST = "table/",
    DETAIL_TABLE_GET = "table/",
    DELETE_TABLE_POST = "delete/",

    ALL_PUBLIC_TYPE_GET = "table/publicType/",

    ALL_TABLE_USER_GET = "table/tableUser/",
}

export enum SearchAPI {
    SEARCH_GET = "search/"
}

export enum KeyWordJWT {
    KEY = "JWT"
}

export enum EStatus {
    IDLE = "idle",
    LOADING = "loading",
    SUCCEEDED = "succeeded",
    FAILED = "failed",
}