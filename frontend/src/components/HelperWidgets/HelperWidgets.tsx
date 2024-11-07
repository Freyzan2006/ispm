import Alert from "../../widgets/Alert/Alert";
import Navigation from "../../widgets/Navigation/Navigation";
import { Loading, ScreenDimming } from "../../widgets/Widgets";


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