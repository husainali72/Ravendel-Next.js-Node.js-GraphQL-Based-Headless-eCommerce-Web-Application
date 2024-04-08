import { useEffect } from "react";
import PropTypes from "prop-types";

const PaypalScriptLoader = ({ clientId }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [clientId]);

  return null;
};
PaypalScriptLoader.propTypes = {
  clientId: PropTypes.string.isRequired,
};
export default PaypalScriptLoader;
