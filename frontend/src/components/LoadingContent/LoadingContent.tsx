
import css from "./LoadingContent.module.scss";

const LoadingContent: React.FC = () => {
    return (
        <div className={ `${css.loader}  `  }></div>
    )
}

export default LoadingContent;