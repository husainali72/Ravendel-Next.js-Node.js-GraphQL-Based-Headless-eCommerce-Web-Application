const { get } = require("lodash")
const { getPrice } = require("../../utills/helpers")
import HelpIcon from '@mui/icons-material/Help';
import {
    Divider,
    Tooltip
  } from "@mui/material";
  import Link from "next/link";
const CartTotalDetails=({totalSummary,decimal,currency})=>{
    return (
        <div className="price-detail-base-container">
        <div className="price-detail">
          <h4 className="price-detail-heading">PRICE DETAILS</h4>
          <Divider className="cart-price-divider" />
          <div className="carttotal-detail">
            <p className="mrp-price">Total MRP</p>
            <p className="mtb2" style={{ fontSize: "14px" }}>
              {currency} {getPrice(get(totalSummary,'mrpTotal',0), decimal)}
            </p>
          </div>
          <div className="priceDetail-base-row">
            <p className="mrp-price ">
              Discount on MRP
              <Tooltip title='Your total amount has already been updated with a special discount.' placement="top">
              <HelpIcon className="priceDetail-base-knowMore "/>
              </Tooltip>
            </p>
            <p className="mtb2 freeshipping" style={{ fontSize: "14px" }}>
              - {currency} {getPrice(get(totalSummary,'discountTotal',0), decimal)}
            </p>
          </div>

          <div className="priceDetail-base-row">
            <p className="mrp-price">
              Shipping Fee
              <Tooltip title='Your total amount has already been updated with a special discount.' placement="top">
              <HelpIcon className="priceDetail-base-knowMore "/>
              </Tooltip>
            </p>
            <p className="mtb2" style={{ fontSize: "14px" }}>
              {get(totalSummary, "totalShipping") === "0.00" ||
              get(totalSummary, "totalShipping") === "0" ? (
                <span className="freeshipping">FREE</span>
              ) : (
                `${currency} ${getPrice(
                 get(totalSummary,'totalShipping',0) ,
                  decimal
                )}`
              )}
            </p>
          </div>

          <Divider />
          <div className="priceDetail-base-row marginTop">
            <p className="mrp-price">Total Amount</p>
            <p className="mtb2 textRight">
              {" "}
              {currency} {getPrice(get(totalSummary,'grandTotal',0), decimal)}
            </p>
          </div>

          <Link href="/checkout">
            <a className="card-btons text-align-center">
              <i className="fas fa-archive"></i>
              <span className="text-align-center">PLACE ORDER</span>
            </a>
          </Link>
        </div>
        <div className="cart-action text-end">
          <Link href="/shop">
            <a className="card-btons ">
              <i className="fas fa-shopping-bag"></i> Continue Shopping
            </a>
          </Link>
        </div>
      </div>
    )
}
export default CartTotalDetails