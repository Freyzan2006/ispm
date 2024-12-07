import { Outlet } from "react-router-dom"
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/useAppDispatch";
// import { BgAnimation, Container, Footer, Header, HelperWidgets, Loading } from "../layout";
import React, { Suspense } from "react";
import { Loading } from "../layout";

const FooterLazy = React.lazy(() => import("../Footer/Footer"));
const HelperWidgetsLazy = React.lazy(() => import("../HelperWidgets/HelperWidgets"));
const HeaderLazy = React.lazy(() => import("../Header/Header"));
const BgAnimationLazy = React.lazy(() => import("../BgAnimation/BgAnimation"));
const ContainerLazy = React.lazy(() => import("../Container/Container"));




const Layout: React.FC = () => {

    const { isActiveAnimation } = useAppSelector((state: RootState) => state.bgAnimation); 

    return (
        
        <div className = "flex flex-col">
            <div className = "flex flex-col gap-10 z-10">
                <Suspense fallback = { <Loading time = { 1000 }  /> }>
                    <HelperWidgetsLazy />

                    {/* <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75"> */}
                    <HeaderLazy />
                    {/* </div> */}
                   
                    <ContainerLazy>
                        <Outlet />
                    </ContainerLazy>

                    <FooterLazy />
                    
                    { isActiveAnimation && <BgAnimationLazy id="particles" /> }
                </Suspense>
            </div>

            {/* <div className = "flex flex-col gap-10 z-10">
                <HelperWidgets />

                <Header />

                <Container>
                    <Outlet />
                </Container>

                <Footer />

                { isActiveAnimation && <BgAnimation id="particles" /> }
            </div> */}
        </div>
        
    )
}

export default Layout;
