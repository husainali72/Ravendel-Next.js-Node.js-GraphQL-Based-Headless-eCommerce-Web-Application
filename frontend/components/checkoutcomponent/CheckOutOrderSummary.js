import { useEffect } from "react"
const OrderSummary = (props) => {
    const { subTotal, cartTotal, coupon, delivery, tax_amount, couponCode, setCouponCode, doApplyCouponCode, getCalculationDetails } = props;
    useEffect(() => {
        var allData = {
            subtotal: subTotal.toString(),
            grand_total: cartTotal.toString(),
            discount_amount: coupon.toString(),
            shipping_amount: delivery.toString(),
            tax_amount: tax_amount.toString(),
        }
        getCalculationDetails(allData)
    }, [subTotal, cartTotal, coupon, delivery, tax_amount])
    return (
        <>
            <div className="col-md-12 col-sm-12">
                <div className="panel-body">
                    <p className="mb-30 font-sm">If you have a coupon code, please apply it below.</p>
                    <form method="post" onSubmit={doApplyCouponCode}>
                        <div className="coupon-form-group">
                            <input type="text" placeholder="Enter Coupon Code..." value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn  btn-md" name="coupon" style={{ marginTop: 12, backgroundColor: "#088178", color: "#fff" }}>Apply Coupon</button>
                        </div>
                    </form>
                </div>
                <div className="border p-md-4 p-30 border-radius cart-totals">

                    <div className="heading_s1 mb-3">
                        <h4>Cart Totals</h4>
                    </div>

                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                <tr >
                                    <td className="cart_total_label" >Cart Total</td>
                                    <td className="cart_total_amount"><span className="font-lg fw-900 text-brand">
                                        $ {subTotal.toFixed(2)}
                                    </span></td>
                                </tr>
                                <tr>
                                    <td className="cart_total_label">Tax</td>
                                    <td className="cart_total_amount"> <i className="ti-gift mr-5">{tax_amount === "0" ? "$0.00" : "$ " + tax_amount}</i></td>
                                </tr>
                                <tr>
                                    <td className="cart_total_label">Shipping</td>
                                    <td className="cart_total_amount"> <i className="ti-gift mr-5"></i>{delivery === "0" ? "Free Shipping" : "$ " + delivery?.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="cart_total_label">Coupon</td>
                                    <td className="cart_total_amount"><i className="ti-gift mr-5"></i>{coupon === "0" ? "$ 0.00" : "- $" + coupon?.toFixed(2)}</td>
                                </tr>
                                <tr style={{ borderTop: "2px solid black", marginTop: "15px" }}>
                                    <td className="cart_total_label" >Total</td>
                                    <td className="cart_total_amount"><strong><span className="font-xl fw-900 text-brand">
                                        $ {cartTotal.toFixed(2)}
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