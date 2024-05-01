/* eslint-disable no-unused-vars */

import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import OrderDetailAfter from "../../components/account/component/OrderDetailAfter";
import { useRouter } from "next/router";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleOrderAction,
  updatePaymentStatus,
} from "../../redux/actions/orderAction";
import { checkPaymentMethod } from "../../utills/helpers";
const ThankYou = () => {
  const session = useSession();
  const [singleOrderDetail, setSingleOrderDetail] = useState();
  const orderDetail = useSelector((state) => state.order);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
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
      <PageTitle title="Order Status" />
      <BreadCrumb title={"Order Status"} />
      <Container>
        <div className="thankyou-page-container">
          {" "}
          <h1> Your order has been received.</h1>
          <OrderDetailAfter orderInfo={singleOrderDetail} />
        </div>
      </Container>
    </div>
  );
};
export default ThankYou;
