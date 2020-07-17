import React, { Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Main from "./main";

import { registerNav } from "../utils/navigation";

const MainLayout = (props) => {
  return (
    <Fragment>
      <BrowserRouter ref={registerNav}>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(MainLayout);
