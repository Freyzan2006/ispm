import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";




const HomePage: React.FC = () => {



    return (
        <main className = "flex flex-col gap-3">
            <Table />  
            <Pagination />
        </main>
    )
}

export default HomePage;