import classNames from "classnames";
import "./style.scss";

const Button = ({
  title,
  primary,
  onClick,
  style
}) => {
  return (
    <button style={style} className={classNames("Button", {
      "primary": primary
    })}
    onClick={onClick}>
      {title}
    </button>
  )
}

export default Button
