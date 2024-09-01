import { EStatus } from "../api/EAPI";




export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    status: EStatus;
    error: string | null;
    refreshing: boolean;
}