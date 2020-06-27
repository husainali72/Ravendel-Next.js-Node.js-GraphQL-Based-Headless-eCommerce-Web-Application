import React, { Fragment } from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Container,
  CardActionArea,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PlaceHolder from "../../../assets/images/placeholder.png";

const BlogListing = (props) => {
  // var array = props.recentlyBlogs;
  // var val = array.sort((a, b) =>
  //   Date.parse("1970-01-01T" + b.date) > Date.parse("1970-01-01T" + a.date)
  //     ? 1
  //     : -1
  // );
  return (
    <Fragment>
      <section className="blog-section-homepage">
        <Container>
          <Box display="flex" justifyContent="center">
            <Typography variant="h2" className="section-title">
              {props.title}
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {props.recentlyBlogs &&
              props.recentlyBlogs
                .sort((a, b) =>
                  Date.parse("1970-01-01T" + b.date) >
                  Date.parse("1970-01-01T" + a.date)
                    ? 1
                    : -1
                )
                .slice(0, 3)
                .map((blog, index) => (
                  <Grid item lg={4} md={6} sm={6} xs={12} key={index}>
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
                              className="text-capitalize blog-title"
                            >
                              {blog.title.length > 50 ? (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: blog.title.substring(0, 75) + "...",
                                  }}
                                ></span>
                              ) : (
                                blog.title
                              )}
                            </Typography>
                            {/* <Typography
                              variant="subtitle2"
                              color="textSecondary"
                              component="p"
                              className="blog-sescription"
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: blog.content.substring(0, 80) + "..."
                                }}
                              ></span>
                            </Typography> */}
                          </CardContent>
                        </CardActionArea>
                      </Link>
                      {/* <CardActions>
                        <Link to={`blog/${blog.id}`}>
                          <Button size="small" color="primary">
                            Learn More
                          </Button>
                        </Link>
                      </CardActions> */}
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </Container>
      </section>
    </Fragment>
  );
};

export default BlogListing;
