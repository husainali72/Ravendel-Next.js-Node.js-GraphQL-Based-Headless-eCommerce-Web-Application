import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Banner } from "./components";
import ProductSlider from "../components/productslider";
import ProductGrid from "../components/productgrid";
import CategoryListing from "../components/categorylist";
import {
  productsAction,
  categoriesAction,
  getSaleProductsAction,
  getRecentProductsAction,
  getFeaturedProductsAction,
  getProductByCatIDAction,
} from "../../store/action/productAction";
import { homepageAction } from "../../store/action/homepageAction";
import { blogsAction } from "../../store/action/blogAction";
import { isEmpty } from "../../utils/helper";
import Loading from "../components/loading";
import { Helmet } from "react-helmet";

const Home = (props) => {
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
    // if (isEmpty(props.products.products)) {
    //   props.productsAction();
    // }
    if (isEmpty(props.products.categories)) {
      props.categoriesAction();
    }
    if (isEmpty(props.home.homepage)) {
      props.homepageAction();
    }
  }, []);

  // Homepage Setting set
  useEffect(() => {
    if (!isEmpty(props.home.homepage)) {
      setHomepageSetting(props.home.homepage);
    }
  }, [props.home.homepage]);

  // Section show by setting page
  useEffect(() => {
    if (homepageSetting.appearance.home.add_section_in_home.products_on_sales) {
      props.getSaleProductsAction();
    }
    if (homepageSetting.appearance.home.add_section_in_home.feature_product) {
      props.getFeaturedProductsAction();
    }
    if (
      homepageSetting.appearance.home.add_section_in_home
        .recently_added_products
    ) {
      props.getRecentProductsAction();
    }

    if (
      homepageSetting.appearance.home.add_section_in_home
        .product_from_specific_categories
    ) {
      props.getProductByCatIDAction("5ea404daf2d07839fba0526a");
    }
  }, [homepageSetting]);

  // Featured Products Set
  useEffect(() => {
    if (!isEmpty(props.featuredProducts)) {
      if (props.featuredProducts.featureproducts) {
        setFeaturedProducts(props.featuredProducts.featureproducts);
      }
    }
  }, [props.featuredProducts]);

  // Sale Products Set
  useEffect(() => {
    if (!isEmpty(props.onSaleProducts)) {
      if (props.onSaleProducts.onSaleProducts) {
        setSaleProducts(props.onSaleProducts.onSaleProducts);
      }
    }
  }, [props.onSaleProducts]);

  // Recent Products Set
  useEffect(() => {
    if (!isEmpty(props.recentProducts)) {
      if (props.recentProducts.recentproducts) {
        setRecentProducts(props.recentProducts.recentproducts);
      }
    }
  }, [props.recentProducts]);

  // Category wise products
  useEffect(() => {
    if (!isEmpty(props.productsByCatId)) {
      if (props.productsByCatId.productsbycatid) {
        setCatIdProducts(props.productsByCatId.productsbycatid);
      }
    }
  }, [props.productsByCatId]);

  return (
    <Fragment>
      <Helmet>
        <title>{homepageSetting.seo.meta_title}</title>
        <meta
          name="description"
          content={homepageSetting.seo.meta_description}
        />
      </Helmet>

      {props.products.loading || props.blogs.loading || props.home.loading ? (
        <Loading />
      ) : (
        ""
      )}

      {/* ==============Banner================ */}
      {homepageSetting.appearance.home.slider.length < 0 ? (
        ""
      ) : (
        <Banner sliders={homepageSetting.appearance.home.slider} />
      )}

      {/* ==============Categories List================ */}

      <CategoryListing
        allCategories={props.products.categories}
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

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
    blogs: state.blogs,
    home: state.homepage,
    featuredProducts: state.products.featuredProducts,
    recentProducts: state.products.recentProducts,
    productsByCatId: state.products.productsByCatId,
    onSaleProducts: state.products.onSaleProducts,
  };
};

const mapDispatchToProps = {
  productsAction,
  categoriesAction,
  blogsAction,
  homepageAction,
  getSaleProductsAction,
  getRecentProductsAction,
  getFeaturedProductsAction,
  getProductByCatIDAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
