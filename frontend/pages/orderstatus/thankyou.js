import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import successImage from '../../components/images/orderSuccess.png'
import {
  getSingleOrderAction,
  updatePaymentStatus,
} from "../../redux/actions/orderAction";
import { checkPaymentMethod, currencySetter, getPaymentMethodLabel } from "../../utills/helpers";
import ProductCard from "../../components/ProductCard";
import TotalSummary from "../../components/TotalSummary";
import DetailsCard from "../../components/cardcomponent/DetailsCard";
import Link from "next/link";
import { calculateUserCart } from "../../redux/actions/cartAction";
import Loading from "../../components/loadingComponent";
const ThankYou = () => {
  const session = useSession();
  const [singleOrderDetail, setSingleOrderDetail] = useState();
  const orderDetail = useSelector((state) => state.order);
  const router = useRouter();
  const dispatch = useDispatch();
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

  useEffect(() => {
    let id = get(session, "data.user.accessToken.customer._id");
    if(id){
      dispatch(calculateUserCart(id))
    }
    getOrderDetails();
  }, [session?.status]);

  useEffect(() => {
    if (orderDetail) {
      setSingleOrderDetail({ ...get(orderDetail, "order", {}) });
      updateOrderPaymentStatus();
    }
  }, [orderDetail]);

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
      paymentStatus: "success",
    };
    let paymentStatus = get(orderDetail, "order.paymentStatus");
    let paymentMethod = get(orderDetail, "order.billing.paymentMethod");
    if (
      paymentStatus !== "success" &&
      paymentStatus !== "failed" &&
      checkPaymentMethod(paymentMethod)
    ) {
      let customerId=get(session, "data.user.accessToken.customer._id")
      await dispatch(updatePaymentStatus(payload,customerId, orderId, session));
    }
  };
  return (
    <div>
      <BreadCrumb title={"Order Status"} />
      {get(orderDetail,'loading')&&<Loading/>}
      <Container>
        <div className="thankyou-page-container">
          <div className="left-col">
            <div className="success-head">
              <img
                src={successImage.src}
                alt="success"
              />
              <h1>Order Placed Successfully</h1>
            </div>
            <ProductCard
              cardItems={get(singleOrderDetail, 'products', [])}
            />
          </div>
          <div className="right-col">
            {
                get(singleOrderDetail, 'billing') &&
                <div className="order-address">
                  <DetailsCard
                    title="Billing Address"
                    info={get(singleOrderDetail, 'billing', {})}
                    type='order'
                  />
                </div>
              }
              {
                get(singleOrderDetail, 'shipping') &&
                <div className="order-address">
                  <DetailsCard
                    title="Shipping Address"
                    info={get(singleOrderDetail, 'shipping', {})}
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
                    <h5>Payment Details</h5>
                  </div>
                  <div className="checkout-shipping-address ">
                    <div className="checkout-list-content">
                      <b>Payment Mode: {getPaymentMethodLabel(singleOrderDetail?.billing?.paymentMethod)}</b>
                    </div>
                  </div>
                </div>
              </div>
              <h5>Cart Total</h5>
              <TotalSummary totalSummary={get(singleOrderDetail, 'totalSummary', {})} couponCartDetail={get(singleOrderDetail, 'couponCard', {})} />
          </div>
          {/* <OrderDetailAfter orderInfo={singleOrderDetail} /> */}
          
        </div>
        
        <div className='btn-wrapper d-flex justify-content-center thankyou' style={{gap: '12px'}}>
          <Link href='/'>
            <a className="card-btons text-align-center outline">
              <span className="text-align-center">GO TO HOME</span>
            </a>
          </Link>
        </div>
      </Container>
    </div>
  );
};
export default ThankYou;
