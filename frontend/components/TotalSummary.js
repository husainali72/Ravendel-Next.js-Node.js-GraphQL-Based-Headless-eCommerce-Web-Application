import React from 'react'
import PropTypes from "prop-types";
import Price from './priceWithCurrency'
import { isCouponAppliedAndNotFreeShipping, isPriceZero } from '../utills/helpers'
import { get } from 'lodash';

const TotalSummary = ({totalSummary, couponCartDetail}) => {
  const {mrpTotal, discountTotal, totalTax, totalShipping, grandTotal} = totalSummary;
  // const {couponApplied} = couponCartDetail || {};
  return (
    <div className="cart-totals">
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <td className="cartTotal_label">Total MRP</td>
                  <td className="cartTotal_amount">
                    <span className="font-lg fw-900 text-brand">
                      <Price price={mrpTotal || 0} />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="cartTotal_label  ">Discount on MRP</td>
                  <td className="cartTotal_amount ">
                    <span className="font-lg fw-900 text-brand textSuccess">
                      - <Price price={discountTotal || 0} />
                    </span>
                  </td>
                </tr>
                {!isPriceZero(totalTax) && (
                  <tr>
                    <td className="cartTotal_label">Tax</td>
                    <td className="cartTotal_amount">
                      {" "}
                      <i className="ti-gift mr-5">
                        <Price price={totalTax || 0} />
                      </i>
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="cartTotal_label">Shipping</td>
                  {isPriceZero(totalShipping || 0) ? (
                    <td className="cartTotal_amount">
                      {" "}
                      <i className="ti-gift mr-5"></i>Free Shipping
                    </td>
                  ) : (
                    <td className="cartTotal_amount">
                      <i className="ti-gift mr-5"></i>
                      <Price price={totalShipping || 0} />
                    </td>
                  )}
                </tr>
                {isCouponAppliedAndNotFreeShipping(couponCartDetail) && (
                  <tr>
                    <td
                      className={`cartTotal_label `}
                    >
                      Coupon Saving{" "}
                    </td>
                    <td
                      className={`cartTotal_amount `}
                    >
                      <i className="ti-gift mr-5"></i>
                     - <Price
                        price={get(totalSummary,'couponDiscountTotal',0)}
                      />
                    </td>
                  </tr>
                )}
                <tr className="grandtotal-row">
                  <td className="cartTotal_label">Total Amount</td>
                  <td className="cartTotal_amount">
                    <span className="font-xl fw-900 text-brand">
                      <Price price={grandTotal || 0} />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default TotalSummary

TotalSummary.propTypes = {
  totalSummary: PropTypes.object.isRequired,
  couponCartDetail: PropTypes.object.isRequired,
  
};