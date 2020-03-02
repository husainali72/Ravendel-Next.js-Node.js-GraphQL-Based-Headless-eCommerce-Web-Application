import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Backdrop,
  CircularProgress,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Box,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ImageIcon from "@material-ui/icons/Image";
import Alert from "../utils/Alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { blogAddAction } from "../../store/action/";
import TinymceEditor from "./TinymceEditor.js";
import clsx from "clsx";
import Loading from "../utils/loading";
import viewStyles from "../viewStyles";

const StyledRadio = props => {
  return (
    <Radio
      className="radioRoot"
      disableRipple
      color="default"
      checkedIcon={<span className="radioIcon radiocheckedIcon" />}
      icon={<span className="radioIcon" />}
      {...props}
    />
  );
};

const AddBlog = props => {
  const classes = viewStyles();
  const [featureImage, setfeatureImage] = useState(null);
  const [blog, setBlog] = useState({
    status: "Publish"
  });

  useEffect(() => {
    if (props.blogs.success) {
      document.forms[0].reset();
      setBlog({
        status: "Publish"
      });
      setfeatureImage(null);
    }
  }, [props.blogs.success]);

  useEffect(() => {
    if (props.blogs.blog.content !== undefined) {
      setBlog({ ...blog, content: props.blogs.blog.content });
    }
  }, [props.blogs.blog.content]);

  const addBlog = e => {
    e.preventDefault();
    props.blogAddAction(blog);
  };

  const handleChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const fileChange = e => {
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
    setBlog({ ...blog, [e.target.name]: e.target.files[0] });
  };

  return (
    <Fragment>
      <Alert />

      {props.blogs.loading && <Loading />}
      <form>
        <Grid container className="topbar">
          <Grid item lg={6}>
            <Typography variant="h4">
              <Link to="/all-pages">
                <IconButton aria-label="Back">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <span style={{ paddingTop: 10 }}>Add Blog</span>
            </Typography>
          </Grid>

          <Grid item lg={6} className="text-right padding-right-2">
            <Button color="primary" variant="contained" onClick={addBlog}>
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.cancelBtn}
            >
              <Link to="/all-blogs" style={{ color: "#fff" }}>
                Discard
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} className={classes.secondmainrow}>
          <Grid item lg={9} md={12}>
            <Card>
              <CardHeader title="Blog Information" />
              <Divider />
              <CardContent>
                <Grid container>
                  <Grid item md={12}>
                    <TextField
                      id="title"
                      label="Title"
                      name="title"
                      onChange={handleChange}
                      variant="outlined"
                      className={clsx(classes.marginBottom, classes.width100)}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item md={12}>
                    <TinymceEditor />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Meta Information" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6}>
                      <TextField
                        id="meta-title"
                        label="Meta Title"
                        name="meta-title"
                        variant="outlined"
                        className={clsx(classes.width100)}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        id="meta-keyword"
                        label="Meta Keyword"
                        name="meta-keyword"
                        variant="outlined"
                        className={clsx(classes.width100)}
                      />
                    </Grid>

                    <Grid item md={12}>
                      <TextField
                        id="meta-description"
                        label="Meta-description"
                        name="meta-description"
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                        multiline
                        rows="4"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item lg={3} md={12}>
            <Box>
              <Card>
                <CardHeader title="Status" />
                <Divider />
                <CardContent>
                  <RadioGroup
                    defaultValue="Publish"
                    name="status"
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="Publish"
                      control={<StyledRadio />}
                      label="Publish"
                    />
                    <FormControlLabel
                      value="Draft"
                      control={<StyledRadio />}
                      label="Draft"
                    />
                  </RadioGroup>
                </CardContent>
              </Card>
            </Box>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Featured Image" />
                <CardContent>
                  <Grid item md={12}>
                    {featureImage !== null && (
                      <Box className={classes.feautedImageBox}>
                        <img
                          src={featureImage}
                          className={classes.feautedImageBoxPreview}
                        />
                      </Box>
                    )}
                    <input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      id="featured-image"
                      name="feature_image"
                      type="file"
                      onChange={fileChange}
                    />
                    <label
                      htmlFor="featured-image"
                      className={classes.feautedImage}
                    >
                      <ImageIcon />{" "}
                      {featureImage !== null
                        ? "Change Featured Image"
                        : "Set Featured Image"}
                    </label>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { blogs: state.blogs };
};

const mapDispatchToProps = {
  blogAddAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);
