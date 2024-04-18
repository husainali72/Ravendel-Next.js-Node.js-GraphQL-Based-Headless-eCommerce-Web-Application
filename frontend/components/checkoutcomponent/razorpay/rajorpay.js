import {
  paymentFailedRoute,
  thankyouPageRoute,
} from "../../../utills/constant";

export const razorPay = async (key, razorpayOrderId, router, orderId) => {
  const options = {
    key,
    order_id: razorpayOrderId,
    handler: () => {
      router.push({
        pathname: thankyouPageRoute,
        query: {
          orderId: orderId,
        },
      });
    },
  };

  const razor = new window.Razorpay(options);
  razor.on("payment.failed", function () {
    router.push({
      pathname: paymentFailedRoute,
      query: {
        orderId: orderId,
      },
    });
  });

  razor.open();
};
