import { useState, useEffect } from "react";
import { Accordion, Container, Col } from "react-bootstrap";
import OrdersDetails from "../../components/account/component/orders-details";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import { GET_CUSTOMER_ORDERS_QUERY } from "../../queries/orderquery";
import client from "../../apollo-client";
import { getSession, useSession } from "next-auth/react";

const Order = (customerorder) => {
    const { data: session, status } = useSession()
    const cartTotal = (product) => product.reduce((sum, product) => sum + product.cost * product.qty, 0)
    const [allOrder, setAllOrder] = useState([])
    useEffect(() => {
        setAllOrder(customerorder.customerorder || [])
    }, [customerorder])
    // console.log("allOrder", allOrder)

    const handleReOrder = (detail) => {
        console.log("order", detail)
    }
    return (
        <div>
            <PageTitle title="Order" />
            <BreadCrumb title={"Order"} />
            {status === "authenticated" ?
                <Container>
                    {allOrder && allOrder?.length > 0 ? [...allOrder].reverse().map((order, index) => (
                        <Accordion style={{ margin: "25px 10px" }} key={index}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <Col>
                                        <strong> Order id : {order.id}</strong>
                                    </Col>
                                    <Col>
                                        {order.products.map((name, i) => (
                                            <strong>{name.name}</strong>)
                                        )}
                                    </Col>
                                    <Col>
                                        <strong>Total : {order.grand_total}</strong>
                                    </Col>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <OrdersDetails
                                        orderDetail={order.products}
                                        billingInfo={order.billing}
                                        shippingInfo={order.shipping}
                                        tax={order.tax_amount}
                                        subtotal={order.subtotal}
                                        shipping_amount={order.shipping_amount}
                                        total={order.grand_total}
                                    />
                                    <div className="row order-btn-row">
                                        <div>
                                            <button className="order-details-btn" onClick={() => handleReOrder(order)}>Reorder</button>
                                            <button className="order-details-btn" onClick={() => window.print()}>Print Invoices</button>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )) : null}

                </Container>
                : <Container>Please Login Account</Container>
            }

        </div>
    )
}
export default Order;

export async function getServerSideProps(context) {
    var customerorder = [];
    const session = await getSession(context)
    // console.log("session", session);
    let user_id = session?.user?.accessToken?.customer._id
    // console.log("orderGet", user_id)
    try {
        const { data: ordercustomerDataById } = await client.query({
            query: GET_CUSTOMER_ORDERS_QUERY,
            variables: { user_id: user_id },
        })
        customerorder = ordercustomerDataById.orderbyUser.data
    }
    catch (e) {
        console.log("order Error", e)
    }
    // console.log("order", customerorder)
    return {
        props: {
            customerorder,
        }
    }
}

