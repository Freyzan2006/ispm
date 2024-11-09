import { BaseAPI } from "../services/api/EAPI";



export enum ERouters {
    APP = "*",

    HOME = "",
    ABOUT = "about",
    SEARCH = "search",
    LOGIN = "login",
    USER = "user",
    EDIT = "change/:id",
    DELETE = "delete/:id",
    ADD = "add/",

    NotFoundPage = "/*"
}

export enum EPath {
    HOME = "/",
    ABOUT = "about/",
    SEARCH = "search/",
    LOGIN = "login/",
    USER = "user/",
    EDIT = "change/",
    DELETE = "delete/",
    ADD = "/add/",
    ADMIN_DISPLAY = BaseAPI.BaseAPI + "main/admin/" 
}