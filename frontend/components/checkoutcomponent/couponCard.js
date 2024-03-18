import { get } from "lodash";
import { getPrice } from "../../utills/helpers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CouponCard = ({
  couponCartDetail,
  currencyOption,
  currency,
  removeCoupon,
}) => {
  return (
    <>
      <div className="applied-coupon-section">
        <span>
          <p>
            You Save : {currency}{" "}
            {getPrice(
              get(couponCartDetail, "appliedCouponDiscount", "0"),
              currencyOption
            )}
          </p>
          <p className="textSuccess">
            Coupon Applied : {get(couponCartDetail, "appliedCouponCode")}
          </p>
        </span>
        <span>
          <DeleteOutlineIcon className="delete-coupon" onClick={removeCoupon} />
        </span>
      </div>
    </>
  );
};
export default CouponCard;
