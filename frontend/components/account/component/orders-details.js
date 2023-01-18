import { Accordion, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
const CalculateProductTotal = product => product.reduce((total, product) => total + (product.cost * product.qty), 0)

const OrdersDetails = ({ orderDetail, billingInfo, shippingInfo, total, subtotal, tax, shipping_amount }) => {
    const Details = useSelector(state => state.checkout)


    const handleReOrder = (detail) => {
        console.log("order", detail)
    }
    return (
        <>
            {orderDetail ? (<>
                <div className="order-details">
                    <div className="row order-row">
                        <div className="col-md-6">
                            <div className="details">
                                <h4>Order Info</h4>
                                <table>
                                    <tr>
                                        <th>Order Number</th>
                                        <td>{orderDetail.data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{orderDetail.data.date}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>$ {total ? total : CalculateProductTotal(orderDetail)}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Method</th>
                                        {billingInfo?.payment_method ? <td>{billingInfo?.payment_method} </td> : <td>"Cash On Delivery"</td>}
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="details">
                                <div className="row">
                                    <h4>Billing Address</h4>
                                    <p>
                                        {billingInfo?.firstname} {billingInfo?.lastname} <br />
                                        {billingInfo?.email}  <br />
                                        {billingInfo?.phone}  <br />
                                        {billingInfo?.address_line1},{billingInfo?.firstname}, <br />
                                        {billingInfo?.city}, {billingInfo?.state},{billingInfo?.country}
                                    </p>
                                    <hr />
                                </div>
                                <div className="row">
                                    <h4>Shipping Address</h4>
                                    <p>
                                        {shippingInfo?.firstname} {shippingInfo?.lastname} <br />
                                        {shippingInfo?.email}  <br />
                                        {shippingInfo?.phone}  <br />
                                        {shippingInfo?.address},{shippingInfo?.firstname}, <br />
                                        {shippingInfo?.city}, {shippingInfo?.State},{shippingInfo?.country}
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
                                    <th>Total</th>
                                </thead>
                                <tbody>
                                    {orderDetail.map((order, i) =>
                                        <tr key={i}>
                                            <th>{order?.name}</th>
                                            <td>x {order?.quantity ? order.quantity : order.qty}</td>
                                            <td>$ {order?.pricing?.sellprice}</td>
                                        </tr>
                                    )}
                                </tbody>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }} >Subtotal</th>
                                    <td>$ {CalculateProductTotal(orderDetail)}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Tax</th>
                                    <td>$ {tax ? tax : "50"}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Shipping</th>
                                    <td>$ {shipping_amount ? shipping_amount : "20"}</td>
                                </tr>
                                <tr className="total">
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Total</th>
                                    <td>$ {total ? total : CalculateProductTotal(orderDetail)}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    {/* <div className="row order-btn-row">
                        <div>
                            <button className="order-details-btn" >Reorder</button>
                            <button className="order-details-btn" onCLick={() => setTimeOut(() => { window.print() }, 0)}>Print Invoices</button>
                        </div>
                    </div> */}
                </div>
            </>) :
                <div className="order-details">
                    <div className="row order-row">
                        <div className="col-md-6">
                            <div className="details">
                                <h4>Order Info</h4>
                                <table>
                                    <tr>
                                        <th>Order Number</th>
                                        <td>452011245</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>12 Oct 2020</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>$ 4200.00</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Method</th>
                                        <td>Cash on Delievery</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="details">
                                <div className="row">
                                    <h4>Billing Address</h4>
                                    <p>
                                        Firstname lastname <br />
                                        Email@email.com <br />
                                        9997774441 <br />
                                        Address Line First, Address Line Second, <br />
                                        City, State, Country
                                    </p>
                                    <hr />
                                </div>
                                <div className="row">
                                    <h4>Shipping Address</h4>
                                    <p>
                                        Firstname lastname <br />
                                        Email@email.com <br />
                                        9997774441 <br />
                                        Address Line First, Address Line Second, <br />
                                        City, State, Country
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
                                    <th>Total</th>
                                </thead>
                                <tr>
                                    <th>Product One</th>
                                    <td>x 1</td>
                                    <td>$ 450</td>
                                </tr>
                                <tr>
                                    <th>Product Two</th>
                                    <td>x 2</td>
                                    <td>$ 350</td>
                                </tr>
                                <tr>
                                    <th>Product Three</th>
                                    <td>x 1</td>
                                    <td>$ 250</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }} >Subtotal</th>
                                    <td>$ 4520</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Tax</th>
                                    <td>$ 50</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Shipping</th>
                                    <td>$ 20</td>
                                </tr>
                                <tr className="total">
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Total</th>
                                    <td>$ 4570</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="row order-btn-row">
                        <div>
                            <button className="order-details-btn" >Reorder</button>
                            <button className="order-details-btn" >Print Invoices</button>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
export default OrdersDetails;