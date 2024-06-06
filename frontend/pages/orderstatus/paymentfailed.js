import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import failedImage from '../../components/images/orderFailed.png'
import {
  getSingleOrderAction,
  updatePaymentStatus,
} from "../../redux/actions/orderAction";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { get } from "lodash";
import { Container } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import TotalSummary from "../../components/TotalSummary";
import DetailsCard from "../../components/cardcomponent/DetailsCard";
import Link from "next/link";
import { currencySetter, getPaymentMethodLabel, isObjectEmpty } from "../../utills/helpers";
import { CircularProgress } from "@mui/material";

const PaymentFailed = () => {
  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.order);
  const [singleOrderDetail, setSingleOrderDetail] = useState();
  const [currency, setCurrency] = useState("$");
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [currencyOption, setCurrencyOption] = useState({});
  const settings = useSelector((state) => state.setting);
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
    if (!isObjectEmpty(orderDetail?.order)) {
      setSingleOrderDetail({ ...get(orderDetail, "order", {}) });
      updateOrderPaymentStatus();
    }
  }, [orderDetail]);
  useEffect(() => {
    if (session?.status === "authenticated") {
      getOrderDetails();
    }
  }, [session?.status]);
  // If orderId is present, dispatch action to get single order details
  const getOrderDetails = async() => {
    const { orderId } = get(router, "query");
    if (session?.status === "authenticated") {
      if (orderId) {
        let variable = { id: orderId };
        await dispatch(getSingleOrderAction(variable));
      }
    }
    setLoading(false);
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
      <BreadCrumb title={"Payment-Failed"} />
      {
        loading ?
          <div className="loading-wrapper">
            <CircularProgress/>
          </div>
        :
        
      <Container>
        <div className="thankyou-page-container">
          <div className="left-col">
            <div className="success-head">
              <img
                src={failedImage.src}
                alt="success"
              />
              <h1>Something went wrong!</h1>
            </div>
            <ProductCard
              cardItems={get(singleOrderDetail, 'products', [])}
            />
            <TotalSummary totalSummary={get(singleOrderDetail, 'totalSummary', {})} couponCartDetail={get(singleOrderDetail, 'couponCard', {})} />
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
          </div>
          {/* <OrderDetailAfter orderInfo={singleOrderDetail} /> */}
        </div>
        <div className='btn-wrapper d-flex flex-column align-items-center thankyou' style={{gap: '12px'}}>
          <Link href='/shopcart'>
            <a className="card-btons text-align-center">
              <span className="text-align-center">GO TO CART</span>
            </a>
          </Link>
          <Link href='/'>
            <a className="card-btons text-align-center outline">
              <span className="text-align-center">GO TO HOME</span>
            </a>
          </Link>
        </div>
      </Container>
    }
    </div>
  );
};
export default PaymentFailed;
