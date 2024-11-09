
interface IProps {
    errorMessage: string | undefined;
}

const ErrorAlert: React.FC<IProps> = ({ errorMessage }) => {
    return (
        <>
            {
                errorMessage
                &&
                <div className = " shadow-lg shadow-red-500  rounded-lg bg-red-500 flex justify-center items-center p-2">
                    <h2 className = "text-black dark:text-white text-sm">{ errorMessage }</h2> 
                </div>
            }
        </>
    )
}

export default ErrorAlert;