
import { Controller } from "react-hook-form";
import { IField } from "./IField";
import css from "./Field.module.scss"
import { noSpecialChars, noSpecialCharsMessage } from "../../../utils/validationInput";
import { ErrorAlert } from "../../ux/ux";


const InputField: React.FC<IField> = 
({ control, name, label, errorMessage, placeholder, validationRules, isNumber, disabled, type, onChange = () => {}, width = 500 }) => {


    const inputStyle = `${css.input}`;
    



    
    

    return (
        
        <div className = "flex justify-center items-center gap-3 flex-col w-full">
            {label && (
                <label className="TEXT_COLOR text-lg">
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
                        type = { isNumber ? "number" :  type ? type : "text" }
                        onWheel={ () => {} }
                        title = { noSpecialCharsMessage }
                        style={ { width: width } }
                        className = { `${inputStyle} INPUT` }
                        onChange = { (e) => {
                            onChange();
                            field.onChange(isNumber ? Number(e.target.value) : e.target.value);
                            
                            } 
                        }
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