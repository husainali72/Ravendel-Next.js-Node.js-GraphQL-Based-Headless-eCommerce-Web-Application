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
  Divider,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Alert from "../utils/Alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { blogUpdateAction } from "../../store/action/";
import TinymceEditor from "./TinymceEditor.js";
import clsx from "clsx";
import { isEmpty } from "../../utils/helper";
import viewStyles from "../viewStyles";

const EditPage = props => {
  const classes = viewStyles();
  const [editPremalink, setEditPermalink] = useState(false);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    status: "Publish",
    feature_image: "",
    slug: ""
  });

  useEffect(() => {
    var slugVal = blog.title.replace(/[^A-Z0-9]/gi, "-");
    setBlog({ ...blog, slug: slugVal.toLowerCase() });
  }, [blog.title]);

  useEffect(() => {
    props.blogs.blogs.map(editblog => {
      if (editblog.id === props.match.params.id) {
        setBlog({ ...editblog });
      }
    });
  }, []);

  useEffect(() => {
    if (!isEmpty(props.blogs.blog.content)) {
      setBlog({ ...blog, content: props.blogs.blog.content });
    }
  }, [props.blogs.blog.content]);

  const updatePage = e => {
    e.preventDefault();
    console.log(blog);
  };

  const handleChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const changePermalink = () => {
    setEditPermalink(!editPremalink);
  };

  return (
    <Fragment>
      <Alert />

      {props.blogs.loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" /> <br /> Loading
        </Backdrop>
      )}

      <form>
        <Grid container className="topbar">
          <Grid item lg={6}>
            <Typography variant="h4">
              <Link to="/all-pages">
                <IconButton aria-label="Back">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <span style={{ paddingTop: 10 }}>Edit Page</span>
            </Typography>
          </Grid>

          <Grid item lg={6} className="text-right padding-right-2">
            <Button color="primary" variant="contained" onClick={updatePage}>
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.cancelBtn}
            >
              <Link to="/all-pages" style={{ color: "#fff" }}>
                Discard
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} className={classes.secondmainrow}>
          <Grid item lg={9} md={12}>
            <Box>
              <Card>
                <CardHeader title="Page Information" />
                <Divider />
                <CardContent>
                  <TextField
                    id="title"
                    label="Title"
                    name="title"
                    onChange={handleChange}
                    variant="outlined"
                    value={blog.title}
                    className={clsx(classes.marginBottom, classes.width100)}
                  />

                  <Grid item md={12}>
                    {blog.title ? (
                      <span style={{ marginBottom: 10, display: "block" }}>
                        <strong>Link: </strong>
                        https://www.google.com/product/
                        {editPremalink === false && blog.slug}
                        {editPremalink === true && (
                          <input
                            id="url"
                            name="slug"
                            value={blog.slug}
                            onChange={handleChange}
                            variant="outlined"
                            className={classes.editpermalinkInput}
                          />
                        )}
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={changePermalink}
                          className={classes.editpermalinkInputBtn}
                        >
                          {editPremalink ? "Ok" : "Edit"}
                        </Button>
                      </span>
                    ) : null}
                  </Grid>

                  <TinymceEditor value={blog.content} />
                </CardContent>
              </Card>
            </Box>

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
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

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

const mapStateToProps = state => {
  return { blogs: state.blogs };
};

const mapDispatchToProps = {
  blogUpdateAction
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
