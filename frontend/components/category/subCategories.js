import React from "react";
import { Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component"; // Assuming you have this library installed
import CategoryFilter from "../categoryFilter/categoryFilter";
import SubCategoryList from "../categoryFilter/component/subcategoryList";
import OnSaleProductCard from "./onSaleProductCard";
import PropTypes from "prop-types";
import { get } from "lodash";
import CategorySorting from "../categorySorting/categorySorting";
import Meta from "../Meta";
import PageLoader from "../PageLoader";
const SubCategoryProducts = ({
  filteredProductData,
  handleFilter,
  handleScroll,
  handleSorting,
  clearFilter,
  loading,
}) => {
  const { title, description, keywords } = get(
    filteredProductData,
    "categoryTree.subCategories.meta",
    {}
  );
  return (
    <section className="product-cart-section">
      <Meta title={title} description={description} keywords={keywords} />
      <Container>
        <div className="single-category-page">
          {get(filteredProductData, "filterData", [])?.length > 0 && (
            <div className="category-option">
              <div className="filter-head d-flex align-items-center justify-content-between">
                <h4 className="category-section-title">Filters</h4>
                <button className="clear-filters-btn" onClick={clearFilter}>
                  Clear Filters
                </button>
              </div>
              <SubCategoryList
                categoryTree={get(filteredProductData, "categoryTree", {})}
                name={"Category"}
              />
              <div className="primary-sidebar sticky-sidebar category-shop-cart my-1">
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
            </div>
          )}
          <div className="shop-product-container ">
            {!loading ? (
              get(filteredProductData, "productData.products")?.length > 0 ? (
                <div className="shop-product-list ">
                  <div className="totall-product ">
                  </div>
                  <div className="totall-product ">
                    <CategorySorting
                      activeSorting={get(filteredProductData, "sort", {})}
                      filterProductData={filteredProductData}
                      handleSorting={handleSorting}
                    />
                  </div>
                  <InfiniteScroll
                    dataLength={
                      get(filteredProductData, "productData.products")?.length
                    }
                    next={handleScroll}
                    hasMore={
                      get(filteredProductData, "productData.products")?.length <
                      get(filteredProductData, "productData.count")
                    }
                    scrollableTarget="scrollableDiv"
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
                <div className="product-no-data-container">
                  <p className="product-no-data-text">No Data Found</p>
                </div>
              )
            ) : (
              <PageLoader />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
SubCategoryProducts.propTypes = {
  filteredProductData: PropTypes.object.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleSorting: PropTypes.func.isRequired,
  handleScroll: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  loading: PropTypes.boolean,
};
export default SubCategoryProducts;
