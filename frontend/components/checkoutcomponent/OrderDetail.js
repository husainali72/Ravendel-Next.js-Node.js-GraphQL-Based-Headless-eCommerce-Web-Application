import { useState, useEffect } from "react";
import { getImage, getPrice, imageOnError } from "../../utills/helpers";
import Form from 'react-bootstrap/Form';
import Link from "next/link";
import { capitalize } from "lodash";
import { useSelector } from "react-redux";
const Orderdetail = (props) => {
    const settings = useSelector(state => state.setting)
    const { decimal, currency, getOrderDetails, cartItems, billingInfo, handleBillingInfo, taxAmount, shippingInfo, paymentMethod, delivery, billingDetails, subTotal, cartTotal } = props;
    const cart = cartItems;
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
            ListingCartProducts()
        }
    }, [cart])
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

            }
        })

        var allData = {
            products: cartItem,
            billing: billingInfo,
            shipping: shippingInfo,
            checkoutDate: new Date(),
        };
        getOrderDetails(allData);
    }, [billingInfo, shippingInfo, cart, cartTotal, taxAmount, delivery])
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
                                <td className="image product-thumbnail"><img src={getImage(item.feature_image, 'feature_image', false, settings?.setting)} alt="" onError={imageOnError} /></td>
                                <td><i className="ti-check-box font-small text-muted mr-10"></i>
                                    <h5><Link href={"/product/" + cart[i]?.url}><a >{item?.name}</a></Link></h5> <span className="product-qty">x {item.quantity}</span>
                                </td>
                                <td>
                                    {item?.attributes?.map((attribute) => (
                                        <div>{capitalize(attribute?.name)} : {capitalize(attribute?.value)}</div>)

                                    )}
                                </td>
                                <td>{currency}{getPrice(item?.pricing, decimal)
                                } </td>
                            </tr>
                        ))}
                        {/* <tr>
                            <th>SubTotal</th>
                            <td className="product-subtotal" colSpan="2">${subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>Shipping</th>
                            <td colSpan="2">{delivery === "0" ? "Free Shipping" : "$" + delivery.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>Discount</th>
                            <td colSpan="2"> {coupon === "0" ? "$0" : "$" + coupon.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>Tax</th>
                            <td colSpan="2"> {taxAmount === "0" ? "$0" : "$" + taxAmount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td colSpan="2" className="product-subtotal"><span className="font-xl text-brand fw-900">${cartTotal.toFixed(2)}</span></td>
                        </tr> */}

                    </tbody>
                </table>
                {/* <div className="border p-md-4 p-30 border-radius cart-totals">

                    <div className="heading_s1 mb-3">
                        <h4>Cart Totals</h4>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td className="cartTotal_label">Cart Total</td>
                                    <td className="cartTotal_amount"><span className="font-lg fw-900 text-brand">
                                        $ {subtotal.toFixed(2)}
                                    </span></td>
                                </tr>
                                <tr>
                                    <td className="cartTotal_label">Tax</td>
                                    <td className="cartTotal_amount"> <i className="ti-gift mr-5">{taxAmount === "0" ? "$0.00" : "$ " + taxAmount?.toFixed(2)}</i></td>
                                </tr>
                                <tr>
                                    <td className="cartTotal_label">Shipping</td>
                                    <td className="cartTotal_amount"> <i className="ti-gift mr-5"></i>{delivery === "0" ? "Free Shipping" : "$ " + delivery?.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="cartTotal_label">Coupon</td>
                                    <td className="cartTotal_amount"><i className="ti-gift mr-5"></i>{coupon === "0" ? "$ 0.00" : "$" + coupon?.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="cartTotal_label">Grand Total</td>
                                    <td className="cartTotal_amount"><strong><span className="font-xl fw-900 text-brand">
                                        $ {cartTotal.toFixed(2)}
                                    </span></strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div> */}
            </div>
            <div style={{ display: "flex" }}>
                <div className="payment-method">
                    <h5>Payment Mode</h5>
                    <Form>
                        <Form.Group value={billingInfo.paymentMethod}
                            onChange={(e) => handleBillingInfo(e)}>
                            {['radio'].map((type) => (
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
                        {/* <button type="submit" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178" }}>Place Order</button> */}
                    </Form>
                </div>
            </div>
        </>
    )
}
export default Orderdetail;