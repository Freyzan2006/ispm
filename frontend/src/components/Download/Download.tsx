
import { FaCloudDownloadAlt } from "react-icons/fa";
const Download: React.FC = () => {
    return (
        <button className = "opacity-100 transition hover:scale-105  w-1/2 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center text-white gap-3">
            <FaCloudDownloadAlt /> Скачать таблицу
        </button>
    )
} 

export default Download;
