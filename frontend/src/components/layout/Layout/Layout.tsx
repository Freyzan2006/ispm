import { Outlet } from "react-router-dom"
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/useAppDispatch";

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

                  
                    <HeaderLazy />
                
                   
                    <ContainerLazy>
                        <Outlet />
                    </ContainerLazy>

                    <FooterLazy />
                    
                    { isActiveAnimation && <BgAnimationLazy id="particles" /> }
                </Suspense>
            </div>


        </div>
        
    )
}

export default Layout;
