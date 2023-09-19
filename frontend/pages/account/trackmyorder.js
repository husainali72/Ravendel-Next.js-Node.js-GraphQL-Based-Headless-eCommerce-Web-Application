
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import { GET_CUSTOMER_ORDERS_QUERY } from "../../queries/orderquery";
import { getSession } from 'next-auth/react';
import { getPrice, query } from "../../utills/helpers";
import { Accordion, Container, Col } from "react-bootstrap";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import DoneIcon from '@mui/icons-material/Done';
import OrdersDetails from "../../components/account/component/orders-details";
import client from "../../apollo-client";
import { GET_HOMEPAGE_DATA_QUERY } from "../../queries/home";
const TrackMyOrder = () => {
    const [customerOrder, setCustomerOrder] = useState([])
    const [loading, setloading] = useState(false)
    const [Session, setSession] = useState({})
    const [decimal, setdecimal] = useState(2)
    const [currencyStore, setCurrencyStore] = useState({})
    const [currency, setCurrency] = useState("$")
    const OrderStatus = [
        { name: 'inprogress', Title: 'Order Confirmed', color: 'primary' },
        { name: 'shipped', Title: 'Order Shipped', color: 'primary' },
        { name: 'outfordelivery', Title: 'Out For Delivery', color: 'primary' },
        { name: 'delivered', Title: 'Delivered', color: 'primary' }
    ]
    useEffect(() => {
        const session = getSession();
        session.then(res => setSession(res))
    }, [])
    useEffect(() => {
        getOrderCustomer();
        getSettings()
    }, [Session])
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
    useEffect(() => {
        getOrderCustomer();
    }, [Session])
    function getOrderCustomer() {
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
    const checkstatus = (status) => {
        if (customerOrder.length > 0 && customerOrder[0].shippingStatus === status) return 'success'
        else return 'primary'
    }
    return (
        <div>
            <PageTitle title="Track  My  Order" />
            <BreadCrumb title={"TrackMyOrder"} />

            {customerOrder && customerOrder?.length > 0 ? (<>
                <Accordion style={{ margin: "25px 10px" }} >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <Col>
                                <strong> Order id : {customerOrder[0]?.id}</strong>
                            </Col>
                            <Col>
                                <strong>Total : {currency} {getPrice(customerOrder[0]?.grandTotal, decimal)}</strong>
                            </Col>
                        </Accordion.Header>
                        <Accordion.Body>
                            <OrdersDetails
                                orderDetail={customerOrder[0]?.products}
                                order={customerOrder[0]}
                                billingInfo={customerOrder[0]?.billing}
                                shippingInfo={customerOrder[0]?.shipping}
                                tax={customerOrder[0]?.taxAmount}
                                subtotal={customerOrder[0]?.subtotal}
                                shippingAmount={customerOrder[0]?.shippingAmount}
                                total={customerOrder[0]?.grandTotal}
                            />
                            <div className="row order-btn-row">
                                <div>
                                    <button className="order-details-btn" onClick={() => handleReOrder(customerOrder[0])}>Reorder</button>
                                    <button className="order-details-btn" onClick={() => window.print()}>Print Invoices</button>
                                </div>

                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Container>
                    {OrderStatus.map((status) => {
                        return <Timeline>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color={checkstatus(status.name)} >{checkstatus(status.name) === 'success' ? <DoneIcon /> : null}</TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>{status.Title}</TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    })}
                </Container>
            </>) : <h3 style={{ textAlign: 'center' }}>No order found</h3>}
        </div >


    )
}
export default TrackMyOrder;


