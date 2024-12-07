
import { Button, InputField, MyLink, SelectField } from "../../components/ui/ui";

import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/useAppDispatch";
import { RootState } from "../../store/store";

import { yearsRage } from "../../utils";
import css from "./AddPage.module.scss";

import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";









import { FaArrowAltCircleLeft } from "react-icons/fa";
import useGetPubType from "../../hooks/useGetPubType";
import { useCountPages } from "../../hooks/useCountPages";
import { EAlertType, setMessageAlert, setShowAlert, setTypeAlert } from "../../store/slices/alertSlice/alertSlice";
import axiosConfig from "../../services/api/axiosConfig";
import { IPublicType } from "../../store/slices/publicTypeSlice/IpublicType";
import { EButton, ITypeBtn } from "../../components/ui/Button/EButton";
import { IFrom } from "./IAddPage";
import { ERouters } from "../../routers/ERouters";



const AddPage: React.FC = () => {

    const { handleSubmit, watch, setValue, control, formState: { errors, isValid  } } = useForm<IFrom>({
        mode: "onChange",
    });

    const startPageWatch = watch("page_start");
    const endPageWatch = watch("page_end");
   
  
    const { publicTypes, status } = useAppSelector((state: RootState) => state.publicTypes);
    const userId = useAppSelector((state: RootState) => state.user.id);

    const dispatch = useAppDispatch();

    useCountPages({startPageWatch, endPageWatch, setValue});
    useGetPubType(status);

    
    

    const onSubmit: SubmitHandler<IFrom> = (data) => {
        if ( !userId ) return 
       
        data.for_user = userId;
        data.authors = JSON.stringify(data.authors) as any;
        console.log(data)
       

        


        async function addRequest() {
            const response = await axiosConfig.post("table/", data);

            console.log(response.data);

        }

        dispatch(setShowAlert());
        try {
            addRequest();
            dispatch(setMessageAlert(`Вы успешно добавили запись "${data.name}" в свою таблицу`));
            dispatch(setTypeAlert(EAlertType.SUCCESSFUL));
        } catch(err) {
            dispatch(setMessageAlert(`Не удалось создать запись в таблице :(`));
            dispatch(setTypeAlert(EAlertType.ERROR));
        }
    }

   
    


    const { fields, append, remove } = useFieldArray({
        control,
        name: "authors", // Имя поля в вашей форме
    });

    
    
    return (
        <main>
            <form className={`${css.AddPage} shadow-lg shadow-blue-400 dark:shadow-lg dark:shadow-gray-500 `} onSubmit = { handleSubmit(onSubmit) }>
                
                <SelectField isNumber = { true } control = { control }
                    name = "Type" label = "Тип публикации" 
                    errorMessage = { errors.Type?.message }
                    validationRules = {{
                        required: '"Тип публикации" обязательно',
                        valueAsNumber: true,
                        min: { value: 1, message: 'Вы не выбрали "Тип"' },
                    }}
                >
                    {publicTypes.map((el: IPublicType, index: number) => (
                        <option value={el.id} key={index}>
                            {el.title}
                        </option>
                    ))}
                </SelectField>

                <InputField 
                    placeholder = "Название публикации" 
                    errorMessage = { errors.name?.message } 
                    label="Название публикации" name = "name" 
                    control = { control } 
                    validationRules = {{
                        required: '"Название публикации" обязательно',
                        minLength: { value: 4, message: 'Минимальная длина 4 символа' },
                        maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                    }}
                />

                <InputField 
                    placeholder = "Название издания" 
                    errorMessage = { errors.title?.message } 
                    label="Название издания" name = "title" 
                    control = { control } 
                    validationRules = {{
                        required: '"Название издания" обязательно',
                        minLength: { value: 4, message: 'Минимальная длина 4 символа' },
                        maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                    }}
                />

                <SelectField isNumber = { true } control = { control }
                    name = "data" label = "Год" 
                    errorMessage = { errors.data?.message }
                    validationRules = {{
                        required: '"Год" обязательно',
                        valueAsNumber: true,
                        min: { value: 1, message: 'Вы не выбрали "Дату"' },
                    }}
                >
                    {yearsRage.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </SelectField>


                <InputField 
                    isNumber = { true }
                    placeholder = "Том" 
                    errorMessage = { errors.tom?.message } 
                    label="Том" name = "tom" 
                    control = { control } 
                    validationRules = {{
                        required: '"Том" обязательно',
                        valueAsNumber: true,
                        min: { value: 1, message: 'минимум 1 том' },
                        max: { value: 1000,  message: 'максимум 1000 томов' }
                    }}
                />

                <InputField 
                    isNumber = { true }
                    placeholder = "Номер" 
                    errorMessage = { errors.issue?.message } 
                    label="Номер" name = "issue" 
                    control = { control } 
                    validationRules = {{
                        required: '"Номер" обязательно',
                        valueAsNumber: true,
                        min: { value: 1, message: 'минимум 1 Номер' },
                        max: { value: 1000,  message: 'максимум 1000 Номер' }
                    }}
                />

                <div className = " flex justify-center items-center flex-col gap-4 w-full">                    
                    <div className = {`flex justify-center items-start gap-3 flex-row w-full ${css.fields}`}>
                        <InputField 
                            width= { 200 }
                            isNumber = { true }
                            placeholder = "Начальная страница" 
                            errorMessage = { errors.page_start?.message } 
                            label="Начальная страница" name = "page_start" 
                            control = { control } 
                            validationRules = {{
                                required: '"Начальная страница" обязательно',
                                valueAsNumber: true,
                                min: { value: 1, message: 'минимум 1 страница' },
                                max: { value: endPageWatch || 5000,  message: 'Начальная страница не может быть больше конечной страницы.' }
                            }}
                        />

                        <InputField 
                            width= { 200 }
                            disabled = { !startPageWatch }
                            isNumber = { true }
                            placeholder = "Конечная страница" 
                            errorMessage = { errors.page_end?.message } 
                            label="Конечная страница" name = "page_end" 
                            control = { control } 
                            validationRules = {{
                                required: '"Конечная страницы" обязательно',
                                valueAsNumber: true,
                                min: { value: 1, message: 'минимум "Начальная страница" ' },
                                max: { value: 5000,  message: 'максимум 1000 страниц ' }
                            }}
                        />
                    
                        <InputField 
                            width= { 200 }
                            disabled = { true }
                            isNumber = { true }
                            placeholder = "Всего страниц" 
                            errorMessage = { errors.pages?.message } 
                            label="Всего страниц" name = "pages" 
                            control = { control } 
                            validationRules = {{
                                required: '"Всего страниц" обязательно',
                                valueAsNumber: true,
                                min: { value: 1, message: 'минимум "Страницы от" ' },
                                max: { value: 5000,  message: 'максимум 1000 страниц ' }
                            }}
                        />
                    </div>
                </div>

              


                <div className="flex flex-col justify-center items-center gap-5">
                    <h2 className="text-black dark:text-white text-2xl">Соавторы</h2>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex justify-center items-center flex-row gap-5">
                            <InputField
                                width= { 300 }
                                placeholder="Фамилия Соавтора"
                                errorMessage={errors.authors?.[index]?.last_name?.message}
                                label="Фамилия Соавтора"
                                name={`authors[${index}].last_name`}
                                control={control}
                                validationRules={{
                                    required: '"Фамилия Соавтора" обязательно',
                                    minLength: { value: 4, message: 'Минимальная длина 4 символа' },
                                    maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                                }}
                            />
                            <InputField
                                width= { 300 }
                                placeholder="Имя Соавтора"
                                errorMessage={errors.authors?.[index]?.first_name?.message}
                                label="Имя Соавтора"
                                name={`authors[${index}].first_name`}
                                control={control}
                                validationRules={{
                                    required: '"Имя Соавтора" обязательно',
                                    minLength: { value: 4, message: 'Минимальная длина 4 символа' },
                                    maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                                }}
                            />
                            <InputField
                                width= { 300 }
                                placeholder="Отчество Соавтора"
                                errorMessage={errors.authors?.[index]?.patronymic?.message}
                                label="Отчество Соавтора"
                                name={`authors[${index}].patronymic`}
                                control={control}
                                validationRules={{
                                    minLength: { value: 4, message: 'Минимальная длина 4 символа' },
                                    maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                                }}
                            />
                            <Button styled = {EButton.RED} type= { ITypeBtn.BUTTON } onClick={() => remove(index)}>Удалить</Button>
                        </div>
                    ))}
                    <Button styled = {EButton.GREEN} type= { ITypeBtn.BUTTON } onClick={() => append({ first_name: '', last_name: '', patronymic: "" })}>
                        <FaPlus /> Добавить Соавтора
                    </Button>
                </div>
                
                

                <div className = "flex justify-center items-center gap-3">
                    <MyLink to = { `/${ERouters.USER}/` } styled = { EButton.BLUE }>
                        <FaArrowAltCircleLeft />
                    </MyLink>
                    <Button disabled = { !isValid } type = { ITypeBtn.SUBMIT } 
                    styled = { isValid ? EButton.GREEN : `${EButton.RED} opacity-40` } 
                    >
                        <FaPlus /> { isValid ? "Добавить" : "Заполните все поля"} 
                    </Button>
                </div>

                    
                
            </form>
           
        </main>
    )
}

export default AddPage;