import client from "../apollo-client";
import Head from "next/head";
import Image from "next/image";
import Homebanner from "../components/banner/homebanner";
import Category from "../components/category/category";
import FeatureBrand from "../components/category/featurebrand";
import OnSaleProductCard from "../components/category/onSaleProductCard";
import {
  GET_HOMEPAGE_DATA_QUERY,
  FEATURE_PRODUCT_QUERY,
  GET_RECENT_PRODUCTS_QUERY,
  GET_CATEGORIES_QUERY,
  ON_SALE_PRODUCTS_QUERY,
  GET_REVIEWS,
} from "../queries/home";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef, useMemo } from "react";
import { mutation } from "../utills/helpers";
import { UPDATE_CART_PRODUCT } from "../queries/cartquery";
import { useSelector, useDispatch } from "react-redux";
import {
  getSettings,
  settingActionCreator,
  stripePaymentKeyAction,
} from "../redux/actions/settingAction";
import { loadReviewAction } from "../redux/actions/productAction";
import { GET_BRANDS_QUERY } from "../queries/shopquery";
import SpecificProducts from "../components/SpecificProducts";
import CustomBanner from "../components/banner/CustomBanner";
import MegaMenu from "../components/megaMenu";

export default function Home({
  homepageData,
  settings,
  setOpenMenu,
  openMenu,
  seoInfo,
  brands,
  homePageInfo,
  currencyStore,
  stripe_Public_key,
  category,
  recentproducts,
  featureproducts,
  onSaleProducts,
  allReviews,
}) {
  const [press, setPress] = useState(false);
  const initialRender = useRef(true);
  const dispatch = useDispatch();
  const session = useSession();
  const userCart = useSelector((state) => state.userCart);
  const cart = useSelector((state) => state.cart.cartItems);
  const productss = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(stripePaymentKeyAction(stripe_Public_key));
    dispatch(settingActionCreator(currencyStore.currency_options));
  }, [currencyStore.currency_options]);
  useEffect(() => {
    dispatch(getSettings(settings));
  }, [settings]);

  useEffect(() => {
    dispatch(loadReviewAction(allReviews?.reviews?.data));
  }, [allReviews]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      if (session.status === "authenticated") {
        userCartUpdate(userCart, cart);
      }
    } else {
      setPress(true);
    }
  }, [userCart, cart]);

  async function userCartUpdate(userCart, cart) {
    let token = await session.data.user.accessToken.token;
    var Cart = await cart.map((product) => {
      return {
        productId: product._id,
        qty: product.quantity,
        productTitle: product?.name,
        productImage: product?.feature_image?.original,
        productPrice: product?.pricing?.toString() || "0",
      };
    });

    let variables = {
      id: userCart.card_id,
      products: Cart,
      total: 0,
    };

    if (userCart.card_id === undefined) {
      return undefined;
    } else {
      // await mutation(UPDATE_CART_PRODUCT, variables, token).then(res => res)
    }
  }
  const HomePageSeq = useMemo(
    () => homepageData?.getSettings?.appearance?.home?.add_section_web,
    [homepageData]
  );
  const renderSwitch = (section) => {
    switch (section.name) {
      case "products_on_sales":
        if (section.visible) {
          return onSaleProducts?.length > 0 ? (
            <>
              <CustomBanner variant={"sale-banner"} />
              <OnSaleProductCard
                homepageData={homepageData}
                onSaleProduct={onSaleProducts}
              />
            </>
          ) : null;
        }
        break;

      case "recently_added_products":
        if (section.visible) {
          return recentproducts?.length > 0 ? (
            <>
              <CustomBanner variant={"new-arrival-banner"} />
              <OnSaleProductCard
                homepageData={homepageData}
                onSaleProduct={recentproducts}
                titleShow={"Recent"}
              />
            </>
          ) : null;
        }
        break;

      case "feature_product":
        if (section.visible) {
          return featureproducts?.length > 0 ? (
            <>
              <CustomBanner variant={"fashion-banner"} />
              <OnSaleProductCard
                homepageData={homepageData}
                onSaleProduct={featureproducts}
                titleShow={"featured"}
              />
            </>
          ) : null;
        }

        break;

      case "product_from_specific_category":
        if (section.visible && section.category) {
          return (
            <SpecificProducts homepageData={homepageData} section={section} />
          );
        }
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Head>
        <title>{seoInfo?.meta_title || "Ravendel"}</title>
        <link rel="icon" href="/favicon.ico" />
        {seoInfo && seoInfo.meta_description ? (
          <meta name="description" content={seoInfo.meta_description} />
        ) : null}
        {seoInfo && seoInfo.meta_tag ? (
          <meta name="keywords" content={seoInfo.meta_tag} />
        ) : null}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      {openMenu && (
        <MegaMenu
          openMenu={openMenu}
          categories={category}
          newProducts={recentproducts}
          setOpenMenu={setOpenMenu}
        />
      )}
      {homePageInfo &&
      homePageInfo.slider &&
      homePageInfo.slider?.length > 0 ? (
        <Homebanner
          homepageData={homepageData}
          slider={homePageInfo.slider}
          Image={Image}
        />
      ) : null}

      {category?.length > 0 ? (
        <Category homepageData={homepageData} category={category} />
      ) : null}

      {brands?.length > 0 ? (
        <FeatureBrand homepageData={homepageData} brands={brands} />
      ) : null}
      {/* <RavendelBanner /> */}

      {HomePageSeq?.map((section) => renderSwitch(section))}
    </div>
  );
}

export async function getStaticProps() {
  var homepageData = [];
  var featureproducts = [];
  var category = [];
  var recentproducts = [];
  var onSaleProducts = [];
  var currencyStore = [];
  var settings = {};
  var allReviews = {};
  let stripe_Public_key = "";
  var brands = [];
  /* ===============================================Get HomepageData Settings ===============================================*/

  try {
    const { data: homepagedata } = await client.query({
      query: GET_HOMEPAGE_DATA_QUERY,
    });
    homepageData = homepagedata;
    settings = homepagedata?.getSettings;
    currencyStore = homepagedata?.getSettings?.store;
    stripe_Public_key = homepagedata?.getSettings?.paymnet?.stripe;
  } catch (e) {

  }

  /* ===============================================Get Settings ===============================================*/
  // if (homepageData?.getSettings?.appearance.home.add_section_in_home.feature_product) {
  try {
    const { data: featureproductsData } = await client.query({
      query: FEATURE_PRODUCT_QUERY,
    });

    featureproducts = featureproductsData?.featureproducts;
  } catch (e) {

  }
  // }
  /* ===============================================Get Recent Prdouct ===============================================*/
  // if (homepageData?.getSettings?.appearance.home.add_section_in_home?.recently_added_products) {
  try {
    const { data: recentprductData } = await client.query({
      query: GET_RECENT_PRODUCTS_QUERY,
    });
    recentproducts = recentprductData?.recentproducts;
  } catch (e) {

  }
  // }

  /* ===============================================Get Category Prdouct ===============================================*/

  try {
    const { data: categoryData } = await client.query({
      query: GET_CATEGORIES_QUERY,
    });
    category = categoryData?.productCategories.data;
  } catch (e) {

  }
  /* ===============================================Get Brands Prdouct ===============================================*/

  try {
    const { data: brandproductData } = await client.query({
      query: GET_BRANDS_QUERY,
    });
    brands = brandproductData.brands.data;
  } catch (e) {

  }

  /* ===============================================Get All product Reviews  ===============================================*/

  try {
    const { data: Reviews } = await client.query({
      query: GET_REVIEWS,
    });
    allReviews = Reviews;
  } catch (e) {

  }

  /* ===============================================Get OnSale Product  ===============================================*/

  // if (!homepageData?.getSettings?.appearance.home.add_section_in_home.products_on_sales) {           //dont know why in this if condition the product on sale is false so I have to change the if conditon to work if it is false which is not good I think
  try {
    const { data: onSaleProductsData } = await client.query({
      query: ON_SALE_PRODUCTS_QUERY,
    });

    onSaleProducts = onSaleProductsData?.onSaleProducts;
  } catch (e) {
  }
  // }

  let seoInfo = {};
  let homePageInfo = {};
  let themeInfo = {};

  if (homepageData && homepageData.getSettings) {
    let settings = homepageData.getSettings;
    if (settings.appearance && settings.appearance.home) {
      homePageInfo = settings.appearance.home;
    }
    if (settings.appearance && settings.appearance.theme) {
      themeInfo = settings.appearance.theme;
    }
    if (settings.seo) {
      seoInfo = settings.seo;
    }
  }
  return {
    props: {
      homepageData,
      currencyStore,
      stripe_Public_key,
      seoInfo,
      homePageInfo,
      themeInfo,
      featureproducts,
      recentproducts,
      category,
      onSaleProducts,
      allReviews,
      brands,
      settings,
    },
    revalidate: 10,
  };
}
