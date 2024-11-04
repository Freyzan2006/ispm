
interface IProps {
    warningMessage: string | undefined;
}

const WarningAlert: React.FC<IProps> = ({ warningMessage }) => {
    return (
        <>
            {
                warningMessage
                &&
                <div className = " shadow-lg shadow-yellow-500  rounded-lg bg-yellow-500 flex justify-center items-center p-2">
                    <h2 className = "text-black dark:text-white text-sm">{ warningMessage }</h2> 
                </div>
            }
        </>
    )
}

export default WarningAlert;