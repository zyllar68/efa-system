import classNames from "classnames";
import "./style.scss";

const Button = ({
  title,
  primary,
  warning,
  onClick,
  style,
  type
}) => {
  return (
    <button type={type} style={style} className={classNames("Button", {
      "primary": primary,
      "warning": warning
    })}
    onClick={onClick}>
      {title}
    </button>
  )
}

export default Button
