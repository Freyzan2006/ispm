


import { Outlet } from "react-router-dom"
import Header from "../Header/Header";
import Container from "../Container/Container";

import Footer from "../Footer/Footer";

import { RootState } from "../../state/store";


import BgAnimation from "../BgAnimation/BgAnimation";

import HelperWidgets from "../HelperWidgets/HelperWidgets";
import { useAppSelector } from "../../state/useAppDispatch";


const Layout: React.FC = () => {

    const { isActiveAnimation } = useAppSelector((state: RootState) => state.bgAnimation); 

    

    return (
        
        <div className = "flex flex-col">
            { isActiveAnimation && <BgAnimation id="particles" /> }
            

            <div className = "flex flex-col gap-10 z-10">
                <HelperWidgets />

                <Header />

                <Container>
                    <Outlet />
                </Container>

                <Footer />
            </div>

            
        </div>
        
    )
}

export default Layout;
