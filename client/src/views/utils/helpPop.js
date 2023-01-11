import React, { Fragment, useState } from "react";
import { Typography, Popover, Box } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import viewStyles from "../viewStyles.js";
const HelpPop = (props) => {
  const classes = viewStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={classes.infopopoverhelp}
      >
        <HelpIcon />
      </Typography>
      <Popover
        wrapper="div"
        id="mouse-over-popover"
        className={classes.infopopover}
        classes={{
          paper: classes.infopopoverpaper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      ></Popover>
    </>
  );
};

export default HelpPop;
