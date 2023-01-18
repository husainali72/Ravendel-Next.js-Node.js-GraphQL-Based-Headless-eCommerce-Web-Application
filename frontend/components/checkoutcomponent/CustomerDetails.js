import { useState, useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import Link from "next/link";

const CustomerDetail = (props) => {
    const { address_book, getBillingInfo, SelectAddressBook, billingInfo, shippingInfo, shippingAdd } = props;
    // console.log("address_book", address_book)
    useEffect(() => {
        var allData = {
            billing: billingInfo,
            shipping: shippingInfo,
            shippingAddress: shippingAdd,
        };
        getBillingInfo(allData);
    }, [shippingInfo, billingInfo, shippingAdd]);
    return (
        <>
            <div>
                <h5>Customer Details</h5>
            </div>
            <div>
                <div className="account-coupon-box row" style={{ marginBottom: 15 }}>
                    <div className="account-check col-md-6">
                        <div className="toggle-info">
                            <p><i className="far fa-user"></i> Already have an account ? <Link href="/account"><a >Click here to login</a></Link></p>
                        </div>
                    </div>
                </div>

                {/* <div style={{ display: "flex", margin: 25 }}>
                    {address_book && address_book?.length > 0 ? (
                        <>
                            {address_book.map((address, i) => (
                                <div className="col-md-3" key={i}>
                                    <Card key={i} style={{ marginLeft: 12 }}>
                                        <Card.Body>
                                            <span style={{ float: 'right', cursor: 'pointer' }}><i onClick={(e) => SelectAddressBook(address, e)}>select</i></span>
                                            <Row>
                                                firstname : {address.first_name}
                                            </Row>
                                            <Row >
                                                lastname : {address.last_name}
                                            </Row>
                                            <Row >
                                                phone : {address.phone}
                                            </Row>
                                            <Row >
                                                city : {address.city}
                                            </Row>
                                            <Row >
                                                address 1 :{address.address_line1}
                                            </Row>
                                            <Row >
                                                address 2 :{address.address_line2}
                                            </Row>
                                            <Row >
                                                pincode : {address.pincode}
                                            </Row>
                                            <Row >
                                                state : {address.state}
                                            </Row>
                                            <Row>
                                                company : {address.company}
                                            </Row>
                                            <Row >
                                                city : {address.city}
                                            </Row>
                                            <Card.Text></Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </>
                    ) : null}

                </div> */}
            </div>
        </>

    )
}
export default CustomerDetail;