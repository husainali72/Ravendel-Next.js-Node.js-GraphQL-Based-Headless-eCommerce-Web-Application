/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Accordion, Container, Col } from "react-bootstrap";
import OrdersDetails from "../../components/account/component/orders-details";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import { GET_CUSTOMER_ORDERS_QUERY } from "../../queries/orderquery";
import { getSession, useSession } from "next-auth/react";
import {
  query,
} from "../../utills/helpers";
import { get } from "lodash";
import Price from "../../components/priceWithCurrency";
import OrderDetailAfter from "../../components/account/component/OrderDetailAfter";

const Order = () => {
  const { status } = useSession();
  const [customerOrder, setCustomerOrder] = useState([]);
  const [loading, setloading] = useState(false);
  const [session, setSession] = useState({});
  useEffect(() => {
    const userSession = getSession();
    userSession.then((res) => setSession(res));
  }, []);
  useEffect(() => {
    getOrderCustomer();
  }, [session]);
  const handleReOrder = (detail) => {};
  const getOrderCustomer = () => {
    var id = "";
    var token = "";
    let success = get(session, "user.accessToken.success");
    if (success) {
      id = get(session, "user.accessToken.customer._id");
      token = get(session, "user.accessToken.token");
    }
    let variable = {
      id: id,
    };
    query(GET_CUSTOMER_ORDERS_QUERY, variable, token).then((response) => {
      if (response) {
        if (response.data.orderbyUser.data) {
          const customeradd = get(response, "data.orderbyUser.data", []);
          setloading(false);
          setCustomerOrder([...customeradd]);
        }
      }
    });
  };

  return (
    <div>
      <PageTitle title="Order" />
      <BreadCrumb title={"Order"} />
      {status === "authenticated" ? (
        <Container>
          {customerOrder && customerOrder?.length > 0
            ? customerOrder?.map((order, index) => (
                <Accordion className="accordian-container" key={index}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <Col>
                        <strong> Order id : {get(order, "id", "")}</strong>
                      </Col>
                      <Col>
                        <strong>
                          Total :{" "}
                          <Price price={get(order, "totalSummary.grandTotal", 0)}/>
                         {" "}
                        </strong>
                      </Col>
                    </Accordion.Header>
                    <Accordion.Body>
                      <OrderDetailAfter orderInfo={order}/>
                      <div className="row order-btn-row">
                        <div>
                          <button
                            className="order-details-btn"
                            onClick={() => handleReOrder(order)}
                          >
                            Reorder
                          </button>
                          <button
                            className="order-details-btn"
                            onClick={() => window.print()}
                          >
                            Print Invoices
                          </button>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))
            : null}
        </Container>
      ) : (
        <Container>Please Login Account</Container>
      )}
    </div>
  );
};
export default Order;