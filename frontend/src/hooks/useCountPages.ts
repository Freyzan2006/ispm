import { useEffect } from "react";
import { UseFormSetValue, UseFormWatch, WatchObserver } from "react-hook-form";

interface IProps {
    startPageWatch: number | undefined;
    endPageWatch: number | undefined;
    setValue: UseFormSetValue<any>;
}

export const useCountPages = ({startPageWatch, endPageWatch, setValue}: IProps) => {
    useEffect(() => {
        if (!endPageWatch && !startPageWatch)
            return


        if (endPageWatch && startPageWatch) {
            if (endPageWatch < startPageWatch) 
                setValue("pages", 0);
            else {
                const counter = (+endPageWatch - +startPageWatch) + 1;
                setValue("pages", counter);
            }
        }
    }, [startPageWatch, endPageWatch, setValue]);
}