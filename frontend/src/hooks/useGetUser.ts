import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/useAppDispatch";
import { RootState } from "../state/store";
import { userThunk } from "../state/user/userThunk";



const useGetUser = () => {
    const accessToken = useAppSelector((state: RootState) => state.auth.accessToken);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (accessToken) 
            dispatch(userThunk(accessToken))
    }, [dispatch, accessToken])
}

export default useGetUser;