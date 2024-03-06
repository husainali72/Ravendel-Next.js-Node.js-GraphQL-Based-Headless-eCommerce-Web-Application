import { useState, useEffect } from "react";
import { getImage, getPrice, imageOnError } from "../../utills/helpers";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { capitalize } from "lodash";
import { useSelector } from "react-redux";
const Orderdetail = (props) => {
  const {
    homepageData,
    decimal,
    currency,
    getOrderDetails,
    cartItems,
    billingInfo,
    handleBillingInfo,
    shippingInfo,
  } = props;
  const settings = useSelector((state) => state.setting);
  const cart = cartItems;
  const imageType =
    homepageData && homepageData?.getSettings?.imageStorage?.status;
  const [cartProduct, setCartProduct] = useState([]);

  const cartSubTotal = () => {
    var subtotalVar = 0;
    if (cartProduct && cartProduct?.length > 0) {
      cartProduct.map((item) => {
        if (item.pricing.sellprice) {
          var sellPrice = item.pricing.sellprice * item.quantity;
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
    let cartItem = cart.map((product) => {
      return {
        productId: product._id,
        productTitle: product.name,
        productPrice: product.pricing.toString(),
        qty: product.quantity,
        taxClass: product?.tax_class,
        shippingClass: product?.shipping_class,
        attributes: product?.attributes || [],
      };
    });

    var allData = {
      products: cartItem,
      billing: billingInfo,
      shipping: shippingInfo,
      checkoutDate: new Date(),
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
            {cartItems.map((item, i) => (
              <tr key={i}>
                <td className="image product-thumbnail">
                  <img
                    src={getImage(item.feature_image, imageType)}
                    alt="product"
                    onError={imageOnError}
                  />
                </td>
                <td>
                  <i className="ti-check-box font-small text-muted mr-10"></i>
                  <h5>
                    <Link href={"/product/" + cart[i]?.url}>
                      <a>{item?.name}</a>
                    </Link>
                  </h5>{" "}
                  <span className="product-qty">x {item.quantity}</span>
                </td>
                <td>
                  {item?.attributes?.map((attribute) => (
                    <div>
                      {capitalize(attribute?.name)} :{" "}
                      {capitalize(attribute?.value)}
                    </div>
                  ))}
                </td>
                <td>
                  {currency}
                  {getPrice(item?.pricing, decimal)}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex" }}>
        <div className="payment-method">
          <h5>Payment Mode</h5>
          <Form>
            <Form.Group
              value={billingInfo.paymentMethod}
              onChange={(e) => handleBillingInfo(e)}
            >
              {["radio"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    label="Cash on delivery"
                    name="paymentMethod"
                    type={type}
                    value="Cash On Delivery"
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    label="Stripe"
                    name="paymentMethod"
                    type={type}
                    value="stripe"
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    label="Credit Card"
                    name="paymentMethod"
                    type={type}
                    id={`inline-${type}-3`}
                    value="creditCard"
                  />
                </div>
              ))}
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Orderdetail;
