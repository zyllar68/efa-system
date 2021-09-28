import "./style.scss";

const Input = ({
  label,
  type,
  value,
  placeholder,
  errorMessage
}) => {
  return (
    <div className="Input">
      { label && <label>{label}</label> }
      <input type={type} value={value} placeholder={placeholder} />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}

export default Input;
