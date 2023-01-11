import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Icon,
  Grid,
  Button,
  ButtonGroup,
} from"@mui/material";
import { Link } from "react-router-dom";
import PlaceHolderImg from "../assets/images/placeholder.png";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { productsAction } from "../store/action/productAction";
import { removeCartItemAction } from "../store/action/cartAction";
import { isEmpty, app_router_base_url } from "../utils/helper";
import { bucketBaseURL } from "../utils/helper";

const CartSide = (props) => {
  const [cartItems, setCartItems] = useState(props.cartValue);
  const [cartProduct, setCartProduct] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [delievery, setDelievery] = useState(0);

  const cartSubTotal = () => {
    var subtotalVar = 0;
    if (cartProduct && cartProduct.length) {
      cartProduct.map((item) => {
        if (item.pricing.sellprice) {
          var sellPrice = item.pricing.sellprice * item.cartQty;
          subtotalVar = subtotalVar + sellPrice;
        } else {
          var totalPrice = item.pricing.price * item.cartQty;
          subtotalVar = subtotalVar + totalPrice;
        }
      });
    }
    setSubTotal(subtotalVar);
  };

  const removeCartItem = (removedItem) => {
    removedItem.cart = false;
    let filteredProduct = cartProduct.filter((item) => item !== removedItem);
    let filterCartItem = cartItems.filter((item) => item.id !== removedItem.id);
    setCartProduct(filteredProduct);
    props.removeCartItemAction(filterCartItem);
  };

  const increaseItemQty = (item) => {
    cartItems.map((cart) => {
      if (cart.id === item.id) {
        cart.cartQty = cart.cartQty + 1;
      }
    });
    cookie.save("cartProducts", cartItems, { path: "/" });
    ListingCartProducts();
  };

  const decreaseItemQty = (item) => {
    if (item.cartQty <= 1) {
      return;
    }
    cartItems.map((cart) => {
      if (cart.id === item.id) {
        cart.cartQty = cart.cartQty - 1;
      }
    });
    cookie.save("cartProducts", cartItems, { path: "/" });
    ListingCartProducts();
  };

  useEffect(() => {
    cartSubTotal();
  }, [cartProduct]);

  useEffect(() => {
    if (isEmpty(props.products.products)) {
      props.productsAction();
    }
  }, []);

  const ListingCartProducts = () => {
    var filteredProducts = [];

    cartItems.map((item) => {
      props.products.products.filter((product) => {
        if (product.id === item.id) {
          product.cartQty = item.cartQty;
          filteredProducts.push(product);
        }
      });
    });

    setCartProduct(filteredProducts);
  };

  useEffect(() => {
    ListingCartProducts();
  }, [cartItems]);

  return (
    <Fragment>
      {cartProduct && cartProduct.length ? (
        <Fragment>
          <Box className="cart-product">
            <Box display="flex" flexDirection="column" component="div">
              {cartProduct
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((item, index) => (
                  <Box
                    className="cart-item"
                    key={index}
                    style={{
                      backgroundImage: `url(${item.feature_image
                        ? bucketBaseURL + item.feature_image.thumbnail
                        : PlaceHolderImg
                        })`,
                    }}
                  >
                    <div className="item-inner">
                      <Icon
                        className="remove-item"
                        onClick={() => removeCartItem(item)}
                      >
                        close
                      </Icon>

                      {item.category && (
                        <Typography variant="button" className="item-category">
                          {item.category}
                        </Typography>
                      )}

                      {item.name && (
                        <Typography variant="h6" className="item-title">
                          {item.name.length > 30
                            ? item.name.substring(0, 30) + "..."
                            : item.name}
                        </Typography>
                      )}

                      <Typography
                        variant="subtitle2"
                        className="item-qty-wrapper"
                      >
                        Qty: {item.cartQty}
                        <ButtonGroup
                          variant="contained"
                          color="primary"
                          size="small"
                          aria-label="cart-qty-button-grp"
                          className="increse-decrease-buttongrp"
                        >
                          <Button onClick={() => increaseItemQty(item)}>
                            +
                          </Button>
                          <Button onClick={() => decreaseItemQty(item)}>
                            -
                          </Button>
                        </ButtonGroup>
                      </Typography>

                      <Typography variant="h6" className="item-price">
                        <span
                          className={
                            item.pricing.sellprice ? "has-sale-price" : ""
                          }
                        >
                          ${item.pricing.price.toFixed(2)}
                        </span>

                        {item.pricing.sellprice ? (
                          <span className="sale-price">
                            ${item.pricing.sellprice.toFixed(2)}
                          </span>
                        ) : null}
                      </Typography>
                      <Link
                        to={`/product/${item.id}`}
                        className="view-item"
                        onClick={props.closeCart}
                      >
                        View
                      </Link>
                    </div>
                  </Box>
                ))}
            </Box>
          </Box>

          <Box className="cart-amount">
            <Box component="div" p={3} width="100%">
              <Typography variant="h2" className="cart-amount-title">
                Summary
              </Typography>
              <Box component="div" className="cart-amount-inner">
                <Grid container className="cart-row">
                  <Grid item md={6} sm={12} xs={12}>
                    <Typography variant="h4" className="cart-td-left">
                      Subtotal
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <Typography variant="h4" className="cart-td-right">
                      ${subtotal}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className="cart-row">
                  <Grid item md={6} sm={12} xs={12}>
                    <Typography variant="h4" className="cart-td-left">
                      DELIVERY
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <Typography variant="h4" className="cart-td-right">
                      {delievery === 0 ? "Free" : "$" + delievery}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className="cart-row">
                  <Grid item md={6} sm={12} xs={12}>
                    <Typography variant="h4" className="cart-td-left">
                      Total
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <Typography variant="h4" className="cart-td-right">
                      ${subtotal + delievery}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Link to={`${app_router_base_url}checkout`}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={props.closeCart}
                >
                  CHECKOUT
                </Button>
              </Link>
            </Box>
          </Box>
        </Fragment>
      ) : (
        <Box display="flex" className="empty-cart-wrapper" p={3} width="100%">
          <Typography variant="h4">Your cart is currently empty.</Typography>

          <Link to={`${app_router_base_url}shop`}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="margin-left-1"
              onClick={props.closeCart}
            >
              Shop Now
            </Button>
          </Link>
        </Box>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  products: state.products,
});

const mapDispatchToProps = {
  productsAction,
  removeCartItemAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartSide);
