import { useState } from "react";
import Link from "next/link";
import { Button, Form, FormCheck, FormGroup } from "react-bootstrap";
import { capitalize } from "lodash";

const ShippingTaxCoupon = (props) => {
    const { currency ,shippingInfo, prevFormStep, shippingAdd, setCouponFeild, coupon, delivery, doApplyCouponCode, billingInfo } = props;
    return (
        <>
            <div className="checkout-Details-shipping">
                <div className="checkout-details-title">
                    <h4>Billing details</h4>
                </div>
                <div className="checkout-shipping-address">

                    <div className="checkout-list-content">
                        <h6 style={{ fontWeight: "600" }}> {capitalize(billingInfo.firstname)} {capitalize(billingInfo.lastname)}</h6>
                        <p>
                            {capitalize(billingInfo.city)} {capitalize(billingInfo.state)} {capitalize(billingInfo.zip)} {capitalize(billingInfo.country)}
                        </p>
                    </div>
                    <div className="checkout-shipping-edit-btn">
                        <Button variant="outline-secondary" onClick={prevFormStep}>Change</Button>{' '}

                    </div>
                </div>
                {shippingAdd ? (
                    <>
                        <div className="checkout-details-title">
                            <h4>Shipping details</h4>
                        </div>
                        <div className="checkout-shipping-address">
                            <div className="checkout-list-content">
                                <h6> {capitalize(shippingInfo.firstname)} {capitalize(shippingInfo.lastname)}</h6>
                                <p>
                                    {capitalize(shippingInfo.city)} {capitalize(shippingInfo.state)} {capitalize(shippingInfo.zip)} {capitalize(shippingInfo.country)}
                                </p>
                            </div>
                            <div className="checkout-shipping-edit-btn">
                                <Button variant="outline-secondary" onClick={prevFormStep}>Change</Button>{' '}
                            </div>
                        </div>
                    </>
                ) : null}
                <div className="checkout-shipping-method">
                    <div className="checkout-details-title">
                        <h4>Shipping Method</h4>
                    </div>
                    <div>
                        <p>Free Shipping</p><span>{currency}0.00 (3-10 Business Days) </span>
                    </div>


                    {/* <Form>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                                style={{ borderBottom: "1px dashed #dce1e5", padding: "24px 30px 24px 0" }}
                                label={<><p>Free Shipping</p><span>$0.00 (3-10 Business Days) </span></>}
                                name="shipping_method"
                                type="radio"
                                id={`inline-radio-1`}
                            />
                            <Form.Check
                                style={{ borderBottom: "1px dashed #dce1e5", padding: "24px 30px 24px 0" }}
                                label={<><h6>Standard delivery</h6><span>$5.00 (3-5 Business Days)</span></>}
                                name="shipping_method"
                                type="radio"
                                id={`inline-radio-1`} />
                            <Form.Check
                                style={{ borderBottom: "1px dashed #dce1e5", padding: "24px 30px 24px 0" }}
                                label={<><h6>Express delivery</h6><span>$10.00 (1-3 Business Days)</span></>}
                                name="shipping_method"
                                type="radio"
                                id={`inline-radio-1`} />
                        </div>
                    </Form> */}
                </div>
            </div>
            {/* <div className="apply-coupon col-md-6">
                <div className="toggle-info" style={{ marginBottom: 12 }}>
                    <p><i className="far fa-envelope-open"></i> Have a coupon? <a href="#" value={couponfield} onClick={() => setCouponFeild(!couponfield)}>Apply Coupon</a></p>
                </div>
                {couponfield ?
                    <>
                        <div className="panel-body">
                            <p className="mb-30 font-sm">If you have a coupon code, please apply it below.</p>
                            <form method="post" onSubmit={doApplyCouponCode}>
                                <div className="coupon-form-group">
                                    <input type="text" placeholder="Enter Coupon Code..." value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn  btn-md" name="coupon" style={{ marginTop: 12, backgroundColor: "#088178" }}>Apply Coupon</button>
                                </div>
                            </form>
                        </div>
                    </>
                    : null}

                <div className="toggle-info" style={{ marginBottom: 12 }}>
                    <p>Shipping : {delivery.toFixed(2)} </p>
                </div>
                <div className="toggle-info" style={{ marginBottom: 12 }}>
                    <p>Tax : {taxAmount.toFixed(2)}</p>
                </div>
            </div> */}
        </>
    )
}
export default ShippingTaxCoupon;