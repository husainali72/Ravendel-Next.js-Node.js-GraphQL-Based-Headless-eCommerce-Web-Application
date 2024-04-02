/* eslint-disable no-unused-vars */
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import { Container } from "react-bootstrap";
import { GET_CUSTOMER_QUERY, GET_CUSTOMERS } from "../../queries/customerquery";
import client from "../../apollo-client";
import { useRouter } from "next/router";
import OnSaleProductCard from "../../components/category/onSaleProductCard";
import products from "./dummy.json";
import { get } from "lodash";
const MyWishList = () => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }


  const removeProductFromWishList = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <BreadCrumb title={"my wishlist"} />
      <Container>
        <OnSaleProductCard
          onSaleProduct={products}
          hidetitle
          showRemoveButton={true}
          removeButton={removeProductFromWishList}
        />
      </Container>
    </>
  );
};

export default MyWishList;

export async function getStaticPaths() {
  var AllCustomerData = {};

  // try {
  //   const { data: blogdata } = await client.query({
  //     query: GET_CUSTOMERS,
  //   });
  //   AllCustomerData = blogdata;
  // } catch (e) {
  //   console.log("Blog Error=======", e.networkError);
  // }
  if (!AllCustomerData?.customers || AllCustomerData?.customers?.length === 0) {
    // Handle the case when filterProducts is undefined or empty
    return {
      paths: [],
      fallback: false,
    };
  }
  const paths = AllCustomerData.customers.data.map((curElem) => ({
    params: { mywishlist: curElem.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const id = params.mywishlist;
  var customeraddres = [];
  try {
    const { data: singleBlogData } = await client.query({
      query: GET_CUSTOMER_QUERY,
      variables: { id },
    });
    customeraddres = get(singleBlogData,'customer.data',[]);
  } catch (e) {
    console.log("Bolg SinglePage ERROR==", e);
  }
  if (!customeraddres?.length < 1) {

    return {
      redirect: {
        destination: "/account/profile",
        permanent: false,
      },
    };
  }
  return {
    props: {
      customeraddres,
    },
    revalidate: 1,
  };
}