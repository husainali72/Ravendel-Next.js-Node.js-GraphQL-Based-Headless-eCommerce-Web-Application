import React, { Fragment } from "react";
import {
  Typography,
  Box,
  Grid,
  Container,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

const Footer = () => {
  return (
    <Fragment>
      <footer>
        <Box component="div" className="footer-upper">
          <Container>
            <Grid container spacing={5}>
              <Grid item md={4} sm={12} xs={12}>
                <Box textAlign="left">
                  <Typography variant="h4" className="color-white">
                    Company Logo
                  </Typography>
                  <Typography variant="subtitle1" className="footer-subtitle">
                    Persuit is a Premium PSD Template. Best choice for your
                    online store. Let purchase it to enjoy now
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <Typography variant="h5" className="footer-widget-header">
                  Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="About Us"
                      className="footer-menulink"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Terms and Condition"
                      className="footer-menulink"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Returns and Refunds"
                      className="footer-menulink"
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <Typography variant="h5" className="footer-widget-header">
                  Extra
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Contact Us"
                      className="footer-menulink"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="FAQ" className="footer-menulink" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          component="div"
          className="footer-down"
        >
          <Typography variant="body1" className="copyright-text">
            Copyright © 2020{" "}
            <a href="https://www.hbwebsol.com/" target="_blank">
              HB WEBSOL
            </a>
          </Typography>
        </Box>
      </footer>
    </Fragment>
  );
};

export default Footer;
