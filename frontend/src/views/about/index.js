import React, { Fragment } from "react";
import { connect } from "react-redux";
import PageTitle from "../components/pageTitle";
import { Container, Grid, Typography, Box } from "@material-ui/core";
import Logo from "../../assets/images/logo.png";

const About = props => {
  return (
    <Fragment>
      <PageTitle title="About" />
      <Container>
        <Grid container className="margin-top-3 margin-bottom-3">
          <Grid item md={12} sm={12} xs={12}>
            <Box component="div" className="text-center">
              <img
                src={props.logo ? props.logo : Logo}
                alt="Logo"
                className="aboutLogo"
              />
            </Box>
            <Typography variant="subtitle1">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
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

export default connect(mapStateToProps)(About);
