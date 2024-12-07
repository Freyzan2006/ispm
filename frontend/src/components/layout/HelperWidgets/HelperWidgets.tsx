import React, { Suspense } from "react";

import { Loading } from "../layout";

const ScreenDimmingLazy = React.lazy(() => import("../../ui/ui").then(module => ({ default: module.ScreenDimming })));
const AlertLazy = React.lazy(() => import("../../ui/ui").then(module => ({ default: module.Alert })));

const HelperWidgets: React.FC = () => {
    return (
        <>
            <Loading time = { 2000 } />

            <Suspense fallback={ <Loading /> }>
                <ScreenDimmingLazy />
                <AlertLazy />
            </Suspense>
        </>
    )
}

export default HelperWidgets;