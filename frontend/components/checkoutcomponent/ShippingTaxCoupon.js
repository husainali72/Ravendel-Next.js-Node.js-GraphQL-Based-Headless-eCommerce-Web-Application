import { useState } from "react";
import Link from "next/link";
import { Button, Form, FormCheck, FormGroup } from "react-bootstrap";
import { capitalize } from "lodash";

const ShippingTaxCoupon = (props) => {
  const {
    currency,
    shippingInfo,
    prevFormStep,
    shippingAdd,
    billingInfo,
  } = props;
  return (
    <>
      <div className="checkout-Details-shipping">
        <div className="checkout-details-title">
          <h4>Billing details</h4>
        </div>
        <div className="checkout-shipping-address">
          <div className="checkout-list-content">
            <h6 style={{ fontWeight: "600" }}>
              {" "}
              {capitalize(billingInfo.firstname)}{" "}
              {capitalize(billingInfo.lastname)}
            </h6>
            <p>
              {capitalize(billingInfo.city)} {capitalize(billingInfo.state)}{" "}
              {capitalize(billingInfo.zip)} {capitalize(billingInfo.country)}
            </p>
          </div>
          <div className="checkout-shipping-edit-btn">
            <Button variant="outline-secondary" onClick={prevFormStep}>
              Change
            </Button>{" "}
          </div>
        </div>
        {shippingAdd ? (
          <>
            <div className="checkout-details-title">
              <h4>Shipping details</h4>
            </div>
            <div className="checkout-shipping-address">
              <div className="checkout-list-content">
                <h6>
                  {" "}
                  {capitalize(shippingInfo.firstname)}{" "}
                  {capitalize(shippingInfo.lastname)}
                </h6>
                <p>
                  {capitalize(shippingInfo.city)}{" "}
                  {capitalize(shippingInfo.state)}{" "}
                  {capitalize(shippingInfo.zip)}{" "}
                  {capitalize(shippingInfo.country)}
                </p>
              </div>
              <div className="checkout-shipping-edit-btn">
                <Button variant="outline-secondary" onClick={prevFormStep}>
                  Change
                </Button>{" "}
              </div>
            </div>
          </>
        ) : null}
        <div className="checkout-shipping-method">
          <div className="checkout-details-title">
            <h4>Shipping Method</h4>
          </div>
          <div>
            <p>Free Shipping</p>
            <span>{currency}0.00 (3-10 Business Days) </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShippingTaxCoupon;
