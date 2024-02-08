import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    Card, Row, Col, Button, Container, Tabs, Tab, OverlayTrigger, Tooltip, ListGroup
} from "react-bootstrap";
import { UPDATE_CUSTOMER, GET_CUSTOMER_QUERY, GET_CUSTOMERS, DELETE_ADDRESSBOOK } from "../../queries/customerquery";
import client from "../../apollo-client";

import { useRouter } from "next/router";
import { query, mutation } from "../../utills/helpers";
// import { useSession } from "next-auth/react";
import AccountSettings from "../../components/account/component/account-setting"
import AddressDetail from "../../components/account/component/address-details"
import OrdersDetails from "../../components/account/component/orders-details"
import { getSession, useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import OnSaleProductCard from "../../components/category/onSaleProductCard";

var accountDetailObject = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    phone: "",
}
const MyWishList1 = ({ id, customeraddres }) => {
    const session = useSession();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const products = [
        {
            id: 1,
            name: 'Product 1',
            description: 'This is the description for Product 1.',
            price: 29.99,
            feature_image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-ai-image%2Fplace-product-background-ecommerce-product-background_47974658.htm&psig=AOvVaw0II-Ere_Gd-FKsZAJUokD0&ust=1707467959647000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIih2furm4QDFQAAAAAdAAAAABAD', // Placeholder image
            category: 'Electronics',
          },
          {
            id: 2,
            name: 'Product 2',
            description: 'This is the description for Product 2.',
            price: 49.99,
            feature_image: 'https://placekitten.com/200/301',
            category: 'Clothing',
          },
          {
            id: 3,
            name: 'Product 3',
            description: 'This is the description for Product 3.',
            price: 19.99,
            feature_image: 'https://placekitten.com/201/300',
            category: 'Home',
          },
      ];
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
   
    useEffect(() => {
        

    }, [])
    useEffect(() => {
        setIsRefreshing(false);
    }, [customeraddres])

    const removeProductFromWishList = (e) => {
        e.stopPropagation();
    }
    return (
        <>
            <BreadCrumb title={"my wishlist"} />
            <Container>
            <OnSaleProductCard onSaleProduct={products}  hidetitle showRemoveButton={true} removeButton={removeProductFromWishList}/>
            </Container>
        </>
    )
}
export default MyWishList1;

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
    // console.log("params", params)
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
    // console.log("customeraddres", customeraddres)
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