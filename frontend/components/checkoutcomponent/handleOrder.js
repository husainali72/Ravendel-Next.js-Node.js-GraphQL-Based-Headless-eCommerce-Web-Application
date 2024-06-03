/* eslint-disable no-unused-vars */
import { get } from "lodash";
import { checkoutDetailAction } from "../../redux/actions/checkoutAction";
import { ADD_ORDER } from "../../queries/orderquery";
import { handleError, mutation } from "../../utills/helpers";
import { removeAllCartItemsAction } from "../../redux/actions/cartAction";
import notify from "../../utills/notifyToast";
import {
  BANKTRANSFER,
  CASH_ON_DELIVERY,
  PAYPAL,
  RAZORPAY,
  STRIPE,
  thankyouPageRoute,
} from "../../utills/constant";
import { razorPay } from "./razorpay/rajorpay";

export const handleOrderPlaced = (
  customerId,
  session,
  setLoading,
  billingDetails,
  dispatch,
  couponCartDetail,
  setBillingDetails,
  router,
  razorpayKey
) => {
  return new Promise((resolve, reject) => {
    if (session?.status === "authenticated") {
      setLoading(true);
      let paymentMethod = get(billingDetails, "billing.paymentMethod");
      let variable = {
        ...billingDetails,
      };
      if (couponCartDetail?.couponApplied) {
        variable.couponCode = get(couponCartDetail, "appliedCouponCode");
      }
      dispatch(checkoutDetailAction(billingDetails));
      mutation(ADD_ORDER, variable, dispatch)
        .then((response) => {
          setLoading(false);
          const { success, message, redirectUrl, id:orderId, paypalOrderId,razorpayOrderId } = get(
            response,
            "data.addOrder"
          );
          // Handle different payment methods
          switch (paymentMethod) {
            case STRIPE:
              if (success && redirectUrl) {
                router.push(redirectUrl);
              }
              break;
            case PAYPAL:
              if (success && paypalOrderId) {
                resolve({ paypalOrderId, orderId });
              } else {
                reject(new Error("Paypal order ID not found"));
              }
              break;
            case CASH_ON_DELIVERY:
              if (success && orderId) {
                let id = customerId;
                setBillingDetails("");
                router.push({
                  pathname: thankyouPageRoute,
                  query: {
                    orderId: orderId,
                  },
                });
              }
              break;
            case RAZORPAY:
              if (success && razorpayOrderId) {
                razorPay(razorpayKey,razorpayOrderId,router,orderId)
              }
              break;
            case BANKTRANSFER:
              if (success && orderId) {
                let id = customerId;
                setBillingDetails("");
                router.push({
                  pathname: thankyouPageRoute,
                  query: {
                    orderId: orderId,
                  },
                });
              }
              break;
            default:
              if (!success) {
                notify(message, false);
              }
              break;
          }
        })
        .catch((error) => {
          setLoading(false);
          handleError(error, dispatch,router);
        });
    }
  });
};
