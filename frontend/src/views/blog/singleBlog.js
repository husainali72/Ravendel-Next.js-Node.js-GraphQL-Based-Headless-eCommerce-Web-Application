import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Box,
  Container,
  Grid,
  Hidden,
  Divider,
  Icon
} from "@material-ui/core";
import Facebook from "../../assets/images/facebook.png";
import Linkedin from "../../assets/images/linkedin.png";
import Twitter from "../../assets/images/twitter.png";
import Pinterest from "../../assets/images/pinterest.png";
import PageTitle from "../components/pageTitle";
import BlogSidebar from "./blogSidebar";

const SingleBlog = props => {
  return (
    <Fragment>
      <PageTitle title="Blog Name" />
      <Container>
        <Grid container spacing={4} className="margin-top-3 margin-bottom-3">
          <Grid item md={9} sm={12} xs={12}>
            <img
              src="https://colorlib.com/preview/theme/essence/img/bg-img/bg-2.jpg"
              alt="Blog-Featured"
              className="blog-featured"
            />
            <Typography variant="h2" className="margin-top-2 margin-bottom-2">
              Blog Title
            </Typography>
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
            <Divider className="margin-top-2 margin-bottom-3" />
            <Typography variant="h3">
              <Icon style={{ fontSize: 20 }}>share</Icon> Share this blog
            </Typography>

            <Box
              display="flex"
              justifyContent="flex-start"
              className="share-blog"
            >
              <Box>
                <a
                  href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com"
                  target="_blank"
                >
                  <img src={Facebook} alt="facebook" />
                </a>
              </Box>
              <Box>
                <a
                  href="https://twitter.com/share?url=https://simplesharebuttons.com&amp;text=Blog%20Title%20&amp;hashtags=blogs"
                  target="_blank"
                >
                  <img src={Twitter} alt="Twitter" />
                </a>
              </Box>
              <Box>
                <a
                  href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://simplesharebuttons.com"
                  target="_blank"
                >
                  <img src={Linkedin} alt="Linkedin" />
                </a>
              </Box>
              <Box>
                <a
                  href="javascript:void((function()%7Bvar%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','http://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());"
                  target="_blank"
                >
                  <img src={Pinterest} alt="Pinterest" />
                </a>
              </Box>
            </Box>
          </Grid>
          <Hidden lgUp>
            <Divider className="margin-top-2 margin-bottom-3" />
          </Hidden>
          <Grid item md={3} sm={12} xs={12}>
            <BlogSidebar />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(SingleBlog);
