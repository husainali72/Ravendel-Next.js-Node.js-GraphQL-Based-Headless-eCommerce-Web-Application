import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {useDispatch, useSelector} from 'react-redux';
import { Banner } from "./components";
import ProductSlider from "../components/productslider";
import ProductGrid from "../components/productgrid";
import CategoryListing from "../components/categorylist";
import {
  categoriesAction,
  getSaleProductsAction,
  getRecentProductsAction,
  getFeaturedProductsAction,
  getProductByCatIDAction,
} from "../../store/action/productAction";
import { homepageAction } from "../../store/action/homepageAction";
import { isEmpty } from "../../utils/helper";
import Loading from "../components/loading";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const home = useSelector(state => state.homepage);
  const featuredProductsState = useSelector(state => state.featuredProducts);
  const recentProductsState = useSelector(state => state.recentProducts);
  const productsByCatId = useSelector(state => state.productsByCatId);
  const onSaleProducts = useSelector(state => state.onSaleProducts);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [catIdProducts, setCatIdProducts] = useState([]);
  const [homepageSetting, setHomepageSetting] = useState({
    seo: {
      meta_description: "",
      meta_tag: "",
      meta_title: "",
    },
    appearance: {
      home: {
        slider: [],
        add_section_in_home: {
          feature_product: false,
          most_viewed_products: false,
          product_from_specific_categories: false,
          product_recommendation: false,
          products_on_sales: false,
          recently_added_products: false,
          recently_bought_products: false,
        },
      },
    },
  });

  // API Call of Products, Categories, Homepage setting
  useEffect(() => {
    if (isEmpty(products.categories)) {
      dispatch(categoriesAction());
    }
    if (isEmpty(home.homepage)) {
      dispatch(homepageAction());
    }
  }, []);

  // Homepage Setting set
  useEffect(() => {
    if (!isEmpty(home.homepage)) {
      setHomepageSetting(home.homepage);
    }
  }, [home.homepage]);

  // Section show by setting page
  useEffect(() => {
    if (homepageSetting.appearance.home.add_section_in_home.products_on_sales) {
      dispatch(getSaleProductsAction());
    }
    if (homepageSetting.appearance.home.add_section_in_home.feature_product) {
      dispatch(getFeaturedProductsAction());
    }
    if (
      homepageSetting.appearance.home.add_section_in_home
        .recently_added_products
    ) {
      dispatch(getRecentProductsAction());
    }

    if (
      homepageSetting.appearance.home.add_section_in_home
        .product_from_specific_categories
    ) {
      dispatch(getProductByCatIDAction("5ea404daf2d07839fba0526a"));
    }
  }, [homepageSetting]);

  // Featured Products Set
  useEffect(() => {
    if (!isEmpty(featuredProductsState)) {
      if (featuredProductsState.featureproducts) {
        setFeaturedProducts(featuredProductsState.featureproducts);
      }
    }
  }, [featuredProductsState]);

  // Sale Products Set
  useEffect(() => {
    if (!isEmpty(onSaleProducts)) {
      if (onSaleProducts.onSaleProducts) {
        setSaleProducts(onSaleProducts.onSaleProducts);
      }
    }
  }, [onSaleProducts]);

  // Recent Products Set
  useEffect(() => {
    if (!isEmpty(recentProductsState)) {
      if (recentProductsState.recentproducts) {
        setRecentProducts(recentProductsState.recentproducts);
      }
    }
  }, [recentProductsState]);

  // Category wise products
  useEffect(() => {
    if (!isEmpty(productsByCatId)) {
      if (productsByCatId.productsbycatid) {
        setCatIdProducts(productsByCatId.productsbycatid);
      }
    }
  }, [productsByCatId]);

  return (
    <Fragment>
      <Helmet>
        <title>{homepageSetting.seo.meta_title}</title>
        <meta
          name="description"
          content={homepageSetting.seo.meta_description}
        />
      </Helmet>

      {products.loading || home.loading ? (
        <Loading />
      ) : null}

      {/* ==============Banner================ */}
      {homepageSetting.appearance.home.slider.length < 0 ? null : (
        <Banner sliders={homepageSetting.appearance.home.slider} />
      )}

      {/* ==============Categories List================ */}
      <CategoryListing
        allCategories={products.categories}
        title="Categories"
      />

      {/* ==============Featured Products================ */}
      {homepageSetting.appearance.home.add_section_in_home.feature_product &&
      featuredProducts.length > 0 ? (
        <Fragment>
          {featuredProducts.length > 5 ? (
            <ProductSlider
              allProducts={featuredProducts}
              title="Featured Products"
            />
          ) : (
            <ProductGrid
              allProducts={featuredProducts}
              title="Featured Products"
            />
          )}
          <img
            src="https://www.hbwebsol.com/wp-content/uploads/2020/06/section.jpg"
            alt="Feature Product Graphics"
          />
        </Fragment>
      ) : (
        ""
      )}

      {/* ==============Specific Category Products================ */}
      {homepageSetting.appearance.home.add_section_in_home
        .product_from_specific_categories && catIdProducts.length > 0 ? (
        <ProductSlider allProducts={catIdProducts} title="Womens Sunglasses" />
      ) : (
        ""
      )}

      {/* ==============OnSale Products================ */}
      {homepageSetting.appearance.home.add_section_in_home.products_on_sales &&
      saleProducts.length > 0 ? (
        <Fragment>
          <ProductGrid
            allProducts={saleProducts}
            title="On Sale Products"
            onSale={true}
          />
          <img
            src="https://www.hbwebsol.com/wp-content/uploads/2020/07/section2.jpg"
            alt="On Sale Product Graphics"
          />
        </Fragment>
      ) : (
        ""
      )}

      {/* ==============Recently Added Products================ */}

      {homepageSetting.appearance.home.add_section_in_home
        .recently_added_products && recentProducts.length > 0 ? (
        <Fragment>
          {recentProducts.length > 5 ? (
            <ProductSlider
              allProducts={recentProducts}
              title="Recently Added Products"
            />
          ) : (
            <ProductGrid
              allProducts={featuredProducts}
              title="Featured Products"
            />
          )}
        </Fragment>
      ) : (
        ""
      )}

      {/* ==============Most Viewed Products================ */}

      {/* {homepageSetting.appearance.home.add_section_in_home
        .most_viewed_products ? (
        <ProductGrid
          allProducts={props.products.products}
          title="Most Viewed Product"
        />
      ) : (
        ""
      )} */}

      {/* ==============Recently Bought Products================ */}

      {/* {homepageSetting.appearance.home.add_section_in_home
        .recently_bought_products ? (
        <ProductGrid
          allProducts={props.products.products}
          title="Recently Bought Products"
        />
      ) : (
        ""
      )} */}

      {/* ==============Recommendation Products================ */}

      {/* {homepageSetting.appearance.home.add_section_in_home
        .product_recommendation ? (
        <ProductSlider
          allProducts={props.products.products}
          title="Recommendation Products"
        />
      ) : (
        ""
      )} */}
    </Fragment>
  );
};

export default Home;
