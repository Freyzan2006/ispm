
import { NavLink } from "react-router-dom";

import { IProps } from "./IMyLink";
import { EMyLink } from "./EMyLink";

const MyLink: React.FC<IProps> = ({ children ,to, styled, ...props }) => {
    return (
        <NavLink to = { to } className = { `${styled ? styled : EMyLink.LINK }` } { ...props }>
            { children }
        </NavLink>
    )
}

export default MyLink;

// className = { `${styled ? "" : "opacity-60 hover:opacity-100"}  ${styled}` }