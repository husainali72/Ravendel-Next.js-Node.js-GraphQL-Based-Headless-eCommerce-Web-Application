import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { currencySetter, getPrice } from "../../../utills/helpers";
import Table from "../../dataTable";
import { get } from "lodash";
import AddressDetails from "./addressDetail";
const prepareProductHeaderData = (orderInfo) => {
  const showAttributes = get(orderInfo, "products", [])?.some(
    (product) => product?.attributes?.length > 0
  );
  let productsHeader = [
    { title: "Products", name: "productTitle" },
    { title: "Qty", name: "qty", type: "text" },
    showAttributes
      ? { title: "Attributes", name: "attributes", type: "attributes" }
      : null,
    { title: "Total", name: "productPrice", type: "price" },
  ];
  return productsHeader;
};
const prepareOrderDetailRowData = (orderInfo) => {
  const couponCode = get(orderInfo, "couponCode", "");
  let orderInfoDetail = [
    { label: "Order Number", value: get(orderInfo, "id", ""), type: "text" },
    { label: "Date", value: get(orderInfo, "date", ""), type: "date" },
    { label: "SubTotal", value: get(orderInfo, "cartTotal", 0), type: "price" },
    {
      label: "Grandtotal",
      value: get(orderInfo, "grandTotal", 0),
      type: "price",
    },
    couponCode
      ? {
          label: `Coupon - ${couponCode}`,
          value: get(orderInfo, "discountAmount", 0),
          type: "price",
        }
      : null,
    {
      label: "Payment Method",
      value: get(orderInfo, "billing.paymentMethod", "Cash On Delivery"),
      type: "text",
    },
  ];
  return orderInfoDetail;
};
const createOrderSummaryTableData = (orderInfo) => {
  const couponCode = get(orderInfo, "couponCode", "");
  const OrderSummaryDetail = [
    { label: "Subtotal", value: get(orderInfo, "cartTotal", 0), type: "price" },
    { label: "Tax", value: get(orderInfo, "taxAmount", 0), type: "price" },
    {
      label: "Shipping",
      value: get(orderInfo, "shippingAmount", 0),
      type: "price",
    },
    couponCode
      ? {
          label: `Coupon - ${couponCode}`,
          value: get(orderInfo, "discountAmount", 0),
          type: "price",
        }
      : null,
    {
      label: "Grandtotal",
      value: get(orderInfo, "grandTotal", 0),
      type: "price",
    },
  ];
  return OrderSummaryDetail;
};
const OrderDetailAfter = ({ orderInfo }) => {
  const productsHeader = prepareProductHeaderData(orderInfo);
  const orderInfoDetail = prepareOrderDetailRowData(orderInfo);
  const OrderSummaryDetail = createOrderSummaryTableData(orderInfo);
  return (
    <>
      {orderInfo ? (
        <>
          <div className="order-details">
            <div className="row order-row">
              <div className="col-md-6">
                <div className="details">
                  <h4>Order Info</h4>
                  <Table colSpan={1} additionalRows={orderInfoDetail} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="details">
                  <AddressDetails
                    title="Billing Address"
                    address={get(orderInfo, "billing", {})}
                  />
                  <hr />
                  <AddressDetails
                    title="Shipping Address"
                    address={get(orderInfo, "shipping", {})}
                  />
                </div>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="details">
                <h4>Order Details</h4>
                <Table
                  columns={productsHeader}
                  colSpan={3}
                  rows={get(orderInfo, "products")}
                  additionalRows={OrderSummaryDetail}
                />
              </div>
            </div>
            <h3 className="mt-5">Thank You for Shopping</h3>
          </div>
        </>
      ) : (
        <div className="loading-container">
          <Spinner animation="border" variant="success" />
        </div>
      )}
    </>
  );
};
export default OrderDetailAfter;
