/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty */
/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import Homebanner from "../components/banner/homebanner";
import Category from "../components/category/category";
import FeatureBrand from "../components/category/featurebrand";
import OnSaleProductCard from "../components/category/onSaleProductCard";
import {
  GET_HOMEPAGE_DATA_QUERY,
  GET_CATEGORIES_QUERY,
  GET_HOMEPAGE_QUERY,
} from "../queries/home";
import { useEffect, useRef } from "react";
import { queryWithoutToken } from "../utills/helpers";
import { useSelector, useDispatch } from "react-redux";
import { storeSetting } from "../redux/actions/settingAction";
import CustomBanner from "../components/banner/CustomBanner";
import MegaMenu from "../components/megaMenu";
import { get } from "lodash";
import PropTypes from "prop-types";
export default function Home({
  settings,
  setOpenMenu,
  openMenu,
  seoInfo,
  homePageSliderInfo,
  parentCategories,
  homePageSections,
}) {
  const initialRender = useRef(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  useEffect(() => {
    dispatch(storeSetting(settings));
  }, [settings]);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    }
  }, [cart]);

  return (
    <div>
      <Head>
        <title>{get(seoInfo, "meta_title", "Ravendel")}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={get(seoInfo, "meta_description", "Ravendel")}
        />
        <meta name="keywords" content={get(seoInfo, "meta_tag", "")} />
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
      {openMenu && <MegaMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />}
      <div className="home-page">
        {get(homePageSliderInfo, "slider")?.length > 0 ? (
          <Homebanner
            settings={settings}
            slider={get(homePageSliderInfo, "slider")}
          />
        ) : null}
        {parentCategories && parentCategories?.length > 0 ? (
          <Category category={parentCategories} />
        ) : null}
        {homePageSections &&
          homePageSections?.length > 0 &&
          homePageSections?.map((section) => (
            <>
              {get(section, "section_img") && (
                <CustomBanner variant={get(section, "section_img")} />
              )}
              {get(section, "products", [])?.length > 0 && (
                <OnSaleProductCard
                  titleShow={get(section, "name")}
                  onSaleProduct={get(section, "products", [])}
                  display_type={get(section, "display_type", [])}
                />
              )}
            </>
          ))}
      </div>
    </div>
  );
}
Home.propTypes = {
  slider: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  setOpenMenu: PropTypes.func.isRequired,
  openMenu: PropTypes.bool.isRequired,
  seoInfo: PropTypes.object.isRequired,
  homePageSliderInfo: PropTypes.object.isRequired,
  parentCategories: PropTypes.array.isRequired,
};
export async function getStaticProps() {
  var parentCategories = [];
  var settings = {};
  var homePageSections = [];
  let seoInfo = {};
  let homePageSliderInfo = {};
  /* ===============================================Get  Settings ===============================================*/
  try {
    const { data: fetchedHomePageData } = await queryWithoutToken(
      GET_HOMEPAGE_DATA_QUERY
    );
    settings = get(fetchedHomePageData, "getSettings", {});
    let homepageSettings = get(fetchedHomePageData, "getSettings", {});
    homePageSliderInfo = get(homepageSettings, "appearance.home", {});
    seoInfo = get(homepageSettings, "seo", {});
  } catch (e) {}
  let variable = {
    deviceType: 1,
  };
  /* ===============================================Get HomepageData  ===============================================*/
  try {
    const { data: homePagedata } = await queryWithoutToken(
      GET_HOMEPAGE_QUERY,
      variable
    );
    let sectionData = get(homePagedata, "getHomePage", []);
    homePageSections = get(sectionData, "sections", []);
    parentCategories = get(homePagedata, "getHomePage.parentCategories", []);
  } catch (e) {}

  return {
    props: {
      settings,
      seoInfo,
      homePageSliderInfo,
      parentCategories,
      homePageSections,
    },
    revalidate: 10,
  };
}
