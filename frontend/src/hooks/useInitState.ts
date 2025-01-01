import { useEffect } from "react"
import useTheme from "./useTheme";


const useInitState = () => {
    const [ _, setTheme ] = useTheme();

    useEffect(() => {
        console.log("Init theme");
        
        setTheme();
       
    }, []);
}

export default useInitState;