import React, { Fragment } from "react";
import Menu from "./menu";
import { Grid, Container, Box } from "@material-ui/core";

const Header = () => {
  return (
    <Fragment>
      <header>
        <Container>
          <Box component="div" className="header-wrapper">
            <Grid container justify="space-between">
              <Grid item className="logo">
                Abc
              </Grid>
              <Grid item className="menu">
                <Menu />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </header>
    </Fragment>
  );
};

export default Header;
