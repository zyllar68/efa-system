import "./style.scss";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Input, Button } from "@components";
import { useRouteMatch, useHistory } from 'react-router-dom';
import { updateParcel, readParcel } from "api/parcel";

const initialState = {
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

  useEffect(() => {
    (async function() {
      try {
        const res = await readParcel(id);
        setState(res.data);
        setNewDimension(res.data.parcel_info.dimension);
        setGetVolWeight(res.data.parcel_info.vol_weight)
      } catch (error) {
        alert('Something went wrong. Please contact your provider.');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    const values = [...newDimension];
    values[i][e.target.name] = e.target.value;
    setNewDimension(values);
    totalVolWeight();
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

  const onSave = async () => {
    try {
      const res = await updateParcel(id, state);
      console.log(res.data)
    } catch (error) {
      alert('Something went wrong. Please contact your provider.');
    }
  }

  return (
    <div className="EditParcel">
      <div className="EditParcel__header">
        <h2>Edit</h2>
        <Button 
          primary 
          title="Print" style={{width: '150px'}}
          onClick={() => history.push(`/print/${id}`)} />
      </div>
      <div className="EditParcel__form">
        <div className="EditParcel__form-header">
          <h4>Sender information</h4>
          <Button 
            primary 
            title="Save" style={{width: '150px'}}
            onClick={() => onSave()} />
        </div>
        <Row>
          <Col md={6}>
            <Input 
              label="Full name"
              value={state.sender.full_name}
              onChange={e => setState({...state, sender: { ...state.sender, full_name: e.target.value }})}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Contact number"
              value={state.sender.contact_number}
              onChange={e => setState({...state, sender: { ...state.sender, contact_number: e.target.value }})}
            />
          </Col>
          <Col md={12}>
            <Input 
              label="Address"
              value={state.sender.address}
              onChange={e => setState({...state, sender: { ...state.sender, address: e.target.value }})}
            />
          </Col>
        </Row>
        <h4 style={{marginTop: '2rem'}}>Consignee</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Full name"
              value={state.consignee.full_name}
              onChange={e => setState({...state, consignee: { ...state.consignee, full_name: e.target.value }})}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Contact number"
              value={state.consignee.contact_number}
              onChange={e => setState({...state, consignee: { ...state.consignee, contact_number: e.target.value }})}
            />
          </Col>
          <Col md={12}>
            <Input 
              label="Address"
              value={state.consignee.address}
              onChange={e => setState({...state, consignee: { ...state.consignee, address: e.target.value }})}
            />
          </Col>
        </Row>
        <h4 style={{marginTop: '2rem'}}>Parcel Information</h4>
        <Row>
          <Col md={6}>
            <Input 
              label="Declared value"
              value={state.parcel_info.declared_value}
              onChange={e => setState({...state, parcel_info: { ...state.parcel_info, declared_value: e.target.value }})}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="COD Amount"
              value={state.parcel_info.cod_amount}
              onChange={e => setState({...state, parcel_info: { ...state.parcel_info, cod_amount: e.target.value }})}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="No. of items"
              type="number"
              value={newDimension.length}
              onChange={e => setState({...state, parcel_info: {...state.parcel_info, no_of_items: e.target.value}})}
              readOnly
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Item Description"
              value={state.parcel_info.item_description}
              onChange={e => setState({...state, parcel_info: { ...state.parcel_info, item_description: e.target.value }})}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Total Weight"
              type="number"
              value={state.parcel_info.total_weight}
              onChange={e => setState({...state, parcel_info: {...state.parcel_info, total_weight: e.target.value}})}
            />
          </Col>
          <Col md={6}>
            <Input 
              label="Volume Weight"
              value={getVolWeight}
              readOnly
            />
          </Col>
          <Col md={12}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
              <p style={{margin: 0}}>Dimensions :</p>
              <p style={{margin: 0, color: '#437fc7', cursor: 'pointer'}} onClick={() => handleAddField()}>Add</p>
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
                    />
                  </Col>
                  <Col>
                    <Input 
                      dimensionInput
                      name="w"
                      label="W"
                      value={item.w}
                      onChange={e => handleChangeInput(i, e)}
                    />
                  </Col>
                  <Col >
                    <Input 
                      dimensionInput
                      name="h"
                      label="H"
                      value={item.h}
                      onChange={e => handleChangeInput(i, e)}
                    />
                  </Col>
                  <Col md={1} >
                    <p style={{margin: 0, color: '#437fc7', cursor: 'pointer'}} onClick={() => handleRemoveField(i)}>remove</p>
                  </Col>
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
