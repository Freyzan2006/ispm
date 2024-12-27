
import css from "./LoadingContent.module.scss";

interface IProps {
    w?: string;
    h?: string;
}

const LoadingContent: React.FC<IProps> = ({ w = "80px", h = "80px" }) => {
    return (
        <div className={ `${css.loader} `  } style={ { width: w, height: h } }></div>
    )
}

export default LoadingContent;