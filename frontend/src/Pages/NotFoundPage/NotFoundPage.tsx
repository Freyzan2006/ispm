import { ErrorAlert } from "../../components/ux/ux";




const NotFoundPage: React.FC = () => {
    return (
        <main className = "flex justify-center flex-col items-center gap-3">
            <ErrorAlert errorMessage = { "Нету такой страницы" } />
            <ErrorAlert errorMessage = { "Ошибка 404" } />
        </main>
    )
}

export default NotFoundPage;