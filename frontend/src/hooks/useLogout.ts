import { clearTokens } from "../store/slices/authSlice/authSlice";
import { useAppDispatch } from "../store/useAppDispatch";
import { clearUser } from "../store/slices/userSlice/userSlice";


const useLogout = () => {
    const dispatch = useAppDispatch();

    return () => {
        dispatch(clearTokens());
        dispatch(clearUser());
    }
}

export default useLogout;