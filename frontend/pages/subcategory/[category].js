/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";

import { Container, Form } from "react-bootstrap";
import OnSaleProductCard from "../../components/category/onSaleProductCard";
import {
  GET_SINGLE_PRODUCT,
  GET_FILTEREDPRODUCTS,
  GET_BRANDS_QUERY,
} from "../../queries/shopquery";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { getFilteredProductsAction } from "../../redux/actions/productAction";
import CategoryFilter from "../../components/categoryFilter/categoryFilter";
import SubCategoryList from "../../components/categoryFilter/component/subcategoryList";
import { ARRAY, CHOICE, LIMIT, RANGE } from "../../components/categoryFilter/constant";
import InfiniteScroll from "react-infinite-scroll-component";

const SingleCategoryProduct = () => {
  const productFilterData = useSelector((state) => state.products);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [filterPayload, setFilterPayload] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    let variable = {
      mainFilter: {
        categoryId: "63b2b9d81681cb950fbf5b4b",
        //beauty
        // categoryId: "662634f23992addb963e9f98",
      },

      pageNo: 1,
      limit: LIMIT,
    };
    setFilterPayload({ ...variable });
  }, []);
  useEffect(() => {
    if (get(filterPayload, "mainFilter.categoryId")) {
      dispatch(getFilteredProductsAction(filterPayload));
    }
  }, [filterPayload]);
  useEffect(() => {
    setFilteredProductData({ ...get(productFilterData, "productFilter", {}) });
  }, [productFilterData]);
  const handleFilter = (filters) => {
    console.log(filters, "=========filters");
    let selectedData = [];
    let filteredData = filters?.map((item) => {
      switch (item?.type) {
        case ARRAY:
          get(item, "data", [])?.map((data) => {
            if (data?.select) {
              selectedData.push(data?.value);
            }
          });
          return { ...item, select: selectedData };
        case CHOICE:
          selectedData = {};
          get(item, "data", [])?.map((data) => {
            if (data?.select) {
              selectedData = {
                minValue: data?.value,
              };
            }
          });
          return { ...item, select: selectedData };
          default:
            return item;
      }
    });
    filteredData = filteredData?.filter((item) => {
      if ("select" in item) {
        const selectValue = item.select;
        if (Array.isArray(selectValue)) {
          return selectValue.length > 0;
        } else if (typeof selectValue === "object" && selectValue !== null) {
          return Object.keys(selectValue).length > 0;
        }
      }
      return false; // Filter out items where "select" doesn't exist or is empty
    });
    setFilterPayload({ ...filterPayload, filters: filteredData });
  };
  const handleScroll = () => {
    setFilterPayload((prevPayload) => ({
      ...prevPayload,
      pageNo: 1, // Increment the page number
      limit: prevPayload?.limit + LIMIT, // Load 20 more items
    }));
  };
  if (router.isFallback) {
    return <div>loading...</div>;
  }
  return (
    <div>
      {/* <Head>
        {singlecategory &&
        singlecategory?.meta &&
        singlecategory?.meta?.title ? (
          <title>
            {capitalize(singlecategory?.meta?.title) + " | Ravendel"}
          </title>
        ) : null}
        {singlecategory &&
        singlecategory?.meta &&
        singlecategory?.meta?.description ? (
          <meta
            name="description"
            content={singlecategory?.meta?.description}
          />
        ) : null}
        {singlecategory &&
        singlecategory?.meta &&
        singlecategory?.meta?.keywords ? (
          <meta name="keywords" content={singlecategory?.meta?.keywords} />
        ) : null}
      </Head> */}
      <PageTitle title={"category"} />
      {/* <CategoryBreadCrumb breadCrumbs={breadCrumb} /> */}
      <section className="product-cart-section">
        <Container>
          <div className="single-category-page">
            <div className="category-option">
              <SubCategoryList
                categories={get(filteredProductData, "category", [])}
                name={"Category"}
              />
              {get(filteredProductData, "filterData", [])?.length > 0 && (
                <div className="primary-sidebar sticky-sidebar category-shop-cart my-3">
                  <div className="theiaStickySidebar category-box-filler">
                    <CategoryFilter
                      filterCategoryData={get(
                        filteredProductData,
                        "filterData",
                        []
                      )}
                      handleFilter={(data) => handleFilter(data)}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="shop-product-container ">
              {get(filteredProductData, "productData.products")?.length > 0 ? (
                <div className="shop-product-list ">
                  <div className="totall-product ">
                    <p className="totalcount-text">
                      Showing 1 –{" "}
                      {get(filteredProductData, "productData.products")?.length}{" "}
                      products of{" "}
                      {get(filteredProductData, "productData.count")} products
                    </p>
                  </div>
                  <InfiniteScroll
                    dataLength={get(
                      filteredProductData,
                      "productData.products.length"
                    )}
                    next={handleScroll}
                    hasMore={
                      get(filteredProductData, "productData.products.length") <
                      get(filteredProductData, "productData.count")
                    }
                    scrollableTarget="scrollableDiv" // Specify the scrollable target ID
                    endMessage={<p>No more items to load</p>}
                    loader={<p>Loading...</p>}
                  >
                    <OnSaleProductCard
                      onSaleProduct={get(
                        filteredProductData,
                        "productData.products"
                      )}
                      hideTitle
                    />
                  </InfiniteScroll>
                </div>
              ) : (
                <div style={{ padding: "50px" }}>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    No Data Found
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
export default SingleCategoryProduct;
export async function getServerSideProps({ params }) {
  const url = params.category;
  var singlecategory = [];
  var brandProduct = [];
  var shopProduct = [];

  /* ===============================================Get Brand Data Settings ===============================================*/

  try {
    const { data: brandproductData } = await client.query({
      query: GET_BRANDS_QUERY,
    });
    brandProduct = get(brandproductData, "brands.data", []);
  } catch (e) {}
  return {
    props: {
      singlecategory,
      url,
      brandProduct,
      shopProduct,
    },
  };
}
