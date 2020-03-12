import React, { Fragment, useState } from "react";
import { Box, Badge, Icon, Drawer } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CartSide from "./cart";

const Menu = props => {
  const [openCart, setOpenCart] = useState(false);
  const toggleCart = e => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setOpenCart(true);
  };

  return (
    <Fragment>
      <Box component="div" display="flex" alignItems="center">
        <Box component="div" display="inline" m={2}>
          <Link to="/home">Home</Link>
        </Box>
        <Box component="div" display="inline" m={2}>
          <Link to="/shop">Shop</Link>
        </Box>
        <Box component="div" display="inline" m={2}>
          <Link to="/about">About</Link>
        </Box>
        <Box component="div" display="inline" m={2}>
          <Link to="/contact">Contact</Link>
        </Box>
        <Box component="div" display="inline" m={2}>
          <Badge badgeContent={props.cart.products.length} color="primary">
            <Icon style={{ fontSize: 24 }} onClick={toggleCart}>
              shopping_basket
            </Icon>
          </Badge>
        </Box>
      </Box>
      <Drawer
        anchor="right"
        open={openCart}
        style={{ zIndex: 9999 }}
        onClose={() => setOpenCart(false)}
      >
        <Box className="cart-wrapper" component="div" height="100%">
          <CartSide
            cartValue={props.cart.products}
            closeCart={() => setOpenCart(false)}
          />
        </Box>
      </Drawer>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(Menu);
