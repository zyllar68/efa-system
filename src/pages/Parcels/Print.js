import "./style.scss";
import { Button } from "@components";
import Logo from "@images/logo.jpg";
import { Row, Col, Container } from "react-bootstrap";
import QRCode  from "react-qr-code";

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

const Print = () => {
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
      <Col sm={6}>
        <div className="PrintBody">
          <div className="Print">
            <div className="Print__content">  
              <div className="Print__content-header">
                <Row>
                  <Col sm={1}>
                    <img src={Logo} alt="efa logo" />
                  </Col>
                  <Col sm={8}>
                    <div className="Print__headerText">
                      <p><strong>EFA ENTERPRISES</strong></p>
                      <p>DOOR #1 Centered Development Bldg. Veterans Ave.,</p>
                      <p>Zamboanga City</p>
                    </div>
                  </Col>
                  <Col sm={1} clasName="qr-code">
                    <QRCode size="40" value="1278361286318276" />
                  </Col>
                  <Col sm={12}>
                    <div className="Print__parcelNum">
                      1278361286318276
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="Print__body">
                <div className="ship-date">SHIP DATE: <span>02-04-2021</span></div>
                <Row>
                  <Col sm={6}>
                    <h6>SENDER DETAILS</h6>
                    <p><strong>NAME:</strong> john doe</p>
                    <p><strong>ADDRESS:</strong> Purok Leonila, Ipil Heights,</p>
                    <p><strong>CONTACT NUMBER:</strong> 31232132131</p>
                  </Col>
                  <Col sm={6}>
                    <h6>SENDER DETAILS</h6>
                    <p><strong>NAME:</strong> john doe</p>
                    <p><strong>ADDRESS:</strong> Purok Leonila, Ipil Heights, Ipil, Zambonaga Sibugay, Ipil, Zamboanga Sibugay, Philippines</p>
                    <p><strong>CONTACT NUMBER:</strong> 1232132132132132</p>
                  </Col>
                  <Col sm={12}>
                    <h6>PARCEL INFORMATION</h6>
                    <Row>
                      <Col sm={6}>
                        <p><strong>ITEM DESCRIPTION:</strong> FRAME </p>
                      </Col>
                      <Col sm={6}>
                        <p><strong>DECLARED VALUE:</strong> PHP 13,300.00 </p>
                      </Col>
                      <Col sm={6}>
                        <p><strong>COD AMOUNT:</strong> PHP 13,300.00  </p>
                      </Col>
                      <Col sm={6}><p><strong>NO. OF ITEM</strong> 6 BOX </p></Col>
                      <Col sm={12}>
                        <Row>
                          <Col><p><strong>TOTAL WEIGHT:</strong> 250 </p></Col>
                          <Col><p><strong>VOL. WEIGHT:</strong> 250 </p></Col>
                          <Col><p><strong>CHARGABLE WEIGHT:</strong> 250 </p></Col>
                        </Row>
                      </Col>
                      <Col sm={12} style={{marginTop: '.3rem'}}>
                        <p><strong>DIMENSION:</strong> </p>
                        <div>
                          <Row>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>L:10</Col>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>W:10</Col>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>H:10</Col>
                          </Row>
                          <Row>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>L:10</Col>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>W:10</Col>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>H:10</Col>
                          </Row>
                          <Row>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>L:10</Col>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>W:10</Col>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>H:10</Col>
                          </Row>
                        </div>
                      </Col>
                      <Col sm={12}>
                        <div style={{border: '1px solid black',paddingTop: '1rem', marginTop: '1rem'}}>
                          <p style={{textAlign: 'center'}}>RECIPIENT'S SGINATURE OVER PRINTED NAME DATE/TIME</p>
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
      <Col sm={6}>
        <div className="PrintBody hidden">
          <div className="Print">
            <div className="Print__content">  
              <div className="Print__content-header">
                <Row>
                  <Col sm={1}>
                    <img src={Logo} alt="efa logo" />
                  </Col>
                  <Col sm={8}>
                    <div className="Print__headerText">
                      <p><strong>EFA ENTERPRISES</strong></p>
                      <p>DOOR #1 Centered Development Bldg. Veterans Ave.,</p>
                      <p>Zamboanga City</p>
                    </div>
                  </Col>
                  <Col sm={1} clasName="qr-code">
                    <QRCode size="40" value="1278361286318276" />
                  </Col>
                  <Col sm={12}>
                    <div className="Print__parcelNum">
                      1278361286318276
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="Print__body">
                <div className="ship-date">SHIP DATE: <span>02-04-2021</span></div>
                <Row>
                  <Col sm={6}>
                    <h6>CONSIGNEE DETAILS</h6>
                    <p><strong>NAME:</strong> john doe</p>
                    <p><strong>ADDRESS:</strong> Purok Leonila, Ipil Heights,</p>
                    <p><strong>CONTACT NUMBER:</strong> 31232132131</p>
                  </Col>
                  <Col sm={6}>
                    <h6>SENDER DETAILS</h6>
                    <p><strong>NAME:</strong> john doe</p>
                    <p><strong>ADDRESS:</strong> Purok Leonila, Ipil Heights, Ipil, Zambonaga Sibugay, Ipil, Zamboanga Sibugay, Philippines</p>
                    <p><strong>CONTACT NUMBER:</strong> 1232132132132132</p>
                  </Col>
                  <Col sm={12}>
                    <h6>PARCEL INFORMATION</h6>
                    <Row>
                      <Col sm={6}>
                        <p><strong>ITEM DESCRIPTION:</strong> FRAME </p>
                      </Col>
                      <Col sm={6}>
                        <p><strong>DECLARED VALUE:</strong> PHP 13,300.00 </p>
                      </Col>
                      <Col sm={6}>
                        <p><strong>COD AMOUNT:</strong> PHP 13,300.00  </p>
                      </Col>
                      <Col sm={6}><p><strong>NO. OF ITEM</strong> 6 BOX </p></Col>
                      <Col sm={12}>
                        <Row>
                          <Col><p><strong>TOTAL WEIGHT:</strong> 250 </p></Col>
                          <Col><p><strong>VOL. WEIGHT:</strong> 250 </p></Col>
                          <Col><p><strong>CHARGABLE WEIGHT:</strong> 250 </p></Col>
                        </Row>
                      </Col>
                      <Col sm={12} style={{marginTop: '.3rem'}}>
                        <p><strong>DIMENSION:</strong> </p>
                        <div>
                          <Row>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>L:10</Col>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>W:10</Col>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>H:10</Col>
                          </Row>
                          <Row>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>L:10</Col>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>W:10</Col>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>H:10</Col>
                          </Row>
                          <Row>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>L:10</Col>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>W:10</Col>
                            <Col className="small-font" style={{borderBottom: '1px solid black'}}>H:10</Col>
                          </Row>
                        </div>
                      </Col>
                      <Col sm={12}>
                        <div style={{border: '1px solid black',paddingTop: '1rem', marginTop: '1rem'}}>
                          <p style={{textAlign: 'center'}}>RECIPIENT'S SGINATURE OVER PRINTED NAME DATE/TIME</p>
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
