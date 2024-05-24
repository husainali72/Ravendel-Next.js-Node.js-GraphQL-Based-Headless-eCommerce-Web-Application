import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { getFilteredProductsAction } from "../../redux/actions/productAction";
import { ARRAY, CHOICE, LIMIT } from "../../components/categoryFilter/constant";
import SubCategoryProducts from "../../components/category/subCategories";
import ParentCategories from "../../components/category/parentCategories";
import { clearAllFilter } from "../../components/categoryFilter/component/urlFilter";
import PageLoader from "../../components/PageLoader";
import Meta from "../../components/Meta";

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
        categoryUrl: category,
      },
      pageNo: 1,
      limit: LIMIT,
    };
    setFilterPayload({ ...variable });
  }, [router]);
  const getCategoryData = async() => {
    if (get(filterPayload, "mainFilter.categoryUrl")) {
      await dispatch(getFilteredProductsAction(filterPayload));
    }
  }
  useEffect(() => {
    getCategoryData();
  }, [filterPayload]);
  useEffect(() => {
    setFilteredProductData({
      ...get(productFilterData, "productFilter", {}),
    });
  }, [productFilterData]);
  const handleFilter = (filters) => {
    let selectedData = [];
    let filteredData = filters?.map((item) => {
      switch (item?.type) {
        case ARRAY:
          selectedData = [];
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
    filteredData = filteredData?.map((item) => {
      const { ...rest } = item;
      return rest;
    });
    setFilterPayload({ ...filterPayload, filters: filteredData });
  };
  const handleSorting = (sortingPayload) => {
    setFilterPayload({ ...filterPayload, sort: sortingPayload });
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
  const clearFilter = () => {
    const { category } = get(router, "query");
    let variable = {
      mainFilter: {
        categoryUrl: category,
      },
      pageNo: 1,
      limit: LIMIT,
    };
    setFilterPayload({ ...variable });
    clearAllFilter(router);
  };
  const { title, description, keywords } = get(
    filteredProductData,
    "mostParentCategoryData.meta",
    {}
  );
  return (
    <div>
      {/* <Meta title={singlecategory?.meta?.title} description={singlecategory?.meta?.description} keywords={singlecategory?.meta?.keywords}/> */}
      {/* <PageTitle title={"Collection"} /> */}
      {
        productFilterData.loading ? 
          <PageLoader/>
        :
        <>
          {get(filteredProductData, "isMostParentCategory") ? (
            <ParentCategories
              categories={get(filteredProductData, "mostParentCategoryData", {})}
              categoryName={get(router, 'query.category', '')}
            />
          ) : (
            <SubCategoryProducts
              clearFilter={clearFilter}
              filteredProductData={filteredProductData}
              handleFilter={handleFilter}
              handleScroll={handleScroll}
              handleSorting={handleSorting}
            />
          )}
        </>
      }
    </div>
  );
};
export default SingleCategoryProduct;
