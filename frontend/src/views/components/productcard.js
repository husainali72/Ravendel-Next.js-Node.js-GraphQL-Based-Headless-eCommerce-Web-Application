import React, { useState, useEffect, Fragment } from "react";
import { Button, Zoom, Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PlaceHolder from "../../assets/images/product-placeholder.jpg";

const ProductCard = (props) => {
  const [prodIndex, setProdIndex] = useState("");

  const checkProductCart = (singleProduct) => {
    if (props.cart.products) {
      props.cart.products.map(
        (cartProduct) =>
          cartProduct.id === singleProduct.id && (singleProduct.cart = true)
      );
    } else {
      singleProduct.cart = false;
    }
  };

  // props.cart.products.some((product) => product.id === singleProduct.id)

  const addToCart = (singleProduct) => {
    if (singleProduct.cart) {
      alert("Item is already in a Cart");
    } else {
      if (singleProduct.id === props.productDetail.id) {
        props.productDetail.cart = true;
        props.productDetail.cartQty = 1;
      }
      props.dispatch({
        type: "ADD_VALUE",
        payload: singleProduct,
      });
    }
  };

  const categoryListing = (categoryID) => {
    var category = [];

    // category = categoryID.filter(id =>
    //   props.categories.filter(cat => id === cat.id)
    // );

    // category = props.categories.map(cat =>
    //   categoryID.filter(id => cat.id === id)
    // );

    // category = categoryID.map(id =>
    //   props.categories.filter(cat => id === cat.id)
    // );

    // category = categoryID.filter(id =>
    //   props.categories.filter(cat => id === cat.id)
    // );

    // for (var i = 0; i < categoryID.length; i++) {
    //   for (var j = 0; j < props.categories.length; j++) {
    //     if (props.categories[j].id === categoryID[i]) {
    //       return props.categories[j].name;
    //     }
    //   }
    // }
  };

  return (
    <div
      className={
        props.GirdProductView
          ? "product-card product-grid-view"
          : "product-card"
      }
      onMouseOver={() => setProdIndex(props.index)}
      onMouseOut={() => setProdIndex("")}
    >
      {checkProductCart(props.productDetail)}
      <div className="product-image-wrapper">
        <img
          src={
            props.productDetail.feature_image &&
            props.productDetail.feature_image.medium
              ? props.productDetail.feature_image.medium
              : PlaceHolder
          }
          alt="product"
        />
        <Zoom in={props.index === prodIndex ? true : false}>
          <div className="hover-content">
            <Link to={`/product/${props.productDetail.id}`}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                className="product-btn"
              >
                View
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="product-btn"
              onClick={() => addToCart(props.productDetail)}
            >
              {props.productDetail.cart ? "Added" : "Add To Cart"}
            </Button>
          </div>
        </Zoom>
      </div>
      <div className="product-details">
        {props.productDetail.categoryId && (
          <span className="product-category">
            {categoryListing(props.productDetail.categoryId)}
          </span>
        )}

        <Link to={`/product/${props.productDetail.id}`}>
          <h3 className="product-title">
            {props.productDetail.name.length > 50 ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: props.productDetail.name.substring(0, 60) + "...",
                }}
              ></span>
            ) : (
              props.productDetail.name
            )}
          </h3>
        </Link>

        <p className="product-price">
          {props.productDetail.pricing.sellprice ? (
            <span className="sale-price">
              ${props.productDetail.pricing.sellprice.toFixed(2)}
            </span>
          ) : (
            ""
          )}
          <span
            className={
              props.productDetail.pricing.sellprice ? "has-sale-price" : ""
            }
          >
            ${props.productDetail.pricing.price.toFixed(2)}
          </span>

          {props.productDetail.pricing.sellprice ? (
            <Fragment>
              {/* <span className="save-price">
                Save: $
                {(
                  props.productDetail.pricing.price -
                  props.productDetail.pricing.sellprice
                ).toFixed(2)}
                <span className="percantage-save">
                  (
                  {Math.round(
                    (100 / props.productDetail.pricing.price) *
                      (props.productDetail.pricing.price -
                        props.productDetail.pricing.sellprice)
                  )}
                  %)
                </span>
              </span> */}
              <span className="save-price">
                <span className="percantage-save">
                  {Math.round(
                    (100 / props.productDetail.pricing.price) *
                      (props.productDetail.pricing.price -
                        props.productDetail.pricing.sellprice)
                  )}
                  % off
                </span>
              </span>
            </Fragment>
          ) : null}
        </p>
        <p>
          {props.productDetail.quantity < 1 ? (
            <span className="out-of-stock">
              <Icon>sentiment_very_dissatisfied</Icon> Out Of Stock
            </span>
          ) : null}
        </p>
        {props.productDetail.pricing.sellprice ? (
          <span className="sale-price-label">Sale</span>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(ProductCard);
