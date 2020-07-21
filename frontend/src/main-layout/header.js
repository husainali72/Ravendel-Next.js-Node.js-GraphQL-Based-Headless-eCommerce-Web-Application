import React, { Fragment, useState, useEffect } from "react";
import Navigation from "./menu";
import {
  Grid,
  Container,
  Box,
  Icon,
  Hidden,
  Drawer,
  Badge,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import CartSide from "./cart";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { homepageAction } from "../store/action/homepageAction";
import { isEmpty } from "../utils/helper";

const Header = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [themeSetting, setThemeSetting] = useState({});

  useEffect(() => {
    if (isEmpty(props.home.homepage)) {
      props.homepageAction();
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(props.home.homepage)) {
      setThemeSetting(props.home.homepage);
    }
  }, [props.home.homepage]);

  const toggleCart = (e) => {
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
                  {/* <img
                    src={props.logo ? props.logo : Logo}
                    alt="Logo"
                    className="logo"
                  /> */}

                  {themeSetting.appearance &&
                  themeSetting.appearance.theme &&
                  themeSetting.appearance.theme.logo ? (
                    <img
                      src={themeSetting.appearance.theme.logo.original}
                      alt="Logo"
                      className="logo"
                    />
                  ) : (
                    <Typography variant="h3">Ravendel</Typography>
                  )}
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

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    home: state.homepage,
  };
};

const mapDispatchToProps = {
  homepageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
