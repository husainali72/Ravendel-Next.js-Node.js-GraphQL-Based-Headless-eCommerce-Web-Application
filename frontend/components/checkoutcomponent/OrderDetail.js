import { useState, useEffect } from "react";
import Link from "next/link";
import { capitalize, get } from "lodash";
import Price from "../priceWithCurrency";
import ProductImage from "../imageComponent";
import CheckBox from "../check";
import PropTypes from "prop-types";
import { CASH_ON_DELIVERY, CREDIT_CARD, PAYPAL, RAZORPAY, STRIPE } from "../../utills/constant";
const paymentOptions = [
  { label: "Cash on delivery", value: CASH_ON_DELIVERY },
  { label: "Stripe", value: STRIPE },
  { label: "Credit Card", value: CREDIT_CARD },
  { label: "Paypal", value: PAYPAL },
  { label: "Razor Pay", value: RAZORPAY },
];
const Orderdetail = (props) => {
  const {
    getOrderDetails,
    cartItems,
    billingInfo,
    handleBillingInfo,
    shippingInfo,
  } = props;
  const cart = cartItems;
  const [cartProduct, setCartProduct] = useState([]);
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
      <div className="table-responsive order_table text-center">
        <table className="table checkout-table">
          <thead>
            <tr>
              <th colSpan="1">Image</th>
              <th>Title</th>
              <th>Attributes</th>
              <th> Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item, i) => (
              <tr key={i}>
                <td className="image product-thumbnail">
                  <ProductImage src={get(item, "feature_image", "")} />
                </td>
                <td>
                  <i className="ti-check-box font-small text-muted mr-10"></i>
                  <h5>
                    <Link href={"/product/" + get(cart, "[i].url", "")}>
                      <a>{item?.name}</a>
                    </Link>
                  </h5>{" "}
                  <span className="product-qty">x {item?.quantity}</span>
                </td>
                <td>
                  {get(item, "attributes", [])?.map((attribute, i) => (
                    <div key={i}>
                      {capitalize(attribute?.name)} :{" "}
                      {capitalize(attribute?.value)}
                    </div>
                  ))}
                </td>
                <td>
                  <Price price={get(item, "pricing", 0)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="payment-method-container">
        <div className="payment-method">
          <h5>Payment Mode</h5>
          <CheckBox
            options={paymentOptions}
            name="paymentMethod"
            onChange={(e) => handleBillingInfo(e)}
          />
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
};
export default Orderdetail;
