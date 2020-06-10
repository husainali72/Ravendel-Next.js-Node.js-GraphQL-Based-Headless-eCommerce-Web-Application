import React, { Fragment, useState, useEffect } from "react";
import { Box, Typography, Icon, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import PlaceHolderImg from "../assets/images/placeholder.png";
import { connect } from "react-redux";

const CartSide = (props) => {
  const [cartItems, setCartItems] = useState(props.cartValue);

  const removeCartItem = (removedItem) => {
    removedItem.cart = false;
    let filteredArray = cartItems.filter((item) => item !== removedItem);
    localStorage.removeItem("cartProducts");
    localStorage.setItem("cartProducts", JSON.stringify(filteredArray));
    setCartItems(filteredArray);
    props.dispatch({
      type: "REMOVE_VALUE",
      payload: filteredArray,
    });
  };

  return (
    <Fragment>
      {cartItems && cartItems.length ? (
        <Fragment>
          <Box className="cart-product">
            <Box display="flex" flexDirection="column" component="div">
              {cartItems.map((item, index) => (
                <Box
                  className="cart-item"
                  key={index}
                  style={{
                    backgroundImage: `url(${
                      item.feature_image
                        ? item.feature_image.thumbnail
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
                        {item.name}
                      </Typography>
                    )}

                    <Typography variant="body2" className="item-attr">
                      Qty: 1
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
            <Box component="div" p={4} width="100%">
              <Typography variant="h2" className="cart-amount-title">
                Summary
              </Typography>
              <Box component="div" className="cart-amount-inner">
                <Grid container className="cart-row">
                  <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="h4" className="cart-td-left">
                      Subtotal
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="h4" className="cart-td-right">
                      $274.00
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className="cart-row">
                  <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="h4" className="cart-td-left">
                      DELIVERY:
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="h4" className="cart-td-right">
                      Free
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className="cart-row">
                  <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="h4" className="cart-td-left">
                      Total
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="h4" className="cart-td-right">
                      $274.00
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Link to="/checkout">
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
        <Box display="flex" p={5} width="100%">
          <Typography variant="h4">Your cart is currently empty.</Typography>
        </Box>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(CartSide);
