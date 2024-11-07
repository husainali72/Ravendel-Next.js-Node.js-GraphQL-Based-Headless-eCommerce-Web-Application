/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Link from "next/link";
import { Button, Form, FormCheck, FormGroup } from "react-bootstrap";
import { capitalize } from "lodash";
import DetailsCard from "../cardcomponent/DetailsCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import {isPriceZero} from '../../utills/helpers'
const ShippingTaxCoupon = (props) => {
  const {
    currency,
    shippingInfo,
    prevFormStep,
    shippingAdd,
    billingInfo,
    totalSummary
  } = props;
  return (
    <>
      <div className="checkout-Details-shipping">
        {/* <button className="back-btn"onClick={prevFormStep}>
        <IoMdArrowRoundBack />
        </button> */}
        <DetailsCard
          title="Billing details"
          info={billingInfo}
          btnText="Change"
          btnAction={prevFormStep}
          style={{marginTop: '0'}}
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
          {isPriceZero(totalSummary.totalShipping || 0) && (
            <>
            <div className="checkout-details-title">
              <h5>Shipping Method</h5>
            </div>
            <div className="cust-detail-container">
              <>
                <div
                  className={`address-card active`}
                  // onClick={() => handleBillingInfo(option.value, 'paymentMethod')}
                >
                  <span className="radio-check"></span>
                  <div className="content">
                    <div className="d-flex justify-content-between">
                      <div>
                        <b className="mb-3">Free Shipping</b>
                        <p>(5-7 Days delivery)</p>
                      </div>
                      <p>{currency}0.00</p>
                    </div>
                  </div>
                </div>
              </>
            </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default ShippingTaxCoupon;
