import "./style.scss";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Input, Button, DropdownInput } from "@components";
import { useRouteMatch, useHistory } from 'react-router-dom';
import { updateParcel, readParcel } from "api/parcel";
import { ReactComponent as DeleteIcon } from "@icons/deleteIcon.svg";

import { format } from 'date-fns'

const initialState = {
  lastEditedBy: '',
  shipped_date: format(new Date(), 'MM-dd-yyyy'),
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
    chargable_weight: '',
    status: '',
    dimension: []
  }
}

const EditParcel = () => {

  const match = useRouteMatch();
  const history = useHistory();

  const { id } = match.params;

  const [state, setState] = useState(initialState);
  const [newDimension, setNewDimension] = useState([]);
  const [getVolWeight, setGetVolWeight] = useState(0);
  const [getChargableWeight, setGetChargableWeight] = useState(0);
  const [readOnlyInput, setReadOnlyInput] = useState(false);
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    (async function() {
      try {
        const res = await readParcel(id);
        console.log(res.data)
        const accountType = window.localStorage.getItem('account_type');
        setState(res.data);
        setNewDimension(res.data.parcel_info.dimension);
        if(accountType === '2') {
          setReadOnlyInput(true);
        }
      } catch (error) {
        alert('Something went wrong. Please contact your provider.');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(new Date(state.shipped_date), 'MM-dd-yyyy'  )
  }, [])

  // useEffect(() => {
  //   setState(prevState => {
  //     return{
  //       ...prevState,
  //       parcel_info: { ...prevState.parcel_info, dimension: newDimension, vol_weight: getVolWeight,}
  //     }
  //   });
  //   // totalVolWeight();
  //   // chargableWeight();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [newDimension]);

  // useEffect(() => {
  //   setState(prevState => {
  //     return{
  //       ...prevState,
  //       parcel_info: { ...prevState.parcel_info, vol_weight: getVolWeight, no_of_items: newDimension.length, chargable_weight: getChargableWeight}
  //     }
  //   });
  //   totalVolWeight();
  //   chargableWeight();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getVolWeight]);

// useEffect(() => {
//   setState( prevState => {
//     return {
//       ...prevState,
//       parcel_info: { ...prevState.parcel_info, total_weight: totalWeight }
//     }
//   });
//   totalVolWeight();
//   chargableWeight();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [totalWeight])

  
  const handleChangeInput = (i, e) => {
    const values = [...newDimension];
    values[i][e.target.name] = e.target.value;
    setNewDimension(values);
    setState({...state, lastEditedBy: window.localStorage.getItem('account_name')});
  }

  const handleAddField = () => {
    setNewDimension([...newDimension, {id: newDimension.length + 1, l: '', w: '', h: ''}]);
  }

  const handleRemoveField = (id) => {
    // chargableWeight();
    // totalVolWeight();
    const values = [...newDimension]
    values.splice(id, 1)
    setNewDimension([...values]);
  }

  // const totalVolWeight = () => {
  //   // chargableWeight();
  //   let currentHigh = 0;
  //   if(newDimension.length === 0){
  //     // setGetVolWeight(0)
  //   }else {
  //     newDimension.map(({l, w, h}, i) => {
  //       let total = (l * w * h) / 3500;
  //       currentHigh+=total;
  //     });
  //     setGetVolWeight(currentHigh);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }

  // const chargableWeight = () => {
  //   if(totalWeight > getVolWeight){
  //     setGetChargableWeight(totalWeight);
  //   }else{
  //     setGetChargableWeight(getVolWeight);
  //   }
  // }

  const onSave = async () => {  
    try {
      const res = await updateParcel(id, state);
      alert(res.data)
    } catch (error) {
      alert('Something went wrong. Please contact your provider.');
    }
  }

  return (
    <div className="EditParcel">
      <div className="EditParcel__header">
        <div className="EditParcel__header-text">
          <h2>Edit</h2>
          <p>Created by: {state.createdBy}</p>
          <p>Last edited by: {state.lastEditedBy}</p>
        </div>
        <Button 
          primary 
          title="Print" style={{width: '150px', height: '40px'}}
          onClick={() => history.push(`/print/${id}`)} />
      </div>
      <div className="EditParcel__form">
        <div className="EditParcel__form-header">
          <div>
            <Input 
              small
              label="Ship Date"
              name="full_name"
              type="text"
              value={format(new Date(state.shipped_date), 'MMMM dd yyyy')}
              disabled
              // onChange={e => setState({...state, shipped_date: e.target.value })}
            />
          </div>
          <Button 
            primary 
            title="Save" style={{width: '150px'}}
            onClick={() => onSave()} />
        </div>
        <h4 style={{marginTop: '1rem'}}>Sender information</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Full name"
              value={state.sender.full_name}
              onChange={e => {
                setState({...state, lastEditedBy: window.localStorage.getItem('account_name'), sender: { ...state.sender, full_name: e.target.value }});
              }}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Contact number"
              value={state.sender.contact_number}
              onChange={e => {
                setState({...state, lastEditedBy: window.localStorage.getItem('account_name'), sender: { ...state.sender, contact_number: e.target.value }});
              }}
            />
          </Col>
          <Col md={12}>
            <Input 
              label="Address"
              value={state.sender.address}
              onChange={e => setState({...state, lastEditedBy: window.localStorage.getItem('account_name'), sender: { ...state.sender, address: e.target.value }})}
            />
          </Col>
        </Row>
        <h4 style={{marginTop: '2rem'}}>Consignee</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Full name"
              value={state.consignee.full_name}
              onChange={e => setState({...state, lastEditedBy: window.localStorage.getItem('account_name'), consignee: { ...state.consignee, full_name: e.target.value }})}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Contact number"
              value={state.consignee.contact_number}
              onChange={e => setState({...state, lastEditedBy: window.localStorage.getItem('account_name'), consignee: { ...state.consignee, contact_number: e.target.value }})}
            />
          </Col>
          <Col md={12}>
            <Input 
              label="Address"
              value={state.consignee.address}
              onChange={e => setState({...state, lastEditedBy: window.localStorage.getItem('account_name'), consignee: { ...state.consignee, address: e.target.value }})}
            />
          </Col>
        </Row>
        <h4 style={{marginTop: '2rem'}}>Parcel Information</h4>
        <Row>
          <Col md={12}>
            <DropdownInput
              label="Status" 
              value={state.parcel_info.status}
              onChange={e => setState({...state, lastEditedBy: window.localStorage.getItem('account_name'), parcel_info:{...state.parcel_info, status: e.target.value}})}
              options={[
                {value: "", label: "All"},
                {value: "on_delivery", label: "On Delivery"},
                {value: "delivered", label: "Delivered"},
                {value: "pending", label: "Pending"},
                {value: "HAL", label: "HAL"}
              ]}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Declared value"
              value={state.parcel_info.declared_value}
              onChange={e => setState({...state, lastEditedBy: window.localStorage.getItem('account_name'), parcel_info: { ...state.parcel_info, declared_value: e.target.value }})}
              readOnly={readOnlyInput}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="COD Amount"
              value={state.parcel_info.cod_amount}
              onChange={e => setState({...state, lastEditedBy: window.localStorage.getItem('account_name'), parcel_info: { ...state.parcel_info, cod_amount: e.target.value }})}
              readOnly={readOnlyInput}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="No. of items"
              type="number"
              value={newDimension.length}
              onChange={e => setState({...state, lastEditedBy: window.localStorage.getItem('account_name'), parcel_info: {...state.parcel_info, no_of_items: e.target.value}})}
              readOnly
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Item Description"
              value={state.parcel_info.item_description}
              onChange={e => setState({...state, lastEditedBy: window.localStorage.getItem('account_name'), parcel_info: { ...state.parcel_info, item_description: e.target.value }})}
              readOnly={readOnlyInput}
            />
          </Col>
          <Col md={4}>
            <Input 
              label="Total Weight"
              type="number"
              value={state.parcel_info.total_weight}
              onChange={e => setTotalWeight(e.target.value)}
              readOnly={readOnlyInput}
            />
          </Col>
          <Col md={4}>
            <Input 
              label="Volume Weight"
              value={parseFloat(state.parcel_info.vol_weight).toFixed(2)}
              readOnly
            />
          </Col>
          <Col md={4}>
            <Input 
              label="Chargable Weight"
              value={state.parcel_info.chargable_weight}
              readOnly
            />
          </Col>
          <Col md={12}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
              <p style={{margin: 0}}>Dimensions :</p>
              {
                !readOnlyInput && 
                <p style={{margin: 0, color: '#437fc7', cursor: 'pointer'}} onClick={() => handleAddField()}>Add</p>
              }
            </div>
            {
              newDimension.map((item, i) => (
                <Row key={i}>
                  <Col>
                    <Input 
                      dimensionInput
                      name="l"
                      label="L"
                      value={item.l}
                      onChange={e => handleChangeInput(i, e)}
                      readOnly={readOnlyInput}
                    />
                  </Col>
                  <Col>
                    <Input 
                      dimensionInput
                      name="w"
                      label="W"
                      value={item.w}
                      onChange={e => handleChangeInput(i, e)}
                      readOnly={readOnlyInput}
                    />
                  </Col>
                  <Col >
                    <Input 
                      dimensionInput
                      name="h"
                      label="H"
                      value={item.h}
                      onChange={e => handleChangeInput(i, e)}
                      readOnly={readOnlyInput}
                    />
                  </Col>
                  {
                    !readOnlyInput && 
                    <Col md={1} >
                      <div style={{marginTop: 40, color: '#437fc7', cursor: 'pointer'}} onClick={() => handleRemoveField(i)}>
                        <DeleteIcon />
                      </div>
                    </Col>
                  }
                </Row>
              ))
            }
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default EditParcel;
