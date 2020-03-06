import React, { Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Main from "./main";

const MainLayout = props => {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(MainLayout);
