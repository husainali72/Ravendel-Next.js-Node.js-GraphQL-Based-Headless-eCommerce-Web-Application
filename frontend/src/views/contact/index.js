import React, { Fragment } from "react";
import { connect } from "react-redux";
import PageTitle from "../components/pageTitle";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Divider
} from "@material-ui/core";

const Contact = props => {
  return (
    <Fragment>
      <PageTitle title="Contact" />

      <Container>
        <Grid container spacing={4} className="margin-top-3 margin-bottom-3">
          {/* ===========================MAP===========================  */}
          <Grid item md={12} sm={12} xs={12} className="margin-bottom-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.249514270321!2d-0.13289958407495217!3d51.50863821843344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d194a4a1a7%3A0x62897f4fa2fd4ad0!2s10%20Suffolk%20St%2C%20West%20End%2C%20London%20SW1Y%204HG%2C%20UK!5e0!3m2!1sen!2sin!4v1584427401480!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              title="Address"
            ></iframe>
          </Grid>
          {/* ===========================Contact Form===========================  */}
          <Grid item md={6} sm={12} xs={12}>
            <Typography variant="h2" className="margin-bottom-2">
              Get in Touch
            </Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="name"
                    label="Name"
                    className="width-100"
                  />
                </Grid>
                <Grid item md={6} xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    type="email"
                    name="email"
                    label="Email"
                    className="width-100"
                  />
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="subject"
                    label="Subject"
                    className="width-100"
                  />
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="messafe"
                    label="Message"
                    multiline
                    rows="4"
                    className="width-100"
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          {/* ===========================Contact Details===========================  */}
          <Grid item md={6} sm={12} xs={12}>
            <Typography variant="h2" className="margin-bottom-2">
              How to Find Us
            </Typography>
            <Grid container>
              <Grid item md={3}>
                <Typography variant="button" component="h4">
                  Address
                </Typography>
              </Grid>
              <Grid item md={9}>
                <Typography variant="subtitle1" component="h4">
                  10 Suffolk st Soho, London, UK
                </Typography>
              </Grid>
            </Grid>
            <Divider className="margin-top-1 margin-bottom-1" />
            <Grid container>
              <Grid item md={3}>
                <Typography variant="button" component="h4">
                  Telephone
                </Typography>
              </Grid>
              <Grid item md={9}>
                <Typography variant="subtitle1" component="h4">
                  <a href="tel:+1234567890">+12 34 567 890</a>
                </Typography>
              </Grid>
            </Grid>
            <Divider className="margin-top-1 margin-bottom-1" />
            <Grid container>
              <Grid item md={3}>
                <Typography variant="button" component="h4">
                  Email
                </Typography>
              </Grid>
              <Grid item md={9}>
                <Typography variant="subtitle1" component="h4">
                  <a href="mailto:support@abc.com">support@abc.com</a>
                </Typography>
              </Grid>
            </Grid>
            <Divider className="margin-top-1 margin-bottom-1" />
            <Grid container>
              <Grid item md={3}>
                <Typography variant="button" component="h4">
                  Timing
                </Typography>
              </Grid>
              <Grid item md={9}>
                <Typography variant="subtitle1" component="h4">
                  Mon to Fri 9am to 6pm
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Contact);
