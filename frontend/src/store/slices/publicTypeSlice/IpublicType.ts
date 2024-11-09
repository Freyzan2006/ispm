import { EStatus } from "../../../services/api/EAPI";

export interface IPublicType {
    id: number;
    title: string;
}
  
export interface IPublicTypeState {
    publicTypes: IPublicType[];
    status: EStatus;
    error: string | null
}