

import { Controller } from "react-hook-form";
import { IField, ISelectField } from "./IField";
import css from "./Field.module.scss"
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import { noSpecialChars, noSpecialCharsMessage } from "../../utils/validationInput";

const SelectField: React.FC<ISelectField> = 
({ control, name, label, errorMessage, validationRules, isNumber, children }) => {


    
    const selectorStyle = `${css.selector} w-full bg-white dark:bg-slate-900 dark:border-white dark:text-white dark:shadow-lg dark:shadow-gray-500`;



    


    return (
        
        <div className = "flex justify-center items-center gap-3 flex-col w-full">
            {label && (
                <label className="text-black dark:text-white text-lg">
                    { label }
                </label>
            )}
            
            
            <Controller
                control = { control }
                name = { name }
                defaultValue=""
                rules = { {...validationRules, 
                    validate: noSpecialChars,
                    
                } }
                
                render = { ({ field }) => (
                    <>
                    {/* <input 
                        type = { isNumber ? "number" : "text" }
                        title = { noSpecialCharsMessage }
                        className = { selectorStyle }
                        onChange = { (e) => field.onChange(
                            isNumber ? Number(e.target.value) : e.target.value
                        ) } 
                        value = { field.value === 0 ? "" : field.value } 
                        placeholder = { placeholder }
                    /> */}

                        <select className = { selectorStyle }
                            onChange = { (e) => field.onChange(isNumber ? +e.target.value : e.target.value) } 
                            value = { field.value }
                        >
                            <option value = { '' }>
                                ------- 
                            </option>
                            { children }
                        </select>
                        {errorMessage && (
                            <ErrorAlert errorMessage = { errorMessage }  />
                        )}
                    </>
                )}
                />
                
                
            
            
        </div>
        
    )
} 

export default SelectField;
