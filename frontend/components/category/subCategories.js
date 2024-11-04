import React, { useState } from "react";
import { Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component"; // Assuming you have this library installed
import CategoryFilter from "../categoryFilter/categoryFilter";
import SubCategoryList from "../categoryFilter/component/subcategoryList";
import OnSaleProductCard from "./onSaleProductCard";
import PropTypes from "prop-types";
import { MdFilterList } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { GoSortDesc } from "react-icons/go";
import { capitalize, get } from "lodash";
import CategorySorting from "../categorySorting/categorySorting";
import Meta from "../Meta";
import SubCategorySkeletoncard from "./component";
import { useRouter } from "next/router";
import { categorySortingOption } from "../categoryFilter/constant";
import { updateSortingUrl } from "../categoryFilter/component/urlFilter";
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
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState('1');
  const { title, description, keywords } = get(
    filteredProductData,
    "categoryTree.subCategories.meta",
    defaultMeta
  );
  const toggleFilter = () => {
    if(!showFilter){
      setShowSort(false)
    }
    setShowFilter(!showFilter)
  }
  const toggleSort = () => {
    if(!showSort){
      setShowFilter(false)
    }
    setShowSort(!showSort)
  }
  const handleChangeSorting = (e) => {
    setSelectedSorting(e.id.toString())
    const { field, type } = e;
    let sortedPayload = { field, type };
    handleSorting(sortedPayload);
    updateSortingUrl(sortedPayload, router);
  }
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
            <div className={`category-option ${showFilter ? 'active' : ''}`}>
              <div className="filter-head d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center" style={{gap: '10px'}}>
                  <button className="clear-filters-btn back-btn" onClick={toggleFilter}><IoIosArrowBack/></button>
                  <h4 className="category-section-title" style={{lineHeight: '10px'}}>Filters</h4>
                </div>
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
                    productData={get(
                      filteredProductData,
                      "productData",
                      []
                    )}
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
                  <div className="totall-product">
                    <CategorySorting
                      activeSorting={get(filteredProductData, "sort", {})}
                      filterProductData={filteredProductData}
                      handleSorting={handleSorting}
                      sortingState={[selectedSorting, setSelectedSorting]}
                      />
                      {
                        <p>{`${get(
                          filteredProductData,
                          "productData.count"
                        )} Results for ${capitalize(
                          get(router, "query.category", "")
                        )}`}</p>
                      }
                  </div>

                  <div className="mobile_action_btn_wrapper">
                    <button onClick={toggleSort}><GoSortDesc /> Sort</button>
                    <span className="saperator"/>
                    <button onClick={toggleFilter}><MdFilterList /> Filter</button>
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
                  <div className={`mobile-sort-popup ${showSort ? "active" : ''}`}>
                    <h4 className="category-section-title" style={{lineHeight: '10px'}}>Sort By</h4>
                    <button className="clear-filters-btn back-btn" onClick={toggleSort}><IoClose/></button>
                    <form>
                      {
                        categorySortingOption.map((opt)=>(
                            <div key={opt.id}>
                                <input type="radio"  id={opt.id} name="sort" checked={opt.id.toString() === selectedSorting} value={opt.id} onChange={()=> handleChangeSorting(opt)} />
                                <label htmlFor={opt.id}>{opt.title}</label>
                            </div>
                        ))
                      }
                    </form>
                  </div>
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
