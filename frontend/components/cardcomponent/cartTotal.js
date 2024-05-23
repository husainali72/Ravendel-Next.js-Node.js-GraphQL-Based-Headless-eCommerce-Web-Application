import { get } from "lodash";
import PropTypes from "prop-types";
import { Divider, Tooltip } from "@mui/material";
import Price from "../priceWithCurrency";
import { useRouter } from "next/router";
import {
  isAnyProductOutOfStock,
  setItemToLocalStorage,
} from "../../utills/helpers";
import Link from "next/link";
import { useSession } from "next-auth/react";
const CartTotalDetails = ({ totalSummary, cartItems }) => {
  const router = useRouter();
  const session = useSession();
  const handlePlaceOrder = () => {
    const isOutOfStock = isAnyProductOutOfStock(cartItems);
    if (session?.status !== "authenticated") {
      setItemToLocalStorage("previousPage", '/checkout');
    }
    if (!isOutOfStock) {
      router.push("/checkout");
    }
  };

  return (
    <div className="price-detail-base-container">
      <div className="price-detail">
        {/* <Divider className="cart-price-divider" /> */}
        <div className="carttotal-detail">
          <p className="mrp-price">Total MRP</p>
          <p className="mtb2" style={{ fontSize: "14px" }}>
            <Price price={get(totalSummary, "mrpTotal", 0)} />
          </p>
        </div>
        <div className="priceDetail-base-row">
          <p className="mrp-price ">
            Discount on MRP
            <Tooltip
              title="Your total amount has already been updated with a special discount."
              placement="top"
            >
              {/* <HelpIcon className="priceDetail-base-knowMore "/> */}
              <i className="fa fa-question-circle priceDetail-base-knowMore"></i>
            </Tooltip>
          </p>
          <p className="mtb2 freeshipping" style={{ fontSize: "14px" }}>
            - <Price price={get(totalSummary, "discountTotal", 0)} />
          </p>
        </div>

        <div className="priceDetail-base-row">
          <p className="mrp-price">
            Shipping Fee
            <Tooltip
              title="Your total amount has already been updated with a special discount."
              placement="top"
            >
              <i className="fa fa-question-circle priceDetail-base-knowMore"></i>
            </Tooltip>
          </p>
          <p className="mtb2" style={{ fontSize: "14px" }}>
            {get(totalSummary, "totalShipping") === 0 ? (
              <span className="freeshipping">FREE</span>
            ) : (
              <Price price={get(totalSummary, "totalShipping", 0)} />
            )}
          </p>
        </div>

        <Divider />
        <div className="priceDetail-base-row marginTop total">
          <p className="mrp-price">Total Amount</p>
          <p className="mtb2 textRight">
            {" "}
            <Price price={get(totalSummary, "grandTotal", 0)} />
          </p>
        </div>

        <button
          className="card-btons text-align-center primary-btn-color"
          onClick={handlePlaceOrder}
        >
          <span className="text-align-center">Checkout</span>
        </button>
        <div className="card-btons text-align-center outline">
          <Link href="/"> Go to home</Link>
        </div>
      </div>
    </div>
  );
};
CartTotalDetails.propTypes = {
  totalSummary: PropTypes.object.isRequired,
  cartItems: PropTypes.array.isRequired,
};

export default CartTotalDetails;
