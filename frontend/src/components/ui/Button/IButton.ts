import { EButton, ITypeBtn } from "./EButton";


export interface IProps {
    children: React.ReactNode | string;
    styled: EButton | string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type: ITypeBtn;
    disabled?: boolean;
}