import { useSelector } from "react-redux";
import moment from 'moment';
import { currencySetter, getPrice } from "../../../utills/helpers";
import { useEffect, useState } from "react";
import { GET_HOMEPAGE_DATA_QUERY } from "../../../queries/home";
import client from "../../../apollo-client";
import { getSession } from "next-auth/react";
const CalculateProductTotal = product => product.reduce((total, product) => total + (product.productPrice * product.qty), 0)


export const convertDateToStringFormat = (date) => {

    var convertedDate = ""
    if (date) {
        convertedDate = moment(date).format('ll')
    } else {
        convertedDate = date;
    }
    return convertedDate;
};
const OrdersDetails = ({ orderDetail, billingInfo, order, shippingInfo, total, subtotal, tax, shippingAmount, homepageData, couponValue, couponCode }) => {
    const Details = useSelector(state => state.checkout)
    const [currency, setCurrency] = useState("$")
    const [decimal, setdecimal] = useState(2)
    const [currencyStore, setCurrencyStore] = useState({})
    useEffect(() => {
        setdecimal(currencyStore?.currency_options?.number_of_decimals)
        currencySetter(currencyStore, setCurrency);
    }, [currencyStore])
    const handleReOrder = (detail) => {

    }
    useEffect(() => {
        const getSettings = async () => {
            try {
                const { data: homepagedata } = await client.query({
                    query: GET_HOMEPAGE_DATA_QUERY
                })
                const homepageData = homepagedata
                setCurrencyStore(homepageData?.getSettings?.store)
            }
            catch (e) {
            }
        }
        getSettings()
    }, [order]);
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
                                        <td>{order.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{convertDateToStringFormat(order.date)}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>

                                        <td>{currency} {total ? getPrice(total, decimal) : getPrice(total, decimal)}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Method</th>
                                        {billingInfo?.paymentMethod ? <td>{billingInfo?.paymentMethod} </td> : <td>"Cash On Delivery"</td>}
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
                                        {billingInfo?.addressLine1} {billingInfo?.firstname}  <br />
                                        {billingInfo?.city} {billingInfo?.state} {billingInfo?.country}
                                    </p>
                                    <hr />
                                </div>
                                <div className="row">
                                    <h4>Shipping Address</h4>
                                    <p>
                                        {shippingInfo?.firstname} {shippingInfo?.lastname} <br />
                                        {shippingInfo?.email}  <br />
                                        {shippingInfo?.phone}  <br />
                                        {shippingInfo?.address} {shippingInfo?.firstname} <br />
                                        {shippingInfo?.city} {shippingInfo?.State} {shippingInfo?.country}
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
                                <tbody>
                                    {orderDetail.map((order, i) =>
                                        <tr key={i}>
                                            <th>{order?.productTitle}</th>
                                            <td>x {order?.quantity ? order.quantity : order.qty}</td>

                                            <th>    {order?.attributes.map((attribute) => {
                                                return <div> {attribute.name} : {attribute.value}</div>
                                            })}</th>
                                            <td>{currency} {getPrice(order?.productPrice, decimal)}</td>
                                        </tr>
                                    )}
                                </tbody>
                                <tr>
                                    <th colSpan={3} className="order-text-align" >Subtotal</th>
                                    <td>{currency} {getPrice(subtotal, decimal)}</td>
                                </tr>
                                <tr>
                                    <th colSpan={3} className="order-text-align">Tax</th>
                                    <td>{currency} {tax ? getPrice(tax, decimal) : "0.00"}</td>
                                </tr>
                                <tr>
                                    <th colSpan={3} className="order-text-align">Shipping</th>
                                    <td>{currency} {shippingAmount ? getPrice(shippingAmount, decimal) : "0.00"}</td>
                                </tr>
                                {couponCode && <tr>
                                    <th colSpan={3} className="order-text-align" style={{ color: '#4BB543' }}>Coupon - {couponCode}</th>
                                    <td style={{ color: '#4BB543' }} >- {currency} {couponValue ? getPrice(couponValue, decimal) : "0.00"}</td>
                                </tr>}
                                <tr className="total">
                                    <th colSpan={3} className="order-text-align" >Total</th>
                                    <td>{currency} {total ? getPrice(total, decimal) : getPrice(total, decimal)}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </>) : null
                // <div className="order-details">
                //     <div className="row order-row">
                //         <div className="col-md-6">
                //             <div className="details">
                //                 <h4>Order Info</h4>
                //                 <table>
                //                     <tr>
                //                         <th>Order Number</th>
                //                         <td>452011245</td>
                //                     </tr>
                //                     <tr>
                //                         <th>Date</th>
                //                         <td>12 Oct 2020</td>
                //                     </tr>
                //                     <tr>
                //                         <th>Total</th>
                //                         <td>$ 4200.00</td>
                //                     </tr>
                //                     <tr>
                //                         <th>Payment Method</th>
                //                         <td>Cash on Delievery</td>
                //                     </tr>
                //                 </table>
                //             </div>
                //         </div>
                //         <div className="col-md-6">
                //             <div className="details">
                //                 <div className="row">
                //                     <h4>Billing Address</h4>
                //                     <p>
                //                         Firstname lastname <br />
                //                         Email@email.com <br />
                //                         9997774441 <br />
                //                         Address Line First, Address Line Second, <br />
                //                         City, State, Country
                //                     </p>
                //                     <hr />
                //                 </div>
                //                 <div className="row">
                //                     <h4>Shipping Address</h4>
                //                     <p>
                //                         Firstname lastname <br />
                //                         Email@email.com <br />
                //                         9997774441 <br />
                //                         Address Line First, Address Line Second, <br />
                //                         City, State, Country
                //                     </p>

                //                 </div>
                //             </div>
                //         </div>
                //         <hr />
                //     </div>
                //     <div className="row">
                //         <div className="details">
                //             <h4>Order Details</h4>
                //             <table className="product-detail">
                //                 <thead>
                //                     <th>Products</th>
                //                     <th>Qty</th>
                //                     <th>Total</th>
                //                 </thead>
                //                 <tr>
                //                     <th>Product One</th>
                //                     <td>x 1</td>
                //                     <td>$ 450</td>
                //                 </tr>
                //                 <tr>
                //                     <th>Product Two</th>
                //                     <td>x 2</td>
                //                     <td>$ 350</td>
                //                 </tr>
                //                 <tr>
                //                     <th>Product Three</th>
                //                     <td>x 1</td>
                //                     <td>$ 250</td>
                //                 </tr>
                //                 <tr>
                //                     <th colSpan={2} className="order-text-align" >Subtotal</th>
                //                     <td>$ 4520</td>
                //                 </tr>
                //                 <tr>
                //                     <th colSpan={2} className="order-text-align">Tax</th>
                //                     <td>$ 50</td>
                //                 </tr>
                //                 <tr>
                //                     <th colSpan={2} className="order-text-align">Shipping</th>
                //                     <td>$ 20</td>
                //                 </tr>
                //                 <tr className="total">
                //                     <th colSpan={2} className="order-text-align">Total</th>
                //                     <td>$ 4570</td>
                //                 </tr>
                //             </table>
                //         </div>
                //     </div>
                //     <div className="row order-btn-row">
                //         <div>
                //             <button className="order-details-btn" >Reorder</button>
                //             <button className="order-details-btn" >Print Invoices</button>
                //         </div>
                //     </div>
                // </div>
            }

        </>
    )
}
export default OrdersDetails;
export async function getServerSideProps(context) {


    const session = await getSession(context)
    let id = session?.user?.accessToken?.customer._id
    var customercart = [];
    var cart_id = ""
    var CartsDataa = {}
    var homepageData = [];
    var currencyStore = [];


    /* ----------------------- GEt currency -----------------------------*/
    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        })
        homepageData = homepagedata

        currencyStore = homepagedata?.getSettings?.store

    }
    catch (e) {
        console.log("homepage Error===", e);
    }


    return {
        props: {
            currencyStore,
            homepageData
        },


    }
}


