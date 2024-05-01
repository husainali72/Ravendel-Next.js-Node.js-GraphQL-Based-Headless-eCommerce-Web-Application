import React, { useEffect, useRef, useState } from "react";
import { Col, Accordion } from "react-bootstrap";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import Loading from "../../components/loadingComponent";
import DoneIcon from "@mui/icons-material/Done";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import { GET_CUSTOMER_ORDERS_QUERY } from "../../queries/orderquery";
import { getSession } from "next-auth/react";
import { query } from "../../utills/helpers";
import { Container } from "@mui/material";
import { get } from "lodash";
import Price from "../../components/priceWithCurrency";
import { useReactToPrint } from "react-to-print";
import OrderDetailAfter from "../../components/account/component/OrderDetailAfter";

const TrackMyOrder = () => {
  const componentRef = useRef();
  const [customerOrder, setCustomerOrder] = useState([]);
  const [loading, setloading] = useState(false);
  const [session, setSession] = useState({});
  useEffect(() => {
    const userSession = getSession();
    userSession.then((res) => setSession(res));
  }, []);
  function getOrderCustomer() {
    let id = "";
    const success = get(session, "user.accessToken.success");
    if (success) {
      id = get(session, "user.accessToken.customer._id");
      if (id) {
        let variable = {
          id: id,
        };
        query(GET_CUSTOMER_ORDERS_QUERY, variable).then((response) => {
          if (response) {
            const customeradd = get(response, "data.orderbyUser.data", []);
            setloading(false);
            if (customeradd) {
              setCustomerOrder([...customeradd]);
            }
          }
        });
      }
    }
  }
  const OrderStatus = [
    { name: "inprogress", Title: "Order Confirmed", color: "primary" },
    { name: "shipped", Title: "Order Shipped", color: "primary" },
    { name: "outfordelivery", Title: "Out For Delivery", color: "primary" },
    { name: "delivered", Title: "Delivered", color: "primary" },
  ];

  useEffect(() => {
    const session = getSession();
    session.then((res) => setSession(res));
  }, []);

  useEffect(() => {
    getOrderCustomer();
  }, [session]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const checkstatus = (status) => {
    if (customerOrder.length > 0 && customerOrder[0].shippingStatus === status)
      return "success";
    else return "primary";
  };
  return (
    <div>
      <PageTitle title="Track  My  Order" />
      <BreadCrumb title={"TrackMyOrder"} />
      {loading && <Loading />}
      {customerOrder && customerOrder?.length > 0 ? (
        <>
          <Accordion className="track-order-accourdian">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Col>
                  <strong> Order id : {customerOrder[0]?.id}</strong>
                </Col>
                <Col>
                  <Price price={get(customerOrder, "[0].totalSummary.grandTotal", 0)} />
                </Col>
              </Accordion.Header>
              <Accordion.Body>
                <div ref={componentRef}>
                <OrderDetailAfter orderInfo={customerOrder[0]}/>
                </div>
                <div className="row order-btn-row">
                  <div>
                    <button
                      className="order-details-btn"
                      // onClick={() => handleReOrder(customerOrder[0])}
                    >
                      Reorder
                    </button>
                    <button className="order-details-btn" onClick={handlePrint}>
                      Print Invoices
                    </button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Container>
            <Timeline>
              {OrderStatus.map((status, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color={checkstatus(status.name)}>
                      {checkstatus(status.name) === "success" ? (
                        <DoneIcon fontSize="5px" />
                      ) : null}
                    </TimelineDot>
                    {index < OrderStatus.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>{status.Title}</TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Container>
        </>
      ) : (
        <p className="track-order-no-data">No order found</p>
      )}
    </div>
  );
};

export default TrackMyOrder;
