import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import PaymentFailedImage from "../../components/images/paymentFailed.png";
import {
  getSingleOrderAction,
  updatePaymentStatus,
} from "../../redux/actions/orderAction";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { get } from "lodash";
const PaymentFailed = () => {
  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.order);
  useEffect(() => {
    if (session?.status === "authenticated" && orderDetail?.order) {
      updateOrderPaymentStatus();
    }
  }, [orderDetail]);
  useEffect(() => {
    if (session?.status === "authenticated") {
      getOrderDetails();
    }
  }, [session?.status]);
  // If orderId is present, dispatch action to get single order details
  const getOrderDetails = () => {
    const { orderId } = get(router, "query");
    if (session?.status === "authenticated") {
      if (orderId) {
        let variable = { id: orderId };
        dispatch(getSingleOrderAction(variable));
      }
    }
  };
  // If payment status is not updated, dispatch action to update it
  const updateOrderPaymentStatus = async () => {
    const { orderId } = get(router, "query");
    let payload = {
      id: orderId,
      paymentStatus: "failed",
    };
    let customerId=get(session, "data.user.accessToken.customer._id")
    let paymentStatus = get(orderDetail, "order.paymentStatus");
    if (paymentStatus && paymentStatus !== "failed") {
     await dispatch(updatePaymentStatus(payload,customerId));
    }
  };
  return (
    <div>
      <PageTitle title="Payment Failed" />
      <BreadCrumb title={"Payment-Failed"} />
      <div className="payment-failed-container">
        <div className="payment-failed-content">
          <img
            className="payment-failed-image"
            src={PaymentFailedImage?.src}
            alt="Payment Failed"
          />
          <p className="payment-failed-message">
            Oops! It seems like there was an issue processing your payment.
            Please try again.
          </p>
          <button className="retry-button">Retry Payment</button>
          <p className="contact-support">
            If the issue persists, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};
export default PaymentFailed;
