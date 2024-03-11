import { useEffect } from "react"
import { Spinner } from "react-bootstrap";
import {  getPrice } from "../../utills/helpers";
import CartTotalDetails from "../cardcomponent/cartTotal";
import CouponCard from "./couponCard";
import { get } from "lodash";
const OrderSummary = (props) => {

    const { currencyOption,
            totalSummary,
            couponCartDetail,
            currency, 
            couponCode,
            setCouponCode, 
            doApplyCouponCode, 
            getCalculationDetails,
            CouponLoading, 
            removeCoupon
            } = props;

    useEffect(() => {
        var allData = {
            cartTotal: get(totalSummary,'cartTotal','0')?.toString(),
            grandTotal:get(totalSummary,'grandTotal','0') ?.toString(),
            discountAmount:get(totalSummary,'couponDiscountTotal','0')?.toString(),
            shippingAmount:get(totalSummary,'totalShipping','0')?.toString(),
            taxAmount: get(totalSummary,'totalTax','0')?.toString(),           
        }

        getCalculationDetails(allData)
    }, [totalSummary,couponCartDetail])

    return (
        <>
            <div className="col-md-12 col-sm-12 col-md-2-5">
          {!get(couponCartDetail,'couponApplied')? <div className="panel-body">
                <p className="mb-30 font-sm">If you have a coupon code, please apply it below.</p>
                    <form method="post" onSubmit={doApplyCouponCode}>
                        <div className="coupon-form-group">
                            <input type="text" placeholder="Enter Coupon Code..." value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} />
                        </div>
                        <div className="form-group">
                            <button disabled={!couponCode} type="submit" className="btn btn-md primary-btn-color" name="coupon" style={{ minWidth: "100px", marginTop: 12, color: "#fff" }}>{CouponLoading ? <Spinner animation="border" size="sm" variant="light" /> : "Apply Coupon"}</button>
                        </div>
                    </form>
                </div>:
                <CouponCard currency={currency} couponCartDetail={couponCartDetail} currencyOption={currencyOption} removeCoupon={removeCoupon}/>}
                <div className="border p-md-4 p-30 border-radius cart-totals">

                    <div className="heading_s1 mb-3 cart-total-head">
                        <h4>Cart Totals</h4>
                    </div>

                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                            <tr >
                                    <td className="cartTotal_label" >Total MRP</td>
                                    <td className="cartTotal_amount"><span className="font-lg fw-900 text-brand">
                                        {currency} {getPrice(get(totalSummary,'mrpTotal','0'), currencyOption)}
                                    </span></td>
                                </tr>
                                <tr >
                                    <td className="cartTotal_label  " >Discount on MRP</td>
                                    <td className="cartTotal_amount "><span className="font-lg fw-900 text-brand textSuccess" >
                                       - {currency} {getPrice(get(totalSummary ,'discountTotal','0'), currencyOption)}
                                    </span></td>
                                </tr>
                               {get(totalSummary ,'totalTax')!=='0'||get(totalSummary ,'totalTax')!=='0.00'&& <tr>
                                    <td className="cartTotal_label">Tax</td>
                                    <td className="cartTotal_amount"> <i className="ti-gift mr-5"> {currency} {getPrice(get(totalSummary ,'totalTax','0'),currencyOption)}</i></td>
                                </tr>}
                                <tr>
                                    <td className="cartTotal_label">Shipping</td>
                                    {get(totalSummary ,'totalShipping')== "0.00"||get(totalSummary ,'totalShipping')== "0"? <td className="cartTotal_amount"> <i className="ti-gift mr-5"></i>Free Shipping</td>:
                                    <td className="cartTotal_amount"> 
                                    <i className="ti-gift mr-5"></i>{currency} {getPrice(get(totalSummary ,'totalShipping','0'),currencyOption)}</td> 
                                    }
                                </tr>
                                {get(couponCartDetail,'couponApplied')&&!get(couponCartDetail,'isCouponFreeShipping') && <tr>
                                    <td className={`cartTotal_label ${get(couponCartDetail,'couponApplied') && "textSuccess"}`}>Coupon Saving </td>
                                    <td className={`cartTotal_amount ${get(couponCartDetail,'couponApplied') && "textSuccess"}`}><i className="ti-gift mr-5"></i>{"-"} {currency} {getPrice(get(totalSummary,'couponDiscountTotal','0'), currencyOption)}</td>
                                </tr>}
                                <tr style={{ borderTop: "2px solid black", marginTop: "15px" }}>
                                    <td className="cartTotal_label" >Total</td>
                                    <td className="cartTotal_amount"><strong><span className="font-xl fw-900 text-brand">
                                        {currency} {getPrice(get(totalSummary ,'grandTotal','0'), currencyOption)}
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