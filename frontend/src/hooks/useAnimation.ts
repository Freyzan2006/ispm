import { useEffect } from "react";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/useAppDispatch";
import { initializeAnimation, isBgAnimation } from "../store/slices/bgAnimationSlice/bgAnimationSlice";


const useAnimation = () => {
    const dispatch = useAppDispatch();
    const { isActiveAnimation } = useAppSelector((state: RootState) => state.bgAnimation);

    useEffect(() => {
        dispatch(initializeAnimation());
    }, [dispatch, isActiveAnimation]);


    const toggleAnimation = () => dispatch(isBgAnimation());

    return [isActiveAnimation, toggleAnimation] as const;
}

export default useAnimation;