import PropTypes from "prop-types";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { get } from "lodash";
import ProductCard from "../../ProductCard";
import TotalSummary from "../../TotalSummary";
import DetailsCard from "../../cardcomponent/DetailsCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currencySetter, getPaymentMethodLabel } from "../../../utills/helpers";

const OrdersDetails = ({
  order,
  handleClose
}) => {
  const settings = useSelector((state) => state.setting);
  const [currency, setCurrency] = useState("$");
  // eslint-disable-next-line no-unused-vars
  const [currencyOption, setCurrencyOption] = useState({});
  useEffect(() => {
    const currencyStoreOptions = get(
      settings,
      "setting.store.currency_options",
      {}
    );
    setCurrencyOption({ ...currencyStoreOptions });
    currencySetter(currencyStoreOptions, setCurrency);
  }, [settings]);

  return (
    <>
      <div className="order-details-container">
        <div className="order-details-head">
          <button className="back-btn" onClick={handleClose}><ArrowBackIosNewRoundedIcon/></button>
          <h4>Order Details</h4>
        </div>
        <div className="row">
          <div className="col-md-7">
            <ProductCard
              cardItems={get(order, '[0].products', [])}
            />
            <TotalSummary totalSummary={get(order, '[0].totalSummary', {})} couponCartDetail={get(order, '[0].couponCard', {})} />
          </div>
          <div className="col-md-5">
            {
              get(order, '[0].billing') &&
              <div className="order-address">
                <DetailsCard
                  title="Billing Address"
                  info={get(order, '[0].billing', {})}
                  type='order'
                />
              </div>
            }
            {
              get(order, '[0].shipping') &&
              <div className="order-address">
                <DetailsCard
                  title="Shipping Address"
                  info={get(order, '[0].shipping', {})}
                />
              </div>
            }
            <div className="order-address">
              <div className="checkout-shipping-method">
                <div className="checkout-details-title">
                  <h5>Shipping Details</h5>
                </div>
                <div className="checkout-shipping-address ">
                  <div className="checkout-list-content">
                    <b>Free Shipping</b>
                    <p>{currency}0.00 (3-10 Business Days) </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-address">
              <div className="checkout-shipping-method">
                <div className="checkout-details-title">
                  <h5>Payment Datails</h5>
                </div>
                <div className="checkout-shipping-address ">
                  <div className="checkout-list-content">
                    <b>Payment Mode: {getPaymentMethodLabel(get(order,'[0].billing.paymentMethod',''))}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

OrdersDetails.propTypes = {
  orderDetail: PropTypes.array.isRequired,
  billingInfo: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  shippingInfo: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  shippingAmount: PropTypes.number.isRequired,
  couponValue: PropTypes.number,
  couponCode: PropTypes.string,
  handleClose: PropTypes.func,
};
export default OrdersDetails;
