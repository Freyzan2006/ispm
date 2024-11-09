import { useEffect } from "react";
import { EStatus } from "../services/api/EAPI";
import { useAppDispatch } from "../store/useAppDispatch";
import { publicTypeFetch } from "../store/slices/publicTypeSlice/publicTypeFetch";


const useGetPubType = (status: EStatus) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (status === EStatus.IDLE) 
            dispatch(publicTypeFetch())
    }, []);
}

export default useGetPubType;