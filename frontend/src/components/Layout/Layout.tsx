


import { Outlet } from "react-router-dom"
import Header from "../Header/Header";
import Container from "../Container/Container";
import { Loading, ScreenDimming } from "../../widgets/Widgets";
import Footer from "../Footer/Footer";

const Layout: React.FC = () => {
    return (
        <>
        <Loading time = { 3000 } />


        <Header />

        <Container>
            <Outlet />
        </Container>

        <Footer />

        <ScreenDimming />
    </>
    )
}

export default Layout;
