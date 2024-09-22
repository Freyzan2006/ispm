
import { useEffect } from "react";
import LoadingImg from "../../Assets/loading.gif";
import { IProps } from "./ILoading";
import { useAppDispatch, useAppSelector } from "../../state/useAppDispatch";
import { RootState } from "../../state/store";
import { isLoading } from "../../state/loading/loadingSlice";

import css from "./Loading.module.scss";

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
                    {/* <img className = "rounded-full" src= { LoadingImg } alt="Loading..." /> */}
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