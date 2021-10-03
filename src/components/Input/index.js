import classNames from "classnames";
import "./style.scss";

const Input = ({
  label,
  type,
  value,
  placeholder,
  errorMessage,
  dimensionInput,
  onChange
}) => {
  return (
    <div className={classNames("Input", {
      "dimension-input": dimensionInput
    })}>
      { label && <label>{label}</label> }
      <input type={type} value={value} placeholder={placeholder} onChange={onChange} />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}

export default Input;
