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
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {app_router_base_url} from '../utils/helper';

const Navigation = (props) => {
  const customer = useSelector((state) => state.customer);
  const cart = useSelector((state) => state.cart);
  const [anchorEl, setAnchorEl] = useState(null);
  const [collaspeAccount, setCollaspeAccount] = useState(false);

  return (
    <Fragment>
      <Box component="div" display="inline" className="navigation-item">
        <Link onClick={() => props.drawerCloseFunc()} to={`${app_router_base_url}`}>
          Home
        </Link>
      </Box>
      <span className="navigation-item dropdown">
        Shop
        <div className="dropdown-wrapper">
            <div className="dropdown-row">
              <div className="dropdown-col">
                <span className="category-title">Category 1</span>
                <a href="">Subcategory</a>
              </div>
              <div className="dropdown-col">
                <span className="category-title">Category 2</span>
                <a href="">Subcategory</a>
              </div>
              <div className="dropdown-col">
                <span className="category-title">Category 3</span>
                <a href="">Subcategory</a>
              </div>
            </div>
        </div>
      </span>
      <Box component="div" display="inline" className="navigation-item">
        <Link onClick={() => props.drawerCloseFunc()} to={`${app_router_base_url}blogs`}>
          Blog
        </Link>
      </Box>
      <Box component="div" display="inline" className="navigation-item">
        <Link onClick={() => props.drawerCloseFunc()} to={`${app_router_base_url}contact`}>
          Contact
        </Link>
      </Box>
      <Box component="div" display="inline" className="navigation-item">
        <Link onClick={() => props.drawerCloseFunc()} to={`${app_router_base_url}about`}>
           About us
        </Link>
      </Box>
      {/* <Hidden mdDown>
        <Box component="div" display="inline" m={2} className="menu-item">
          <Badge badgeContent={cart.products.length} color="primary">
            <Icon
              style={{ fontSize: 24 }}
              onClick={(e) => props.toggleCartFunc(e)}
            >
              shopping_basket
            </Icon>
          </Badge>
        </Box>
      </Hidden> */}
      {/* ==============================Account Menu for Desktop============================ */}
      {/* <Hidden mdDown>
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
      </Hidden> */}
      {/* ==============================Account Menu for Mobile============================ */}
      {/* <Hidden lgUp>
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

        <Collapse in={collaspeAccount} className="collapsible-menu-mobile">
          {customer.login ? (
            <>
              <Box component="div" display="inline" m={2} className="menu-item">
                <Link
                  onClick={() => props.drawerCloseFunc()}
                  to={`${app_router_base_url}account/orders`}
                >
                  Orders
                </Link>
              </Box>
              <Box component="div" display="inline" m={2} className="menu-item">
                <Link
                  onClick={() => props.drawerCloseFunc()}
                  to={`${app_router_base_url}account/address`}
                >
                  Address
                </Link>
              </Box>
              <Box component="div" display="inline" m={2} className="menu-item">
                <Link
                  onClick={() => props.drawerCloseFunc()}
                  to={`${app_router_base_url}account/recently-viewed`}
                >
                  Recently Viewed
                </Link>
              </Box>
              <Box component="div" display="inline" m={2} className="menu-item">
                <Link
                  onClick={() => props.drawerCloseFunc()}
                  to={`${app_router_base_url}account/profile`}
                >
                  Profile
                </Link>
              </Box>
              <Box component="div" display="inline" m={2} className="menu-item">
                <Link onClick={() => props.drawerCloseFunc()} to={`${app_router_base_url}login`}>
                  Logout
                </Link>
              </Box>
            </>
          ) : (
            <>
              <Box component="div" display="inline" m={2} className="menu-item">
                <Link onClick={() => props.drawerCloseFunc()} to={`${app_router_base_url}login`}>
                  Login
                </Link>
              </Box>
              <Box component="div" display="inline" m={2} className="menu-item">
                <Link onClick={() => props.drawerCloseFunc()} to={`${app_router_base_url}register`}>
                  Register
                </Link>
              </Box>
            </>
          )}
        </Collapse>
      </Hidden> */}
    </Fragment>
  );
};

export default Navigation;
