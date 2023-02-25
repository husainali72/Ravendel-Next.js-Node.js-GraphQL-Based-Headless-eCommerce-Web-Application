import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getImage } from "../../utills/helpers";
import Form from 'react-bootstrap/Form';
import Stripes from "./reactstripe/StripeContainer";


const Orderdetail = (props) => {
    // const cart = useSelector((state) => state.cart);
    // console.log(cart)
    const { currency,getOrderDetails,cartItems, billingInfo, handleBillingInfo, tax_amount, shippingInfo, paymentMethod, delivery, billingDetails, subTotal, cartTotal
    } = props;
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
        // console.log("Subtotal", subtotalVar);
        // setSubTotal(subtotalVar);
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
    // console.log("cartproduct==+", cartProduct);

    useEffect(() => {
        let cartItem = cart.map((product) => { return { product_id: product._id, name: product.name, cost: product.pricing.sellprice ? product.pricing.sellprice: product.pricing.price , qty: product.quantity } })
        var allData = {
            products: cartItem,
            billing: billingInfo,
            shipping: shippingInfo,
            checkoutDate: new Date(),
        };
        getOrderDetails(allData);
    }, [billingInfo, shippingInfo, cart, cartTotal, tax_amount, delivery])
    return (
        <>
            <div className="table-responsive order_table text-center">
                <table className="table checkout-table">
                    <thead>
                        <tr>
                            <th colSpan="2">Product</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, i) => (
                            <tr key={i}>
                                <td className="image product-thumbnail"><img src={getImage(item, 'feature_image')} alt="" /></td>
                                <td><i className="ti-check-box font-small text-muted mr-10"></i>
                                    <h5><a href="shop-product-full.html">{item.name}</a></h5> <span className="product-qty">x {item.quantity}</span>
                                </td>
                                <td>{currency}{item.pricing.sellprice ? item.pricing.sellprice :item.pricing.price  * item.quantity}</td>
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
                            <td colSpan="2"> {tax_amount === "0" ? "$0" : "$" + tax_amount.toFixed(2)}</td>
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
                                    <td className="cart_total_label">Cart Total</td>
                                    <td className="cart_total_amount"><span className="font-lg fw-900 text-brand">
                                        $ {subtotal.toFixed(2)}
                                    </span></td>
                                </tr>
                                <tr>
                                    <td className="cart_total_label">Tax</td>
                                    <td className="cart_total_amount"> <i className="ti-gift mr-5">{tax_amount === "0" ? "$0.00" : "$ " + tax_amount?.toFixed(2)}</i></td>
                                </tr>
                                <tr>
                                    <td className="cart_total_label">Shipping</td>
                                    <td className="cart_total_amount"> <i className="ti-gift mr-5"></i>{delivery === "0" ? "Free Shipping" : "$ " + delivery?.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="cart_total_label">Coupon</td>
                                    <td className="cart_total_amount"><i className="ti-gift mr-5"></i>{coupon === "0" ? "$ 0.00" : "$" + coupon?.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="cart_total_label">Grand Total</td>
                                    <td className="cart_total_amount"><strong><span className="font-xl fw-900 text-brand">
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
                        <Form.Group value={billingInfo.payment_method}
                            onChange={(e) => handleBillingInfo(e)}>
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        label="Cash on delivery"
                                        name="payment_method"
                                        type={type}
                                        value="Cash On Delivery"
                                        id={`inline-${type}-1`}
                                    />
                                    <Form.Check
                                        label="Stripe"
                                        name="payment_method"
                                        type={type}
                                        value="stripe"
                                        id={`inline-${type}-1`}
                                    />
                                    <Form.Check
                                        label="Credit Card"
                                        name="payment_method"
                                        type={type}
                                        id={`inline-${type}-2`}
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