
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";


const Navigation: React.FC = () => {
    return (
        <div className = "flex justify-center flex-col items-center gap-2 w-[50px] h-[50px] bottom-5 fixed left-5 z-10">
            <a className = "text-black dark:text-white text-4xl" href="#header">
                <FaArrowAltCircleUp />
            </a>

            <a className = "text-black dark:text-white text-4xl" href="#footer">
                <FaArrowAltCircleDown />
            </a>
        </div>
    )
}

export default Navigation;