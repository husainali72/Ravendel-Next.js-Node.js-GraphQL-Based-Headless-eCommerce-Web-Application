import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    Card, Row, Col, Button, Container, Tabs, Tab, OverlayTrigger, Tooltip, ListGroup
} from "react-bootstrap";
import { UPDATE_CUSTOMER, GET_CUSTOMER_QUERY, GET_CUSTOMERS, DELETE_ADDRESSBOOK } from "../../queries/customerquery";
import client from "../../apollo-client";

import { useRouter } from "next/router";
import { query, mutation, logoutAndClearData } from "../../utills/helpers";
import AddressDetail from "../../components/account/component/address-details"
import OrdersDetails from "../../components/account/component/orders-details"
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { get } from "lodash";

var accountDetailObject = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    phone: "",
}
const MyWishList = ({ id, customeraddres }) => {
    const session = useSession();
    const dispatch=useDispatch()
    const [isRefreshing, setIsRefreshing] = useState(false);
    const refreshData = () => {
        router.replace(router.asPath);
        setIsRefreshing(true);
    }
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    var token = ""
    if (session.status === "authenticated") {
        token = session.data.user.accessToken.token
    }
    const [accountDetails, setAccountDetails] = useState(accountDetailObject)
    const [accountAddress, setAccountAddress] = useState([])
    const [Address, setAddress] = useState([])
    useEffect(() => {
        setAccountDetails(customeraddres)
        setAccountAddress(customeraddres)
        let variable={
            id:id
        }
        query(GET_CUSTOMER_QUERY, variable).then((response) => {
            const customeradd = response.data.customer.data
        })

    }, [])
    useEffect(() => {
        setIsRefreshing(false);
    }, [customeraddres])

    const updateAccountDetail = (e) => {
        e?.preventDefault();
        mutation(UPDATE_CUSTOMER, accountDetails).then(async (response) => {
            if (response.data.updateCustomer.success) {
                let id = "622ae63d3aa0f0f63835ef8e"
                let variable={id:id}
                query(GET_CUSTOMER_QUERY, variable).then((response) => {
                    const customeradd = get(response,'data.customer.data')
                })
                refreshData()
            }
        }).catch((error)=>{
            if(get(error,'extensions.code')===401){
                logoutAndClearData(dispatch)
              }
        })
    }
    return (
        <>
            <BreadCrumb title={"my wishlist"} />
            <Container>
                <form onSubmit={updateAccountDetail}>
                    <Row>
                        <Col>
                            <input
                                type="text"
                                name="firstname"
                                label="firstname"
                                placeholder="First name *"
                                value={accountDetails.firstName || ''}
                                onChange={(e) => setAccountDetails({ ...accountDetails, firstName: e.target.value })}
                                className="update-account-details-input"
                            />
                        </Col>
                        <Col>
                            <input
                                type="text"
                                name="lastname"
                                label="lastname"
                                placeholder="Last name *"
                                value={accountDetails.lastName || ""}
                                onChange={(e) => setAccountDetails({ ...accountDetails, lastName: e.target.value })}
                                className="update-account-details-input"
                            />
                        </Col>
                        <Col>
                            <input
                                type="text"
                                name="company"
                                label="company"
                                placeholder="Company*"
                                value={accountDetails.company || ""}
                                onChange={(e) => setAccountDetails({ ...accountDetails, company: e.target.value })}
                                className="update-account-details-input"
                            />
                        </Col>
                        <Col>
                            <input
                                type="text"
                                name="phone"
                                label="phone"
                                placeholder="Phone *"
                                value={accountDetails.phone || ""}
                                onChange={(e) => setAccountDetails({ ...accountDetails, phone: e.target.value })}
                                className="update-account-details-input"
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "25px" }}>
                        <Col>
                            <input
                                type="text"
                                name="email"
                                label="email"
                                placeholder="Email *"
                                value={accountDetails.email}
                                onChange={(e) => setAccountDetails({ ...accountDetails, email: e.target.value })}
                                className="update-account-details-input"
                                disabled
                            />
                        </Col>
                        <Col>
                            <input
                                type="password"
                                name="password"
                                label="password"
                                placeholder="Password *"
                                value={accountDetails.password}
                                onChange={(e) => setAccountDetails({ ...accountDetails, password: e.target.value })}
                                className="update-account-details-input"
                            />
                        </Col>
                        <Col>
                            <input
                                type="password"
                                name="confirmPassword"
                                label="confirmPassword"
                                placeholder="Confirm Password *"
                                value={accountDetails.confirmPassword || ""}
                                onChange={(e) => setAccountDetails({ ...accountDetails, password: e.target.value })}
                                className="update-account-details-input"
                            />
                        </Col>
                        <Col>
                            <input
                                type="password"
                                name="currentpassword"
                                label="currentpassword"
                                placeholder="Current Password *"
                                value={accountDetails.currentpassword || ""}
                                onChange={(e) => setAccountDetails({ ...accountDetails, password: e.target.value })}
                                className="update-account-details-input"
                            />
                        </Col>
                    </Row>
                    <div className="account-details-button">
                        <Button type="submit" variant="outline-info">UPDATE DETAILS</Button>{' '}
                    </div>
                </form>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="profile" title="Profile">
                        {/* <AccountSettings
                            accountDetailInfo={accountDetails}
                            token={token}
                            refreshData={refreshData}
                        /> */}
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>firstname :{customeraddres?.firstName}</ListGroup.Item>
                                <ListGroup.Item> lastname :{customeraddres?.lastName}</ListGroup.Item>
                                <ListGroup.Item>email : {customeraddres?.email}</ListGroup.Item>
                                <ListGroup.Item>company : {customeraddres?.company}</ListGroup.Item>
                                <ListGroup.Item>phone: {customeraddres?.phone}</ListGroup.Item>
                            </ListGroup>
                            <Link href={`/account/${customeraddres?.id}`}>
                                <Button>edit</Button>
                            </Link>

                        </Card>
                    </Tab>
                    <Tab eventKey="orders" title="Orders">
                        <OrdersDetails />
                    </Tab>
                    <Tab eventKey="address" title="Address">
                        <AddressDetail
                            addressDetail={accountAddress}
                            address={accountAddress}
                            token={token}
                            refreshData={refreshData}
                        />
                    </Tab>
                    <Tab eventKey="recent-view" title="Recent Views">
                        <h1>this is information about contact</h1>
                    </Tab>
                </Tabs>
            </Container>
        </>
    )
}
export default MyWishList;

export async function getStaticPaths() {
    var AllCustomerData = {};

    try {
        const { data: blogdata } = await client.query({
            query: GET_CUSTOMERS
        });
        AllCustomerData = blogdata
    }
    catch (e) {
        console.log("Blog Error=======", e.networkError);

    }
    if (!AllCustomerData?.customers || AllCustomerData?.customers?.length === 0) {
        // Handle the case when filterProducts is undefined or empty
        return {
          paths: [],
          fallback: false,
        };
      }
    const paths = AllCustomerData.customers.data.map((curElem) => ({
        params: { mywishlist: curElem.id.toString() }

    }))
    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps({ params }) {
    const id = params.mywishlist
    var customeraddres = [];
    try {
        const { data: singleBlogData } = await client.query({
            query: GET_CUSTOMER_QUERY,
            variables: { id },
        })
        customeraddres = singleBlogData.customer.data
    }
    catch (e) {
        console.log("Bolg SinglePage ERROR==", e)
    }
    if (!customeraddres?.length < 1) {
        return {
            redirect: {
                destination: "/account/profile",
                permanent: false,
            }
        }
    }
    return {
        props: {
            customeraddres,
        },
        revalidate: 1,
    }
}