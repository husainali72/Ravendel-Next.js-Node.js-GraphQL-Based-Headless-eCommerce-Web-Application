import React, { Fragment, useState } from "react";
import Navigation from "./menu";
import {
  Grid,
  Container,
  Box,
  Icon,
  Hidden,
  Drawer,
  Badge
} from "@material-ui/core";
import { connect } from "react-redux";
import CartSide from "./cart";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = props => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const toggleCart = e => {
    console.log("card");
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setOpenCart(!openCart);
  };

  return (
    <Fragment>
      <header>
        <Container>
          <Box component="div" className="header-wrapper">
            <Grid container justify="space-between" alignItems="center">
              <Grid item className="logo">
                <Link to="/">
                  <img
                    src={props.logo ? props.logo : Logo}
                    alt="Logo"
                    className="logo"
                  />
                </Link>
              </Grid>
              <Grid item className="menu">
                <Hidden mdDown>
                  <Navigation
                    toggleCartFunc={toggleCart}
                    drawerCloseFunc={() => setOpenMenu(false)}
                  />
                </Hidden>
                <Hidden lgUp>
                  <Box display="flex" justify="flex-end" alignItems="center">
                    <Badge
                      badgeContent={props.cart.products.length}
                      color="primary"
                      onClick={toggleCart}
                      className="margin-right-2"
                    >
                      <Icon style={{ fontSize: 24 }}>shopping_basket</Icon>
                    </Badge>
                    <Icon onClick={() => setOpenMenu(!openMenu)}>menu</Icon>
                  </Box>
                </Hidden>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </header>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)}>
        <Navigation drawerCloseFunc={() => setOpenMenu(false)} />
      </Drawer>
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

export default connect(mapStateToProps)(Header);
