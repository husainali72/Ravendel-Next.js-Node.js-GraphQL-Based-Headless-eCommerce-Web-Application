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
} from"@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CartSide from "./cart";
import { Link } from "react-router-dom";
import { homepageAction } from "../store/action/homepageAction";
import { isEmpty, app_router_base_url } from "../utils/helper";

const Header = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const home = useSelector(state => state.homepage);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [themeSetting, setThemeSetting] = useState({});

  useEffect(() => {
    if (isEmpty(home.homepage)) {
      dispatch(homepageAction());
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(home.homepage)) {
      setThemeSetting(home.homepage);
    }
  }, [home.homepage]);

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
                <Link to={`${app_router_base_url}`}>
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
                      badgeContent={cart.products.length}
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
            cartValue={cart.products}
            closeCart={() => setOpenCart(false)}
          />
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default Header;
