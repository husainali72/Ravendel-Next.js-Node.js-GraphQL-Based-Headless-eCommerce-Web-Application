/* eslint-disable react/prop-types */
import { get } from "lodash";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Price from "../priceWithCurrency";

const CouponCard = ({ couponCartDetail, removeCoupon }) => {
  return (
    <>
        <div className="applied-coupon-section">
          <span>
            <p>
              You Saved :
              <Price
                price={get(couponCartDetail, "appliedCouponDiscount", 0)}
              />
            </p>
            <p className="textSuccess">
              Coupon Applied : {get(couponCartDetail, "appliedCouponCode")}
            </p>
          </span>
          <span>
            <DeleteOutlineIcon
              className="delete-coupon"
              onClick={removeCoupon}
            />
          </span>
        </div>
    </>
  );
};
export default CouponCard;
