
import { IProps } from "./IButton";


const Button: React.FC<IProps> = ({ children, styled, type, disabled , ...props }) => {

    return (
        <button type = { type } className = { styled } disabled = { disabled } { ...props }>
            { children }
        </button>
    )
}

export default Button;