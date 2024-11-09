
import { useEffect } from "react";

import { IProps } from "./ILoading";



import css from "./Loading.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/useAppDispatch";
import { RootState } from "../../../store/store";
import { isLoading } from "../../../store/slices/loadingSlice/loadingSlice";

const Loading: React.FC<IProps> = ({ time }) => {

    const dispatch = useAppDispatch();
    const isAction = useAppSelector((state: RootState) => state.loading.isActive);    
   

    useEffect(() => {
        const loader = setTimeout(() => {
            dispatch(isLoading());
        }, time);
    
        return () => {
            clearTimeout(loader);
        };
    }, []);

    return (
        <>        



        {
            isAction ? (
                <div className = {`  ${css.loadingBar} flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-slate-800`}>
                    <div className={`${css.loader} ${css.loader_2}`}></div>
                </div>
            ) : (
                <></>
            )
        }
        </>
    )
}

export default Loading;


// window.onload = function() {
//     let loadingBar = document.querySelector(".loadingBar");
//     loadingBar.classList.add('loadingBar-hide')
//     const loader = setInterval (() => {
//         loadingBar.remove();     
//         clearInterval(loader);
//     }, 2000)
// }