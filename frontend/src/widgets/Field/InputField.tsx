
import { Controller } from "react-hook-form";
import { IField } from "./IField";
import css from "./Field.module.scss"
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import { noSpecialChars, noSpecialCharsMessage } from "../../utils/validationInput";

const InputField: React.FC<IField> = 
({ control, name, label, errorMessage, placeholder, validationRules, isNumber, disabled }) => {


    const inputStyle = `${css.input} w-full  dark:border-white dark:text-white dark:shadow-lg dark:shadow-gray-500`;
    



    


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
                    <input 
                        disabled = { disabled }
                        type = { isNumber ? "number" : "text" }
                        title = { noSpecialCharsMessage }
                        className = { inputStyle }
                        onChange = { (e) => field.onChange(
                            isNumber ? Number(e.target.value) : e.target.value
                        ) } 
                        value = { field.value === 0 ? "" : field.value } 
                        placeholder = { placeholder }
                    
                    />
                    {errorMessage && (
                        <ErrorAlert errorMessage = { errorMessage }  />
                    )}
                    </>
                )}
                />
                
                
            
            
        </div>
        
    )
} 

export default InputField;