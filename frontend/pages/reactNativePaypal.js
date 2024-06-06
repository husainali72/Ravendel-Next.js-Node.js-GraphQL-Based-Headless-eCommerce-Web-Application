/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { get } from "lodash";
import Loading from "../components/loadingComponent";
import { handleOrderPlaced } from "../components/checkoutcomponent/handleOrder";
import { thankyouPageRoute } from "../utills/constant";
import { getSettings } from "../redux/actions/settingAction";
import PaypalScriptLoader from "../components/paypalScriptLoader";
import { ADD_ORDER } from "../queries/orderquery";
import client from "../apollo-client";
import { handleError } from "../utills/helpers";

const PaypalButtonStyle = {
  layout: "vertical",
  color: "blue",
  shape: "rect",
  label: "paypal",
};
let i = 0;

const ReactNativePayPal = () => {
  const paypal = useRef();
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [nativeOrder, setNativeOrder] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [paypalClientId, setPaypalClientId] = useState(false);
  const settings = useSelector((state) => state.setting);
  useEffect(() => {
    const orderDetail = get(router, "query.orderData", null);
    let orderData = {};
    if (orderDetail) {
      try {
        orderData = JSON.parse(orderDetail);
      } catch (e) {
        console.error("Failed to parse orderDetail:", e);
      }
    }
    setToken(orderData.token);
    setNativeOrder(orderData);
  }, [router]);
  
  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  useEffect(() => {
    let paypalmode = get(settings, "setting.payment.paypal.test_mode");
    let clientId = "";
    if (paypalmode) {
      clientId = get(settings, "setting.payment.paypal.sandbox_client_id");
    } else {
      clientId = get(settings, "setting.payment.paypal.live_client_id");
    }
    setPaypalClientId(clientId);
  }, [settings]);

  const mutation = async (query, variables, token) => {
    const tokens = token;
    try {
      const response = await client.mutate({
        mutation: query,
        variables,
        context: {
          headers: { Authorization: tokens },
        },
      });
      return Promise.resolve(response);
    } catch (error) {
      return handleError(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    let orderId = "";
    let paypalmode = get(settings, "setting.payment.paypal");
    
    const renderPayPalButton = () => {
      if (!window.paypal || !window.paypal.Buttons) {
        setError('Unable to load PayPal.');
        setLoading(false);
        return;
      }

      window.paypal
        .Buttons({
          style: PaypalButtonStyle,
          createOrder: async (data, actions, err) => {
            try {
              const response = await mutation(ADD_ORDER, nativeOrder, token);
              let paypalOrderId = get(response, "data.addOrder.paypalOrderId");
              orderId = get(response, "data.addOrder.id");
              return paypalOrderId;
            } catch (error) {
              console.error("Failed to create order:", error);
              setLoading(false);
              throw error;
            }
          },
          onApprove: async (data, actions) => {
            try {
              const order = await actions.order.capture();
              if (order.status === "COMPLETED") {
                router.push({
                  pathname: thankyouPageRoute,
                  query: {
                    orderId: orderId,
                  },
                });
              }
            } catch (error) {
              console.error("Failed to capture order:", error);
              setLoading(false);
            }
          },
          onError: (err) => {
            console.error("PayPal button error:", err);
            setError('Error processing PayPal payment.');
            setLoading(false);
          },
        })
        .render(paypal.current)
        .then(() => setLoading(false))
        .catch((err) => {
          console.error("PayPal button render error:", err);
          setError('Error rendering PayPal button.');
          setLoading(false);
        });
    };

    if (paypalmode && paypalClientId) {
      setError('');
      setTimeout(() => {
        if (i === 0) {
          renderPayPalButton();
          i++;
        }
      }, 3000);
    } else {
      setError('Unable to load paypal button.');
      setLoading(false);
    }
  }, [settings, paypalClientId, nativeOrder, token, router]);

  return (
    <Container className="empty-checkout-page">
      {error&&!loading && <div className="error-message paypal-error-message">{error}</div>}
      {loading && <Loading />}
      <div className="checkout-unauthorised-container">
        <div ref={paypal}></div>
      </div>
    </Container>
  );
};

ReactNativePayPal.propTypes = {
  customerId: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired,
  setLoading: PropTypes.func.isRequired,
  billingDetails: PropTypes.object.isRequired,
  couponCartDetail: PropTypes.object.isRequired,
  setBillingDetails: PropTypes.func.isRequired,
};

export default ReactNativePayPal;
