import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import clsx from "clsx";
import AllRoutes from "../routes/routes";
import Header from "./header";
import Footer from "./footer";

import Login from "../views/login";
import { useSelector } from "react-redux";
import { isEmpty } from "../utils/helper";
import SideBar from "./sidebar";
import theme from "../theme";

const MainLayout = ({ children }) => {
  const classes = useStyles();

  const login = useSelector((state) => state.login);
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
      {!isEmpty(login.user_token) ? (
        <>
          <Header onSidebarOpen={handleSidebarOpen} />
          <SideBar
            onClose={handleSidebarClose}
            open={shouldOpenSidebar}
            variant={isDesktop ? "persistent" : "temporary"}
          />
          <main className={classes.content}>
            {/* <Alert /> */}
            {children}
            <AllRoutes />
          </main>
        </>
      ) : (
        <Login />
      )}
      <Footer />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "&&": {
      paddingTop: 56,
      height: "100%",
      [theme.breakpoints.up("sm")]: {
        paddingTop: 50,
      },
    },
  },
  shiftContent: {
    "&&": {
      paddingLeft: 175,
    },
  },
  content: {
    "&&": {
      height: "calc(100% - 58px)",
      overflowY: "auto",
      overflowX: "hidden",
    },
  },
}));

export default function ThemeHelper() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout />
    </ThemeProvider>
  );
}
