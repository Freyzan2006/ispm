import { useEffect } from "react";
import { RootState } from "../state/store";
import { useAppDispatch, useAppSelector } from "../state/useAppDispatch";
import { initializeAnimation, isBgAnimation } from "../state/bgAnimation/bgAnimationSlice";


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