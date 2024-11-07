import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/useAppDispatch";
import { RootState } from "../state/store";
import { changeTheme, initializeTheme } from "../state/theme/themeSlice";
import { ETheme } from "../state/theme/ETheme";


const useTheme = () => {
    const dispatch = useAppDispatch();
    const isTheme = useAppSelector((state: RootState) => state.theme.theme);

    useEffect(() => {
        dispatch(initializeTheme());

        const htmlElement = document.documentElement;

        if (isTheme === ETheme.DARK) {
            htmlElement.classList.add(ETheme.DARK);
            htmlElement.classList.remove(ETheme.LIGHT);
        } else {
            htmlElement.classList.remove(ETheme.DARK);
            htmlElement.classList.add(ETheme.LIGHT);
        }
    }, [dispatch, isTheme]);


    const toggleTheme = () => dispatch(changeTheme());

    return [isTheme, toggleTheme] as const;
}

export default useTheme;