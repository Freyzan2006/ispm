


import { Outlet } from "react-router-dom"
import Header from "../Header/Header";
import Container from "../Container/Container";
import { Loading, ScreenDimming } from "../../widgets/Widgets";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/useAppDispatch";
import { RootState } from "../../state/store";
import { clearTokens, setTokens } from "../../state/auth/authSlice";
import Navigation from "../../widgets/Navigation/Navigation";
import BgAnimation from "../BgAnimation/BgAnimation";
import Alert from "../../widgets/Alert/Alert";


const Layout: React.FC = () => {

    const dispatch = useAppDispatch();
    const { accessToken, refreshToken } = useAppSelector((state: RootState) => state.auth);
    const { isActiveAnimation } = useAppSelector((state: RootState) => state.bgAnimation); 
    

    useEffect(() => {
         
        if (!accessToken && refreshToken) 
            dispatch(setTokens({ refresh: refreshToken }));
        else if (!accessToken && !refreshToken) 
            dispatch(clearTokens());
        
    }, [dispatch, accessToken, refreshToken]);

   

    return (
        
        <div className = "flex flex-col">
            { isActiveAnimation && <BgAnimation id="particles" /> }
            

            <div className = "flex flex-col gap-10 z-10">
                <Loading time = { 3000 } />
                <ScreenDimming />
                <Navigation />
                <Alert />

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
