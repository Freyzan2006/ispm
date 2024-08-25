import { useEffect } from "react";
import Button from "../../widgets/Button/Button";
import { EButton, ITypeBtn } from "../../widgets/Button/EButton";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../state/useAppDispatch";
import { RootState } from "../../state/store";

import { yearsRage } from "../../utils";
import css from "./AddPage.module.scss";
import { EStatus } from "../../state/api/EAPI";
import { publicTypeFetch } from "../../state/publicType/publicTypeFetch";
import { SubmitHandler, useForm } from "react-hook-form";

import InputField from "../../widgets/Field/InputField";

import SelectField from "../../widgets/Field/SelectField";
import { MyLink } from "../../widgets/Widgets";
import { ERouters } from "../../Routers/ERouters";

import { IFrom } from "./IAddPage.interface";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import useGetPubType from "../../hooks/useGetPubType";
import { useCountPages } from "../../hooks/useCountPages";
import { EAlertType, setMessageAlert, setShowAlert, setTypeAlert } from "../../state/alert/alertSlice";

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
        console.log(data)

        dispatch(setShowAlert());
        dispatch(setMessageAlert(`Вы успешно добавили запись "${data.name}" в свою таблицу`));
        dispatch(setTypeAlert(EAlertType.SUCCESSFUL));

        // async function addRequest() {
        //     const response = await axiosConfig.post("table/", data);

        //     console.log(response.data);

        // }

        // addRequest();
    }

   
    


    
    
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
                    {publicTypes.map((el, index) => (
                        <option value={el.id} key={index}>
                            {el.title}
                        </option>
                    ))}
                </SelectField>

                <InputField 
                    placeholder = "Название научной работы" 
                    errorMessage = { errors.name?.message } 
                    label="Название научной работы" name = "name" 
                    control = { control } 
                    validationRules = {{
                        required: '"Название научной работы" обязательно',
                        minLength: { value: 4, message: 'Минимальная длина 4 символа' },
                        maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                    }}
                />

                <InputField 
                    placeholder = "Название" 
                    errorMessage = { errors.title?.message } 
                    label="Название" name = "title" 
                    control = { control } 
                    validationRules = {{
                        required: '"Название" обязательно',
                        minLength: { value: 4, message: 'Минимальная длина 4 символа' },
                        maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                    }}
                />

                <SelectField isNumber = { true } control = { control }
                    name = "data" label = "Дата публикации" 
                    errorMessage = { errors.data?.message }
                    validationRules = {{
                        required: '"Дата публикации" обязательно',
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
                    placeholder = "Томов" 
                    errorMessage = { errors.tom?.message } 
                    label="Томов" name = "tom" 
                    control = { control } 
                    validationRules = {{
                        required: '"Томов" обязательно',
                        valueAsNumber: true,
                        min: { value: 1, message: 'минимум 1 том' },
                        max: { value: 1000,  message: 'максимум 1000 томов' }
                    }}
                />

                <InputField 
                    isNumber = { true }
                    placeholder = "issue" 
                    errorMessage = { errors.issue?.message } 
                    label="issue" name = "issue" 
                    control = { control } 
                    validationRules = {{
                        required: '"issue" обязательно',
                        valueAsNumber: true,
                        min: { value: 1, message: 'минимум 1 issue' },
                        max: { value: 1000,  message: 'максимум 1000 issue' }
                    }}
                />

                <div className = " flex justify-center items-center flex-col gap-4 w-full">                    
                    <div className = {`flex justify-center items-start gap-3 flex-row w-full ${css.fields}`}>
                        <InputField 
                            isNumber = { true }
                            placeholder = "Страницы от" 
                            errorMessage = { errors.page_start?.message } 
                            label="Страницы от" name = "page_start" 
                            control = { control } 
                            validationRules = {{
                                required: '"Страницы от" обязательно',
                                valueAsNumber: true,
                                min: { value: 1, message: 'минимум 1 страница' },
                                max: { value: endPageWatch || 5000,  message: 'Начальная страница не может быть больше конечной страницы.' }
                            }}
                        />

                        <InputField 
                            disabled = { !startPageWatch }
                            isNumber = { true }
                            placeholder = "До страницы" 
                            errorMessage = { errors.page_end?.message } 
                            label="До страницы" name = "page_end" 
                            control = { control } 
                            validationRules = {{
                                required: '"До страницы" обязательно',
                                valueAsNumber: true,
                                min: { value: 1, message: 'минимум "Страницы от" ' },
                                max: { value: 5000,  message: 'максимум 1000 страниц ' }
                            }}
                        />
                    
                        <InputField 
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
                
                <InputField 
                    placeholder = "Соавторы" 
                    errorMessage = { errors.Co_authors?.message } 
                    label="Соавторы" name = "Co_authors" 
                    control = { control } 
                    validationRules = {{
                        required: '"Соавторы" обязательно',
                        minLength: { value: 4, message: 'Минимальная длина 4 символа' },
                        maxLength: { value: 255, message: 'Максимальная длина 255 символов' },
                    }}
                />

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