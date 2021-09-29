import "./style.scss";
import { useState } from "react";
import { TableComponent, Input, Button } from "@components";
import {Row, Col, Modal} from 'react-bootstrap';

const thData = ["Full name", "Account type", ""];

const EditModal = (props) => {
  return(
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        Edit
      </Modal.Header>
      <Modal.Body  style={{maxHeight: '450px', overflow: 'auto'}}>
        <h4>User information</h4>
        <Row>
          <Col md={12}>
            <Input 
              label="Full name"
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Username"
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Password"
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button primary title="Save" />
      </Modal.Footer>
    </Modal>
  );
}

const AddModal = (props) => {
  return(
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        Add
      </Modal.Header>
      <Modal.Body  style={{maxHeight: '450px', overflow: 'auto'}}>
        <h4>User information</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Full name"
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Username"
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Password"
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button primary title="Save" />
      </Modal.Footer>
    </Modal>
  );
}


const Settings = () => {

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="Settings">
      <h2>Settings</h2>
      <div className="Settings__content">
        <div className="Settings__search">
          <Input 
              placeholder="Search"
            />
          <Button 
            primary 
            title="Add" style={{width: '150px'}}
            onClick={() => setShowAdd(true)} />
        </div>
        <TableComponent
          thData={thData}>
          <tbody>
            <tr>
              <td>john doe</td>
              <td>Admin</td>
              <td style={{color: '#437fc7', cursor: 'pointer'}}
                onClick={() => setShowEdit(true)}>
                View
              </td>
            </tr>
          </tbody>
        </TableComponent>
      </div>
      <EditModal 
        show={showEdit}
        onHide={() => setShowEdit(false)}
      />
      <AddModal 
        show={showAdd}
        onHide={() => setShowAdd(false)}
      />
    </div>
  )
}

export default Settings;
