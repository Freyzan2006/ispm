

import { Controller } from "react-hook-form";
import { ISelectField } from "./IField";
import css from "./Field.module.scss"
import { noSpecialChars } from "../../../utils/validationInput";
import { ErrorAlert } from "../../ux/ux";


const SelectField: React.FC<ISelectField> = 
({ control, name, label, errorMessage, validationRules, isNumber, children, width = 500 }) => {


    
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
                    

                        <select style={ { width: width } } className = { `${selectorStyle}` }
                            onChange = { (e) => field.onChange(isNumber ? +e.target.value : e.target.value) } 
                            value = { field.value  }
                        >
                            <option className = "text-black dark:text-white"  value = { '' }>
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
