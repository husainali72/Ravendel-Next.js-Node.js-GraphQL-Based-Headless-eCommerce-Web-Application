import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Button,
  Grid,
  Hidden,
  Divider,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PageTitle from "../components/pageTitle";
import BlogSidebar from "./blogSidebar";
import { blogsAction } from "../../store/action/blogAction";
import Loading from "../components/loading";
import { isEmpty } from "../../utils/helper";
import PlaceHolder from "../../assets/images/placeholder.png";
import Pagination from "@material-ui/lab/Pagination";

const AllBlogs = (props) => {
  const [blogPerPage, setblogPerPage] = useState(2);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    if (isEmpty(props.blogs.blogs)) {
      props.blogsAction();
    }
  }, []);

  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <Fragment>
      {props.blogs.loading && <Loading />}
      <PageTitle title="All Blogs" />
      <Container>
        <Grid container spacing={4} className="margin-top-3 margin-bottom-3">
          <Grid item md={9} sm={12} xs={12}>
            <Grid container spacing={3}>
              {props.blogs.blogs &&
                props.blogs.blogs
                  // .slice(page * blogPerPage, page * blogPerPage)
                  .map((blog, index) => (
                    <Grid item lg={6} md={6} sm={6} xs={12} key={index}>
                      <Card className="blog-card">
                        <Link to={`blog/${blog.id}`}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt={blog.title}
                              height="175"
                              image={
                                blog.feature_image
                                  ? blog.feature_image.medium
                                  : PlaceHolder
                              }
                              title={blog.title}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h4"
                                component="h2"
                                className="text-capitalize"
                              >
                                {blog.title}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                color="textSecondary"
                                component="p"
                                className="blog-sescription"
                              >
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      blog.content.substring(0, 80) + "...",
                                  }}
                                ></span>
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Link>
                        <CardActions>
                          <Link to={`blog/${blog.id}`}>
                            <Button size="small" color="primary">
                              Learn More
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
            </Grid>
            {/* <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              className="margin-top-2"
            >
              <Pagination
                count={props.blogs.blogs.length / blogPerPage}
                color="primary"
                page={page}
                onChange={changePage}
              />
            </Box> */}
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

const mapStateToProps = (state) => ({
  blogs: state.blogs,
});

const mapDispatchToProps = {
  blogsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBlogs);
