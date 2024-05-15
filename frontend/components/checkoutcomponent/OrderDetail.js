/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Link from "next/link";
import { capitalize, get } from "lodash";
import Price from "../priceWithCurrency";
import ProductImage from "../imageComponent";
import CheckBox from "../check";
import PropTypes from "prop-types";
import {
  CASH_ON_DELIVERY,
  CREDIT_CARD,
  PAYPAL,
  RAZORPAY,
  STRIPE,
} from "../../utills/constant";
import { getPaymentMethodLabel } from "../../utills/helpers";
const Orderdetail = (props) => {
  const {
    getOrderDetails,
    cartItems,
    billingInfo,
    handleBillingInfo,
    shippingInfo,
    settings,
  } = props;
  const cart = cartItems;
  const [cartProduct, setCartProduct] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);

  useEffect(() => {
    const payment = get(settings, "setting.payment");
    const options = [];

    const addPaymentOption = (method) => {
      let paymentMethod = get(payment, `[${method}]`);
      if (get(paymentMethod, "enable")) {
        const { title, description, account_details } = paymentMethod;
        let detailItems = [];
        if (account_details) {
          detailItems = [
            {
              key: "Account Name",
              value: get(account_details, "account_Name"),
            },
            {
              key: "Account Number",
              value: get(account_details, "account_number"),
            },
            { key: "Bank Name", value: get(account_details, "bank_name") },
            { key: "Short Code", value: get(account_details, "short_code") },
            { key: "IBAN", value: get(account_details, "iban") },
            { key: "BIC/SWIFT", value: get(account_details, "bic_swift") },
          ];
        }
        options.push({
          value: method.replaceAll("_", ""),
          label: title,
          description,
          detail: detailItems,
        });
      }
    };

    addPaymentOption("cash_on_delivery");
    addPaymentOption("bank_transfer");
    addPaymentOption("stripe");
    addPaymentOption("paypal");
    addPaymentOption("razorpay");

    setPaymentOptions(options);
  }, [settings]);
  const cartSubTotal = () => {
    var subtotalVar = 0;
    if (cartProduct && cartProduct?.length > 0) {
      cartProduct?.map((item) => {
        let productSellPrice = get(item, "pricing.sellprice");
        if (productSellPrice) {
          let sellPrice = productSellPrice * item?.quantity;
          subtotalVar = subtotalVar + sellPrice;
        }
      });
    }
  };
  useEffect(() => {
    if (cartProduct?.length > 0) {
      cartSubTotal();
    }
  }, [cartProduct]);

  const ListingCartProducts = () => {
    setCartProduct(cart);
  };
  useEffect(() => {
    if (cart && cart?.length > 0) {
      ListingCartProducts();
    }
  }, [cart]);
  useEffect(() => {
    let allData = {
      billing: billingInfo,
      shipping: shippingInfo,
    };
    getOrderDetails(allData);
  }, [billingInfo, shippingInfo, cart]);
  return (
    <>
      <div className="payment-method-container">
        <div className="payment-method">
          <h5 className="mb-2">Payment Mode</h5>
          <div className="checkout-shipping-address">
            <CheckBox
              type="radio"
              options={paymentOptions}
              name="paymentMethod"
              onChange={(e) => handleBillingInfo(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
Orderdetail.propTypes = {
  getOrderDetails: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
  billingInfo: PropTypes.object.isRequired,
  handleBillingInfo: PropTypes.func.isRequired,
  shippingInfo: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};
export default Orderdetail;
