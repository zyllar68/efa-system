import "./style.scss";
import { useState, useEffect } from "react";
import { TableComponent, Input, Button, AlertBox } from "@components";
import {Row, Col, Modal} from 'react-bootstrap';
import { readAdmin, createUser, readAll, readUser, updateAdmin, updateUser, checkUser, deleteUser } from "@api/user_account";
import { ReactComponent as ViewIcon } from "@icons/viewIcon.svg";
import { ReactComponent as DeleteIcon } from "@icons/deleteIcon.svg";

const thData = ["Full name", "View", "Delete"];

const EditModal = ({
  user,
  setUser,
  show,
  onHide,
  onClick,
  editUserError,
  setEditUserError
}) => {
  return(
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        Edit
      </Modal.Header>
      <Modal.Body  style={{maxHeight: '450px', overflow: 'auto'}}>
        <h4>User information</h4>
        <Row>
          <Col md={12}>
            <Input 
              label="Full name"
              value={user.full_name}
              onChange={e => {setEditUserError(''); setUser({...user, full_name: e.target.value})}}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Username"
              value={user.username}
              onChange={e => {setEditUserError(''); setUser({...user, username: e.target.value})}}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Password"
              value={user.password}
              onChange={e => {setEditUserError(''); setUser({...user, password: e.target.value})}}
            />
          </Col>
        </Row>
        <p className="user-error">{editUserError}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button primary title="Save" onClick={onClick} />
      </Modal.Footer>
    </Modal>
  );
}

const AddModal = ({
  show,
  onHide,
  onClick,
  state,
  setState,
  newUserError,
  setNewUserError
}) => {
  return(
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        Add
      </Modal.Header>
      <Modal.Body  style={{maxHeight: '450px', overflow: 'auto'}}>
        <h4>User information</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Full name"
              value={state.full_name}
              onChange={e => {setNewUserError(''); setState({...state, full_name: e.target.value})}}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Username"
              value={state.username}
              onChange={e => {setNewUserError('');  setState({...state, username: e.target.value})}}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Password"
              value={state.password}
              onChange={e => {setNewUserError(''); setState({...state, password: e.target.value})}}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{justifyContent: 'space-between'}}>
        <p className="user-error">{newUserError}</p>
        <Button primary title="Save" onClick={onClick} />
      </Modal.Footer>
    </Modal>
  );
}


const Settings = () => {

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [adminInfo, setAdminInfo] = useState({
    username: '',
    password: '',
  });
  const [user, setUser] = useState({
    _id: '',
    full_name: '',
    username: '',
    password: '',
  });

  const [state, setState] = useState({
    full_name: '',
    username: '',
    password: '',
  });

  const [newUserError, setNewUserError] = useState('');
  const [editUserError, setEditUserError] = useState('');
  const [adminError, setAdminError] = useState('');
  const [filterItem, setFilterItem] = useState('');

  const [confirmModal, setConfirmModal] = useState(false);
  const [userId, setUserId] = useState('')

  useEffect(() => {
    (async function() {
      try {
        const res = await readAdmin();
        setAdminInfo(res.data);
      } catch (error) {
        alert('Something went wrong. Please contact your provider.');
      }
    })();
  }, []);

  useEffect(() => {
    (async function() {
      try {
        const res = await readAll();
        setUsers(res.data);
      } catch (error) {
        console.log(error);
        alert('Something went wrong. Please contact your provider.');
      }
    })();
  }, [users])

  useEffect(() => {

  }, [user])

  const onSaveUser = async () => {
    try {
      if(state.full_name === ""  || state.username === "" || state.password === ""){
        setNewUserError('Please input all required fields!');
      }else{
        const check = await checkUser({ 'username': state.username });
        if(check.data === 'username is already used!') {
          setNewUserError(check.data);
        }else{
          const res = await createUser(state);
          if(res.status === 200){
            setShowAdd(false);
            alert('New user Saved!')
          }
        }
      }
    } catch (error) {
      alert('Something went wrong. Please contact your service provider.');
    }
  }

  const onSaveAdmin = async () => {
    if(adminInfo.username === '' || adminInfo.password === '') {
      setAdminError('Please input all required fields!');
    }else {
      try {
        await updateAdmin(adminInfo);
        alert('Edit Saved!')
      } catch (error) {
        alert('Something went wrong. Please contact your service provider.');
      }
    }
  }

  const onView = async id => {
    setShowEdit(true);
    try { 
      const res = await readUser(id);
      setUser(res.data)
    } catch (error) {
      console.log(error);
      alert('Something went wrong. Please contact your provider.');
    }

  }

  const filterItemsList = (arr = []) => {
    let res = [];

    const patt = new RegExp(filterItem.toLowerCase());

    res = arr.reduce((acc, curr) => {
      const info = curr;

      const nm = patt.test(info.full_name.toLowerCase());

      if (nm === true) {
        acc.push(curr);
      }

      return acc;
    }, []);

    return res;
  };

  const onSaveEditUSer = async () => {
    if(user.full_name === ""  || user.username === "" || user.password === ""){
      setEditUserError('Please input all required fields!');
    }else{
      try {
        const getUser = await readUser(user._id);
        if(getUser.data.username === user.username){
            await updateUser(user);
            alert('Edit Saved!');
            setShowEdit(false);
        }else{
          const check = await checkUser({ 'username': user.username });
          if(check.data === 'username is already used!') {
            setEditUserError(check.data);
          }else{
            await updateUser(user);
            alert('Edit Saved!');
            setShowEdit(false)
          }
        }
      } catch (error) {
        alert('Something went wrong. Please contact your service provider.');
      }
    }
  }

  const onDeleteUser = async id => {
    console.log(id)
    try { 
      const res = await deleteUser(id);
      console.log(res.data)
    } catch (error) {
      console.log(error);
      alert('Something went wrong. Please contact your provider.');
    }
  }

  return (
    <div className="Settings">
      <h2>Settings</h2>
      <div className="Settings__admin-settings">
        <h4>Admin Account</h4>
        <div className="row">
          <div className="col col-span-4">
            <Input 
              placeholder="username" 
              value={adminInfo.username}
              onChange={e => { setAdminError(''); setAdminInfo({...adminInfo, username: e.target.value})}}
            />
          </div>
          <div className="col col-span-4">
            <Input 
              placeholder="password" 
              value={adminInfo.password}
              onChange={e => {setAdminError(''); setAdminInfo({...adminInfo, password: e.target.value})}}
            />
          </div>
          <div className="col col-span-4">
            <Button title="Save" primary onClick={onSaveAdmin} />
          </div>
        </div>
        { adminError && <p className="admin-error">{adminError}</p> }
      </div>
      <hr />
      <div className="Settings__content">
        <h4>Users</h4>
        <div className="Settings__search">
          <Input 
              placeholder="Search"
              value={filterItem}
              onChange={e => setFilterItem(e.target.value)}
            />
          <Button 
            primary 
            title="Add" style={{width: '150px'}}
            onClick={() => setShowAdd(true)} />
        </div>
        <TableComponent
          thData={thData}>
          <tbody>
            {
              filterItemsList(users).map(({
                _id,
                full_name,
              }, i) => {
                return(
                  <tr key={i}>
                    <td>{full_name}</td>
                    <td className="view-td">
                      <div className="icon" onClick={() => onView(_id)}>
                        <ViewIcon />
                      </div>
                    </td>
                    <td className="view-td">
                      <div className="icon" onClick={() => {
                        setUserId(_id)
                        setConfirmModal(true)
                      }}>
                        <DeleteIcon />
                      </div>
                    </td>
                  </tr>
                );
             })
            }
          </tbody>
        </TableComponent>
      </div>
      <EditModal 
        show={showEdit}
        onHide={() => setShowEdit(false)}
        user={user}
        setUser={setUser}
        onClick={onSaveEditUSer}
        editUserError={editUserError}
        setEditUserError={setEditUserError}
      />
      <AddModal 
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onClick={onSaveUser}
        state={state}
        setState={setState}
        newUserError={newUserError}
        setNewUserError={setNewUserError}
      />
      <AlertBox 
        show={confirmModal}
        setCancel={() => setConfirmModal(false)}
        setConfirm={() => {
          onDeleteUser(userId);
          setConfirmModal(false);
        }}
      />
    </div>
  )
}

export default Settings;
