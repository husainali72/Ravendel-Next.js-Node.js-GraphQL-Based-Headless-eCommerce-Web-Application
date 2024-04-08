/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import { handleOrderPlaced } from "../../../pages/handleOrder";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import Loading from "../../loadingComponent";
import { get } from "lodash";
import { thankyouPageRoute } from "../../../utills/constant";

const PaypalButtonStyle = {
  layout: "vertical",
  color: "blue",
  shape: "rect",
  label: "paypal",
};

const Paypal = ({
  customerId,
  session,
  billingDetails,
  couponCartDetail,
  setBillingDetails,
}) => {
  const paypal = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let orderId = "";
    window.paypal
      .Buttons({
        style: PaypalButtonStyle,
        createOrder: async (data, actions, err) => {
          const response = await handleOrderPlaced(
            customerId,
            session,
            setLoading,
            billingDetails,
            dispatch,
            couponCartDetail,
            setBillingDetails,
            router
          );
          let paypalOrderId = get(response, "paypalOrderId");
          orderId = get(response, "orderId");
          return paypalOrderId;
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          if (order.status === "COMPLETED") {
            router.push({
              pathname: thankyouPageRoute,
              query: {
                orderId: orderId,
              },
            });
          }
        },
        onError: (err) => {},
      })
      .render(paypal.current);
  }, []);

  return (
    <Container className="empty-checkout-page">
      {loading && <Loading />}
      <div className="checkout-unauthorised-container">
        <div ref={paypal}></div>
      </div>
    </Container>
  );
};

Paypal.propTypes = {
  customerId: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired,
  setLoading: PropTypes.func.isRequired,
  billingDetails: PropTypes.object.isRequired,
  couponCartDetail: PropTypes.object.isRequired,
  setBillingDetails: PropTypes.func.isRequired,
};

export default Paypal;
