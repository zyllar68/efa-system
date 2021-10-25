import classNames from "classnames";
import "./style.scss";

const Input = ({
  label,
  type,
  value,
  placeholder,
  errorMessage,
  dimensionInput,
  onChange,
  name,
  id,
  readOnly,
  small,
  step
}) => {
  return (
    <div className={classNames("Input", {
      "dimension-input": dimensionInput,
      "small": small
    })}>
      { label && <label>{label}</label> }
      <input step={step} name={name} id={id} type={type} value={value} placeholder={placeholder} onChange={onChange} readOnly={readOnly}/>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}

export default Input;
