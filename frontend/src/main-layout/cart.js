import React, { Fragment } from "react";
import { Box, Typography, Icon, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import PlaceHolderImg from "../assets/images/placeholder.png";

const CartSide = props => {
  console.log("props.cartValue", props.cartValue);
  return (
    <Fragment>
      {props.cartValue && props.cartValue.length ? (
        <Fragment>
          <Box className="cart-product">
            <Box display="flex" flexDirection="column" component="div">
              {props.cartValue.map((cart, index) => (
                <Box
                  className="cart-item"
                  key={index}
                  style={{
                    backgroundImage: `url(${
                      cart.feature_image
                        ? cart.feature_image.thumbnail
                        : PlaceHolderImg
                    })`
                  }}
                >
                  <div className="item-inner">
                    <Icon
                      className="remove-item"
                      onClick={() => console.log("remove")}
                    >
                      close
                    </Icon>

                    {cart.category && (
                      <Typography variant="button" className="item-category">
                        {cart.category}
                      </Typography>
                    )}

                    {cart.title && (
                      <Typography variant="h6" className="item-title">
                        {cart.title}
                      </Typography>
                    )}

                    <Typography variant="body2" className="item-attr">
                      Qty: 2
                    </Typography>
                    <Typography variant="body2" className="item-attr">
                      Size: Small
                    </Typography>
                    <Typography variant="body2" className="item-attr">
                      Color: Red
                    </Typography>

                    <Typography variant="h6" className="item-price">
                      <span
                        className={
                          cart.pricing.sellprice ? "has-sale-price" : ""
                        }
                      >
                        ${cart.pricing.price.toFixed(2)}
                      </span>

                      {cart.pricing.sellprice ? (
                        <span className="sale-price">
                          ${cart.pricing.sellprice.toFixed(2)}
                        </span>
                      ) : null}
                    </Typography>
                    <Link
                      to={`/product/${cart.id}`}
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

export default CartSide;
