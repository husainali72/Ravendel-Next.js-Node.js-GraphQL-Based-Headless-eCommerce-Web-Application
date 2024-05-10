/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Link from "next/link";
import { Button, Form, FormCheck, FormGroup } from "react-bootstrap";
import { capitalize } from "lodash";
import DetailsCard from "../cardcomponent/DetailsCard";

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
        <DetailsCard
          title="Billing details"
          info={billingInfo}
          btnText="Change"
          btnAction={prevFormStep}
        />
        {shippingAdd ? (
          <>
            <DetailsCard
              title="Shipping details"
              info={shippingInfo}
              btnText="Change"
              btnAction={prevFormStep}
            />
          </>
        ) : null}
        <div className="checkout-shipping-method">
          <div className="checkout-details-title">
            <h5>Shipping Method</h5>
          </div>
          <div className="checkout-shipping-address">
            <div className="checkout-list-content">
              <b>Free Shipping</b>
              <p>{currency}0.00 (3-10 Business Days) </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShippingTaxCoupon;
