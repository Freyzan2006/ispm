


const Logo: React.FC = () => {
    return (
        <div className = "flex justify-center items-center ">
            <a href="/">
                <img className = "hover:cursor-pointer rounded-full hover:bg-cyan-500 hover:shadow-my-box hover:shadow-cyan-500/50 hover:scale-105 transition" src="/Logo.png" alt="" width="70px" />
            </a>
        </div>
    )
}

export default Logo;