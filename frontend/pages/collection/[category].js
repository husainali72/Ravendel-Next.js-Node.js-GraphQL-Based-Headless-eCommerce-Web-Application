import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { getFilteredProductsAction } from "../../redux/actions/productAction";
import { ARRAY, CHOICE, LIMIT } from "../../components/categoryFilter/constant";
import SubCategoryProducts from "../../components/category/subCategories";
import ParentCategories from "../../components/category/parentCategories";
import { clearAllFilter } from "../../components/categoryFilter/component/urlFilter";
import Meta from "../../components/Meta";
import SubCategorySkeletoncard from "../../components/category/component";

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
  const getCategoryData = async () => {
    if (get(filterPayload, "mainFilter.categoryUrl")) {
      await dispatch(getFilteredProductsAction(filterPayload));
    }
  };
  useEffect(() => {
    getCategoryData();
  }, [filterPayload]);
  useEffect(() => {
    setFilteredProductData({
      ...get(productFilterData, "productFilter", {}),
    });
  }, [productFilterData]);
  const handleFilter = (filters, activeSorting) => {
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
    if (activeSorting) {
      setFilterPayload({
        ...filterPayload,
        filters: filteredData,
        sort: activeSorting,
      });
    } else {
      setFilterPayload({ ...filterPayload, filters: filteredData });
    }
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
  const defaultMeta = { title: "", description: "", keywords: "" };
  const { title, description, keywords } = get(
    filteredProductData,
    "mostParentCategoryData.meta",
    defaultMeta
  );
  if (router.isFallback) {
    return <SubCategorySkeletoncard parentLoading={true} />;
  }

  return (
    <div>
      {get(productFilterData, "parentLoading") ? (
        <SubCategorySkeletoncard
          parentLoading={get(productFilterData, "parentLoading")}
        />
      ) : (
        <>
          <Meta title={title||get(router, "query.category",'')} description={description} keywords={keywords} />
          <>
            {get(filteredProductData, "isMostParentCategory") ? (
              <ParentCategories
                categories={get(
                  filteredProductData,
                  "mostParentCategoryData",
                  {}
                )}
                categoryName={get(router, "query.category", "")}
                loading={get(productFilterData, "parentLoading", false)}
              />
            ) : (
              <SubCategoryProducts
                clearFilter={clearFilter}
                filteredProductData={filteredProductData}
                handleFilter={handleFilter}
                defaultMeta={defaultMeta}
                handleScroll={handleScroll}
                handleSorting={handleSorting}
                loading={get(productFilterData, "loading", false)}
                parentLoading={get(productFilterData, "parentLoading", false)}
              />
            )}
          </>
        </>
      )}
    </div>
  );
};
export default SingleCategoryProduct;
