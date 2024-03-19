/* eslint-disable react/prop-types */
import {  useEffect } from "react";
import { Button, Card, } from "react-bootstrap";
import { capitalize } from "lodash";

const CustomerDetail = (props) => {
    const { addressBook, getBillingInfo, SelectAddressBook, billingInfo, shippingInfo, shippingAdd } = props;
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
                {/* <div className="account-coupon-box row" style={{ marginBottom: 15 }}>
                    <div className="account-check col-md-6">
                        <div className="toggle-info">
                            <p><i className="far fa-user"></i> Already have an account ? <Link href="/account"><a >Click here to login</a></Link></p>
                        </div>
                    </div>
                </div> */}

                <div style={{ display: "flex", margin: "25px 0" }}>
                    {addressBook && addressBook?.length > 0 ? (
                        <>
                            <Card.Body className="cust-detail-container" >
                                <Card className="disable-hover">
                                    {addressBook.map((address, i) => (i < 5 ?
                                        <>
                                            <div className="col-md-12 d-flex flex-md-row flex-column align-items-center justify-content-between" key={i}>
                                                <div className="defination-table" >
                                                    <dl>
                                                        <dt>First Name</dt>
                                                        <dd>{capitalize(address.firstName)}</dd>

                                                        <dt>Lastname</dt>
                                                        <dd> {capitalize(address.lastName)}</dd>

                                                        <dt>Phone</dt>
                                                        <dd>{address.phone}</dd>

                                                        <dt>City</dt>
                                                        <dd>{capitalize(address.city)} </dd>

                                                        <dt> Address 1</dt>
                                                        <dd> {capitalize(address.addressLine1)}</dd>

                                                        <dt> Address 2</dt>
                                                        <dd>{capitalize(address.addressLine2)}</dd>

                                                        <dt>Pincode</dt>
                                                        <dd>{address.pincode}</dd>

                                                        <dt>State</dt>
                                                        <dd> {capitalize(address.state)}</dd>

                                                        <dt>Company</dt>
                                                        <dd>{capitalize(address.company)}</dd>

                                                        <dt>City</dt>
                                                        <dd>{capitalize(address.city)}</dd>

                                                    </dl>
                                                </div>

                                                {/* <span className="cust-detail-select-btn"><i onClick={(e) => SelectAddressBook(address, e)}>select</i></span> */}
                                                <div className=" select-button">
                                                    <Button size="sm" variant="secondary" onClick={(e) => SelectAddressBook(address, e)}>Select</Button>
                                                </div>
                                                {/* <Card.Text></Card.Text> */}

                                            </div><hr className={`customer-hr ${i === addressBook.length - 1 && "d-none"}`} /></> : null
                                    ))}

                                </Card>
                            </Card.Body>
                        </>
                    ) : 'No data'}

                </div>
            </div>
        </>

    )
}
export default CustomerDetail;