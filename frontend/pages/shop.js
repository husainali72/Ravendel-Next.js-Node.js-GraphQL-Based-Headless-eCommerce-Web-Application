/* eslint-disable no-empty */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import client from "../apollo-client";
import StarRating from "../components/breadcrumb/rating";
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { Container } from "react-bootstrap";
import { GET_PRODUCTS_QUERY, GET_BRANDS_QUERY } from "../queries/shopquery";
import OnSaleProductCard from "../components/category/onSaleProductCard";
import ShopProducts from "../components/shoppage/shopProducts";
import { GET_HOMEPAGE_DATA_QUERY, GET_CATEGORIES_QUERY } from "../queries/home";
import { brandsAction, categoryAction } from "../redux/actions/brandAction";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { get } from "lodash";
import GlobalFilter from "./filter";
import Sorting from "./sorting";
import Price from "../components/priceWithCurrency";
import ProductImage from "../components/imageComponent";
import PropTypes from "prop-types";
const Shop = ({ shopProducts, brandProduct, shopProduct }) => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [onSaleProduct, setonSaleProduct] = useState([]);
  const [onSaleAllProduct, setonSaleAllProduct] = useState([]);
  const [sortingData, setSortingdata] = useState([]);
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
  useEffect(() => {
    setloading(false);
    setNumber(get(shopProducts, "products.data")?.length);
    setonSaleProduct(get(shopProducts, "products.data"));
    setonSaleAllProduct(get(shopProducts, "products.data"));
  }, [shopProducts]);

  useEffect(() => {
    if (brandProduct) {
      dispatch(brandsAction(brandProduct));
      dispatch(categoryAction(shopProduct.data));
    }
  }, [brandProduct]);

  return (
    <>
      <BreadCrumb title={"Shop"} />
      <section className="product-cart-section">
        <Container>
          <div className="shop-Container">
            <div className="col-lg-3">
              <ShopProducts
                shopCategory={shopProduct?.data}
                name={"Category"}
                setNumber={setNumber}
              />
              <ShopProducts brandProduct={brandProduct} name={"Brand"} brands />
              <GlobalFilter
                setSortingdata={setSortingdata}
                setFilters={setFilters}
                filters={filters}
                sortingOptions={sortingOptions}
                setSelectedSortingCriteria={setSelectedSortingCriteria}
                shopProducts={shopProducts}
                setonSaleProduct={setonSaleProduct}
                setNumber={setNumber}
                filterbaseUrl={'/shop'}
              />
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
                                className="shop-prod-image-container"
                                key={i}
                              >
                                <div>
                                  <ProductImage
                                    src={get(product, "feature_image")}
                                    className="widget-category-img"
                                  />
                                </div>
                                <div className="shop-prod-name">
                                  {product?.name?.length > 15 ? (
                                    <strong
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          product?.name?.substring(0, 15) +
                                          "...",
                                      }}
                                    ></strong>
                                  ) : (
                                    <strong>{product.name}</strong>
                                  )}
                                  <StarRating
                                    stars={product?.rating}
                                    singleproducts={product}
                                  />
                                  <p className="shop-prod-price">
                                    <Price
                                      price={get(
                                        product,
                                        "pricing.sellprice",
                                        0
                                      )}
                                    />
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
                <Sorting
                  setonSaleProduct={setonSaleProduct}
                  sortingData={sortingData}
                  sortingOptions={sortingOptions}
                  filters={filters}
                  setNumber={setNumber}
                  setSelectedSortingCriteria={setSelectedSortingCriteria}
                  selectedSortingCriteria={selectedSortingCriteria}
                />
              </div>
              {onSaleProduct && onSaleProduct?.length > 0 ? (
                <div className="shop-product-list">
                  <OnSaleProductCard
                    onSaleProduct={onSaleProduct}
                    hidetitle
                    onSaleAllProduct={onSaleAllProduct}
                  />
                </div>
              ) : (
                <div className="shop-prod-no-data">
                  <p>No Data Found</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
Shop.propTypes = {
  shopProducts: PropTypes.object.isRequired,
  brandProduct: PropTypes.array.isRequired,
  shopProduct: PropTypes.object.isRequired,
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
  } catch (e) {}

  /* ===============================================Get Product Shop Settings ===============================================*/
  try {
    const { data: shopproducts } = await client.query({
      query: GET_PRODUCTS_QUERY,
    });
    shopProducts = shopproducts;
  } catch (e) {
    /* empty */
  }
  try {
    const { data: shopproductcategory } = await client.query({
      query: GET_CATEGORIES_QUERY,
    });
    shopProduct = shopproductcategory.productCategories;
  } catch (e) {}

  /* ===============================================Get Brand Data Settings ===============================================*/

  try {
    const { data: brandproductData } = await client.query({
      query: GET_BRANDS_QUERY,
    });
    brandProduct = brandproductData.brands.data;
  } catch (e) {}

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
