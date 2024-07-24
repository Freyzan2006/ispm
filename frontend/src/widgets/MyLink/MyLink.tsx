
import { NavLink } from "react-router-dom";

import { IProps } from "./IMyLink";

const MyLink: React.FC<IProps> = ({ children ,to, styled }) => {
    return (
        <NavLink to = { to } className = { `${styled} flex justify-center items-center gap-3 text-black dark:text-white opacity-60 hover:opacity-100 transition` }>
            { children }
        </NavLink>
    )
}

export default MyLink;