import React, { useState } from "react";
import { Button, Zoom } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProductCard = props => {
  const [prodIndex, setProdIndex] = useState("");

  const addToCart = singleProduct => {
    if (
      props.cart.products.some(product => product.title === singleProduct.title)
    ) {
      props.productDetail.cart = true;
      alert("Item already in a Cart");
    } else {
      props.dispatch({
        type: "ADD_VALUE",
        payload: props.productDetail
      });
    }
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
      <div className="product-image-wrapper">
        <img src={props.productDetail.featured_image} alt="product" />
        <Zoom in={props.index === prodIndex ? true : false}>
          <div className="hover-content">
            <Link to={`/product/${props.productDetail.title}`}>
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
        <span className="product-category">{props.productDetail.category}</span>

        <a href="google.com" target="_blank">
          <h3 className="product-title">{props.productDetail.title}</h3>
        </a>

        <p className="product-price">
          <span className={props.productDetail.sale_price && "has-sale-price"}>
            ${props.productDetail.price.toFixed(2)}
          </span>
          {props.productDetail.sale_price && (
            <span className="sale-price">
              ${props.productDetail.sale_price.toFixed(2)}
            </span>
          )}
        </p>
        {props.productDetail.sale_price && (
          <span className="sale-price-label">Sale</span>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(ProductCard);
