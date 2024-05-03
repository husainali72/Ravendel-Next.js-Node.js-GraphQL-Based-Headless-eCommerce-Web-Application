/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { getFilteredProductsAction } from "../../redux/actions/productAction";
import { ARRAY, CHOICE, LIMIT } from "../../components/categoryFilter/constant";
import SubCategoryProducts from "../../components/category/subCategories";
import Meta from "../../components/Meta";
import ParentCategories from "../../components/category/parentCategories";

const SingleCategoryProduct = () => {
  const productFilterData = useSelector((state) => state.products);
  const [filteredProductData, setFilteredProductData] = useState({});
  const [filterPayload, setFilterPayload] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const { category } = get(router, "query");
    let variable = {
      mainFilter: {
        // categoryId: "63b2b9d81681cb950fbf5b4b",
        categoryId: "63b2b9d81681cb950fbf5b4b",
      },
      pageNo: 1,
      limit: LIMIT,
    };
    setFilterPayload({ ...variable });
  }, [router]);
  useEffect(() => {
    if (get(filterPayload, "mainFilter.categoryId")) {
      dispatch(getFilteredProductsAction(filterPayload));
    }
  }, [filterPayload]);
  useEffect(() => {
    setFilteredProductData({
      ...get(productFilterData, "productFilter", {}),
      isParentNull: false,
    });
  }, [productFilterData]);
  const handleFilter = (filters) => {
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

    // Filter out items where "select" doesn't exist or is empty
    filteredData = filteredData?.filter((item) => {
      if (item && "select" in item) {
        const selectValue = item.select;
        if (Array.isArray(selectValue)) {
          return selectValue.length > 0;
        } else if (typeof selectValue === "object" && selectValue !== null) {
          return Object.keys(selectValue).length > 0;
        }
      }
      return false;
    });

    // Destructure the "data" field from each object
    filteredData = filteredData.map((item) => {
      const { data, ...rest } = item;
      return rest;
    });
    setFilterPayload({ ...filterPayload, filters: filteredData });
  };
  const handleScroll = () => {
    setFilterPayload((prevPayload) => ({
      ...prevPayload,
      pageNo: 1,
      limit: prevPayload?.limit + LIMIT,
    }));
  };
  if (router.isFallback) {
    return <div>loading...</div>;
  }
  return (
    <div>
      {/* <Meta title={singlecategory?.meta?.title} description={singlecategory?.meta?.description} keywords={singlecategory?.meta?.keywords}/> */}
      <PageTitle title={"category"} />
      {filteredProductData?.isParentNull ? (
        <ParentCategories categories={get(filteredProductData, "category")} />
      ) : (
        <SubCategoryProducts
          filteredProductData={filteredProductData}
          handleFilter={handleFilter}
          handleScroll={handleScroll}
        />
      )}
    </div>
  );
};
export default SingleCategoryProduct;
