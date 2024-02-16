import React from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { Drawer } from "@mui/material";
import MenuBar from "./menubar";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
const useStyles = makeStyles((theme) => ({
  drawer: {
    "&&": {
      zIndex: "10!important",
      [theme.breakpoints.up("lg")]: {
        marginTop: 50,
        height: "calc(100% - 50px)",
      },
    },
  },
  root: {
    "&&": {
      backgroundColor: theme.palette.white,

      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: theme.spacing(-2),
      width: "175px",
    },
  },
}));

const SideBarComponent = (props) => {
  const { open, variant, onClose, className, ...rest } = props;
  const classes = useStyles();
  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}

    >
      <div {...rest} className={clsx(classes.root, className)}>
        <MenuBar onClose={onClose}/>
      </div>
    </Drawer >
  );
};

const SideBar = ({ open, onClose, variant }) => {
  return (
    <ThemeProvider theme={theme}>
      <SideBarComponent open={open} onClose={onClose} variant={variant} />
    </ThemeProvider>
  );
};

export default SideBar;
