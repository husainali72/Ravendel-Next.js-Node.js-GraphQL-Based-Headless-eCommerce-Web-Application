import moment from "moment/moment";
import { Accordion, Col, Container, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
const CalculateProductTotal = product => product.reduce((total, product) => total + (product.cost * product.qty), 0)

const OrderDetailAfter = ( {Data, id,date,grand_total, products:orderDetail,billing:billingInfo, shipping:shippingInfo , subtotal, tax, shipping_amount }) => {
    const Details = useSelector(state => state.checkout)

    console.log("idorder", Data?.id)
    const handleReOrder = (detail) => {
        console.log("order", detail)
    }
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
                                        <td>{moment(Data.date).format("DD MMMM YY") }</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>$ {Data.grand_total ? Data.grand_total : CalculateProductTotal(Data)}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Method</th>
                                        {Data.billing?.payment_method ? <td>{Data.billing?.payment_method} </td> : <td>"Cash On Delivery"</td>}
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
                                        {Data.billing?.address_line1},{Data.billing?.firstname}, <br />
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
                                    <th>Total</th>
                                </thead>
                                <tbody >
                                    {Data.products.map((order, i) =>
                                        <tr key={i}>
                                            <th>{order?.name}</th>
                                            <td>x {order?.quantity ? order.quantity : order.qty}</td>
                                            <td>$ {order?.cost}</td>
                                        </tr>
                                    )}
                                </tbody>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }} >Subtotal</th>
                                    <td>$ {Data.subtotal}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Tax</th>
                                    <td>$ {Data.tax_amount ? Data.tax_amount : "00"}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Shipping</th>
                                    <td>$ {Data.shipping_amount ? Data.shipping_amount : "20"}</td>
                                </tr>
                                <tr className="total">
                                    <th colSpan={2} style={{ textAlign: 'right' }}>Total</th>
                                    <td>$ {Data?.grand_total ? Data?.grand_total : Data.subtotal}</td>
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