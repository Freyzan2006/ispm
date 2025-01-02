
import { IProps } from "./INavBar";

const NavBar: React.FC<IProps> = ({ children }) => {
    return (
        <nav className="flex justify-between items-center pt-2 pb-2 w-full overflow-x-hidden">
        {/* // sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent */}
        
            { children }
        </nav>
    )
}

export default NavBar;