import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import MainLayout from "./main-layout";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/styles";
import APclient from "./Client";

import { createMuiTheme } from "@material-ui/core";
import palette from "./theme/palette";
import typography from "./theme/typography";
import overrides from "./theme/overrides";

var theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

const App = props => {
  useEffect(() => {
    palette.primary.main = props.settings.themes[0].primaryColor;
    palette.primary.dark = props.settings.themes[0].primaryColor;

    theme = createMuiTheme({
      palette,
      typography,
      overrides,
      zIndex: {
        appBar: 1200,
        drawer: 1100
      }
    });
  }, [props.settings.themes]);

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={APclient}>
          <MainLayout />
        </ApolloProvider>
      </ThemeProvider>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
