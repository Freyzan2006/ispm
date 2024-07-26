
import { IProps } from "./IContainer";

import css from "./Container.module.scss";

const Container: React.FC<IProps> = ({ children, styled }) => {
    return (
        <div className = { `${css.container} ${styled}` }>
            { children }
        </div>
    )
}

export default Container;