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
import { GET_CATEGORIES_QUERY } from "../../queries/home";
import { useDispatch, useSelector } from "react-redux";
import ShopProducts from "../../components/shoppage/shopProducts";
import { capitalize, get, isEmpty } from "lodash";
import MultiRangeSlider from "../../components/breadcrumb/multirangeSlider";
import { currencySetter } from "../../utills/helpers";
import { getAllAttributes } from "../../redux/actions/productAction";
import CategoryBreadCrumb from "../../components/breadcrumb";
// import CategoryBreadCrumb from './component/breadcrumb';

const SingleCategoryProduct = ({
  singlecategory,
  shopProduct,
  brandProduct,
}) => {
  const breadCrumbTitle = shopProduct?.data?.find(
    (catt) => catt?.id === singlecategory?.parentId
  );
  const attributes = useSelector((state) => state?.products?.attributes);
  const [cats, setCats] = useState({});
  const [currency, setCurrency] = useState("$");
  const [filterAttribute, setFilterAttribute] = useState([]);
  const dispatch = useDispatch();
  const [rangevalue, setRangevalue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const settings = useSelector((state) => state.setting);

  const [filters, setFilters] = useState({
    minPrice: "0",
    maxPrice: "10000",
  });
  useEffect(() => {
    setRangevalue(`${filters?.minPrice}-${filters?.maxPrice}`);
  }, [filters]);
  const [categoryDetail, setCategoryDetail] = useState({
    name: "",
    products: [],
    image: {},
    description: "",
    meta: {
      title: "",
      keywords: "",
      description: "",
    },
  });
  useEffect(() => {
    const currencyStoreOptions = get(
      settings,
      "setting.store.currency_options",
      {}
    );
    currencySetter(currencyStoreOptions, setCurrency);
  }, [settings]);
  useEffect(() => {
    dispatch(getAllAttributes());
  }, []);

  if (router.isFallback) {
    return <div>loading...</div>;
  }
  const category = useSelector((state) => state.brand);
  useEffect(() => {
    setCats(category);
  }, [category]);
  useEffect(() => {
    setCategoryDetail(singlecategory);
  }, [singlecategory]);

  const getProducts = async () => {
    let filter = {
      category: singlecategory?.id,
      brand: "",
      most_reviewed: false,
      product_type: "",
      rating: {
        min: 0,
        max: 5,
      },
      price: {
        min: 1,
        max: 100000,
      },
      search: "",
    };
    try {
      const { data: filterProductsData } = await client.query({
        query: GET_FILTEREDPRODUCTS,
        variables: { filter },
      });
      console.log("yes");
      const filteredProducts = get(filterProductsData, "filteredProducts", []);

      if (!isEmpty(filteredProducts)) {
        const mappedProducts = filteredProducts?.map((product) => ({
          brand: get(product, "brand", ""),
          categoryId: get(product, "categoryId", ""),
          feature_image: get(product, "feature_image", ""),
          name: get(product, "name", ""),
          pricing: get(product, "pricing", {}),
          quantity: get(product, "quantity", 0),
          status: get(product, "status", ""),
          url: get(product, "url", ""),
          rating: get(product, "rating", 0),
          __typename: get(product, "__typename", ""),
          attribute_master: get(product, "attribute_master", null),
          _id: get(product, "_id", ""),
        }));

        setProducts((prev) => [...prev, ...mappedProducts]);
        setFilteredProducts((prev) => [...prev, ...mappedProducts]);
      }
    } catch (error) {
      console.log("Filtered Products Error:", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [setCategoryDetail]);
  const handleFilterData = (e, attribute) => {
    let index = filterAttribute?.findIndex((data) => data?.name === attribute);
    if (index !== -1 && filterAttribute?.length > 0) {
      let val_index = filterAttribute[index].value.findIndex(
        (att_value) => att_value === e?.target?.value
      );
      if (val_index !== -1) {
        filterAttribute[index]?.value.splice(val_index, 1);
        if (filterAttribute[index].value.length === 0) {
          let FilteredProductAttribute = filterAttribute?.filter(
            (FilteredAttribute) => FilteredAttribute?.name !== attribute
          );

          setFilterAttribute([...FilteredProductAttribute]);
        } else {
          setFilterAttribute([...filterAttribute]);
        }
      } else {
        filterAttribute[index]?.value.push(e.target.value);
        setFilterAttribute([...filterAttribute]);
      }
    } else {
      let val = [];
      val.push(e.target.value);
      let obj = {
        name: attribute,
        value: val,
      };
      let productAttribute = filterAttribute;
      productAttribute.push(obj);
      setFilterAttribute([...productAttribute]);
    }
  };
  const filterData = () => {
    let priceRange = rangevalue.split("-");
    if (filterAttribute && filterAttribute?.length > 0) {
      let data = products?.filter((data) => {
        return (
          data?.attribute_master?.some((attribute_value) => {
            return filterAttribute?.some((filteredData) => {
              return (
                filteredData?.name === attribute_value?.id &&
                filteredData?.value.some((data1) =>
                  attribute_value?.attribute_values?.some(
                    (val) => val?._id === data1
                  )
                )
              );
            });
          }) &&
          data?.pricing?.sellprice >= parseInt(priceRange[0]) &&
          data?.pricing?.sellprice <= parseInt(priceRange[1])
        );
      });
      setFilteredProducts([...data]);
    } else {
      let data = products?.filter((data) => {
        return (
          data?.pricing?.sellprice >= parseInt(priceRange[0]) &&
          data?.pricing?.sellprice <= parseInt(priceRange[1])
        );
      });
      setFilteredProducts([...data]);
    }
  };
  return (
    <div>
      <Head>
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
      </Head>
      <PageTitle title={"category"} />
      <CategoryBreadCrumb
        breadCrumbTitle={breadCrumbTitle}
        categoryDetail={categoryDetail}
      />
      <section className="product-cart-section">
        <Container>
          <div className="single-category-page">
            <div className="category-option">
              <ShopProducts category={shopProduct?.data} name={"Category"} />
              <ShopProducts brandProduct={brandProduct} name={"Brand"} brands />
              <div className="primary-sidebar sticky-sidebar category-shop-cart my-3">
                <div className="theiaStickySidebar category-box-filler">
                  <div className="widget-category">
                    <h5 className="category-section-title mb-30 wow fadeIn animated animated animated">
                      Fill by Price
                    </h5>
                    <div style={{ marginTop: "30px" }}>
                      <MultiRangeSlider
                        min={0}
                        max={100000}
                        minValue={filters?.minPrice}
                        maxValue={filters?.maxPrice}
                        onChange={({ min, max }) => {
                          if (
                            min !== filters.minPrice ||
                            max !== filters.maxPrice
                          ) {
                            setRangevalue(`${min}-${max}`);
                            setFilters({
                              ...filters,
                              minPrice: min,
                              maxPrice: max,
                            });
                          }
                        }}
                      />
                      <p style={{ paddingTop: "10px", fontWeight: "600" }}>
                        range : {currency} {rangevalue}
                      </p>
                    </div>
                    <div className="fillter-by-price-checkbox">
                      {attributes && attributes.length > 0
                        ? attributes.map((attribute) => {
                            return (
                              <>
                                <h6>{capitalize(attribute.name)}</h6>
                                <Form>
                                  <Form.Group
                                    value="{billingInfo.paymentMethod}"
                                    onChange={(e) =>
                                      handleFilterData(e, attribute?.id)
                                    }
                                  >
                                    {attribute?.values?.map((value) => {
                                      return (
                                        <>
                                          <Form.Check
                                            label={capitalize(value?.name)}
                                            name="paymentMethod"
                                            value={value?._id}
                                          />
                                        </>
                                      );
                                    })}
                                  </Form.Group>
                                </Form>
                              </>
                            );
                          })
                        : null}

                      <button
                        type="button"
                        className="btn btn-success primary-btn-color"
                        style={{ marginTop: 12 }}
                        onClick={filterData}
                      >
                        <i className="fa fa-filter"></i>Fillter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shop-product-container">
              <strong
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                {capitalize(categoryDetail?.name)}
              </strong>
              {filteredProducts && filteredProducts?.length > 0 ? (
                <div className="shop-product-list">
                  <OnSaleProductCard
                    onSaleProduct={filteredProducts}
                    hideTitle
                  />
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

  /* ===============================================Get SinglePage Category ===============================================*/

  try {
    const { data: shopproductcategory } = await client.query({
      query: GET_SINGLE_PRODUCT,
      variables: { url },
    });
    singlecategory = get(shopproductcategory, "productsbycaturl.data");
  } catch (e) {}
  /* ===============================================Get fillter Product Category ===============================================*/

  try {
    const { data: shopproductcategory } = await client.query({
      query: GET_CATEGORIES_QUERY,
    });
    shopProduct = get(shopproductcategory, "productCategories", []);
  } catch (e) {}
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
