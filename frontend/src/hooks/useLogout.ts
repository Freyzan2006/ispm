import { clearTokens } from "../state/auth/authSlice";
import { useAppDispatch } from "../state/useAppDispatch";
import { clearUser } from "../state/user/userSlice";


const useLogout = () => {
    const dispatch = useAppDispatch();

    return () => {
        dispatch(clearTokens());
        dispatch(clearUser());
    }
}

export default useLogout;