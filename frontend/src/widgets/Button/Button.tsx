
import { IProps } from "./IButton";


const Button: React.FC<IProps> = ({ children, styled, type, ...props }) => {

    return (
        <button type = { type } className = { styled } { ...props }>
            { children }
        </button>
    )
}

export default Button;