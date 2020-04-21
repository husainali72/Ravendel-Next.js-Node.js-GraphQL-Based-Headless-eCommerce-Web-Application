import React, { Fragment, useState } from "react";
import {
  Box,
  Badge,
  Icon,
  MenuItem,
  Menu,
  Hidden,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navigation = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [collaspeAccount, setCollaspeAccount] = useState(false);
  const [logoutConfrm, setLogoutConfrm] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    setLogoutConfrm(true);
    handleClose();
    props.drawerCloseFunc();
  };

  return (
    <Fragment>
      <Box
        component="div"
        display="flex"
        alignItems="center"
        className="menu-item-wrapper"
      >
        <Box component="div" display="inline" m={2} className="menu-item">
          <Link onClick={() => props.drawerCloseFunc()} to="/">
            Homes
          </Link>
        </Box>
        <Box component="div" display="inline" m={2} className="menu-item">
          <Link onClick={() => props.drawerCloseFunc()} to="/shop">
            Shop
          </Link>
        </Box>
        <Box component="div" display="inline" m={2} className="menu-item">
          <Link onClick={() => props.drawerCloseFunc()} to="/about">
            About
          </Link>
        </Box>
        <Box component="div" display="inline" m={2} className="menu-item">
          <Link onClick={() => props.drawerCloseFunc()} to="/blogs">
            Blog
          </Link>
        </Box>
        <Box component="div" display="inline" m={2} className="menu-item">
          <Link onClick={() => props.drawerCloseFunc()} to="/contact">
            Contact
          </Link>
        </Box>
        <Hidden mdDown>
          <Box component="div" display="inline" m={2} className="menu-item">
            <Badge badgeContent={props.cart.products.length} color="primary">
              <Icon
                style={{ fontSize: 24 }}
                onClick={e => props.toggleCartFunc(e)}
              >
                shopping_basket
              </Icon>
            </Badge>
          </Box>
        </Hidden>
        {/* ==============================Account Menu for Desktop============================ */}
        <Hidden mdDown>
          <Box component="div" display="inline" m={2} className="menu-item">
            <Icon
              style={{ fontSize: 24 }}
              aria-controls="account-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className="account-menu-link"
            >
              account_circle
            </Icon>
          </Box>
        </Hidden>
        {/* ==============================Account Menu for Mobile============================ */}
        <Hidden lgUp>
          <Box
            component="div"
            display="flex"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            m={2}
            className="width-100"
            onClick={() => setCollaspeAccount(!collaspeAccount)}
          >
            <Box>Account</Box>
            <Box>
              <Icon>
                {collaspeAccount ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </Icon>
            </Box>
          </Box>
          {/* ==============================Collapsable Menu============================ */}
          <Collapse in={collaspeAccount} className="collapsible-menu-mobile">
            <Box component="div" display="inline" m={2} className="menu-item">
              <Link onClick={() => props.drawerCloseFunc()} to="/login">
                Login
              </Link>
            </Box>
            <Box component="div" display="inline" m={2} className="menu-item">
              <Link onClick={() => props.drawerCloseFunc()} to="/register">
                Register
              </Link>
            </Box>
            <Box component="div" display="inline" m={2} className="menu-item">
              <Link
                onClick={() => props.drawerCloseFunc()}
                to="/account/orders"
              >
                Orders
              </Link>
            </Box>
            <Box component="div" display="inline" m={2} className="menu-item">
              <Link
                onClick={() => props.drawerCloseFunc()}
                to="/account/address"
              >
                Address
              </Link>
            </Box>
            <Box component="div" display="inline" m={2} className="menu-item">
              <Link
                onClick={() => props.drawerCloseFunc()}
                to="/account/recently-viewed"
              >
                Recently Viewed
              </Link>
            </Box>
            <Box component="div" display="inline" m={2} className="menu-item">
              <Link
                onClick={() => props.drawerCloseFunc()}
                to="/account/profile"
              >
                Profile
              </Link>
            </Box>
            <Box component="div" display="inline" m={2} className="menu-item">
              <Link onClick={() => props.drawerCloseFunc()} to="/login">
                Logout
              </Link>
            </Box>
          </Collapse>
        </Hidden>
      </Box>
      {/* ==============================Account Menu for Desktop============================ */}
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        style={{ zIndex: 9999, minWidth: 200 }}
      >
        <Link to="/login">
          <MenuItem onClick={handleClose}>Login</MenuItem>
        </Link>
        <Link to="/register">
          <MenuItem onClick={handleClose}>Register</MenuItem>
        </Link>
        <Link to="/account/orders">
          <MenuItem onClick={handleClose}>Orders</MenuItem>
        </Link>
        <Link to="/account/address">
          <MenuItem onClick={handleClose}>Address</MenuItem>
        </Link>
        <Link to="/account/recently-viewed">
          <MenuItem onClick={handleClose}>Recently Viewed</MenuItem>
        </Link>
        <Link to="/account/profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={Logout}>Logout</MenuItem>
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
          <Link to="/login" onClick={() => setLogoutConfrm(false)}>
            <Button color="primary" autoFocus>
              Logout
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(Navigation);
