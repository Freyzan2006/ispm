


import { Outlet, redirect } from "react-router-dom"
import Header from "../Header/Header";
import Container from "../Container/Container";
import { Loading, ScreenDimming } from "../../widgets/Widgets";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxToolkit/useAppDispatch";
import { RootState } from "../../reduxToolkit/store";
import { logout, updateTokens } from "../../reduxToolkit/auth/authSlice";


const Layout: React.FC = () => {

    const dispatch = useAppDispatch();
    const { accessToken, refreshToken } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!accessToken && refreshToken) {
            // Если токен доступа отсутствует, но есть токен обновления, обновляем токены
            dispatch(updateTokens(refreshToken));
        } else if (!accessToken && !refreshToken) {
            // Если токен доступа и токен обновления отсутствуют, выходим из системы
            
            dispatch(logout());
           
        }

   

    }, [dispatch, accessToken, refreshToken]);

    return (
        <div className = "flex flex-col gap-10">
            <Loading time = { 3000 } />


            <Header />

            <Container>
                <Outlet />
            </Container>

            <Footer />

            <ScreenDimming />
        </div>
    )
}

export default Layout;
