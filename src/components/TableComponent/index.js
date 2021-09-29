import "./style.scss";
import { Table } from 'react-bootstrap'

const TableComponent = ({
  thData=[],
  children
}) => {
  return (
    <Table striped bordered hover >
      <thead>
        <tr>
          {thData.map((label, i) => {
            return(
              <th key={i}>{label}</th>
            );
          })}
        </tr>
      </thead>
      {children}
    </Table>
  )
}

export default TableComponent;
