import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import PaymentFailedImage from "../../components/images/paymentFailed.png";
import ProductImage from "../../components/imageComponent";

const PaymentFailed = () => {
  return (
    <div>
      <PageTitle title="Payment Failed" />
      <BreadCrumb title={"Payment-Failed"} />
      <div className="payment-failed-container">
        <div className="payment-failed-content">
          <ProductImage
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
