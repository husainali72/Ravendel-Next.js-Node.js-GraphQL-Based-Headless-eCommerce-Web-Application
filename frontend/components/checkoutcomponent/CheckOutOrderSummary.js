/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Spinner } from "react-bootstrap";
import {
  isCouponAppliedAndNotFreeShipping,
  isPriceZero,
} from "../../utills/helpers";
import CouponCard from "./couponCard";
import { get } from "lodash";
import Price from "../priceWithCurrency";
import InputField from "../inputField";
import CartItemsDisplay from "./CartItemsDisplay";
import TotalSummary from "../TotalSummary";
const OrderSummary = (props) => {
  const {
    cartLoading,
    cartItems,
    removeToCart,
    updateCartProductQuantity,
    currencyOption,
    totalSummary,
    couponCartDetail,
    currency,
    couponCode,
    setCouponCode,
    doApplyCouponCode,
    CouponLoading,
    removeCoupon,
  } = props;
  return (
    <>
      <div className="col-md-12 col-sm-12 col-md-2-5">
        <div className="cart-items-list">
          <CartItemsDisplay
            cartItems={cartItems}
            removeToCart={removeToCart}
            updateCartProductQuantity={updateCartProductQuantity}
            cartLoading={cartLoading}
          />
        </div>
        {!get(couponCartDetail, "couponApplied") ? (
          <div className="coupon-code-wrapper">
            <h5 className="mb-30">
              If you have a coupon code, please apply it below.
            </h5>
            <form method="post" onSubmit={doApplyCouponCode}>
              <div className="coupon-form-group">
                <InputField
                    type="text"
                    placeholder="Enter Coupon Code..."
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  />
                <div className="form-group">
                  <button
                    disabled={!couponCode}
                    type="submit"
                    className="btn btn-md primary-btn-color apply-coupon-btn"
                    name="coupon"
                  >
                    {CouponLoading ? (
                      <Spinner animation="border" size="sm" variant="light" />
                    ) : (
                      "Apply Coupon"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <CouponCard
            currency={currency}
            couponCartDetail={couponCartDetail}
            currencyOption={currencyOption}
            removeCoupon={removeCoupon}
          />
        )}
        <TotalSummary totalSummary={totalSummary} couponCartDetail={couponCartDetail}/>
      </div>
    </>
  );
};
export default OrderSummary;
