import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Accordion, Col, Container, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { currencySetter, getPrice } from "../../../utills/helpers";
const CalculateProductTotal = product => product.reduce((total, product) => total + (product.cost * product.qty), 0)
const OrderDetailAfter = ({ Data, id, date, grandTotal, products: orderDetail, billing: billingInfo, shipping: shippingInfo, subtotal, tax, shippingAmount }) => {
    const Details = useSelector(state => state.checkout)
    const [currency, setCurrency] = useState("$")
    const [decimal, setdecimal] = useState(2)
    const settings = useSelector(state => state.setting);
    useEffect(() => {
        setdecimal(settings?.currencyOption?.number_of_decimals)
        currencySetter(settings, setCurrency);
    }, [settings?.currencyOption])
    return (
        <>
            {Data ? (<>
                <div className="order-details">
                    <div className="row order-row">
                        <div className="col-md-6">
                            <div className="details">
                                <h4>Order Info</h4>
                                <table>
                                    <tr>
                                        <th>Order Number</th>
                                        <td>{Data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{moment(Data.date).format("DD MMMM YY")}</td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>{currency} {Data?.subtotal ? getPrice(Data.subtotal, decimal) : getPrice(Data.grandTotal, decimal)}</td>
                                    </tr>
                                    {Data.couponCode && <tr>
                                        <th>Coupon <span className="coupon-applied">({Data.couponCode})</span></th>
                                        <td>- {currency} {Data?.discountAmount && getPrice(Data.discountAmount, decimal)}</td>
                                    </tr>}
                                    <tr>
                                        <th>Grandtotal</th>
                                        <td>{currency} {Data?.grandTotal && getPrice(Data.grandTotal, decimal)}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Method</th>
                                        {Data.billing?.paymentMethod ? <td>{Data.billing?.paymentMethod} </td> : <td>"Cash On Delivery"</td>}
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="details">
                                <div className="row">
                                    <h4>Billing Address</h4>
                                    <p>
                                        {Data.billing?.firstname} {Data.billing?.lastname} <br />
                                        {Data.billing?.email}  <br />
                                        {Data.billing?.phone}  <br />
                                        {Data.billing?.addressLine1},{Data.billing?.firstname}, <br />
                                        {Data.billing?.city}, {Data.billing?.state},{Data.billing?.country}
                                    </p>
                                    <hr />
                                </div>
                                <div className="row">
                                    <h4>Shipping Address</h4>
                                    <p>
                                        {Data.shipping?.firstname} {Data.shipping?.lastname} <br />
                                        {Data.shipping?.email}  <br />
                                        {Data.shipping?.phone}  <br />
                                        {Data.shipping?.address},{Data.shipping?.firstname}, <br />
                                        {Data.shipping?.city}, {Data.shipping?.State},{Data.shipping?.country}
                                    </p>

                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="details">
                            <h4>Order Details</h4>
                            <table className="product-detail">
                                <thead>
                                    <th>Products</th>
                                    <th>Qty</th>
                                    <th>Attributes</th>
                                    <th>Total</th>
                                </thead>
                                <tbody >
                                    {Data.products.map((order, i) =>
                                        <tr key={i}>
                                            <th>{order?.name}</th>
                                            <td>x {order?.quantity ? order.quantity : order.qty}</td>
                                            <th>  {order?.attributes.map((attribute) => (<div>{attribute.name} : {attribute.value}</div>))}</th>
                                            <td>{currency} {order ? getPrice(order.cost, decimal) : null}</td>
                                        </tr>
                                    )}
                                </tbody>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }} >Subtotal</th>
                                    <td>{currency} {getPrice(Data.subtotal, decimal)}</td>
                                </tr>
                                {Data.couponCode && <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Coupon <span className="coupon-applied">({Data.couponCode})</span></th>
                                    <td>- {currency} {Data?.discountAmount && getPrice(Data.discountAmount, decimal)}</td>
                                </tr>}
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Tax</th>
                                    <td>{currency} {Data.taxAmount ? getPrice(Data.taxAmount, decimal) : "00"}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Shipping</th>
                                    <td>{currency} {Data.shippingAmount ? getPrice(Data.shippingAmount, decimal) : "20"}</td>
                                </tr>
                                <tr className="total">
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Grandtotal</th>
                                    <td>{currency} {Data ? getPrice(Data.grandTotal, decimal) : getPrice(Data.subtotal, decimal)}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <h3 className="mt-5">Thank You for Shopping</h3>
                </div>
            </>) :
                <div className="loading-container">
                    <Spinner animation="border" variant="success" />
                </div>
            }

        </>
    )
}
export default OrderDetailAfter;