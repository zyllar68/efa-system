import "./style.scss";
import { Dropdown } from 'react-bootstrap';

const DropdownInput = ({
  label,
  options=[]
}) => {
  return (
    <div style={{marginTop: '0.9rem'}}>
      <label>{label}</label>
      <select>
        {
          options.map(({value, label}, i) => (
            <option value={value}>{label}</option>
          ))
        }
      </select>
    </div>
  )
}

export default DropdownInput;
