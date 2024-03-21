/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import MultiRangeSlider from "./breadcrumb/multirangeSlider";
import { useRouter } from "next/router";
import { getAllAttributes } from "../redux/actions/productAction";
import { capitalize, get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { currencySetter } from "../utills/helpers";
import PropTypes from "prop-types";
const defaultPrice = {
  min: 0,
  max: 100000,
};
const GlobalFilter = ({
  setSortingdata,
  setFilters,
  filters,
  sortingOptions,
  setSelectedSortingCriteria,
  shopProducts,
  setonSaleProduct,
  setNumber,
  filterbaseUrl,
  handleFilter
}) => {
  const router = useRouter();
  const attributes = useSelector((state) => state.products.attributes);
  const [filterAttribute, setFilterAttribute] = useState([]);
  const [rangevalue, setRangevalue] = useState("");
  const settings = useSelector((state) => state.seting);
  const [currency, setCurrency] = useState("$");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAttributes());
  }, []);
  useEffect(() => {
    const currencyStoreOptions = get(
      settings,
      "setting.store.currency_options",
      {}
    );
    currencySetter(currencyStoreOptions, setCurrency);
  }, [settings]);
  useEffect(() => {
    setFilterAttributesFromUrl();
  }, [router.query]);
  useEffect(() => {
    setRangevalue(`${filters?.minPrice}-${filters?.maxPrice}`);
  }, [filters]);

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
      const sortingcriteria =
        sortingOptions?.find(
          (option) => option.name === get(router, "query.sort")
        ) || sortingOptions?.find((option) => option.name === "latest");
      setSelectedSortingCriteria({ ...sortingcriteria });
      // Update the state with filtered attributes
      setFilterAttribute([...filteredProductAttribute]);
      // apply filter
      searchProductsByAttributeAndPrice(filteredProductAttribute, priceRange);
    } else {
      const sortingcriteria = sortingOptions?.find(
        (option) => option.name === get(router, "query.sort")
      ) || sortingOptions?.find((option) => option.name === "latest");
      setSelectedSortingCriteria({ ...sortingcriteria });
      searchProductsByAttributeAndPrice([], priceRange);
      setFilterAttribute([]);
    }
  };
  //Filters products based on specified attributes and price range
  const searchProductsByAttributeAndPrice = (attributes, priceRange) => {
    let allProducts =shopProducts;
    if (attributes && attributes?.length > 0) {
      let data = allProducts?.filter((data) => {
        return (
          get(data, "attribute_master", [])?.some((attribute_value) => {
            return attributes?.some((filteredData) => {
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
          get(data, "pricing.sellprice", 0) >=
            parseInt(priceRange[0] || defaultPrice?.min) &&
          get(data, "pricing.sellprice", 0) <=
            parseInt(priceRange[1] || defaultPrice?.max)
        );
      });
      if (data) {
        handleFilter(data)
      }
    } else {
      let data = allProducts?.filter((data) => {
        return (
          get(data, "pricing.sellprice", 0) >=
            parseInt(priceRange[0] || defaultPrice?.min) &&
          get(data, "pricing.sellprice", 0) <=
            parseInt(priceRange[1] || defaultPrice?.max)
        );
      });
      if (data) {
        handleFilter(data)
      }
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

  //Generates a filter URL based on the specified price range and attribute filters, then applies these filters to search  products.
  const updateUrlParametersFromQuery = (e) => {
    e.preventDefault();
    const filterQuery = [];

    // Add price range filters to the url paramenter
    let priceRange = [];
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
    const updatedURL = `${filterbaseUrl}${filterURL}&${sortingQuery}`;
    // router.replace(updatedURL, undefined, { shallow: true });
    // window.history.pushState(null, null, updatedURL);
    router.push(updatedURL, undefined, { shallow: true });
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
    <div className="primary-sidebar sticky-sidebar category-shop-cart my-3">
      <div className="theiaStickySidebar category-box-filler">
        <div className="widget-category">
          <h5 className="category-section-title mb-30 wow fadeIn animated animated animated">
            Filter by Price
          </h5>
          <div className="priceRange-slider">
            <MultiRangeSlider
              min={0}
              max={100000}
              minValue={filters?.minPrice}
              maxValue={filters?.maxPrice}
              onChange={({ min, max }) => {
                if (min !== filters.minPrice || max !== filters.maxPrice) {
                  setRangevalue(`${min}-${max}`);
                  setFilters({
                    ...filters,
                    minPrice: min,
                    maxPrice: max,
                  });
                }
              }}
            />
            <p className="range-value">
              Range: {currency} {rangevalue}
            </p>
          </div>
          <div className="fillter-by-price-checkbox">
            {attributes && attributes?.length > 0
              ? attributes?.map((attribute) => {
                  return (
                    <>
                      <h6>{capitalize(attribute.name)}</h6>
                      <Form>
                        <Form.Group>
                          {attribute.values.map((value) => (
                            <Form.Check
                              key={value._id}
                              label={capitalize(value.name)}
                              name="attribute"
                              data-id={value._id}
                              data-name={value.name}
                              onChange={(e) =>
                                handleAttributeFilterValue(e, attribute, value)
                              }
                              checked={isValueChecked(attribute, value?.name)}
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
              className="btn btn-success filter-btn primary-btn-color"
              onClick={updateUrlParametersFromQuery}
            >
              <i className="fa fa-filter"></i> Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
GlobalFilter.propTypes = {
  setSortingdata: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  sortingOptions: PropTypes.array.isRequired,
  setSelectedSortingCriteria: PropTypes.func.isRequired,
  shopProducts: PropTypes.object.isRequired,
  setonSaleProduct: PropTypes.func.isRequired,
  setNumber: PropTypes.func.isRequired,
  filterbaseUrl: PropTypes.string.isRequired,
};

export default GlobalFilter;
