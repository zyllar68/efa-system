import "./style.scss";
import { Modal } from "react-bootstrap";
import { Button } from "@components";

const AlertBox = ({
  setConfirm,
  setCancel,
  show
}) => {
  return (
    <Modal
    show={show}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className="AlertBox"
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        Are you sure?
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="AlertBox__buttons">
        <Button 
          warning
          title="No"
          onClick={setCancel}
        />
        <Button 
          primary
          title="Yes"
          onClick={setConfirm}
        />
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default AlertBox;
