import { EStatus } from "../../../services/api/EAPI";

export interface IUser {
    id: number | null;
    username: string | null;
    is_staff: boolean | null;
    is_superuser: boolean | null;
    status: EStatus | null;
    error: string | null;
}

