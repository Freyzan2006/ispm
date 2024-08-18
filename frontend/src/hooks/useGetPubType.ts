import { useEffect } from "react";
import { EStatus } from "../state/api/EAPI";
import { useAppDispatch } from "../state/useAppDispatch";
import { publicTypeFetch } from "../state/publicType/publicTypeFetch";


const useGetPubType = (status: EStatus) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (status === EStatus.IDLE) 
            dispatch(publicTypeFetch())
    }, []);
}

export default useGetPubType;