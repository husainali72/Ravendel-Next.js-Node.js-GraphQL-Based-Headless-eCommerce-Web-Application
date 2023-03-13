
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import OrdersDetails from "../../components/account/component/orders-details";
import { useState, useEffect } from "react";
import { query } from "../../utills/helpers";
import { GET_CUSTOMER_ORDERS_QUERY } from "../../queries/orderquery";
import { useSession } from "next-auth/react";
import { query2 } from "../../utills/cartHelperfun";
import client from "../../apollo-client";
import OrderDetailAfter from "../../components/account/component/OrderDetailAfter";
import CheckOut from "../checkout";
import { settingActionCreator } from "../../redux/actions/settingAction";
import { GET_HOMEPAGE_DATA_QUERY } from "../../queries/home";
const ThankYou = ({ currencyStore }) => {
    const dispatch = useDispatch();
    const checkoutDetail = useSelector(state => state.checkout)
    const [showOrderDetail, setShowOrderDetail] = useState(false)
    const [rderD, setOrderData] = useState("")
    const session = useSession();
    const [Data, setData] = useState()
    useEffect(() => {
        dispatch(settingActionCreator(currencyStore.currency_options))
    }, [currencyStore?.currency_options])
    useEffect(() => {
        if (session.status === "authenticated") {
            const ID = session?.data?.user?.accessToken?.customer?._id
            const token = session?.data?.user?.accessToken?.token
            query(GET_CUSTOMER_ORDERS_QUERY, ID, token).then((res) => {
                console.log(res)
                setData(res?.data?.orderbyUser?.data?.[0])
            })

        }
    }, [session?.status])
    return (
        <div>
            <PageTitle title="Order Status" />
            <BreadCrumb title={"Order Status"} />

            <Container>
                <div className="thankyou-page-container"> <h1> Your order has been received.</h1>
                    <OrderDetailAfter Data={Data} />
                </div>
            </Container>
        </div>
    )
}
export default ThankYou;

export async function getStaticProps(context) {
    let currencyStore = [];
    let homepageData = [];
    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        })
        homepageData = homepagedata

        currencyStore = homepagedata?.getSettings?.store
    }
    catch (e) {
        console.log("homepage Error===", e);
    }

    return {
        props: {
            homepageData,
            currencyStore
        }
    }
}