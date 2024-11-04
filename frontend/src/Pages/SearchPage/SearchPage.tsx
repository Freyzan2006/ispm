import { useEffect } from "react";

import css from "./SearchPage.module.scss"

import { FaSearch } from "react-icons/fa";

import Table from "../../components/Table/Table";
import Pagination from "../../components/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../state/useAppDispatch";

import { searchTablesPaginationThunk, searchTablesThunk } from "../../state/tables/tablesThunk";

import { fetchUsers } from "../../state/api/usersFetch";
import { RootState } from "../../state/store";
import { publicTypeFetch } from "../../state/publicType/publicTypeFetch"; 




import { yearsRage } from "../../utils";
import { setSearchCoauthorFirstName, setSearchCoauthorLastName, setSearchCoauthorPatronymic, setSearchDate, setSearchName, setSearchPublicType, setSearchUser, setSearchTitle } from "../../state/search/searchSlice";
import { PAGINATION_SIZE } from "../../state/api/config";
import { EAlertType, setMessageAlert, setShowAlert, setTypeAlert } from "../../state/alert/alertSlice";
import InputField from "../../widgets/Field/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectField from "../../widgets/Field/SelectField";
import { ISearchFiled } from "../../state/tables/Itables";
import { EStatus } from "../../state/api/EAPI";
import { EButton, ITypeBtn } from "../../widgets/Button/EButton";
import Button from "../../widgets/Button/Button";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import { Loading } from "../../widgets/Widgets";
import Alert from "../../widgets/Alert/Alert";
import WarningAlert from "../../components/warningAlert/WarningAlert";


interface IFrom extends ISearchFiled {}

const SearchPage: React.FC = () => {


    const dispatch = useAppDispatch();
    const { users, status, error } = useAppSelector((state: RootState) => state.users);
    const { publicTypes } = useAppSelector((state: RootState) => state.publicTypes);
    const tableLength = useAppSelector((state: RootState) => state.tables.tables.length);
   

    const { handleSubmit, control, formState: { errors  } } = useForm<IFrom>({
        mode: "onChange",
    });
    

    useEffect(() => {
        if (status === EStatus.IDLE) {
            dispatch(fetchUsers());
            dispatch(publicTypeFetch())
        }
    }, []);

    const { paginationCount } = useAppSelector((state: RootState) => state.pagination);

    const setStateSearchFields = (data : IFrom) => {
       
        dispatch(setSearchName(data.searchName));
        dispatch(setSearchTitle(data.searchTitle));
        dispatch(setSearchPublicType(data.searchPublicType));
        dispatch(setSearchUser(data.searchUser));
        dispatch(setSearchDate(data.searchDate));
        dispatch(setSearchCoauthorLastName(data.searchCoauthorLastName));
        dispatch(setSearchCoauthorFirstName(data.searchCoauthorFirstName));
        dispatch(setSearchCoauthorPatronymic(data.searchCoauthorPatronymic));
    }
    

   

    const onSubmit: SubmitHandler<IFrom> = (data) => {
        data.searchPublicType = data.searchPublicType == "0" ? "" : data.searchPublicType;
        data.searchDate = data.searchDate == "0" ? "" : data.searchDate;
        data.searchUser = data.searchUser == "0" ? "" : data.searchUser;

        setStateSearchFields(data);
        
        

            

        if ( paginationCount != PAGINATION_SIZE ) 
            dispatch(searchTablesPaginationThunk({ ...data, page_size: paginationCount }));
        else 
            dispatch(searchTablesThunk({ ...data }));
        
        dispatch(setShowAlert());
        try {
            if ( tableLength ) {
                dispatch(setMessageAlert(`Вы нашли записи из таблиц`));
                dispatch(setTypeAlert(EAlertType.SUCCESSFUL));
            } else {
                dispatch(setMessageAlert(`По вашему поиску записи из таблицы не были найдены`));
                dispatch(setTypeAlert(EAlertType.WARNING));
            }
            
        } catch(err) {
            dispatch(setMessageAlert(`Не удалось найти записи`));
            dispatch(setTypeAlert(EAlertType.ERROR));
        }
    }



    if (status === EStatus.LOADING) return <WarningAlert warningMessage = "Загрузка..." />;
    if (status === EStatus.FAILED) return <ErrorAlert errorMessage = {`Поиск пока не работает...` } /> ;
    // <div>Error loading users: {error}</div>

    return (
        <main className="flex justify-center items-center flex-col gap-5 w-full overflow-auto">
            <form className={`${css.SearchPage} shadow-lg shadow-blue-400 dark:shadow-lg dark:shadow-gray-500 `} onSubmit = { handleSubmit(onSubmit) } >
                <h1 className="text-black dark:text-white text-2xl">Поиск</h1>
                <div className="flex flex-col justify-center items-center gap-4 w-full flex-wrap">
      

                    <InputField 
                        width = { 300 }
                        placeholder = "Название публикации" 
                        errorMessage = { errors.searchName?.message } 
                        name = "searchName" 
                        control = { control } 
                        validationRules = {{
                            maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                        }}
                    />

                    <InputField 
                        width = { 300 }
                        placeholder = "Название издания" 
                        errorMessage = { errors.searchName?.message } 
                        name = "searchTitle" 
                        control = { control } 
                        validationRules = {{
                            maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                        }}
                    />


                    <div className = {`flex items-center justify-center gap-5 ${css.media}`}>

                        <SelectField isNumber = { true } control = { control }
                            width = { 300 }
                            name = "searchPublicType" 
                            errorMessage = { errors.searchPublicType?.message }
                            validationRules = {{
                                valueAsNumber: true,
                            }}
                        >
                            {publicTypes.map((el, index) => (
                                <option value={el.id} key={index}>
                                    {el.title}
                                </option>
                            ))}
                        </SelectField>

                    
            


                        <SelectField isNumber = { true } control = { control }
                            width = { 300 }
                            name = "searchUser" 
                            errorMessage = { errors.searchUser?.message }
                            validationRules = {{
                                valueAsNumber: true,
                            }}
                        >
                            {users.map((el, index) => (
                                <option value={el.id} key={index}>
                                    {el.username}
                                </option>
                            ))}
                        </SelectField>
            
                

                        <SelectField isNumber = { true } control = { control }
                            width = { 300 }
                            name = "searchDate" 
                            errorMessage = { errors.searchDate?.message }
                            validationRules = {{
                                valueAsNumber: true,
                            }}
                        >
                            {yearsRage.map(year => (
                                <option key={year} value={ year }>
                                    {year}
                                </option>
                            ))}
                        </SelectField>
                    </div>

                    <div className = {`flex items-center justify-center gap-5 ${css.media}`}>
                       

                        <InputField 
                            width = { 300 }
                            placeholder = "Фамилия Соавтора" 
                            errorMessage = { errors.searchCoauthorLastName?.message } 
                            name = "searchCoauthorLastName" 
                            control = { control } 
                            validationRules = {{
                                maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                            }}
                        />

                        <InputField 
                            width = { 300 }
                            placeholder = "Имя Соавтора" 
                            errorMessage = { errors.searchCoauthorFirstName?.message } 
                            name = "searchCoauthorFirstName" 
                            control = { control } 
                            validationRules = {{
                                maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                            }}
                        />

                        <InputField 
                            width = { 300 }
                            placeholder = "Отчество Соавтора" 
                            errorMessage = { errors.searchCoauthorPatronymic?.message } 
                            name = "searchCoauthorPatronymic" 
                            control = { control } 
                            validationRules = {{
                                maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                            }}
                        />

                        
                    </div>

                </div>

                <Button type = { ITypeBtn.SUBMIT } styled = { EButton.GREEN } >
                    <FaSearch /> Поиск
                </Button>
            </form>

         
            <Table />
            <Pagination isSearch = { true } />
        </main>
    );
};

export default SearchPage;