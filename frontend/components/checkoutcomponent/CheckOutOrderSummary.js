import { useEffect } from "react"
import { Spinner } from "react-bootstrap";
import { getPrice } from "../../utills/helpers";
const OrderSummary = (props) => {

    const { decimal, currency, subTotal, cartTotal, coupon, delivery, tax_amount, couponCode, setCouponCode, doApplyCouponCode, getCalculationDetails, CouponLoading, isCouponApplied, AppliedCoupon } = props;

    useEffect(() => {
        var allData = {
            subtotal: subTotal?.toString(),
            grandTotal: cartTotal?.toString(),
            discount_amount: coupon?.toString(),
            shipping_amount: delivery?.toString(),
            tax_amount: tax_amount?.toString(),
        }
        getCalculationDetails(allData)
    }, [subTotal, cartTotal, coupon, delivery, tax_amount])



    return (
        <>
            <div className="col-md-12 col-sm-12 col-md-2-5">
                <div className="panel-body">
                    <p className="mb-30 font-sm">If you have a coupon code, please apply it below.</p>
                    <form method="post" onSubmit={doApplyCouponCode}>
                        <div className="coupon-form-group">
                            <input type="text" placeholder="Enter Coupon Code..." value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} />
                        </div>
                        <div className="form-group">
                            <button disabled={!couponCode} type="submit" className="btn btn-md" name="coupon" style={{ minWidth: "100px", marginTop: 12, backgroundColor: "#088178", color: "#fff" }}>{CouponLoading ? <Spinner animation="border" size="sm" variant="light" /> : "Apply Coupon"}</button>
                        </div>
                    </form>
                </div>
                <div className="border p-md-4 p-30 border-radius cart-totals">

                    <div className="heading_s1 mb-3 cart-total-head">
                        <h4>Cart Totals</h4>
                    </div>

                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                <tr >
                                    <td className="cartTotal_label" >Cart Total</td>
                                    <td className="cartTotal_amount"><span className="font-lg fw-900 text-brand">

                                        {currency}{getPrice(subTotal, decimal)}

                                    </span></td>
                                </tr>
                                <tr>
                                    <td className="cartTotal_label">Tax</td>
                                    <td className="cartTotal_amount"> <i className="ti-gift mr-5"> {currency}{getPrice(tax_amount, decimal)}</i></td>
                                </tr>
                                <tr>
                                    <td className="cartTotal_label">Shipping</td>

                                    {delivery != "0" ? <td className="cartTotal_amount"> <i className="ti-gift mr-5"></i>{currency} {getPrice(delivery, decimal)}</td> :
                                        <td className="cartTotal_amount"> <i className="ti-gift mr-5"></i>Free Shipping</td>}
                                </tr>
                                {isCouponApplied && <tr>
                                    <td className={`cartTotal_label ${isCouponApplied && "textSuccess"}`}>Coupon {isCouponApplied && <small> - ({AppliedCoupon})</small>}</td>
                                    <td className={`cartTotal_amount ${isCouponApplied && "textSuccess"}`}><i className="ti-gift mr-5"></i>{"-"} {currency} {getPrice(Number(coupon), decimal)}</td>
                                </tr>}
                                <tr style={{ borderTop: "2px solid black", marginTop: "15px" }}>
                                    <td className="cartTotal_label" >Total</td>
                                    <td className="cartTotal_amount"><strong><span className="font-xl fw-900 text-brand">
                                        {currency}{getPrice(cartTotal, decimal)}
                                    </span></strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}
export default OrderSummary;