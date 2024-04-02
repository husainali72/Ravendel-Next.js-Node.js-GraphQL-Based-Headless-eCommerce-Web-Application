/* eslint-disable no-empty */
/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head';
import Image from 'next/image';
import Homebanner from '../components/banner/homebanner';
import Category from '../components/category/category';
import FeatureBrand from '../components/category/featurebrand';
import OnSaleProductCard from '../components/category/onSaleProductCard';
import {
  GET_HOMEPAGE_DATA_QUERY,
  FEATURE_PRODUCT_QUERY,
  GET_RECENT_PRODUCTS_QUERY,
  GET_CATEGORIES_QUERY,
  ON_SALE_PRODUCTS_QUERY,
  GET_REVIEWS,
} from '../queries/home'
import { useEffect, useRef, useMemo } from 'react';
import { queryWithoutToken } from '../utills/helpers';
import { useSelector, useDispatch } from 'react-redux';
import {
  settingActionCreator,
  storeSetting,
  stripePaymentKeyAction,
} from '../redux/actions/settingAction';
import { loadReviewAction } from '../redux/actions/productAction';
import { GET_BRANDS_QUERY } from '../queries/shopquery';
import SpecificProducts from '../components/SpecificProducts';
import CustomBanner from '../components/banner/CustomBanner';
import MegaMenu from '../components/megaMenu';
import { get } from 'lodash';
import PropTypes from 'prop-types';
export default function Home( {
  homePageData,
  settings,
  setOpenMenu,
  openMenu,
  seoInfo,
  brands,
  homePageInfo,
  currencyStore,
  stripe_Public_key,
  category,
  recentProducts,
  featureProducts,
  onSaleProducts,
  allReviews,
} ) {
  const initialRender = useRef( true );
  const dispatch = useDispatch();
  const cart = useSelector( ( state ) => state.cart.cartItems );
  useEffect( () => {
    dispatch( stripePaymentKeyAction( stripe_Public_key ) );
    dispatch( settingActionCreator( get( currencyStore, 'currency_options', {} ) ) );
  }, [ get( currencyStore, 'currency_options' ) ] );

  useEffect( () => {
    dispatch( storeSetting( settings ) );
  }, [ settings ] );

  useEffect( () => {
    dispatch( loadReviewAction( get( allReviews, 'reviews.data', [] ) ) );
  }, [ allReviews ] );

  useEffect( () => {
    if ( initialRender.current ) {
      initialRender.current = false;
    }
  }, [ cart ] );

  const HomePageSeq = useMemo(
    () => get( homePageData, 'getSettings.appearance.home.add_section_web' ),
    [ homePageData ]
  );
  const renderSwitch = ( section ) => {
    switch ( section.name ) {
      case 'products_on_sales':
        if ( get( section, 'visible' ) ) {
          return 0 < onSaleProducts?.length ? (
            <>
              <CustomBanner variant={'sale-banner'} />
              <OnSaleProductCard
                onSaleProduct={onSaleProducts}
              />
            </>
          ) : null;
        }
        break;

      case 'recently_added_products':
        if ( get( section, 'visible' ) ) {
          return 0 < recentProducts?.length ? (
            <>
              <CustomBanner variant={'new-arrival-banner'} />
              <OnSaleProductCard
                onSaleProduct={recentProducts}
                titleShow={'Recent'}
              />
            </>
          ) : null;
        }
        break;

      case 'feature_product':
        if ( get( section, 'visible' ) ) {
          return 0 < featureProducts?.length ? (
            <>
              <CustomBanner variant={'fashion-banner'} />
              <OnSaleProductCard
                onSaleProduct={featureProducts}
                titleShow={'featured'}
              />
            </>
          ) : null;
        }
        break;
      case 'product_from_specific_category':
        if ( get( section, 'visible' ) && get( section, 'category' ) ) {
          return (
            <SpecificProducts
             homepageData={homePageData}
             section={section} />
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
        <title>{get( seoInfo, 'meta_title',  'Ravendel' )}</title>
        <link rel="icon" href="/favicon.ico" />
          <meta name="description" content={get( seoInfo, 'meta_description', 'Ravendel' )} />
          <meta name="keywords" content={get( seoInfo, 'meta_tag', '' )} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      {openMenu && (
        <MegaMenu
          openMenu={openMenu}
          categories={category}
          newProducts={recentProducts}
          setOpenMenu={setOpenMenu}
        />
      )}
      {homePageInfo &&
      homePageInfo.slider &&
      0 < homePageInfo.slider?.length ? (
        <Homebanner
          homepageData={homePageData}
          slider={homePageInfo.slider}
          Image={Image}
        />
      ) : null}

      {0 < category?.length ? (
        <Category homepageData={homePageData} category={category} />
      ) : null}

      {0 < brands?.length ? (
        <FeatureBrand homepageData={homePageData} brands={brands} />
      ) : null}
      {HomePageSeq?.map( ( section ) => renderSwitch( section ) )}
    </div>
  );
}
Home.propTypes = {
  homePageData: PropTypes.object.isRequired,
  slider: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  setOpenMenu: PropTypes.func.isRequired,
  openMenu: PropTypes.bool.isRequired,
  seoInfo: PropTypes.object.isRequired,
  brands: PropTypes.array.isRequired,
  homePageInfo: PropTypes.object.isRequired,
  currencyStore: PropTypes.object.isRequired,
  stripe_Public_key: PropTypes.string.isRequired,
  category: PropTypes.array.isRequired,
  recentProducts: PropTypes.array.isRequired,
  featureProducts: PropTypes.array.isRequired,
  onSaleProducts: PropTypes.array.isRequired,
  allReviews: PropTypes.array.isRequired,
};
export async function getStaticProps() {
  var homePageData = [];
  var featureProducts = [];
  var category = [];
  var recentProducts = [];
  var onSaleProducts = [];
  var currencyStore = [];
  var settings = {};
  var allReviews = {};
  let stripe_Public_key = '';
  var brands = [];
  /* ===============================================Get HomepageData Settings ===============================================*/

  try {
    const { data: fetchedHomePageData  } = await queryWithoutToken(
      GET_HOMEPAGE_DATA_QUERY
    );
    homePageData = fetchedHomePageData;
    settings = get( fetchedHomePageData, 'getSettings', {} );
    currencyStore = get( fetchedHomePageData, 'getSetting.store', {} );
    stripe_Public_key = get( fetchedHomePageData, 'getSettings.payment.stripe', '' );
  } catch ( e ) {

  }

  /* ===============================================Get Settings ===============================================*/
  try {
    const { data: featureProductsData } = await queryWithoutToken(
      FEATURE_PRODUCT_QUERY
    );
    featureProducts = get( featureProductsData, 'featureproducts', [] );
  } catch ( e ) {}
  // }
  /* ===============================================Get Recent Prdouct ===============================================*/
  try {
    const { data: recentproductData } = await queryWithoutToken(
      GET_RECENT_PRODUCTS_QUERY
    );
    recentProducts = get( recentproductData, 'recentproducts', [] );
  // eslint-disable-next-line no-empty
  } catch ( e ) {}
  // }

  /* ===============================================Get Category Prdouct ===============================================*/

  try {
    const { data: categoryData } = await queryWithoutToken(
      GET_CATEGORIES_QUERY
    );
    category = get( categoryData, 'productCategories.data', [] );
  } catch ( e ) {}
  /* ===============================================Get Brands Prdouct ===============================================*/

  try {
    const { data: brandproductData } = await queryWithoutToken(
      GET_BRANDS_QUERY
    );
    brands = get( brandproductData, 'brands.data', [] );
  } catch ( e ) {}

  /* ===============================================Get All product Reviews  ===============================================*/

  try {
    const { data: Reviews } = await queryWithoutToken( GET_REVIEWS );
    allReviews = Reviews;
  } catch ( e ) {}

  /* ===============================================Get OnSale Product  ===============================================*/
  try {
    const { data: onSaleProductsData } = await queryWithoutToken( ON_SALE_PRODUCTS_QUERY );
    onSaleProducts = get( onSaleProductsData, 'onSaleProducts' );
  } catch ( e ) {}
  let seoInfo = {};
  let homePageInfo = {};
  let themeInfo = {};
  let homepageSettings = get( homePageData, 'getSettings', {} );
  homePageInfo = get( homepageSettings, 'appearance.home', {} );
  themeInfo = get( homepageSettings, 'appearance.theme', {} );
  seoInfo = get( homepageSettings, 'seo', {} );

  return {
    props: {
      homePageData,
      currencyStore,
      stripe_Public_key,
      seoInfo,
      homePageInfo,
      themeInfo,
      featureProducts,
      recentProducts,
      category,
      onSaleProducts,
      allReviews,
      brands,
      settings,
    },
    revalidate: 10,
  };
}
