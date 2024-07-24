
import { IProps } from "./IContainer";

import css from "./Container.module.scss";

const Container: React.FC<IProps> = ({ children }) => {
    return (
        <div className = { css.container }>
            { children }
        </div>
    )
}

export default Container;