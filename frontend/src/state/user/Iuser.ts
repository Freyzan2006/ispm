import { EStatus } from "../api/EAPI";

export interface UserState {
    id: number | null;
    username: string | null;
    is_staff: boolean | null;
    is_superuser: boolean | null;
    status: EStatus | null;
    error: string | null;
}

