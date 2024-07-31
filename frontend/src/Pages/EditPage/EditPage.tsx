import { useParams } from "react-router-dom";


const EditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <main>
            <h2>I'm Edit { id }</h2>
        </main>
    )
}

export default EditPage;