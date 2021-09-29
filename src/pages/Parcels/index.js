import "./style.scss";
import { useState } from "react";
import { TableComponent, Input, Button } from "@components";
import {Row, Col, Modal} from 'react-bootstrap';


const thData = ["Parcel number", "Sender Name", "Recepient Name", ""];

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
        <h4>Sender Infrmation</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Full name"
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Contact number"
            />
          </Col>
          <Col md={12}>
            <Input 
              label="Address"
            />
          </Col>
        </Row>
        <h4 style={{marginTop: '2rem'}}>Consignee</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Full name"
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Contact number"
            />
          </Col>
          <Col md={12}>
            <Input 
              label="Address"
            />
          </Col>
        </Row>
        <h4 style={{marginTop: '2rem'}}>Parcel Information</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Declared value"
            />
          </Col>
          <Col md={6}>
            <Input 
              label="COD Amount"
            />
          </Col>
          <Col md={12}>
            <Input 
              label="Item Description"
            />
          </Col>
          <Col md={12}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
              <p style={{margin: 0}}>Dimensions :</p>
              <p style={{margin: 0, color: '#437fc7', cursor: 'pointer'}}>Add</p>
            </div>
            <Row>
              <Col md={4}>
                <Input 
                  dimensionInput
                  label="L"
                />
              </Col>
              <Col md={4}>
                <Input 
                  dimensionInput
                  label="W"
                />
              </Col>
              <Col md={4}>
                <Input 
                  dimensionInput
                  label="H"
                />
              </Col>
            </Row>
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
        Edit
      </Modal.Header>
      <Modal.Body  style={{maxHeight: '450px', overflow: 'auto'}}>
        <h4>Sender Infrmation</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Full name"
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Contact number"
            />
          </Col>
          <Col md={12}>
            <Input 
              label="Address"
            />
          </Col>
        </Row>
        <h4 style={{marginTop: '2rem'}}>Consignee</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Full name"
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Contact number"
            />
          </Col>
          <Col md={12}>
            <Input 
              label="Address"
            />
          </Col>
        </Row>
        <h4 style={{marginTop: '2rem'}}>Parcel Information</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Declared value"
            />
          </Col>
          <Col md={6}>
            <Input 
              label="COD Amount"
            />
          </Col>
          <Col md={12}>
            <Input 
              label="Item Description"
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



const Parcels = () => {

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="Parcels">
      <h2>Parcels</h2>
      <div className="Parcels__content">
        <div className="Parcels__search">
          <Input 
            placeholder="Search parcel number"
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
              <td>123872163</td>
              <td>john</td>
              <td>doe</td>
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

export default Parcels;
