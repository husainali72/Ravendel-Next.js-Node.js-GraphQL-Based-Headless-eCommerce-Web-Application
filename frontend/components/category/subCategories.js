import React from "react";
import { Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component"; // Assuming you have this library installed
import CategoryFilter from "../categoryFilter/categoryFilter";
import SubCategoryList from "../categoryFilter/component/subcategoryList";
import OnSaleProductCard from "./onSaleProductCard";
import PropTypes from "prop-types";
import { get } from "lodash";
import CategorySorting from "../categorySorting/categorySorting";
const SubCategoryProducts = ({
  filteredProductData,
  handleFilter,
  handleScroll,
  handleSorting,
}) => {

  return (
    <section className="product-cart-section">
      <Container>
        <div className="single-category-page">
          <div className="category-option">
            <SubCategoryList
              categoryTree={get(filteredProductData, "categoryTree", {})}
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
                    products of {get(filteredProductData, "productData.count")}{" "}
                    products
                  </p>
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
};
export default SubCategoryProducts;