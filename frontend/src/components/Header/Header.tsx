import Logo from "../../widgets/Logo/Logo";
import Container from "../Container/Container";
import { Menu } from "../../widgets/Widgets";
import NavBar from "../NavBar/NavBar";
import css from "./Header.module.scss";

const Header: React.FC = () => {
    return (
        <header className = { css.header + " bg-blue-600 dark:bg-slate-900 w-full shadow-lg shadow-black-100/50 h-[100px]" }>
        
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








