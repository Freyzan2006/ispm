export interface IPublicType {
    id: number;
    title: string;
}
  
export interface IPublicTypeState {
    publicTypes: IPublicType[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null
}