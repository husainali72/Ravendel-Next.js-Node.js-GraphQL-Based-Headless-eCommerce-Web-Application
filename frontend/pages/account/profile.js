import { useState, useEffect } from 'react';
import client from "../../apollo-client"
import { Accordion, Col } from "react-bootstrap";
import { Container, Tab, Tabs, Card, Button, ListGroup } from 'react-bootstrap';
import AccountSettings from '../../components/account/component/account-setting';
import AddressDetail from '../../components/account/component/address-details';
import OrdersDetails from '../../components/account/component/orders-details';
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import { GET_CUSTOMER_QUERY } from "../../queries/customerquery";
import { GET_CUSTOMER_ORDERS_QUERY } from "../../queries/orderquery"
import { query } from "../../utills/helpers";
import { useRouter } from "next/router";
import { useSession, getSession } from 'next-auth/react';
import { capitalize } from 'lodash';
import { Toaster } from 'react-hot-toast';
const Profile = ({ customeraddres }) => {
    const [ID, setID] = useState("")
    const session = useSession();
    const session2 = getSession();
    session2.then(res => setID(res?.user?.accessToken?.customer?._id))
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    const [isRefreshing, setIsRefreshing] = useState(false);
    const refreshData = () => {
        router.replace(router.asPath);
        setIsRefreshing(true);
    }
    useEffect(() => {
        setIsRefreshing(false);
    }, [customeraddres])

    const [customeraddress, setCustomerAddress] = useState(customeraddres)
    const [customerOrder, setCustomerOrder] = useState({})
    const [ToggleEdit, setToggleEdit] = useState(false)
    var id = ""
    var token = ""

    if (session.status === "authenticated") {
        id = session.data.user.accessToken.customer._id
        token = session.data.user.accessToken.token
    }

    useEffect(() => {
        setCustomerAddress(customeraddres)
        setIsRefreshing(false);
    }, [customeraddres])



    function getcustomer() {
        var id = ""
        var token = "";

        if (session.status === "loading") {
            return <p>Loading...</p>
        }
        if (session.status === "authenticated") {
            id = session.data.user.accessToken.customer._id
            token = session.data.user.accessToken.token
        }
        query(GET_CUSTOMER_QUERY, id, token).then((response) => {
            const customeradd = response.data.customer.data
            setCustomerAddress(customeradd)
            setToggleEdit(false)
        })
    }

    useEffect(() => {
        getcustomer();
    }, [])

    async function getOrderCustomer() {
        var customerorder = [];
        try {
            const { data: ordercustomerDataById } = await client.query({
                query: GET_CUSTOMER_ORDERS_QUERY,
                variables: { userId: id },
            })
            customerorder = ordercustomerDataById.orderbyUser.data
            setCustomerOrder(customerorder)
        }
        catch (e) {
            console.log("order Error", e)
        }

    }

    return (
        <>
            <PageTitle title={"Account"} />
            <BreadCrumb title={"Account"} />
            <Container className="update-detail-container">
                <Toaster />
                {session.status === "authenticated" ?

                    (
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">

                            <Tab className='my-3' eventKey="profile" title="Profile">
                                {ToggleEdit && <AccountSettings
                                    setToggleEdit={setToggleEdit}
                                    accountDetailInfo={customeraddress}
                                    getcustomer={getcustomer}
                                    refreshData={refreshData}
                                    token={token}
                                />}
                                {!ToggleEdit && <Card className='box-shadow w-50 pt-2' >
                                    <ListGroup className='profile-list' variant="flush">
                                        <ListGroup.Item><span><strong>Firstname</strong></span>  <span>{capitalize(customeraddress?.firstName)}</span></ListGroup.Item>
                                        <ListGroup.Item><span><strong> Lastname</strong></span>  <span>{capitalize(customeraddress?.lastName)}</span></ListGroup.Item>
                                        <ListGroup.Item><span><strong>Email</strong></span>  <span>{capitalize(customeraddress?.email)}</span></ListGroup.Item>
                                        <ListGroup.Item><span><strong>Company</strong></span>  <span>{capitalize(customeraddress?.company)}</span></ListGroup.Item>
                                        <ListGroup.Item><span><strong>Phone</strong></span>  <span>{capitalize(customeraddress?.phone)}</span></ListGroup.Item>
                                    </ListGroup>
                                    <Button onClick={() => setToggleEdit(!ToggleEdit)} className='me-0'>Edit User</Button>
                                </Card>}
                            </Tab>
                            <Tab eventKey="orders" title="Orders">
                                {customerOrder && customerOrder?.length > 0 ? customerOrder.map((order, index) => (
                                    <Accordion key={index} style={{ marginBottom: 5 }}>
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
                                                    <strong>Total : {order.grandTotal}</strong>
                                                </Col>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <OrdersDetails
                                                    orderDetail={order}
                                                    billingInfo={order.billing}
                                                    shippingInfo={order.shipping}
                                                    tax={order.taxAmount}
                                                    subtotal={order.subtotal}
                                                    shippingAmount={order.shippingAmount}
                                                    total={order.grandTotal}

                                                />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                )) : null}

                            </Tab>
                            <Tab eventKey="address" title="Address">
                                {/* <Link href={`/account/${customeraddress?.id}`}>
                                    <Button>edit</Button>
                                </Link> */}

                                <AddressDetail
                                    addressDetail={customeraddress}
                                    address={customeraddress}
                                    getcustomer={getcustomer}
                                    refreshData={refreshData}
                                    token={token}
                                />
                            </Tab>
                            <Tab eventKey="recent-view" title="Recent Views">
                                <h1>this is information about contact</h1>
                            </Tab>
                        </Tabs>
                    )

                    : <h1>Please login account</h1>}
            </Container>
        </>

    )
}
export default Profile;

export async function getServerSideProps(context) {
    const session = await getSession(context)

    var id = session?.user?.accessToken.customer._id

    var customeraddres = [];
    if (session !== null) {

        /* ================================= GET_CUSTOMER DETAILS ================================= */

        try {
            const { data: customerssdata } = await client.query({
                query: GET_CUSTOMER_QUERY,
                variables: { id },
            })
            customeraddres = customerssdata.customer.data
        }
        catch (e) {
            console.log("customer Error===", e);
        }
    }

    return {
        props: {
            customeraddres
        }
    }
}
