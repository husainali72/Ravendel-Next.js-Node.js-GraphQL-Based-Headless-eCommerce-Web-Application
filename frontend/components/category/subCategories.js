import React from "react";
import { Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component"; // Assuming you have this library installed
import CategoryFilter from "../categoryFilter/categoryFilter";
import SubCategoryList from "../categoryFilter/component/subcategoryList";
import OnSaleProductCard from "./onSaleProductCard";
import PropTypes from "prop-types";
import { capitalize, get } from "lodash";
import CategorySorting from "../categorySorting/categorySorting";
import Meta from "../Meta";
import SubCategorySkeletoncard from "./component";
import { useRouter } from "next/router";
const SubCategoryProducts = ({
  filteredProductData,
  handleFilter,
  handleScroll,
  handleSorting,
  clearFilter,
  loading,
  defaultMeta,
}) => {
  const router = useRouter();
  const { title, description, keywords } = get(
    filteredProductData,
    "categoryTree.subCategories.meta",
    defaultMeta
  );
  return (
    <section className="product-cart-section">
      <Meta
        title={title || get(router, "query.category", "")}
        description={description}
        keywords={keywords}
      />
      <Container>
        {filteredProductData &&
          Object?.keys(filteredProductData)?.length === 0 && (
            <p className="product-no-data-text">No data Found</p>
          )}
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
            {get(filteredProductData, "productData.products")?.length > 0 ||
            !loading ? (
              get(filteredProductData, "productData.products")?.length > 0 ? (
                <div className="shop-product-list ">
                  <div className="totall-product category-product-count">
                    {
                      <p>{`${get(
                        filteredProductData,
                        "productData.count"
                      )} Results for ${capitalize(
                        get(router, "query.category", "")
                      )}`}</p>
                    }
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
                      get(filteredProductData, "productData.products")
                        ?.length ||
                      0 < get(filteredProductData, "productData.count", 0)
                    }
                    loader={<h4>Loading...</h4>}
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
                  {filteredProductData &&
                    Object?.keys(filteredProductData)?.length > 0 &&
                    !get(filteredProductData, "isMostParentCategory") && (
                      <p className="product-no-data-text">No Record Found</p>
                    )}
                </div>
              )
            ) : (
              <SubCategorySkeletoncard />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
SubCategoryProducts.propTypes = {
  filteredProductData: PropTypes.object.isRequired,
  defaultMeta: PropTypes.object.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleSorting: PropTypes.func.isRequired,
  handleScroll: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  loading: PropTypes.boolean,
};
export default SubCategoryProducts;
