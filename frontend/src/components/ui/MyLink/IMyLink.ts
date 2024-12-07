import { EPath } from "../../../routers/ERouters";


export interface IProps {
    to: EPath | string;
    children: React.ReactNode;
    styled?: string;
}