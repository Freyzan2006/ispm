import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/useAppDispatch";
import { RootState } from "../store/store";
import { userThunk } from "../store/slices/userSlice/userThunk";



const useGetUser = () => {
    const accessToken = useAppSelector((state: RootState) => state.auth.accessToken);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (accessToken) 
            dispatch(userThunk())
    }, [dispatch, accessToken])
}

export default useGetUser;