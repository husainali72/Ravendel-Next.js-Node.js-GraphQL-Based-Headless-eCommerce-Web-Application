/* eslint-disable react/jsx-key */
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
import { Container, Form } from "react-bootstrap";
import { GET_PRODUCTS_QUERY, GET_BRANDS_QUERY } from "../queries/shopquery";
import OnSaleProductCard from "../components/category/onSaleProductCard";
import ShopProducts from "../components/shoppage/shopProducts";
import { GET_HOMEPAGE_DATA_QUERY, GET_CATEGORIES_QUERY } from "../queries/home";
import { brandsAction, categoryAction } from "../redux/actions/brandAction";
import { useSelector, useDispatch } from "react-redux";
import { OpenMenu,CloseMenu,OpenSortMenu ,CloseSortMenu} from "../utills/app";
import { settingActionCreator } from "../redux/actions/settingAction";
import Link from "next/link";
import { getAllAttributes } from "../redux/actions/productAction";
import { capitalize, get } from "lodash";
import { useRouter } from "next/router";
const defaultPrice = {
  min: 0,
  max: 100000,
};
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
  const [rangevalue, setRangevalue] = useState("");
  const currencyOpt = currencyStore?.currency_options?.currency;
  const [filterAttribute, setFilterAttribute] = useState([]);
  const decimal = currencyStore?.currency_options?.number_of_decimals;
  const [currency, setCurrency] = useState("$");
  const [loading, setloading] = useState(false);
  const [onSaleProduct, setonSaleProduct] = useState([]);
  const [onSaleAllProduct, setonSaleAllProduct] = useState([]);
  const [sortingdata, setSortingdata] = useState([]);
  const [number, setNumber] = useState(0);
  const [selectedSortingCriteria, setSelectedSortingCriteria] = useState({
    name: "latest",
    title: "Release date",
  });
  const [filters, setFilters] = useState({
    minPrice: "0",
    maxPrice: "10000",
  });

  const sortingOptions = [
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
    setloading(false);
    setNumber(get(shopProducts, "products.data")?.length);
    setonSaleProduct(get(shopProducts, "products.data"));
    setonSaleAllProduct(get(shopProducts, "products.data"));
  }, [shopProducts]);

  useEffect(() => {
    dispatch(getAllAttributes());
    currencySetter(currencyOpt, setCurrency);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(settingActionCreator(currencyStore.currency_options));
  }, [currencyStore?.currency_options]);

  useEffect(() => {
    if (brandProduct) {
      dispatch(brandsAction(brandProduct));
      dispatch(categoryAction(shopProduct.data));
    }
  }, [brandProduct]);

  useEffect(() => {
    setFilterAttributesFromUrl();
  }, [router.query]);
  useEffect(() => {
    if (sortingdata && sortingdata?.length > 0) {
      sortData(selectedSortingCriteria);
    }
  }, [sortingdata]);

  //Retrieves filter parameters (such as price range and attribute values) from the URL
  const setFilterAttributesFromUrl = () => {
    const { query } = router;
    // Extract filter parameters from the URL
    const minPrice = query["filter.v.price.gte"] || "";
    const maxPrice = query["filter.v.price.lte"] || "";
    setFilters({
      ...filters,
      minPrice: minPrice || defaultPrice?.min,
      maxPrice: maxPrice || defaultPrice?.max,
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
    let priceRange = [minPrice, maxPrice];
    if (attributeValues.length > 2) {
      // Create an attribute array for filtering  products based on the parsed URL parameters
      const filteredProductAttribute = attributeValues
        .filter((att) => att.name !== "price.gte" && att.name !== "price.lte")
        .map((att) => {
          return {
            label: att.name,
            name: att.name,
            value: att.value,
          };
        });

      // get sorting criteria from  URL parameter
      const sortingcriteria = sortingOptions?.find((option) => option.name === get(router, "query.sort")
        ) || sortingOptions?.find((option) => option.name === "latest");

      setSelectedSortingCriteria({ ...sortingcriteria });

      // Update the state with filtered attributes
      setFilterAttribute([...filteredProductAttribute]);

      // apply filter
      searchProductsByAttributeAndPrice(filteredProductAttribute, priceRange);

    } else {
      const sortingcriteria = sortingOptions?.find((option) => option.name === "latest");
      setSelectedSortingCriteria({ ...sortingcriteria });
      searchProductsByAttributeAndPrice([], priceRange);
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


  const handleAttributeFilterValue = (e, attribute, value) => {
    let index = filterAttribute.findIndex(
      (data) => data?.name === attribute?.name
    );
    if (index !== -1) {
      let val_index = filterAttribute[index].value.findIndex(
        (att_value) => att_value === value?.name
      );

      if (val_index !== -1) {
        // Remove the value if it exists
        filterAttribute[index].value.splice(val_index, 1);
        // Check if there are no values left for the attribute, remove the attribute Name
        if (filterAttribute[index].value.length === 0) {
          let FilteredProductAttribute = filterAttribute.filter(
            (FilteredAttribute) => FilteredAttribute.name !== attribute?.name
          );

          setFilterAttribute([...FilteredProductAttribute]);
        } else {
          setFilterAttribute([...filterAttribute]);
        }
      } else {
        filterAttribute[index].value.push(value?.name);
        setFilterAttribute([...filterAttribute]);
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
      let productAttribute = filterAttribute;
      productAttribute.push(obj);
      setFilterAttribute([...productAttribute]);
    }
  };

  const compareFunction = (a, b, sortingcriteria) => {
    switch (sortingcriteria?.name) {
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
  const sortData = (sortingcriteria) => {
    setSelectedSortingCriteria(sortingcriteria);
    const data = sortingdata.length > 0 ? sortingdata : onSaleAllProduct;
    const sortedData = data
      ?.slice()
      ?.sort((a, b) => compareFunction(a, b, sortingcriteria));
    setonSaleProduct([...sortedData]);
    CloseSortMenu();
    CloseMenu();
  };
  // Function to sort data based on the selected sorting criteria
  const updateSortingURLAndSortData = (sortingcriteria) => {
    sortData(sortingcriteria);
    // Get existing filter parameters from the URL
    const { query } = router;
    const existingFilters = Object.keys(query)
      .filter((key) => key.startsWith("filter.v.") && key !== "sort")
      .reduce((acc, key) => {
        const value = Array.isArray(query[key]) ? query[key] : [query[key]];
        acc[key] = value;
        return acc;
      }, {});

    // Combine existing filters with new sorting parameter
    const updatedFilters = {
      ...existingFilters,
      [`filter.v.price.gte`]: filters.minPrice,
      [`filter.v.price.lte`]: filters.maxPrice,
    };

    // Generate sorting URL
    const sortURL = `&sort=${sortingcriteria.name}`;
    const currentURL = window.location.pathname;

    // Update the URL with existing filters and sorting parameter
    const updatedURL = `${currentURL}?${Object.entries(updatedFilters)
      .map(([key, value]) => {
        return Array.isArray(value)
          ? value.map((v) => `${key}=${v}`).join("&")
          : `${key}=${value}`;
      })
      .join("&")}${sortURL}`;

    router.replace(updatedURL, undefined, { shallow: true });
    window.history.pushState(null, null, updatedURL);
  };

  //Generates a filter URL based on the specified price range and attribute filters, then applies these filters to search  products.
  const updateUrlParametersFromQuery = () => {
    const filterQuery = [];

    // Add price range filters to the url paramenter
    const priceRange = [];
    if (rangevalue) {
      priceRange = rangevalue.split("-");
      filterQuery.push(`filter.v.price.gte=${priceRange[0]}`);
      filterQuery.push(`filter.v.price.lte=${priceRange[1]}`);
    }

    // Add attribute filters to the url paramenter
    if (filterAttribute && filterAttribute.length > 0) {
      filterAttribute?.forEach((attribute) => {
        attribute?.value?.forEach((value) => {
          filterQuery.push(`filter.v.${attribute?.label}=${value}`);
        });
      });
    }
    // Add sorting criteria to the URL parameter
    const sortingQuery = router.query.sort ? `sort=${router.query.sort}` : "";
    // apply filter
    searchProductsByAttributeAndPrice(filterAttribute, priceRange);
    //update url parameter
    const filterURL = filterQuery.length > 0 ? `?${filterQuery.join("&")}` : "";
    const updatedURL = `/shop${filterURL}&${sortingQuery}`;
    router.replace(updatedURL, undefined, { shallow: true });
    window.history.pushState(null, null, updatedURL);
  };

  //Filters products based on specified attributes and price range
  const searchProductsByAttributeAndPrice = (attributes, priceRange) => {
    let allProducts = get(shopProducts, "products.data");
    if (attributes && attributes.length > 0) {
      let data = allProducts?.filter((data) => {
        return (
          get(data, "attribute_master", [])?.some((attribute_value) => {
            return attributes.some((filteredData) => {
              return (
                filteredData.name === attribute_value.name &&
                get(filteredData, "value", [])?.some((data1) => {
                  return get(attribute_value, "attribute_values", [])?.some(
                    (val) => val.name === data1
                  );
                })
              );
            });
          }) &&
          get(data,'pricing.sellprice',0) >=
            parseInt(priceRange[0] || defaultPrice?.min) &&
            get(data,'pricing.sellprice',0) <= parseInt(priceRange[1] || defaultPrice?.max)
        );
      });
      if (data) {
        setonSaleProduct([...data]);
        setSortingdata([...data]);
        setNumber(data.length);
      }
    } else {
      let data = allProducts?.filter((data) => {
        return (
          get(data,'pricing.sellprice',0) >=
            parseInt(priceRange[0] || defaultPrice?.min) &&
            get(data,'pricing.sellprice',0) <= parseInt(priceRange[1] || defaultPrice?.max)
        );
      });
      if (data) {
        setonSaleProduct([...data]);
        setSortingdata([...data]);
        setNumber(data.length);
      }
    }
  };
  const isValueChecked = (attribute, valueName) => {
    const attributeIndex = filterAttribute.findIndex(
      (data) => data.name === attribute?.name
    );
    const attributeValueIndex =
      filterAttribute[attributeIndex]?.value.includes(valueName);
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
                        min={defaultPrice?.min}
                        max={defaultPrice?.max}
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
                                          handleAttributeFilterValue(
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
                          Sort by: {selectedSortingCriteria?.title}
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
                        {sortingOptions?.map((sorting) => {
                          return (
                            <li
                              onClick={() =>
                                updateSortingURLAndSortData(sorting)
                              }
                            >
                              <a href="#">{sorting?.title}</a>
                            </li>
                          );
                        })}
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

  }

  /* ===============================================Get Product Shop Settings ===============================================*/
  try {
    const { data: shopproducts } = await client.query({
      query: GET_PRODUCTS_QUERY,
    });
    shopProducts = shopproducts;
  } catch (e) {

  }
  try {
    const { data: shopproductcategory } = await client.query({
      query: GET_CATEGORIES_QUERY,
    });
    shopProduct = shopproductcategory.productCategories;
  } catch (e) {

  }

  /* ===============================================Get Brand Data Settings ===============================================*/

  try {
    const { data: brandproductData } = await client.query({
      query: GET_BRANDS_QUERY,
    });
    brandProduct = brandproductData.brands.data;
  } catch (e) {
 
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
