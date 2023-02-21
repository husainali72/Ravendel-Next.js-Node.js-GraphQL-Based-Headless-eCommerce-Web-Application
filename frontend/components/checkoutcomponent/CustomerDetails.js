import { useState, useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import Link from "next/link";

const CustomerDetail = (props) => {
    const { address_book, getBillingInfo, SelectAddressBook, billingInfo, shippingInfo, shippingAdd } = props;
    console.log("address_book", address_book)
    useEffect(() => {
        var allData = {
            billing: billingInfo,
            shipping: shippingInfo,
            shippingAddress: shippingAdd,
        };
        console.log('useCalled',allData)
        getBillingInfo(allData);
    }, [shippingInfo, billingInfo, shippingAdd]);
    return (
        <>
            <div>
                <h5>Customer Details</h5>
            </div>
            <div>
                {/* <div className="account-coupon-box row" style={{ marginBottom: 15 }}>
                    <div className="account-check col-md-6">
                        <div className="toggle-info">
                            <p><i className="far fa-user"></i> Already have an account ? <Link href="/account"><a >Click here to login</a></Link></p>
                        </div>
                    </div>
                </div> */}

                <div style={{ display: "flex", margin: "25px 0" }}>
                    {address_book && address_book?.length > 0 ? (
                        <>
                            {address_book.map((address, i) => (
                                <div className="col-md-12" key={i}>
                                    <Card key={i} style={{ marginLeft: 12 }}>
                                        <Card.Body className="cust-detail-container" >
                                            <div className="azure-clr" >
                                                <Row>
                                                    <small> <strong>Firstname </strong>  <p>:</p> {address.first_name} </small>
                                                </Row>
                                                <Row >
                                                    <small> <strong> Lastname </strong> <p>:</p> {address.last_name}  </small>
                                                </Row>
                                                <Row >
                                                    <small> <strong> Phone </strong> <p>:</p> {address.phone}  </small>
                                                </Row>
                                                <Row >
                                                    <small> <strong> City </strong> <p>:</p> {address.city}  </small>
                                                </Row>
                                                <Row >
                                                    <small> <strong> Address 1 </strong> <p>:</p> {address.address_line1}  </small>
                                                </Row>
                                                <Row >
                                                    <small> <strong> Address 2 </strong> <p>:</p> {address.address_line2}  </small>
                                                </Row>
                                                <Row >
                                                    <small> <strong> Pincode </strong> <p>:</p> {address.pincode}  </small>
                                                </Row>
                                                <Row >
                                                    <small> <strong> State </strong> <p>:</p> {address.state}  </small>
                                                </Row>
                                                <Row>
                                                    <small> <strong> Company </strong> <p>:</p> {address.company}  </small>
                                                </Row>
                                                <Row >
                                                    <small> <strong> City </strong> <p>:</p> {address.city}  </small>
                                                </Row>
                                            </div>
                                            <span className="cust-detail-select-btn"><i onClick={(e) => SelectAddressBook(address, e)}>select</i></span>
                                            {/* <Card.Text></Card.Text> */}
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </>
                    ) : null}

                </div>
            </div>
        </>

    )
}
export default CustomerDetail;