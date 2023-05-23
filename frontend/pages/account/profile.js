import { useState, useEffect } from 'react';
import client from "../../apollo-client"
import { Accordion, Col } from "react-bootstrap";
import { Container, Tab, Tabs, Card, Button, ListGroup } from 'react-bootstrap';
import AccountSettings from '../../components/account/component/account-setting';
import AddressDetail from '../../components/account/component/address-details';
import OrdersDetails from '../../components/account/component/orders-details';
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import { useSelector } from 'react-redux';
import Link from "next/link";
import { GET_CUSTOMERS, GET_CUSTOMER_QUERY, GET_ORDER_BY_CUSTOMER, } from "../../queries/customerquery";
import { GET_CUSTOMER_ORDERS_QUERY } from "../../queries/orderquery"
import { GET_CART_ITEM_QUERY } from "../../queries/cartquery";
import { query, mutation } from "../../utills/helpers";
import { useRouter } from "next/router";
import { useSession, getSession } from 'next-auth/react';
import { capitalize } from 'lodash';


const Profile = ({ customeraddres }) => {
    const [ID,setID] = useState("")
    const session = useSession();
    const session2 = getSession();
    session2.then(res => setID(res.user.accessToken.customer._id))
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
        // getcustomer()
        setCustomerAddress(customeraddres)
        setIsRefreshing(false);
    }, [customeraddres])

    useEffect(() => {
        const getCustomerAddress = async () =>{
            try {
                const { data: customerssdata } = await client.query({
                    query: GET_CUSTOMER_QUERY,
                    variables: { ID },
                })
                setCustomerAddress(customerssdata.customer.data) 
            }
            catch (e) {
                console.log("customer Error===", e);
            }
        }
        getCustomerAddress();
    }, [])
    

    // useEffect(() => {
    //     // const id = data.user.accessToken.customer._id
    //     getcustomer()
    //     setIsRefreshing(false);
    // }, [])

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
        })
    }

    useEffect(() => {
        getOrderCustomer();
    }, [])

    async function getOrderCustomer() {
        var customerorder = [];

        try {
            const { data: ordercustomerDataById } = await client.query({
                query: GET_CUSTOMER_ORDERS_QUERY,
                variables: { user_id: id },
            })
            customerorder = ordercustomerDataById.orderbyUser.data
            // setCustomerAddress(customerorder)
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

                {/* {customer.login ? ( */}
                {session.status === "authenticated" ?
                    (
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                            <Tab className='my-3' eventKey="profile" title="Profile">
                                {/* <Link href={`/account/${customeraddress?.id}`}>
                                    <Button>edit</Button>
                                </Link> */}
                                {ToggleEdit && <AccountSettings
                                    setToggleEdit={setToggleEdit}
                                    accountDetailInfo={customeraddress}
                                    getcustomer={getcustomer}
                                    refreshData={refreshData}
                                    token={token}
                                />}
                                {!ToggleEdit && <Card className='box-shadow w-50 pt-2' >
                                    <ListGroup className='profile-list' variant="flush">
                                        <ListGroup.Item><span><strong>Firstname</strong></span>  <span>{capitalize(customeraddress?.first_name)}</span></ListGroup.Item>
                                        <ListGroup.Item><span><strong> Lastname</strong></span>  <span>{capitalize(customeraddress?.last_name)}</span></ListGroup.Item>
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

    // console.log("session", session)
    // var id = ""

    var id = session?.user?.accessToken?.customer?._id

    // var customers = [];
    var customeraddres = [];
    if(session !== null){

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
