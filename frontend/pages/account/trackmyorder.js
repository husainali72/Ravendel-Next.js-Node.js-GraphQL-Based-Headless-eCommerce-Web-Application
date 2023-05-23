import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import { GET_CUSTOMER_ORDERS_QUERY } from "../../queries/orderquery";
import { getSession } from 'next-auth/react';
import { query } from "../../utills/helpers";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import DoneIcon from '@mui/icons-material/Done';
const TrackMyOrder = () => {
    const [customerOrder, setCustomerOrder] = useState([])
    const [loading, setloading] = useState(false)
    const [Session, setSession] = useState({})
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
        if (customerOrder.length > 0 && customerOrder[0].shipping_status === status) return 'success'
        else return 'primary'
    }
    return (
        <div>
            <PageTitle title="Track  My  Order" />
            <BreadCrumb title={"TrackMyOrder"} />
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
        </div >
    )
}
export default TrackMyOrder;


