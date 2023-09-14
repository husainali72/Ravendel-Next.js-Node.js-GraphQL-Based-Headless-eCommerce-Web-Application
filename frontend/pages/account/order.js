import { useState, useEffect } from "react";
import { Accordion, Container, Col } from "react-bootstrap";
import OrdersDetails from "../../components/account/component/orders-details";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import { GET_CUSTOMER_ORDERS_QUERY } from "../../queries/orderquery";
import client from "../../apollo-client";
import { getSession, useSession } from "next-auth/react";
import { currencySetter, getPrice, query } from "../../utills/helpers";
import { useSelector } from "react-redux";
import { GET_HOMEPAGE_DATA_QUERY } from "../../queries/home";

const Order = () => {
    const { data: session, status } = useSession()
    const cartTotal = (product) => product.reduce((sum, product) => sum + product.cost * product.qty, 0)
    const [customerOrder, setCustomerOrder] = useState([])
    const [loading, setloading] = useState(false)
    const [Session, setSession] = useState({})
    const [decimal, setdecimal] = useState(2)
    const [currency, setCurrency] = useState("$")
    const [currencyStore, setCurrencyStore] = useState({})
    useEffect(() => {
        setdecimal(currencyStore?.currency_options?.number_of_decimals)
        currencySetter(currencyStore, setCurrency);
    }, [currencyStore])
    useEffect(() => {
        const session = getSession();
        session.then(res => setSession(res))
    }, [])
    useEffect(() => {
        getOrderCustomer();
        getSettings()
    }, [Session])
    const handleReOrder = (detail) => {

    }
    const getOrderCustomer = () => {
        var id = ""
        var token = "";
        if (Session?.user?.accessToken?.success) {
            id = Session.user.accessToken.customer._id
            token = Session.user.accessToken.token
        }
        query(GET_CUSTOMER_ORDERS_QUERY, id, token).then((response) => {
            if (response) {
                if (response.data.orderbyUser.data) {
                    const customeradd = response.data.orderbyUser.data
                    setloading(false)
                    setCustomerOrder([...customeradd])
                }
            }
        })

    }

    const getSettings = async () => {
        try {
            const { data: homepagedata } = await client.query({
                query: GET_HOMEPAGE_DATA_QUERY
            })
            const homepageData = homepagedata
            setCurrencyStore(homepageData?.getSettings?.store)
        }
        catch (e) {
            console.log("homepage Error===", e);
        }
    }



    return (
        <div>
            <PageTitle title="Order" />
            <BreadCrumb title={"Order"} />
            {status === "authenticated" ?
                <Container>
                    {customerOrder && customerOrder?.length > 0 ? customerOrder.map((order, index) => (
                        <Accordion style={{ margin: "25px 10px" }} key={index}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <Col>
                                        <strong> Order id : {order.id}</strong>
                                    </Col>
                                    <Col>
                                        <strong>Total : {currency} {getPrice(order.grandTotal, decimal)}</strong>
                                    </Col>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <OrdersDetails
                                        orderDetail={order?.products}
                                        order={order}
                                        billingInfo={order?.billing}
                                        shippingInfo={order?.shipping}
                                        tax={order?.tax_amount}
                                        subtotal={order?.subtotal}
                                        shipping_amount={order?.shipping_amount}
                                        total={order?.grandTotal}
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
export async function getStaticProps() {
    var currencyStore = [];
    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        })
        currencyStore = homepagedata?.getSettings?.store
    }
    catch (e) {
        console.log("homepage Error===", e.networkError && e.networkError.result ? e.networkError.result.errors : '');
    }
    return {
        props: {
            currencyStore
        },
        revalidate: 10
    }
}