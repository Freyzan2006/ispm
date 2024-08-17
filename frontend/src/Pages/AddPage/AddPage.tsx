import { useEffect, useState } from "react";
import Button from "../../widgets/Button/Button";
import { EButton, ITypeBtn } from "../../widgets/Button/EButton";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../state/useAppDispatch";
import { RootState } from "../../state/store";

// {
//     "id": 3,
//     "Type": 1,
//     "name": "Stave 2",
//     "title": "Title 50606",
//     "data": 1956,
//     "tom": 2,
//     "issue": 666,
//     "page_start": 1,
//     "page_end": 20,
//     "pages": 21,
//     "Co_authors": "Oscar 2",
//     "created_at": "2024-07-26T06:56:59.031597Z",
//     "updated_at": "2024-07-26T06:56:59.031597Z",
//     "for_user": 1
// }
import { yearsRage } from "../../utils";
import css from "./AddPage.module.scss";
import { EStatus } from "../../state/api/EAPI";
import { publicTypeFetch } from "../../state/publicType/publicTypeFetch";
import axiosConfig from "../../state/api/axiosConfig";

const AddPage: React.FC = () => {

    const [ typeFiled, setTypeFiled ] = useState<number>();
    const [ nameFiled, setNameFiled ] = useState<string>("");
    const [ titleFiled, setTitleFiled ] = useState<string>(""); 
    const [ dataFiled, setDataFiled ] = useState<number>(1950);
    const [ tomFiled, setTomFiled ] = useState<number>(1);
    const [ issueFiled, setIssueFiled ] = useState<number>(1);
    const [ pageStartFiled, setPageStartFiled ] = useState<number>(1);
    const [ pageEndFiled, setPageEndFiled ] = useState<number>(1);
    const [ pagesFiled, setPagesFiled ] = useState<number>(1);
    const [ coAuthorFiled, setCoAuthorFiled ] = useState<string>("");
    const userId = useAppSelector((state: RootState) => state.user.id);

    const dispatch = useAppDispatch();
    const { publicTypes, status } = useAppSelector((state: RootState) => state.publicTypes);


    useEffect(() => {
        if (status === EStatus.IDLE) {
        
            dispatch(publicTypeFetch())
        }
    }, []);


    // http://127.0.0.1:8000/api/v1/table/

    const handlerSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        
        async function addRequest() {
            const response = await axiosConfig.post("table/", {
                Type: typeFiled,
                name: nameFiled,
                title: titleFiled,
                data: dataFiled,
                tom: tomFiled,
                issue: issueFiled,
                page_start: pageStartFiled,
                page_end: pageEndFiled,
                pages: pagesFiled,
                Co_authors: coAuthorFiled,
                for_user: userId,
            });

            console.log(response.data);

        }

        addRequest();
    }

    

    return (
        <main>
            <form onSubmit = { handlerSubmit }>
                    <select value={typeFiled || ''} onChange = { (e) => setTypeFiled(+e.target.value) }>
                        <option value = { '' }>
                            --------
                        </option>
                        {publicTypes.map((el, index) => (
                            <option value={el.id} key={index}>
                                {el.title}
                            </option>
                        ))}
                    </select>
                <input type="text" placeholder="name" value = { nameFiled } onChange = { (e) => setNameFiled(e.target.value) } />
                <input type="text" placeholder="title" value = { titleFiled } onChange = { (e) => setTitleFiled(e.target.value) } />
                

                <select  value={dataFiled || yearsRage[0]} onChange = { (e) => setDataFiled(+e.target.value) }>
                    <option value = { '' }>
                        --------
                    </option>
                    {yearsRage.map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                    ))}
                </select>
                
                <input type="number" placeholder="tom" value = { tomFiled } onChange = { (e) => setTomFiled(+e.target.value) } />
                <input type="number" placeholder="issue" value = { issueFiled } onChange = { (e) => setIssueFiled(+e.target.value) } />
                <input type="number" placeholder="start" value = { pageStartFiled } onChange = { (e) => setPageStartFiled(+e.target.value) } />
                <input type="number" placeholder="end" value = { pageEndFiled } onChange = { (e) => setPageEndFiled(+e.target.value) } />
                <input type="number" placeholder="pages" value = { pagesFiled } onChange = { (e) => setPagesFiled(+e.target.value) } />
                
                <input type="text" placeholder="coauthor" value = { coAuthorFiled } onChange = { (e) => setCoAuthorFiled(e.target.value) } />

                <Button type = { ITypeBtn.SUBMIT } styled = { EButton.GREEN } >
                    <FaPlus /> Добавить
                </Button>
            </form>
        </main>
    )
}

export default AddPage;