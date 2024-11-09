import { Outlet } from "react-router-dom"
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/useAppDispatch";
import { BgAnimation, Container, Footer, Header, HelperWidgets } from "../layout";

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
