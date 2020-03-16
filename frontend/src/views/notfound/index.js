import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Typography, Box, Container, Grid } from "@material-ui/core";

const NotFound = props => {
  return (
    <Fragment>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="page-header"
      >
        <Typography variant="h1">Not Found</Typography>
      </Box>

      <Container>
        <Grid container className="margin-top-3 margin-bottom-3 text-center">
          <Grid item md={12}>
            <Typography variant="h1" component="h2">
              404
            </Typography>
            <Typography variant="h4" style={{ color: "tomato" }}>
              Page Not Found
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(NotFound);
