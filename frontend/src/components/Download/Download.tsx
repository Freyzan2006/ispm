
import { FaCloudDownloadAlt } from "react-icons/fa";
import Button from "../../widgets/Button/Button";
import { EButton } from "../../widgets/Button/EButton";
const Download: React.FC = () => {
    return (

        <Button type = "button" styled = { `${EButton.GREEN} w-1/2` }>
            <FaCloudDownloadAlt /> Скачать таблицу
        </Button>
    )
} 

export default Download;
