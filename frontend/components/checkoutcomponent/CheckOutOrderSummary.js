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
const OrderSummary = (props) => {
  const {
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
        {!get(couponCartDetail, "couponApplied") ? (
          <div className="panel-body">
            <p className="mb-30 font-sm">
              If you have a coupon code, please apply it below.
            </p>
            <form method="post" onSubmit={doApplyCouponCode}>
              <div className="coupon-form-group">
              <InputField
                  type="text"
                  placeholder="Enter Coupon Code..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                />
              </div>
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
        <div className="border p-md-4 p-30 border-radius cart-totals">
          <div className="heading_s1 mb-3 cart-total-head">
            <h4>Cart Totals</h4>
          </div>
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <td className="cartTotal_label">Total MRP</td>
                  <td className="cartTotal_amount">
                    <span className="font-lg fw-900 text-brand">
                      <Price price={get(totalSummary, "mrpTotal", 0)} />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="cartTotal_label  ">Discount on MRP</td>
                  <td className="cartTotal_amount ">
                    <span className="font-lg fw-900 text-brand textSuccess">
                      - <Price price={get(totalSummary, "discountTotal", 0)} />
                    </span>
                  </td>
                </tr>
                {!isPriceZero(get(totalSummary, "totalTax")) && (
                  <tr>
                    <td className="cartTotal_label">Tax</td>
                    <td className="cartTotal_amount">
                      {" "}
                      <i className="ti-gift mr-5">
                        <Price price={get(totalSummary, "totalTax", 0)} />
                      </i>
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="cartTotal_label">Shipping</td>
                  {isPriceZero(get(totalSummary, "totalShipping")) ? (
                    <td className="cartTotal_amount">
                      {" "}
                      <i className="ti-gift mr-5"></i>Free Shipping
                    </td>
                  ) : (
                    <td className="cartTotal_amount">
                      <i className="ti-gift mr-5"></i>
                      <Price price={get(totalSummary, "totalShipping", 0)} />
                    </td>
                  )}
                </tr>
                {isCouponAppliedAndNotFreeShipping(couponCartDetail) && (
                  <tr>
                    <td
                      className={`cartTotal_label ${
                        get(couponCartDetail, "couponApplied") && "textSuccess"
                      }`}
                    >
                      Coupon Saving{" "}
                    </td>
                    <td
                      className={`cartTotal_amount ${
                        get(couponCartDetail, "couponApplied") && "textSuccess"
                      }`}
                    >
                      <i className="ti-gift mr-5"></i>
                      <Price
                        price={get(totalSummary, "couponDiscountTotal", 0)}
                      />
                    </td>
                  </tr>
                )}
                <tr className="grandtotal-row">
                  <td className="cartTotal_label">Total</td>
                  <td className="cartTotal_amount">
                    <strong>
                      <span className="font-xl fw-900 text-brand">
                        <Price price={get(totalSummary, "grandTotal", 0)} />
                      </span>
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderSummary;
