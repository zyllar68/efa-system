import "./style.scss";
import { useState, useEffect } from "react";
import { Button } from "@components";
import Logo from "@images/logo.jpg";
import { Row, Col, Container } from "react-bootstrap";
import QRCode  from "react-qr-code";
import { readParcel } from "api/parcel";
import { useRouteMatch } from 'react-router-dom';

import { format } from 'date-fns'
const initialState = {
  _id: '',
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
    dimension: []
  }
}

const Print = () => {

  const match = useRouteMatch();

  const { id } = match.params;

  const [state, setState] = useState(initialState);
  // const [newDimension, setNewDimension] = useState([]);
  // const [getVolWeight, setGetVolWeight] = useState(0);

  useEffect(() => {
    (async function() {
      try {
        const res = await readParcel(id);
        setState(res.data)
        console.log(res.data)
        // setNewDimension(res.data.parcel_info.dimension);
        // setGetVolWeight(res.data.parcel_info.vol_weight);
        window.print();
      } catch (error) {
        alert('Something went wrong. Please contact your provider.');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    <div style={{float: 'right'}}>
      <Button
        primary
        title="Print"
        onClick={() => window.print()}
      />
    </div>
    <Row className="row-print">
      <Col sm={6} md={12}>
        <div className="PrintBody">
          <div className="Print">
            <div className="Print__content">  
              <div className="Print__content-header">
                <Row>
                  <Col sm={1}>
                    <img height="200" src={Logo} alt="efa logo" />
                  </Col>
                  <Col sm={8}>
                    <div className="Print__headerText">
                      <p><strong>EFA ENTERPRISES</strong></p>
                      <p>DOOR #1 Centrade Development Bldg. Veterans Ave.,</p>
                      <p>Zamboanga City</p>
                    </div>
                  </Col>
                  <Col sm={1} clasName="qr-code">
                    <QRCode size={70} value={state._id} />
                  </Col>
                  <Col sm={12}>
                    <div className="Print__parcelNum">
                      {state._id}
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="Print__body">
                <div className="ship-date">SHIP DATE: 
                  <span>{format(new Date(state.shipped_date), 'MM-dd-yyyy')}</span>
                </div>
                <Row>
                  <Col sm={6}>
                    <h6><strong>SENDER DETAILS</strong></h6>
                    <p>NAME: <strong>{state.sender.full_name}</strong></p>
                    <p>ADDRESS: <strong>{state.sender.address}</strong></p>
                    <p>CONTACT NUMBER: <strong>{state.sender.contact_number}</strong></p>
                  </Col>
                  <Col sm={6}>
                    <h6><strong>CONSIGNEE DETAILS</strong></h6>
                    <p>NAME: <strong>{state.consignee.full_name}</strong></p>
                    <p>ADDRESS: <strong>{state.consignee.address}</strong></p>
                    <p>CONTACT NUMBER: <strong>{state.consignee.contact_number}</strong></p>
                  </Col>
                  <Col sm={12}>
                  <h6 style={{marginTop: '1rem'}}><strong>PARCEL INFORMATION</strong></h6>
                    <Row>
                      <Col sm={6}>
                        <p>ITEM DESCRIPTION: <strong>{state.parcel_info.item_description}</strong></p>
                      </Col>
                      <Col sm={6}>
                        <p>DECLARED VALUE: PHP <strong>{state.parcel_info.declared_value}</strong></p>
                      </Col>
                      <Col sm={6}>
                        <p>COD AMOUNT:  PHP <strong>{state.parcel_info.cod_amount}</strong></p>
                      </Col>
                      <Col sm={6}><p>NO. OF ITEM: <strong>{state.parcel_info.no_of_items}</strong></p></Col>
                      <Col sm={12}><p>VOL. WEIGHT: <strong>{parseFloat(state.parcel_info.vol_weight).toFixed(2)}</strong></p></Col>
                      <Col sm={6}><p>TOTAL WEIGHT:  <strong>{state.parcel_info.total_weight}KG</strong></p></Col>
                      <Col sm={6}><p>CHARGEABLE WEIGHT: <strong>{parseFloat(state.parcel_info.chargable_weight).toFixed(2)}</strong></p></Col>
                      <Col sm={12} style={{marginTop: '.3rem'}}>
                        <p><strong>DIMENSION:</strong> </p>
                        <div>
                          {
                            state.parcel_info.dimension.map(({l, w, h}, i) => (
                              <Row key={i}>
                                <Col className="small-font" style={{borderBottom: '1px solid black'}}>L: {l}</Col>
                                <Col className="small-font" style={{borderBottom: '1px solid black'}}>W: {w}</Col>
                                <Col className="small-font" style={{borderBottom: '1px solid black'}}>H: {h}</Col>
                              </Row>
                            ))
                          }
                        </div>
                      </Col>
                      <Col sm={12}>
                        <div style={{border: '1px solid black',paddingTop: '2rem', marginTop: '1rem'}}>
                          <p style={{textAlign: 'center'}}>RECIPIENT'S SIGNATURE OVER PRINTED NAME DATE/TIME</p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <table className="print-table">
                  <thead>
                    <tr>
                      <th>1st DELIVERY ATTEMPT</th>
                      <th>2nd DELIVERY ATTEMPT</th>
                      <th>REASON FOR RETURN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Date:</td>
                      <td>Date:</td>
                      <td>Date:</td>
                    </tr>
                    <tr className="table-blank"> 
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col sm={6} md={12}>
      <div className="PrintBody">
          <div className="Print">
            <div className="Print__content">  
              <div className="Print__content-header">
                <Row>
                  <Col sm={1}>
                    <img height="200" src={Logo} alt="efa logo" />
                  </Col>
                  <Col sm={8}>
                    <div className="Print__headerText">
                      <p><strong>EFA ENTERPRISES</strong></p>
                      <p>DOOR #1 Centrade Development Bldg. Veterans Ave.,</p>
                      <p>Zamboanga City</p>
                    </div>
                  </Col>
                  <Col sm={1} clasName="qr-code">
                    <QRCode size={70} value={state._id} />
                  </Col>
                  <Col sm={12}>
                    <div className="Print__parcelNum">
                      {state._id}
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="Print__body">
                <div className="ship-date">SHIP DATE: 
                  <span>{format(new Date(state.shipped_date), 'MM-dd-yyyy')}</span>
                </div>
                <Row>
                  <Col sm={6}>
                    <h6><strong>SENDER DETAILS</strong></h6>
                    <p>NAME: <strong>{state.sender.full_name}</strong></p>
                    <p>ADDRESS: <strong>{state.sender.address}</strong></p>
                    <p>CONTACT NUMBER: <strong>{state.sender.contact_number}</strong></p>
                  </Col>
                  <Col sm={6}>
                    <h6><strong>CONSIGNEE DETAILS</strong></h6>
                    <p>NAME: <strong>{state.consignee.full_name}</strong></p>
                    <p>ADDRESS: <strong>{state.consignee.address}</strong></p>
                    <p>CONTACT NUMBER: <strong>{state.consignee.contact_number}</strong></p>
                  </Col>
                  <Col sm={12}>
                  <h6 style={{marginTop: '1rem'}}><strong>PARCEL INFORMATION</strong></h6>
                    <Row>
                      <Col sm={6}>
                        <p>ITEM DESCRIPTION: <strong>{state.parcel_info.item_description}</strong></p>
                      </Col>
                      <Col sm={6}>
                        <p>DECLARED VALUE: PHP <strong>{state.parcel_info.declared_value}</strong></p>
                      </Col>
                      <Col sm={6}>
                        <p>COD AMOUNT:  PHP <strong>{state.parcel_info.cod_amount}</strong></p>
                      </Col>
                      <Col sm={6}><p>NO. OF ITEM: <strong>{state.parcel_info.no_of_items}</strong></p></Col>
                      <Col sm={12}><p>VOL. WEIGHT: <strong>{parseFloat(state.parcel_info.vol_weight).toFixed(2)}</strong></p></Col>
                      <Col sm={6}><p>TOTAL WEIGHT:  <strong>{state.parcel_info.total_weight}KG</strong></p></Col>
                      <Col sm={6}><p>CHARGEABLE WEIGHT: <strong>{parseFloat(state.parcel_info.chargable_weight).toFixed(2)}</strong></p></Col>
                      <Col sm={12} style={{marginTop: '.3rem'}}>
                        <p><strong>DIMENSION:</strong> </p>
                        <div>
                          {
                            state.parcel_info.dimension.map(({l, w, h}, i) => (
                              <Row key={i}>
                                <Col className="small-font" style={{borderBottom: '1px solid black'}}>L: {l}</Col>
                                <Col className="small-font" style={{borderBottom: '1px solid black'}}>W: {w}</Col>
                                <Col className="small-font" style={{borderBottom: '1px solid black'}}>H: {h}</Col>
                              </Row>
                            ))
                          }
                        </div>
                      </Col>
                      <Col sm={12}>
                        <div style={{border: '1px solid black',paddingTop: '2rem', marginTop: '1rem'}}>
                          <p style={{textAlign: 'center'}}>RECIPIENT'S SIGNATURE OVER PRINTED NAME DATE/TIME</p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <table className="print-table">
                  <thead>
                    <tr>
                      <th>1st DELIVERY ATTEMPT</th>
                      <th>2nd DELIVERY ATTEMPT</th>
                      <th>REASON FOR RETURN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Date:</td>
                      <td>Date:</td>
                      <td>Date:</td>
                    </tr>
                    <tr className="table-blank"> 
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
    </>
  )
}

export default Print;
