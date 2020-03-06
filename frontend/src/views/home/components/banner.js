import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, Button, Container, Box } from "@material-ui/core";

const Banner = props => {
  return (
    <Fragment>
      <Box
        component="div"
        className="home-banner"
        display="flex"
        justify="flex-start"
        alignItems="center"
      >
        <Container>
          <Box component="span">
            <Typography variant="h1" component="h2" className="banner-heading">
              New Collection
            </Typography>
          </Box>
          <Button variant="contained" color="primary">
            <Link to="/shop">Shop Now</Link>
          </Button>
        </Container>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Banner);
