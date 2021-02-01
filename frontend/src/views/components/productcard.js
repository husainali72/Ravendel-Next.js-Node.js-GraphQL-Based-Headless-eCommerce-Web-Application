import React, { useState, useEffect, Fragment } from "react";
import { Button, Zoom, Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

var PlaceHolder =
  "https://www.hbwebsol.com/wp-content/uploads/2020/07/category_dummy.png";
const ProductCard = ({productDetail, index, GirdProductView}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [prodIndex, setProdIndex] = useState("");

  const checkProductCart = (singleProduct) => {
    if (cart.products) {
      cart.products.map(
        (cartProduct) =>
          cartProduct.id === singleProduct.id && (singleProduct.cart = true)
      );
    } else {
      singleProduct.cart = false;
    }
  };

  const addToCart = (singleProduct) => {
    if (singleProduct.cart) {
      alert("Item is already in a Cart");
    } else {
      var product;
      if (singleProduct.id === productDetail.id) {
        productDetail.cart = true;
        product = {
          id: singleProduct.id,
          cartQty: 1,
        };
      }
      dispatch({
        type: "ADD_VALUE",
        payload: product,
      });
    }
  };

  const categoryListing = (categoryID) => {};

  return (
    <div
      className={
        GirdProductView
          ? "product-card product-grid-view"
          : "product-card"
      }
      onMouseOver={() => setProdIndex(index)}
      onMouseOut={() => setProdIndex("")}
    >
      {checkProductCart(productDetail)}
      <div className="product-image-wrapper">
        <img
          src={
            productDetail.feature_image &&
            productDetail.feature_image.medium
              ? productDetail.feature_image.medium
              : PlaceHolder
          }
          alt="product"
        />
        <Zoom in={index === prodIndex ? true : false}>
          <div className="hover-content">
            <Link to={`/product/${productDetail.url}`}>
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
              onClick={() => addToCart(productDetail)}
            >
              {productDetail.cart ? "Added" : "Add To Cart"}
            </Button>
          </div>
        </Zoom>
      </div>
      <div className="product-details">
        {productDetail.categoryId && (
          <span className="product-category">
            {categoryListing(productDetail.categoryId)}
          </span>
        )}

        <Link to={`/product/${productDetail.url}`}>
          <h3 className="product-title">
            {productDetail.name.length > 50 ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: productDetail.name.substring(0, 60) + "...",
                }}
              ></span>
            ) : (
              productDetail.name
            )}
          </h3>
        </Link>

        <p className="product-price">
          {productDetail.pricing.sellprice ? (
            <span className="sale-price">
              ${productDetail.pricing.sellprice.toFixed(2)}
            </span>
          ) : (
            ""
          )}
          <span
            className={
              productDetail.pricing.sellprice ? "has-sale-price" : ""
            }
          >
            ${productDetail.pricing.price.toFixed(2)}
          </span>

          {productDetail.pricing.sellprice ? (
            <Fragment>
              {/* <span className="save-price">
                Save: $
                {(
                  productDetail.pricing.price -
                  productDetail.pricing.sellprice
                ).toFixed(2)}
                <span className="percantage-save">
                  (
                  {Math.round(
                    (100 / productDetail.pricing.price) *
                      (productDetail.pricing.price -
                        productDetail.pricing.sellprice)
                  )}
                  %)
                </span>
              </span> */}
              <span className="save-price">
                <span className="percantage-save">
                  {Math.round(
                    (100 / productDetail.pricing.price) *
                      (productDetail.pricing.price -
                        productDetail.pricing.sellprice)
                  )}
                  % off
                </span>
              </span>
            </Fragment>
          ) : null}
        </p>
        <p>
          {productDetail.quantity < 1 ? (
            <span className="out-of-stock">
              <Icon>sentiment_very_dissatisfied</Icon> Out Of Stock
            </span>
          ) : null}
        </p>
        {productDetail.pricing.sellprice ? (
          <span className="sale-price-label">Sale</span>
        ) : null}
      </div>
    </div>
  ); 
};

export default ProductCard;
