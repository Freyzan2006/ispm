import { EButton } from "./EButton";


export interface IProps {
    children: React.ReactNode | string;
    styled: EButton | string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type: "submit" | "reset" | "button" | undefined;
}