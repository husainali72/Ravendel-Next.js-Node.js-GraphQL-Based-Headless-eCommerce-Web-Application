/* eslint-disable no-unused-vars */

import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { query } from "../../utills/helpers";
import { GET_CUSTOMER_ORDERS_QUERY } from "../../queries/orderquery";
import { useSession } from "next-auth/react";
import client from "../../apollo-client";
import OrderDetailAfter from "../../components/account/component/OrderDetailAfter";
import { settingActionCreator } from "../../redux/actions/settingAction";
import { GET_HOMEPAGE_DATA_QUERY } from "../../queries/home";
const ThankYou = () => {
    const session = useSession();
    const [data, setData] = useState()
    useEffect(() => {
        if (session.status === "authenticated") {
            const id = session?.data?.user?.accessToken?.customer?._id
            const token = session?.data?.user?.accessToken?.token
            let variable={
                id:id
            }
            query(GET_CUSTOMER_ORDERS_QUERY, variable).then((res) => {
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
                    <OrderDetailAfter orderInfo={data} />
                </div>
            </Container>
        </div>
    )
}
export default ThankYou;

