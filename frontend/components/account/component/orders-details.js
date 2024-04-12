import Table from "../../dataTable";
import { get } from "lodash";
import AddressDetails from "./addressDetail";
import PropTypes from "prop-types";
import { CASH_ON_DELIVERY } from "../../../utills/constant";
const columns = [
  { title: "Products", name: "productTitle" },
  { title: "Qty", name: "qty", type: "text" },
  { title: "Attributes", name: "attributes", type: "attributes" },
  { title: "Total", name: "productPrice", type: "price" },
];
const prepareOrderDetailRowData = (order) => {
  const orderInfoDetail = [
    { label: "Order Number", value: get(order, "id", ""), type: "text" },
    { label: "Date", value: get(order, "date", ""), type: "date" },
    { label: "Total", value: get(order, "grandTotal", 0), type: "price" },
    {
      label: "Payment Method",
      value: get(order, "billing.paymentMethod", CASH_ON_DELIVERY),
      type: "text",
    },
  ];
  return orderInfoDetail;
};
const prepareOrderSummaryRowData = (
  total,
  subtotal,
  tax,
  shippingAmount,
  couponValue,
  couponCode
) => {
  const OrderSummaryDetail = [
    { label: "Subtotal", value: subtotal, type: "price" },
    { label: "Tax", value: tax, type: "price" },
    { label: "Shipping", value: shippingAmount, type: "price" },
    couponCode
      ? {
          label: `Coupon - ${couponCode}`,
          value: couponValue ? couponValue : 0,
          type: "price",
        }
      : null,
    { label: "Total", value: total, type: "price" },
  ];
  return OrderSummaryDetail;
};
const OrdersDetails = ({
  orderDetail,
  billingInfo,
  order,
  shippingInfo,
  total,
  subtotal,
  tax,
  shippingAmount,
  couponValue,
  couponCode,
}) => {
  const orderInfoDetail = prepareOrderDetailRowData(order);
  const OrderSummaryDetail = prepareOrderSummaryRowData(
    total,
    subtotal,
    tax,
    shippingAmount,
    couponValue,
    couponCode
  );
  return (
    <>
      {orderDetail ? (
        <>
          <div className="order-details">
            <div className="row order-row">
              <div className="col-md-6">
                <div className="details">
                  <h4>Order Info</h4>
                  <Table
                    colSpan={1}
                    additionalRows={orderInfoDetail}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="details">
                  <AddressDetails
                    title="Billing Address"
                    address={billingInfo}
                  />
                  <hr />
                  <AddressDetails
                    title="Shipping Address"
                    address={shippingInfo}
                  />
                </div>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="details">
                <h4>Order Details</h4>
                <Table
                  rows={orderDetail}
                  columns={columns}
                  colSpan={3}
                  additionalRows={OrderSummaryDetail}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

OrdersDetails.propTypes = {
  orderDetail: PropTypes.array.isRequired,
  billingInfo: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  shippingInfo: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  shippingAmount: PropTypes.number.isRequired,
  couponValue: PropTypes.number,
  couponCode: PropTypes.string,
};
export default OrdersDetails;
