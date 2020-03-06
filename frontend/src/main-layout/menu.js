import React, { Fragment } from "react";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Fragment>
      <Box component="div">
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
      </Box>
    </Fragment>
  );
};

export default Menu;
