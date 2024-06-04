/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import client from "../../apollo-client";
import { Container } from "react-bootstrap";
import {
  GET_HOMEPAGE_DATA_QUERY,
  GET_RELATED_PRODUCTS_QUERY,
} from "../../queries/home";
import { GET_SINGLE_PRODUCT } from "../../queries/productquery";
import { GET_PRODUCTS_QUERY } from "../../queries/shopquery";
import GalleryImagesComponents from "../../components/singleproductcomponent/GalleryImage";
import OnSaleProductCard from "../../components/category/onSaleProductCard";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { get } from "lodash";
import PropTypes from "prop-types";
import Reviews from "../../components/singleproductcomponent/Reviews";
import ProductDetails from "../../components/singleproductcomponent/productDetails";
import CategoryBreadCrumb from "../../components/breadcrumb";
import AddionalDetail from "../../components/singleproductcomponent/RelatedProducts";
import Meta from "../../components/Meta";

const SingleProduct = ({
  allProduct,
  singleproducts,
  homepageData,
  lowStockThreshold,
  outOfStockVisibility,
  outOfStockThreshold,
}) => {
  const router = useRouter();
  const [sliderImages, setSliderImages] = useState([]);
  const [stockClass, setStockClass] = useState("");
  useEffect(() => {
    var product = singleproducts;
    var allimages = [];
    allimages.push(get(product, "feature_image", ""));
    get(product, "gallery_image", [])?.map((img) => {
      allimages.push(img);
    });

    setSliderImages(allimages);
  }, [singleproducts]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const getMetaTitle = () => {
    const metaTitle = get(singleproducts, 'meta.title', '');
    const name = get(singleproducts, 'name', '');
    return metaTitle || name || '';
};
  return (
    <div>
      <Meta title={getMetaTitle()} discription={get(singleproducts, "meta.description",'')} keywords={get(singleproducts, "meta.keywords",'')}/>
      <CategoryBreadCrumb className="single-product" breadCrumbs={get(singleproducts, "breadcrumb", [])} />
      <section className="product-cart-section">
        <Toaster />
        <Container>
          <div className="row">
              <div className="product-detail accordion-detail">
                <div>
                  <GalleryImagesComponents
                    homepageData={homepageData}
                    stockClass={stockClass}
                    setStockClass={setStockClass}
                    outOfStockThreshold={outOfStockThreshold}
                    lowStockThreshold={lowStockThreshold}
                    outOfStockVisibility={outOfStockVisibility}
                    galleryImages={sliderImages}
                    singleProducts={singleproducts}
                  />
                </div>
              </div>
              <div>
                <div className="singleproduct-bottom-section">
                  <Reviews product={singleproducts} />
                  <ProductDetails product={singleproducts} />
                </div>
                <AddionalDetail singleProduct={singleproducts} />
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
      "getSettings.store.inventory"
    );
    outOfStockVisibility = get(
      homepagedata,
      "getSettings.store.inventory"
    );
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

  return {
    props: {
      singleproducts,
      allProduct,
      homepageData,
      lowStockThreshold,
      outOfStockVisibility,
      outOfStockThreshold,
      recentProducts,
    },
    revalidate: 10,
  };
}
