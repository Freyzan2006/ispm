
import { IProps } from "./IButton";


const Button: React.FC<IProps> = ({ children, styled, type, disabled , ...props }) => {

    return (
        <button type = { type } className = { `text-black dark:text-white ${styled}` } disabled = { disabled } { ...props }>
            { children }
        </button>
    )
}

export default Button;