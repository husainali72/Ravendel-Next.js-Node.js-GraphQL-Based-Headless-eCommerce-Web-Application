import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  Container,
  Grid,
  Hidden,
  Divider,
  Icon,
} from "@material-ui/core";
import Facebook from "../../assets/images/facebook.png";
import Linkedin from "../../assets/images/linkedin.png";
import Twitter from "../../assets/images/twitter.png";
import PageTitle from "../components/pageTitle";
import BlogSidebar from "./blogSidebar";
import { blogAction } from "../../store/action/blogAction";
import Loading from "../components/loading";
import PlaceHolder from "../../assets/images/placeholder.png";
import { bucketBaseURL } from "../../utils/helper";

const SingleBlog = (props) => {
  const singleBlogId = props.match.params.id;
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const [singlePost, setSinglePost] = useState({});

  useEffect(() => {
    dispatch(blogAction(singleBlogId));
  }, [singleBlogId]);

  useEffect(() => {
    setSinglePost(blogs.blog);
  }, [blogs.blog]);

  return (
    <Fragment>
      {blogs.loading && <Loading />}
      {singlePost ? (
        <Fragment>
          <PageTitle title={singlePost.title} />
          <Container>
            <Grid
              container
              spacing={4}
              className="margin-top-3 margin-bottom-3"
            >
              <Grid item md={9} sm={12} xs={12}>
                <Box display="flex" className="blog-featured-wrapper">
                  <img
                    src={
                      singlePost.feature_image
                        ? bucketBaseURL + singlePost.feature_image.medium
                        : PlaceHolder
                    }
                    alt="Blog-Featured"
                    className="blog-featured"
                  />
                </Box>
                <Box component="div" className="single-blog-innner-content">
                  <Typography
                    variant="h2"
                    className="margin-top-2 margin-bottom-2 text-capitalize"
                  >
                    {singlePost.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: singlePost.content,
                      }}
                    ></span>
                  </Typography>
                </Box>

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
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default SingleBlog;