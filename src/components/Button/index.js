import classNames from "classnames";
import "./style.scss";

const Button = ({
  title,
  primary,
  onClick
}) => {
  return (
    <button className={classNames("Button", {
      "primary": primary
    })}
    onClick={onClick}>
      {title}
    </button>
  )
}

export default Button
