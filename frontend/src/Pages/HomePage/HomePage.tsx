import Pagination from "../../components/ux/Pagination/Pagination";
import Table from "../../components/ux/Table/Table";




const HomePage: React.FC = () => {



    return (
        <main className = "flex flex-col gap-3">
            <Table />  
            <Pagination />
        </main>
    )
}

export default HomePage;