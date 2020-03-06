import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Typography, Box } from "@material-ui/core";

const Contact = props => {
  return (
    <Fragment>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="page-header"
      >
        <Typography variant="h1">Contact</Typography>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Contact);
