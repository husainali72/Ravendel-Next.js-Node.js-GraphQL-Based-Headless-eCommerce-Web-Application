import { useEffect, useRef } from "react";
import {
  CloseMenu,
  CloseSortMenu,
  OpenMenu,
  OpenSortMenu,
} from "../utills/app";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
const Sorting = ({
  setonSaleProduct,
  selectedSortingCriteria,
  setSelectedSortingCriteria,
  onSaleAllProduct,
  sortingData,
  sortingOptions,
  setNumber,
  filters,
}) => {
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (sortingData && sortingData?.length > 0) {
      sortData(selectedSortingCriteria);
    }
  }, [sortingData]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event) => {
    if (
      dropdownRef?.current &&
      !dropdownRef?.current?.contains(event?.target)
    ) {
      CloseSortMenu();
      CloseMenu();
    }
  };
  const compareFunction = (a, b, sortingcriteria) => {
    switch (sortingcriteria?.name) {
      case "desc": {
        return b?.pricing?.sellprice - a?.pricing?.sellprice;
      } // Sort in descending order
      case "asc": {
        return a?.pricing?.sellprice - b?.pricing?.sellprice;
      } // Sort in ascending order
      case "latest": {
        return new Date(b?.date) - new Date(a?.date);
      }
      default: {
        return 0;
      }
    }
  };
  const sortData = (sortingcriteria) => {
    setSelectedSortingCriteria(sortingcriteria);
    const data = sortingData.length > 0 ? sortingData : onSaleAllProduct;
    const sortedData = data
      ?.slice()
      ?.sort((a, b) => compareFunction(a, b, sortingcriteria));
    setonSaleProduct([...sortedData]);
    setNumber(sortedData?.length);
    CloseSortMenu();
    CloseMenu();
  };
  // Function to sort data based on the selected sorting criteria
  const updateSortingURLAndSortData = (sortingcriteria) => {
    sortData(sortingcriteria);
    // Get existing filter parameters from the URL
    const { query } = router;
    const existingFilters = Object.keys(query)?.filter((key) => key.startsWith("filter.v.") && key !== "sort")?.reduce((acc, key) => {
        const value = Array.isArray(query[key]) ? query[key] : [query[key]];
        acc[key] = value;
        return acc;
      }, {});

    // Combine existing filters with new sorting parameter
    const updatedFilters = {
      ...existingFilters,
      [`filter.v.price.gte`]: filters?.minPrice,
      [`filter.v.price.lte`]: filters?.maxPrice,
    };

    // Generate sorting URL
    const sortURL = `&sort=${sortingcriteria.name}`;
    const currentURL = window.location.pathname;

    // Update the URL with existing filters and sorting parameter
    const updatedURL = `${currentURL}?${Object.entries(updatedFilters)
      .map(([key, value]) => {
        return Array.isArray(value)
          ? value?.map((v) => `${key}=${v}`).join("&")
          : `${key}=${value}`;
      })
      .join("&")}${sortURL}`;

    router.replace(updatedURL, undefined, { shallow: true });
    window.history.pushState(null, null, updatedURL);
  };
  return (
    <>
      <div className="sort-by-product-area">
        <div className="sort-by-cover mr-10" ref={dropdownRef}>
          <div className="sort-by-product-wrap">
            <div className="sort-by">
              <span>
                <i className="fas fa-border-all" aria-hidden="true"></i>
                Show:
              </span>
            </div>
            <span className="drop-down-btn item-down" id="menuDown">
              <i className="fas fa-angle-down" onClick={() => OpenMenu()}></i>
            </span>
            <span className="drop-down-btn item-up" id="menuUp">
              <i className="fas fa-angle-up" onClick={() => CloseMenu()}></i>
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
                <i className="fas fa-border-all" aria-hidden="true"></i>
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
            <div className="drop-down-item-menu product-sorting" id="sort-menu">
              {sortingOptions?.map((sorting, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => updateSortingURLAndSortData(sorting)}
                  >
                    <a href="#">{sorting?.title}</a>
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Sorting.propTypes = {
  setonSaleProduct: PropTypes.func.isRequired,
  onSaleAllProduct: PropTypes.func.isRequired,
  selectedSortingCriteria: PropTypes.object.isRequired,
  setSelectedSortingCriteria: PropTypes.func.isRequired,
  sortingData: PropTypes.array.isRequired,
  sortingOptions: PropTypes.array.isRequired,
  setNumber: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};
export default Sorting;
