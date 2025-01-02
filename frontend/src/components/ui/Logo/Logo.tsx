import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/useAppDispatch";



const Logo: React.FC = () => {
    const { isActive } = useAppSelector((state: RootState) => state.screenDimming);


    return (
        <div className = {`flex justify-center items-center ${ isActive ? "opacity-20" : "opacity-100"}`}>
            <a href="/">
                <img className = "hover:cursor-pointer rounded-full hover:bg-cyan-500 hover:shadow-my-box hover:shadow-cyan-500/50 hover:scale-105 transition" src="/Logo.png" alt="" width="70px" />
            </a>
        </div>
    )
}

export default Logo;