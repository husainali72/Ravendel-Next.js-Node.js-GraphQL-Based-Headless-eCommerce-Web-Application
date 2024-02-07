import React, { useState, useEffect, useRef } from "react";
import {
  currencySetter,
  getImage,
  getPrice,
  imageOnError,
} from "../utills/helpers";
import client from "../apollo-client";
import StarRating from "../components/breadcrumb/rating";
import MultiRangeSlider from "../components/breadcrumb/multirangeSlider";
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { Container, Dropdown, Form } from "react-bootstrap";
import { GET_PRODUCTS_QUERY, GET_BRANDS_QUERY } from "../queries/shopquery";
import OnSaleProductCard from "../components/category/onSaleProductCard";
import ShopProducts from "../components/shoppage/shopProducts";
import { GET_HOMEPAGE_DATA_QUERY, GET_CATEGORIES_QUERY } from "../queries/home";
import { brandsAction, categoryAction } from "../redux/actions/brandAction";
import { useSelector, useDispatch } from "react-redux";
import { OpenMenu } from "../utills/app";
import { CloseMenu } from "../utills/app";
import { OpenSortMenu } from "../utills/app";
import { CloseSortMenu } from "../utills/app";
import { settingActionCreator } from "../redux/actions/settingAction";
import Link from "next/link";
import {
  getAllAttributes,
  getFilteredProducts,
} from "../redux/actions/productAction";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
const Shop = ({
  shopProducts,
  brandProduct,
  shopProduct,
  currencyStore,
  homepageData,
}) => {
  const router = useRouter();
  const imageType =
    homepageData && homepageData?.getSettings?.imageStorage?.status;
  const dispatch = useDispatch();
  const attributes = useSelector((state) => state.products.attributes);
  const usercart = useSelector((state) => state.userCart);
  const [rangevalue, setRangevalue] = useState("");
  const currencyOpt = currencyStore?.currency_options?.currency;
  const [FilterAttribute, setFilterAttribute] = useState([]);
  const decimal = currencyStore?.currency_options?.number_of_decimals;
  const [currency, setCurrency] = useState("$");
  const [loading, setloading] = useState(false);
  const [onSaleProduct, setonSaleProduct] = useState([]);
  const [onSaleAllProduct, setonSaleAllProduct] = useState([]);
  const [sortingdata, setSortingdata] = useState([]);
  const [number, setNumber] = useState(0);
  const getSetting = useSelector((state) => state.setting);
  const [sortingName, setSortingName] = useState({
    name: "latest",
    title: "Release date",
  });
  const [filters, setFilters] = useState({
    minPrice: "0",
    maxPrice: "10000",
  });

  const sortingData = [
    {
      name: "desc",
      title: "High to low",
    },
    {
      name: "asc",
      title: "Low to high",
    },
    {
      name: "latest",
      title: "Release date",
    },
  ];

  const dropdownRef = useRef(null);
  useEffect(() => {
    if (shopProducts && shopProducts?.products?.data?.length > 0) {
      setloading(false);
      setNumber(shopProducts.products.data?.length);
      setonSaleProduct(shopProducts.products.data);
      setonSaleAllProduct(shopProducts.products.data);
    } else {
      setloading(true);
    }
  }, [shopProducts]);

  useEffect(() => {
    dispatch(getAllAttributes());
  }, []);

  useEffect(() => {
    dispatch(settingActionCreator(currencyStore.currency_options));
  }, [currencyStore?.currency_options]);

  useEffect(() => {
    currencySetter(currencyOpt, setCurrency);
  }, []);

  useEffect(() => {
    if (brandProduct) {
      dispatch(brandsAction(brandProduct));
      dispatch(categoryAction(shopProduct.data));
    }
  }, [brandProduct]);

  useEffect(() => {
    setFilterAttributesFromUrl();
  }, [router.query]);

  const setFilterAttributesFromUrl = () => {
    const { query } = router;
    // Extract filter parameters from the URL
    const minPrice = query["filter.v.price.gte"] || "";
    const maxPrice = query["filter.v.price.lte"] || "";
    setFilters({
      ...filters,
      minPrice: minPrice || "0",
      maxPrice: maxPrice || "100000",
    });
// Extract attribute values from the URL
    const attributeValues = Object.keys(query)
      .filter((key) => key.startsWith("filter.v."))
      .map((key) => {
        const attributeName = key.replace("filter.v.", "");
        const attributeValue = query[key];
        return {
          name: attributeName,
          value: Array.isArray(attributeValue)
            ? attributeValue
            : [attributeValue],
        };
      });

    if (attributeValues.length > 2) {
      // Create an array of filtered attributes
      const filteredProductAttribute = attributeValues
        .filter((att) => att.name !== "price.gte" && att.name !== "price.lte")
        .map((att) => {
          return {
            label: att.name,
            name: att.name,
            value: att.value,
          };
        });
      // Update the state with filtered attributes
      setFilterAttribute([...filteredProductAttribute]);
    } else {
      setFilterAttribute([]);
    }
  };

  useEffect(() => {
    setRangevalue(`${filters?.minPrice}-${filters?.maxPrice}`);
  }, [filters]);

  const handleClickOutside = (event) => {
    if (
      dropdownRef?.current &&
      !dropdownRef?.current?.contains(event?.target)
    ) {
      CloseSortMenu();

      CloseMenu();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateFilterAttributes = (e, attribute, value) => {
    let index = FilterAttribute.findIndex(
      (data) => data?.name === attribute?.name
    );
    if (index !== -1) {
      let val_index = FilterAttribute[index].value.findIndex(
        (att_value) => att_value === value?.name
      );

      if (val_index !== -1) {
        // Remove the value if it exists
        FilterAttribute[index].value.splice(val_index, 1);
        // Check if there are no values left for the attribute, remove the attribute Name
        if (FilterAttribute[index].value.length === 0) {
          let FilteredProductAttribute = FilterAttribute.filter(
            (FilteredAttribute) => FilteredAttribute.name !== attribute?.name
          );

          setFilterAttribute([...FilteredProductAttribute]);
        } else {
          setFilterAttribute([...FilterAttribute]);
        }
      } else {
        FilterAttribute[index].value.push(value?.name);
        setFilterAttribute([...FilterAttribute]);
      }
    } else {
      // If the attribute doesn't exist, create a new one
      let val = [];
      val.push(value?.name);
      let obj = {
        label: attribute?.name,
        name: attribute?.name,
        value: val,
      };
      let productAttribute = FilterAttribute;
      productAttribute.push(obj);
      setFilterAttribute([...productAttribute]);
    }
  };

  const compareFunction = (a, b, sortObject) => {
    switch (sortObject?.name) {
      case "desc": {
        return b.pricing.sellprice - a.pricing.sellprice;
      } // Sort in descending order
      case "asc": {
        return a.pricing.sellprice - b.pricing.sellprice;
      } // Sort in ascending order
      case "latest": {
        return new Date(b.date) - new Date(a.date);
      }
      default: {
        return 0;
      }
    }
  };

  // Function to sort data based on the selected sorting criteria
  const sortData = (sortObject) => {
    setSortingName(sortObject);
    const data = sortingdata.length > 0 ? sortingdata : onSaleAllProduct;
    const sortedData = data
      ?.slice()
      ?.sort((a, b) => compareFunction(a, b, sortObject));
    setonSaleProduct([...sortedData]);
    CloseSortMenu();
    CloseMenu();
  };
  useEffect(() => {
    if (sortingdata && sortingdata?.length > 0) {
      sortData(sortingName);
    }
  }, [sortingdata]);
  const updateUrlParametersFromQuery = () => {
    // Build the filter query parameters
    const filterQuery = [];

    // Add price range filters
    const priceRange = [];
    if (rangevalue) {
      priceRange = rangevalue.split("-");
      filterQuery.push(`filter.v.price.gte=${priceRange[0]}`);
      filterQuery.push(`filter.v.price.lte=${priceRange[1]}`);
    }

    // Add attribute filters

    if (FilterAttribute && FilterAttribute.length > 0) {
      FilterAttribute?.forEach((attribute) => {
        attribute?.value?.forEach((value) => {
          filterQuery.push(`filter.v.${attribute?.label}=${value}`);
        });
      });
    }

    // Combine the filter parameters into the URL
    dispatch(
      getFilteredProducts({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        attributes: FilterAttribute,
      })
    );
    const filterURL = filterQuery.length > 0 ? `?${filterQuery.join("&")}` : "";
    router.replace(`/shop${filterURL}`, undefined, { shallow: true });
    window.history.pushState(null, null, `/shop${filterURL}`);
  };
  const isValueChecked = (attribute, valueName) => {
    const attributeIndex = FilterAttribute.findIndex(
      (data) => data.name === attribute?.name
    );
    const attributeValueIndex =
      FilterAttribute[attributeIndex]?.value.includes(valueName);

    return attributeIndex !== -1 && attributeValueIndex;
  };

  return (
    <>
      <BreadCrumb title={"Shop"} />
      <section className="product-cart-section">
        <Container>
          <div className="shop-Container">
            <div className="col-lg-3">
              <ShopProducts shopCategory={shopProduct.data} name={"Category"} />
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
                                  <Form.Group>
                                    {attribute.values.map((value) => (
                                      <Form.Check
                                        key={value._id}
                                        label={capitalize(value.name)}
                                        name="paymentMethod"
                                        data-id={value._id}
                                        data-name={value.name}
                                        onChange={(e) =>
                                          updateFilterAttributes(
                                            e,
                                            attribute,
                                            value
                                          )
                                        }
                                        checked={isValueChecked(
                                          attribute,
                                          value?.name
                                        )}
                                      />
                                    ))}
                                  </Form.Group>
                                </Form>
                              </>
                            );
                          })
                        : null}

                      <button
                        type="button"
                        className="btn btn-success"
                        style={{ marginTop: 12, backgroundColor: "#088178" }}
                        onClick={updateUrlParametersFromQuery}
                      >
                        <i className="fa fa-filter"></i>Fillter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="primary-sidebar sticky-sidebar category-shop-cart my-3">
                <div className="theiaStickySidebar category-box-filler">
                  <div className="widget-category">
                    <h5 className="category-section-title mb-30 wow fadeIn animated animated animated">
                      New Product
                    </h5>
                    {onSaleAllProduct && onSaleAllProduct?.length > 0 ? (
                      <>
                        {onSaleAllProduct.map((product, i) =>
                          i < 5 ? (
                            <Link
                              href={`/product/[singleproduct]?url=${product.url}`}
                              as={`/product/${product.url}`}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  marginTop: 3,
                                  cursor: "pointer",
                                }}
                                key={i}
                              >
                                <div>
                                  <img
                                    className="widget-category-img"
                                    src={getImage(
                                      product.feature_image,
                                      imageType
                                    )}
                                    onError={imageOnError}
                                  />
                                </div>
                                <div
                                  style={{ padding: "3px", marginLeft: "10px" }}
                                >
                                  {product.name?.length > 15 ? (
                                    <strong
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          product.name.substring(0, 15) + "...",
                                      }}
                                    ></strong>
                                  ) : (
                                    <strong>{product.name}</strong>
                                  )}
                                  <StarRating
                                    stars={product?.rating}
                                    singleproducts={product}
                                  />
                                  <p style={{ marginTop: 0 }}>
                                    {currency}{" "}
                                    {getPrice(
                                      product.pricing.sellprice ||
                                        product.pricing.price,
                                      decimal
                                    )}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ) : null
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="shop-product-container">
              <div className="shop-product-fillter">
                <div className="totall-product">
                  <p>
                    {" "}
                    We found <strong className="text-brand">
                      {number}
                    </strong>{" "}
                    items for you!
                  </p>
                </div>
                {loading ? <h5>loading...</h5> : null}

                <div className="sort-by-product-area">
                  <div className="sort-by-cover mr-10" ref={dropdownRef}>
                    <div className="sort-by-product-wrap">
                      <div className="sort-by">
                        <span>
                          <i
                            className="fas fa-border-all"
                            aria-hidden="true"
                          ></i>
                          Show:
                        </span>
                      </div>
                      <span className="drop-down-btn item-down" id="menuDown">
                        <i
                          className="fas fa-angle-down"
                          onClick={() => OpenMenu()}
                        ></i>
                      </span>
                      <span className="drop-down-btn item-up" id="menuUp">
                        <i
                          className="fas fa-angle-up"
                          onClick={() => CloseMenu()}
                        ></i>
                      </span>
                      <div className="drop-down-item-menu" id="item-menu">
                        <li>
                          <a href="#">50</a>
                        </li>
                        <li>
                          <a href="#">100</a>
                        </li>
                        <li>
                          <a href="#">150</a>
                        </li>
                      </div>
                    </div>
                  </div>

                  <div className="sort-by-cover">
                    <div
                      className="sort-by-product-wrap"
                      ref={dropdownRef}
                      onMouseEnter={() => OpenSortMenu()}
                      onMouseLeave={() => CloseSortMenu()}
                    >
                      <div className="sort-by">
                        <span>
                          <i
                            className="fas fa-border-all"
                            aria-hidden="true"
                          ></i>
                          Sort by: {sortingName?.title}
                        </span>
                      </div>
                      <span className="drop-down-btn item-down" id="menuDown2">
                        <i
                          className="fas fa-angle-down"
                          onClick={() => OpenSortMenu()}
                        ></i>
                      </span>
                      <span className="drop-down-btn item-up" id="menuUp2">
                        <i
                          className="fas fa-angle-up"
                          onClick={() => CloseSortMenu()}
                        ></i>
                      </span>
                      <div
                        className="drop-down-item-menu"
                        id="sort-menu"
                        style={{ width: "100%" }}
                      >
                        {sortingData?.map((sorting) => {
                          return (
                            <li onClick={() => sortData(sorting)}>
                              <a href="#">{sorting?.title}</a>
                            </li>
                          );
                        })}

                        {/* <li>
                                                    <a href="#">High to Low</a>
                                                </li>
                                                <li>
                                                    <a href="#">Release Date</a>
                                                </li> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {onSaleProduct && onSaleProduct?.length > 0 ? (
                <div className="shop-product-list">
                  <OnSaleProductCard
                    onSaleProduct={onSaleProduct}
                    hidetitle
                    currencyProp={currency}
                    decimal={decimal}
                    homepageData={homepageData}
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
    </>
  );
};
export default Shop;

export async function getStaticProps() {
  var homepageData = [];
  var shopProducts = [];
  var brandProduct = [];
  var shopProduct = [];
  var currencyStore = [];
  /* ===============================================Get HomepageData Settings ===============================================*/

  try {
    const { data: homepagedata } = await client.query({
      query: GET_HOMEPAGE_DATA_QUERY,
    });
    homepageData = homepagedata;
    currencyStore = homepagedata?.getSettings?.store;
  } catch (e) {
    console.log(
      "homepage Error===",
      e.networkError && e.networkError.result
        ? e.networkError.result.errors
        : ""
    );
  }

  /* ===============================================Get Product Shop Settings ===============================================*/
  try {
    const { data: shopproducts } = await client.query({
      query: GET_PRODUCTS_QUERY,
    });
    shopProducts = shopproducts;
  } catch (e) {
    console.log(
      "ShopProduct Error===",
      e.networkError && e.networkError.result
        ? e.networkError.result.errors
        : ""
    );
  }
  try {
    const { data: shopproductcategory } = await client.query({
      query: GET_CATEGORIES_QUERY,
    });
    shopProduct = shopproductcategory.productCategories;
  } catch (e) {
    console.log(
      "ShopProduct Error===",
      e.networkError && e.networkError.result
        ? e.networkError.result.errors
        : ""
    );
  }

  /* ===============================================Get Brand Data Settings ===============================================*/

  try {
    const { data: brandproductData } = await client.query({
      query: GET_BRANDS_QUERY,
    });
    brandProduct = brandproductData.brands.data;
  } catch (e) {
    console.log(
      "===brand",
      e.networkError && e.networkError.result
        ? e.networkError.result.errors
        : ""
    );
  }

  return {
    props: {
      homepageData,
      shopProducts,
      shopProduct,
      brandProduct,
      currencyStore,
    },
    revalidate: 10,
  };
}
