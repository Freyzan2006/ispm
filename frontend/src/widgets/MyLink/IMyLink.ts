import { EPath } from "../../Routers/ERouters";


export interface IProps {
    to: EPath | string;
    children: React.ReactNode;
    styled?: string;
}