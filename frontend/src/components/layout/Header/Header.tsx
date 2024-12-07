import React from "react";
import { Logo } from "../../ui/ui";
import { Container, Menu, NavBar } from "../layout";



{/* <header id = "header" className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75"></header> */}
const Header: React.FC = () => {

    return (
        // <header id = "header" className = { ` bg-blue-600 dark:bg-slate-900 w-full shadow-lg shadow-black-100/50 h-[100px]` }>
        <header id = "header" className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-blue-600/50 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
        {/* // <header id = "header" className="sticky top-0  z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">  */}
     
            <Container> 
                <NavBar>
                    <Logo />
                    <Menu />
                </NavBar>
            </Container>

        </header>
    )
}

export default Header;








