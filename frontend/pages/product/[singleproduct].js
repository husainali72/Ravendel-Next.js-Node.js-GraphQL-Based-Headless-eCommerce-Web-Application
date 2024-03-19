import React, { useState, useEffect } from "react";
import Head from "next/head";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import client from "../../apollo-client";
import { Container } from "react-bootstrap";
import {
  GET_HOMEPAGE_DATA_QUERY,
  GET_RELATED_PRODUCTS_QUERY,
} from "../../queries/home";
import {
  GET_SINGLE_PRODUCT,
  GET_PRODUCT_REVIEWS,
} from "../../queries/productquery";
import { GET_PRODUCTS_QUERY } from "../../queries/shopquery";
import { Tab, Col, Nav } from "react-bootstrap";
import GalleryImagesComponents from "../../components/category/GalleryImage";
import OnSaleProductCard from "../../components/category/onSaleProductCard";
import ReviewForm from "../../components/singleproductcomponent/ReviewForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Reviews from "../../components/Reviews/Reviews";
import { currencySetter } from "../../utills/helpers";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import  { Toaster } from "react-hot-toast";
import { get } from "lodash";
import PropTypes from 'prop-types';
function transform(node, index) {
  if (
    (node.type === "tag" && node.name === "h1") ||
    node.name === "h2" ||
    node.name === "h3"
  ) {
    node.name = "p";
    return convertNodeToElement(node, index, transform);
  }
  if (node.type === "tag" && node.name === "a") {
    node.name = "p";
    return convertNodeToElement(node, index, transform);
  }
  if (node.type === "tag" && node.name === "strong") {
    node.name = "span";
    return convertNodeToElement(node, index, transform);
  }
}
const options = {
  decodeEntities: true,
  transform,
};

const SingleProduct = ({
  allProduct,
  singleproducts,
  currencyStore,
  homepageData,
  lowStockThreshold,
  outOfStockVisibility,
  outOfStockThreshold,
}) => {
  const router = useRouter();
  const session = useSession();
  const currencyOption = currencyStore?.currency_options;
  const [currency, setCurrency] = useState("$");
  const [singleProduct, setSingleProduct] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);
  const [singleProductReview, setSingleProductReview] = useState([]);
  const [stockClass, setStockClass] = useState("");
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    currencySetter(get(currencyOption,'currency'), setCurrency);
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const id = singleproducts?._id;
        const { data: productReviewData } = await client.query({
          query: GET_PRODUCT_REVIEWS,
          variables: { id },
        });
        const productreviews = get(productReviewData, "productwisereview.data");
        setSingleProductReview(productreviews);
      } catch (e) {}
    };
    getReviews();
  }, [singleproducts]);
  useEffect(() => {
    var product = singleproducts;
    setSingleProduct({...product});
    var allimages = [];
    allimages.push(get(product, "feature_image", ""));
    get(product, "gallery_image", [])?.map((img) => {
      allimages.push(img);
    });

    setSliderImages(allimages);
  }, [singleproducts]);

  return (
    <div>
      <Head>
        <title>{get(singleproducts, "meta.title", "") + " | Ravendel"}</title>
        <meta
          name="description"
          content={get(singleproducts, "meta.description")}
        />
        <meta name="keywords" content={get(singleproducts, "meta.keywords")} />
      </Head>
      <BreadCrumb title={`product`} />
      <section className="product-cart-section">
        <Toaster />
        <Container>
          <div className="row">
            <div className="col-lg-12">
              <div className="product-detail accordion-detail">
                <div>
                  <GalleryImagesComponents
                    homepageData={homepageData}
                    currencyOption={currencyOption}
                    stockClass={stockClass}
                    setStockClass={setStockClass}
                    outOfStockThreshold={outOfStockThreshold}
                    lowStockThreshold={lowStockThreshold}
                    outOfStockVisibility={outOfStockVisibility}
                    galleryImages={sliderImages}
                    singleProducts={singleproducts}
                    currency={currency}
                  />
                </div>
              </div>
              <div>
                <hr></hr>
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey="description"
                >

                  <Col>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item style={{ display: "flex" }}>
                        <Nav.Link type="button" eventKey="description">
                          Description
                        </Nav.Link>
                        <Nav.Link eventKey="review">Review</Nav.Link>
                      </Nav.Item>
                      <Tab.Content>
                        <Tab.Pane eventKey="description">
                          <div style={{ padding: "20px", marginTop: "15px" }}>
                            {singleproducts?.description !== null &&
                            singleproducts?.description !== "" ? (
                              ReactHtmlParser(
                                get(singleproducts, "description"),
                                options
                              )
                            ) : (
                              <p>Product Discription not available</p>
                            )}
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                      <Tab.Content>
                        <Tab.Pane eventKey="review">
                          {singleProduct !== null ? (
                            <Reviews
                              singleProductReview={singleProductReview}
                            />
                          ) : null}

                          {session.status === "authenticated" ? (
                            <ReviewForm
                              productId={get(singleproducts, "_id")}
                            />
                          ) : (
                            <div style={{ padding: "20px", marginTop: "15px" }}>
                              <p>No Data Found</p>
                            </div>
                          )}
                        </Tab.Pane>
                      </Tab.Content>
                    </Nav>
                  </Col>
                </Tab.Container>
                <hr></hr>
                <h4 className="theme-color my-4 ">
                  Related <span className="black-color">Products</span>
                </h4>
                <OnSaleProductCard
                  onSaleProduct={allProduct}
                  hidetitle
                  currencyProp={currency}
                  currencyOpt={currencyStore}
                  homepageData={homepageData}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
export default SingleProduct;

export async function getStaticPaths() {
  var allProduct = [];
  try {
    const { data: shopproducts } = await client.query({
      query: GET_PRODUCTS_QUERY,
    });
    allProduct = get(shopproducts, "products.data");
  } catch (e) {}

  const paths = allProduct?.map((curElem) => ({
    params: { singleproduct: curElem?.url?.toString() },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
SingleProduct.propTypes = {
  allProduct: PropTypes.array.isRequired,
  recentProducts: PropTypes.array.isRequired,
  singleproducts: PropTypes.object.isRequired,
  productReviews: PropTypes.array.isRequired,
  currencyStore: PropTypes.object.isRequired,
  homepageData: PropTypes.object.isRequired,
  lowStockThreshold: PropTypes.number.isRequired,
  outOfStockVisibility: PropTypes.bool.isRequired,
  outOfStockThreshold: PropTypes.number.isRequired,
};

export async function getStaticProps({ params }) {
  const url = get(params, "singleproduct");
  let id = "";
  let homepageData = [];
  let singleproducts = [];
  let allProduct = [];
  let recentProducts = [];
  let productReviews = [];
  var currencyStore = [];
  let lowStockThreshold = 4;
  let outOfStockVisibility = true;
  let outOfStockThreshold = 0;

  /* ========================================= get HomePage Data========================================*/

  try {
    const { data: homepagedata } = await client.query({
      query: GET_HOMEPAGE_DATA_QUERY,
    });
    homepageData = homepagedata;
    lowStockThreshold = get(
      homepagedata,
      "getSettings.store.inventory.low_stock_threshold"
    );
    outOfStockThreshold = get(
      homepagedata,
      "getSettings.store.inventory.out_of_stock_threshold"
    );
    outOfStockVisibility = get(
      homepagedata,
      "getSettings.store.inventory.out_of_stock_visibility"
    );
    currencyStore = get(homepagedata, "getSettings.store");
  } catch (e) {}

  /* ========================================= get SingleProduct Data========================================*/

  try {
    const { data: singleproductsData } = await client.query({
      query: GET_SINGLE_PRODUCT,
      variables: { url },
    });
    singleproducts = get(singleproductsData, "productbyurl.data", {});
    id = get(singleproducts, "_id", "");
  } catch (e) {}
  /* ========================================= get Related Products ========================================*/

  const category =
    !!get(singleproducts, "categoryId")?.length &&
    get(singleproducts, "categoryId", [])?.map((cat) => cat?.id);
  const productID = get(singleproducts, "_id") || "";
  try {
    const { data: shopproductcategory } = await client.query({
      query: GET_RELATED_PRODUCTS_QUERY,
      variables: { category, productID },
    });
    recentProducts = shopproductcategory;
    allProduct = shopproductcategory.relatedProducts;
  } catch (e) {}

  /* ========================================= get Product Reviews ========================================*/
  try {
    const { data: productReviewData } = await client.query({
      query: GET_PRODUCT_REVIEWS,
      variables: { id },
    });

    productReviews = get(productReviewData, "productwisereview.data");
  } catch (e) {}

  return {
    props: {
      singleproducts,
      allProduct,
      productReviews,
      homepageData,
      currencyStore,
      lowStockThreshold,
      outOfStockVisibility,
      outOfStockThreshold,
      recentProducts,
    },
    revalidate: 10,
  };
}