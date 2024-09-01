import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";



const NotFoundPage: React.FC = () => {
    return (
        <main className = "flex justify-center flex-col items-center gap-3">
            <ErrorAlert errorMessage = { "Нету такой страницы" } />
            <ErrorAlert errorMessage = { "Ошибка 404" } />
        </main>
    )
}

export default NotFoundPage;