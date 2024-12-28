export const isProduction: boolean = true; 

export const BACKEND_PROD: string = "https://ispm-backend.onrender.com"
export const BACKEND_DEV: string = "http://127.0.0.1:8000"


export const modeProjectAPI: string = isProduction ? BACKEND_PROD : BACKEND_DEV;

