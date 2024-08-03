import { FaHome } from "react-icons/fa";
import Container from "../Container/Container";
import MyLink from "../../widgets/MyLink/MyLink";
import { FaCircleQuestion } from "react-icons/fa6";
import { EPath } from "../../Routers/ERouters";


const Footer: React.FC = () => {
    return (
        <footer className="border-t-2  border-blue-600 dark:border-blue-950 h-auto mt-20">
            <Container>
                <div className = "flex flex-col justify-center w-full pt-5 pb-5 gap-5">
                    <ul className="flex justify-center items-center gap-5">
                        <li className="nav-item"><MyLink to = { EPath.HOME }><FaHome /> Главная страница</MyLink></li>
                        <li className="nav-item"><MyLink to = { EPath.ABOUT }><FaCircleQuestion /> Об проекте</MyLink></li>
                    </ul>
                    <p className="text-center text-body-secondary text-black dark:text-white font-bold">© 2024 Company, Inc</p>
                </div>
            </Container>
        </footer>
    )
}

export default Footer;