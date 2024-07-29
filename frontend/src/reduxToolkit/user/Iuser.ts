export interface UserState {
    id: number | null;
    username: string | null;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

