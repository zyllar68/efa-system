import "./style.scss";
import { Dropdown } from 'react-bootstrap';

const DropdownInput = ({
  label,
  options=[],
  onChange,
  value
}) => {
  return (
    <div style={{marginTop: '0.9rem'}}>
      <label>{label}</label>
      <select onChange={onChange} value={value}>
        {
          options.map(({value, label}, i) => (
            <option value={value} key={i}>{label}</option>
          ))
        }
      </select>
    </div>
  )
}

export default DropdownInput;
