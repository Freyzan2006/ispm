import { Logo } from "../../ui/ui";
import { Container, Menu, NavBar } from "../layout";




const Header: React.FC = () => {

    return (
        <header id = "header" className = { `css.header bg-blue-600 dark:bg-slate-900 w-full shadow-lg shadow-black-100/50 h-[100px]` }>
        
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








