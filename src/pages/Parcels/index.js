import "./style.scss";
import { useState, useEffect } from "react";
import { TableComponent, Input, Button } from "@components";
import {Row, Col, Modal} from 'react-bootstrap';
import { createParcel, readAllParcel, } from "@api/parcel";
import { useHistory } from "react-router-dom";
import { ReactComponent as RemoveIcon } from "@icons/removeIcon.svg";
import { ReactComponent as AddIcon } from "@icons/addIcon.svg";


const thData = ["Parcel number", "Sender Name", "Recepient Name", ""];
const initialState =     {
  sender: {
    full_name: '',
    address: '',
    contact_number: '',
  },
  consignee: {
    full_name: '',
    address: '',
    contact_number: '',
  },
  parcel_info: {
    item_description: '',
    declared_value: '',
    cod_amount: '',
    no_of_items: '',
    total_weight: '',
    vol_weight: '',
    chargable_weight: 10,
    dimension: []
  }
}

const dimensionInitialState = [
  {
    l: '',
    h: '',
    w: ''
  }
]

const AddModal = ({
  show,
  onHide,
  onSave,
  state,
  setState,
  errorMessage,
  setErrorMessag
}) => {

  const [getVolWeight, setGetVolWeight] = useState(0);

  const [newDimension, setNewDimension] = useState(dimensionInitialState);

  useEffect(() => {
    setState(prevState => {
      return{
        ...prevState,
        parcel_info: { ...prevState.parcel_info, dimension: newDimension, vol_weight: getVolWeight,}
      }
    });
    totalVolWeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDimension]);

  useEffect(() => {
    setState(prevState => {
      return{
        ...prevState,
        parcel_info: { ...prevState.parcel_info, vol_weight: getVolWeight, no_of_items: newDimension.length}
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getVolWeight]);

  const handleChangeInput = (i, e) => {
    totalVolWeight()
    const values = [...newDimension];
    values[i][e.target.name] = e.target.value;
    setNewDimension(values);
    setErrorMessag('')
  }

  const handleAddField = () => {
    setNewDimension([...newDimension, {id: newDimension.length + 1, l: '', w: '', h: ''}]);
  }

  const handleRemoveField = (id) => {
    totalVolWeight();
    const values = [...newDimension]
    values.splice(id, 1)
    setNewDimension([...values]);
  }
  
  const totalVolWeight = () => {
    let currentHigh = 0;
    if(newDimension.length === 0){
      setGetVolWeight(0)
    }else {
      newDimension.map(({l, w, h}, i) => {
        let total = (l * w * h) / 3500;
        currentHigh+=total;
      });
      setGetVolWeight(currentHigh);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  return(
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={() => {
        setState(initialState);
        setNewDimension(dimensionInitialState);
        onHide();
      }}>
        Add
      </Modal.Header>
      <Modal.Body  style={{maxHeight: '450px', overflow: 'auto'}}>
        
        <h4>Sender Infrmation</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Full name"
              name="full_name"
              value={state.sender.full_name}
              onChange={e => {
                setErrorMessag('');
                setState({...state, sender: { ...state.sender, full_name: e.target.value }});
                }}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Contact number"
              value={state.sender.contact_number}
              onChange={e => {
                setErrorMessag('');
                setState({...state, sender: { ...state.sender, contact_number: e.target.value }})
                }}
            />
          </Col>
          <Col md={12}>
            <Input 
              label="Address"
              value={state.sender.address}
              onChange={e => {
                setErrorMessag('');
                setState({...state, sender: { ...state.sender, address: e.target.value}})
                }}
            />
          </Col>
        </Row>
        <h4 style={{marginTop: '2rem'}}>Consignee</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Full name"
              value={state.consignee.full_name}
              onChange={e => {
                setErrorMessag('');
                setState({...state, consignee: {...state.consignee, full_name: e.target.value}})
                }}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Contact number"
              value={state.consignee.contact_number}
              onChange={e => {
                setErrorMessag('');
                setState({...state, consignee: {...state.consignee, contact_number: e.target.value}});
                }}
            />
          </Col>
          <Col md={12}>
            <Input 
              label="Address"
              value={state.consignee.address}
              onChange={e => {
                setErrorMessag('');
                setState({...state, consignee: {...state.consignee, address: e.target.value}});
                }}
            />
          </Col>
        </Row>
        <h4 style={{marginTop: '2rem'}}>Parcel Information</h4>
        <Row>
          <Col md={12}>
            <Row>
              <Col md={4}>
                <Input 
                  label="Item Description"
                  value={state.parcel_info.item_description}
                  onChange={e => {
                    setErrorMessag('');
                    setState({...state, parcel_info: {...state.parcel_info, item_description: e.target.value}});
                  }}
                />
              </Col>
              <Col md={4}>
                <Input 
                  label="Declared value"
                  value={state.parcel_info.declared_value}
                  onChange={e => {
                    setErrorMessag('');
                    setState({...state, parcel_info:{...state.parcel_info, declared_value: e.target.value}})
                  }}
                />
              </Col>
              <Col md={4}>
                <Input 
                  label="COD Amount"
                  value={state.parcel_info.cod_amount}
                  onChange={e => {
                    setErrorMessag('');
                    setState({...state, parcel_info:{...state.parcel_info, cod_amount: e.target.value}});
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <Row>
              <Col md={3}>
                <Input 
                  label="No. of items"
                  type="number"
                  value={newDimension.length}
                  onChange={e => {
                    setErrorMessag('');
                    setState({...state, parcel_info: {...state.parcel_info, no_of_items: e.target.value}});
                  }}
                  readOnly
                />
              </Col>
              <Col md={3}>
                <Input 
                  label="Total Weight"
                  type="number"
                  value={state.parcel_info.total_weight}
                  onChange={e => {
                    setState({...state, parcel_info: {...state.parcel_info, total_weight: e.target.value}});
                  }}
                />
              </Col>
              <Col md={3}>
                <Input 
                  label="Volume Weight"
                  value={getVolWeight}
                  readOnly
                />
              </Col>
              <Col md={3}>
                <Input 
                  label="Chargable Weight"
                  value={getVolWeight > state.total_weight ? getVolWeight : state.total_weight}
                  readOnly
                />
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
              <p style={{margin: 0}}>Dimensions :</p>
              <p className="add-icon" onClick={() => handleAddField()}>
                <AddIcon />
              </p>
            </div>
            { 
              newDimension.map((value, i) => {
                  return(
                    <Row key={i}>
                      <Col>
                        <Input 
                          name="l"
                          dimensionInput
                          label="L"
                          value={value.l}
                          onChange={e => handleChangeInput(i, e)}
                        />
                      </Col>
                      <Col>
                        <Input 
                          dimensionInput
                          label="W"
                          name="w"
                          value={value.w}
                          onChange={e => handleChangeInput(i, e)}
                        />
                      </Col>
                      <Col>
                        <Input 
                          dimensionInput
                          label="H"
                          name="h"
                          value={value.h}
                          onChange={e => handleChangeInput(i, e)}
                        />
                      </Col>
                      <Col md={1} className="remove-icon">
                        <p style={{margin: 0, color: '#437fc7', cursor: 'pointer'}} onClick={() => handleRemoveField(i)}>
                          <RemoveIcon />
                        </p>
                      </Col>
                    </Row>
                  );
                })
              }
          </Col>
        </Row>
        
      </Modal.Body>
      <Modal.Footer style={{justifyContent: 'space-between'}}>
        <p >{errorMessage}</p>
        <Button primary title="Save"  onClick={() => {
          onSave();
        }} />
      </Modal.Footer>
    </Modal>
  );
}

const Parcels = () => {

  let history = useHistory();

  const [state, setState] = useState(initialState);

  const [parcels, setParces] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [addErrorMessage, setAddErrorMessage] = useState('');
  const [filterItem, setFilterItem] = useState('');


  useEffect(() => {
    (async function() {
      try {
        const res = await readAllParcel();
        setParces(res.data)
      } catch (error) {
        alert('Something went wrong. Please contact your provider.');
      }
    })();
  }, []);

  const filterItemsList = (arr = []) => {
    let res = [];

    const patt = new RegExp(filterItem.toLowerCase());

    res = arr.reduce((acc, curr) => {
      const info = curr;
      const nm = patt.test(info._id);

      if (nm === true) {
        acc.push(curr);
      }

      return acc;
    }, []);

    return res;
  };

  const onSaveParcel = async () => {
    if(state.sender.full_name === '' || state.sender.address === '' || state.sender.contact_number === ''
      || state.consignee.full_name === '' || state.consignee.address === '' || state.consignee.contact_number === '' 
      || state.parcel_info.item_description === '' || state.parcel_info.declared_value === ''
        || state.parcel_info.cod_amount === '' || state.parcel_info.no_of_items === '' || state.parcel_info.total_weight === '' 
        || state.parcel_info.vol_weight === 0){
          setAddErrorMessage('Please input all required fields!')
    }else {
      try {
        const res = await createParcel(state);
        if(res.status === 200){
          setShowAdd(false);
          setState(initialState);
          alert('New user Saved!')
        }
      } catch (error) {
        console.log(error)
        alert('Something went wrong. Please contact your service provider.');
      }
    }

  }

  // const onViewModal = async (id) => {
  //  console.log(id)
  //   try {
  //     const res  = await readParcel(id);
  //     setParcelInfo(res.data)
  //     setParcelId(id)
  //   } catch (error) {
  //     alert('Something went wrong. Please contact your service provider.');
  //   }
  //   setShowEdit(true);
  // }
  
  return (
    <div className="Parcels">
      <h2>Parcels</h2>
      <div className="Parcels__content">
        <div className="Parcels__search">
          <Input 
            placeholder="Search parcel number"
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
              filterItemsList(parcels).map((values, i = 0) => {
                return(
                  <tr key={i}>
                    <td>{values._id}</td>
                    <td>{values.sender.full_name}</td>
                    <td>{values.consignee.full_name}</td>
                    <td style={{color: '#437fc7', cursor: 'pointer', textAlign: 'center'}}
                      onClick={() => history.push(`/${values._id}`)}>
                      View
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </TableComponent>
      </div>
      <AddModal 
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onSave={onSaveParcel}
        state={state}
        setState={setState}
        errorMessage={addErrorMessage}
        setErrorMessag={setAddErrorMessage}
      />
    </div>
  )
}

export default Parcels;
