import { Alert, ScreenDimming } from "../../ui/ui";
import { Navigation } from "../../ux/ux";
import { Loading } from "../layout";








const HelperWidgets: React.FC = () => {
    return (
        <>
            <Loading time = { 3000 } />
            <ScreenDimming />
            <Navigation />
            <Alert />
        </>
    )
}

export default HelperWidgets;