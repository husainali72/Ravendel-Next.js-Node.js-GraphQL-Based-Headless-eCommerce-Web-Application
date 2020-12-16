import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import AllRoutes from '../routes/routes';
import Header from "./header";
import SideBar from "./sidebar";
import Footer from "./footer";
import Alert from "../views/utils/Alert";

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Header onSidebarOpen={handleSidebarOpen} />
      <SideBar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? "persistent" : "temporary"}
      />
      <main className={classes.content}>
        <Alert />
        {children}
        <AllRoutes />
      </main>
      <Footer />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 50,
    },
  },
  shiftContent: {
    paddingLeft: 175,
  },
  content: {
    height: "calc(100% - 58px)",
    overflowY: "auto",
    overflowX: "hidden",
  },
}));

export default MainLayout;
