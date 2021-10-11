import classNames from "classnames";
import "./style.scss";

const Button = ({
  title,
  primary,
  onClick,
  style,
  type
}) => {
  return (
    <button type={type} style={style} className={classNames("Button", {
      "primary": primary
    })}
    onClick={onClick}>
      {title}
    </button>
  )
}

export default Button
