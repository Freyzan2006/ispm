
import { IProps } from "./INavBar";

const NavBar: React.FC<IProps> = ({ children }) => {
    return (
        <nav className="flex justify-between items-center pt-2 pb-2 w-full">
            { children }
        </nav>
    )
}

export default NavBar;