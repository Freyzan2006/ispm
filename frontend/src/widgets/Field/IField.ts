import { Control } from "react-hook-form";


export interface IField {
    disabled?: boolean
    isNumber?: boolean,
    control: Control<any, any>;
    name: string;
    label?: string;
    errorMessage?: string;
    placeholder?: string;
    validationRules: Record<string, any>;
    type?: string;
    width?: string;
}



export interface ISelectField extends IField {
    children: React.ReactNode;
}