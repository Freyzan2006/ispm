import { useEffect } from "react";
import { RootState } from "../state/store";
import { useAppDispatch, useAppSelector } from "../state/useAppDispatch";
import { clearTokens, setTokens } from "../state/auth/authSlice";


const useAuth = () => {
    const dispatch = useAppDispatch();
    const { accessToken, refreshToken } = useAppSelector((state: RootState) => state.auth);
    
    useEffect(() => {
        if (!accessToken && refreshToken) 
            dispatch(setTokens({ refresh: refreshToken }));
        else if (!accessToken && !refreshToken) 
            dispatch(clearTokens());
        
    }, [dispatch, accessToken, refreshToken]);
}

export default useAuth;