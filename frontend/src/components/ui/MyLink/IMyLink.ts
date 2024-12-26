import { NavLink } from "react-router-dom";
import { EPath } from "../../../routers/ERouters";


export interface IProps extends React.ComponentPropsWithoutRef<typeof NavLink> {
    to: EPath | string;
    children: React.ReactNode;
    styled?: string;
}