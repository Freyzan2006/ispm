import { modeProjectAPI } from "./deploy";



export const BaseAPI = `${modeProjectAPI}/api/v1`; 

export const TablesAPI = `table/`;
export const AuthAPI = `${BaseAPI}/user`;

export const TokenAPI = `user/token/`;
export const RefreshTokenAPI = `user/token/refresh/`