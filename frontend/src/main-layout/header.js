import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  Drawer,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Tooltip,
} from"@mui/material";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navigation from "./menu";
import CartSide from "./cart";
import { homepageAction } from "../store/action/homepageAction";
import { isEmpty, app_router_base_url } from "../utils/helper";

const Header = (props) => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const cart = useSelector((state) => state.cart);
  const home = useSelector((state) => state.homepage);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [themeSetting, setThemeSetting] = useState({});
  const [logoutConfrm, setLogoutConfrm] = useState(false);

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

  const Logout = () => {
    setLogoutConfrm(true);
    handleClose();
    props.drawerCloseFunc();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
      zIndex: 9999,
    },
  }))(Tooltip);

  return (
    <Fragment>
      <header>
        <div className="header-top">
          <Box
            component="div"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            className="page-width"
          >
            <div className="wishlist-compare-wrapper">
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Coming Soon</Typography>
                  </React.Fragment>
                }
              >
                <a href="#">My Wishlist (0)</a>
              </HtmlTooltip>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Coming Soon</Typography>
                  </React.Fragment>
                }
              >
                <a href="#">Compare (0)</a>
              </HtmlTooltip>
            </div>
            <Box component="div">
              <Typography variant="h3">RAVENDEL</Typography>
            </Box>
            <div className="account-cart-wrapper">
              <a href="#" onClick={(e) => setAnchorEl(e.currentTarget)}>
                Account
              </a>
              <a href="#" onClick={toggleCart}>Cart ({cart.products.length})</a>
            </div>
          </Box>
        </div>
        <div className="header-bottom">
          <Box
            component="div"
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="page-width"
          >
            <Navigation
              toggleCartFunc={toggleCart}
              drawerCloseFunc={() => setOpenMenu(false)}
            />
          </Box>
        </div>
      </header>
     
      {/* <Drawer open={openMenu} onClose={() => setOpenMenu(false)}>
        <Navigation drawerCloseFunc={() => setOpenMenu(false)} />
      </Drawer> */}
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

      {/* ==============================Account Menu for Desktop============================ */}
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        style={{ zIndex: 9999, minWidth: 200 }}
      >
        {customer.login ? (
          <>
            <Link to={`${app_router_base_url}account/orders`}>
              <MenuItem onClick={handleClose}>Orders</MenuItem>
            </Link>
            <Link to={`${app_router_base_url}account/address`}>
              <MenuItem onClick={handleClose}>Address</MenuItem>
            </Link>
            <Link to={`${app_router_base_url}account/recently-viewed`}>
              <MenuItem onClick={handleClose}>Recently Viewed</MenuItem>
            </Link>
            <Link to={`${app_router_base_url}account/profile`}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={Logout}>Logout</MenuItem>
          </>
        ) : (
          <>
            <Link to={`${app_router_base_url}login`}>
              <MenuItem onClick={handleClose}>Login</MenuItem>
            </Link>
            <Link to={`${app_router_base_url}register`}>
              <MenuItem onClick={handleClose}>Register</MenuItem>
            </Link>
          </>
        )}
      </Menu>

      {/* ==============================Logout Dialog============================ */}
      <Dialog
        open={logoutConfrm}
        onClose={handleClose}
        aria-labelledby="logout-dailog"
        aria-describedby="logout-confirmation"
        fullWidth={false}
        maxWidth={"xs"}
      >
        <DialogTitle id="logout-dailog">{"LogOut"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-confirmation">
            Are you sure you would like to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutConfrm(false)} color="primary">
            Cancel
          </Button>
          <Link to={`${app_router_base_url}login`} onClick={() => setLogoutConfrm(false)}>
            <Button color="primary" autoFocus>
              Logout
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Header;
