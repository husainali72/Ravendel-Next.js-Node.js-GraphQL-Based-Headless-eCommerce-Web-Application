import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  IconButton,
  Divider,
  Box,
  Input,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Chip
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ImageIcon from "@material-ui/icons/Image";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  blogUpdateAction,
  blogtagsAction,
  blogsAction
} from "../../store/action/";
import TinymceEditor from "./TinymceEditor.js";
import clsx from "clsx";
import { isEmpty } from "../../utils/helper";
import Loading from "../utils/loading";
import viewStyles from "../viewStyles";
import Autocomplete from "@material-ui/lab/Autocomplete";

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

var blog_tags = [];

const defaultObj = {
  title: "",
  content: "",
  status: "Publish",
  blog_tag: [],
  feature_image: "",
  meta: {
    title: "",
    description: "",
    keywords: ""
  },
  defaultTags: []
};
const EditBlog = props => {
  const classes = viewStyles();
  const [featureImage, setfeatureImage] = useState(null);
  const [blog, setBlog] = useState(defaultObj);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!props.blogs.blogs.length) {
      props.blogsAction();
    }

    if (props.blogs.blogs.length) {
      for (let i in props.blogs.blogs) {
        if (props.blogs.blogs[i].id === props.match.params.id) {
          blog_tags = props.blogs.blogs[i].blog_tag;
          if (!props.blogs.tags.length) {
            props.blogtagsAction();
          }

          setBlog({ ...blog, ...props.blogs.blogs[i] });
          if (props.blogs.blogs[i].feature_image.original) {
            setfeatureImage(props.blogs.blogs[i].feature_image.original);
          }
        }
      }
    }
  }, [props.blogs.blogs]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (blog_tags.length) {
      const defaultTags = [];
      for (let i in props.blogs.tags) {
        if (~blog_tags.indexOf(props.blogs.tags[i].id)) {
          defaultTags.push(props.blogs.tags[i]);
        }
      }

      if (defaultTags.length) {
        setBlog({ ...blog, defaultTags: defaultTags });
      }
    }
    setTags(props.blogs.tags);
  }, [props.blogs.tags]);

  const handleChangeTag = value => {
    setBlog({ ...blog, blog_tag: value.map(val => val.id) });
  };

  const updateBlog = e => {
    e.preventDefault();
    props.blogUpdateAction(blog);
  };

  useEffect(() => {
    if (!isEmpty(props.blogs.blog.content)) {
      setBlog({ ...blog, content: props.blogs.blog.content });
    }
  }, [props.blogs.blog.content]);

  const handleChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const metaChange = e => {
    setBlog({
      ...blog,
      meta: { ...blog.meta, [e.target.name]: e.target.value }
    });
  };

  const fileChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.files[0] });
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Fragment>
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
              <span style={{ paddingTop: 10 }}>Edit Blog</span>
            </Typography>
          </Grid>

          <Grid item lg={6} className="text-right padding-right-2">
            <Button color="primary" variant="contained" onClick={updateBlog}>
              Update
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
                      value={blog.title}
                      className={clsx(classes.marginBottom, classes.width100)}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item md={12}>
                    <TinymceEditor value={blog.content} />
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
                        name="title"
                        value={blog.meta.title}
                        onChange={metaChange}
                        variant="outlined"
                        className={clsx(classes.width100)}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        id="meta-keyword"
                        label="Meta Keyword"
                        name="keywords"
                        value={blog.meta.keywords}
                        onChange={metaChange}
                        variant="outlined"
                        className={clsx(classes.width100)}
                      />
                    </Grid>

                    <Grid item md={12}>
                      <TextField
                        id="meta-description"
                        label="Meta-description"
                        name="description"
                        value={blog.meta.description}
                        onChange={metaChange}
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
                    value={blog.status}
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
                          alt="featured"
                        />
                      </Box>
                    )}
                    <Input
                      className={classes.input}
                      style={{ display: "none" }}
                      id="updatedImage"
                      type="file"
                      onChange={fileChange}
                      name="updatedImage"
                    />
                    <label
                      htmlFor="updatedImage"
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
            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Tags" />
                <Divider />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    className={classes.marginBottom1}
                  >
                    Select Tags
                  </Typography>

                  <Autocomplete
                    multiple
                    id="select-tags"
                    options={tags}
                    defaultValue={blog.defaultTags}
                    getOptionLabel={option => option.name}
                    className={classes.width100}
                    onChange={(event, value) => handleChangeTag(value)}
                    renderInput={params => (
                      <TextField {...params} variant="outlined" />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip label={option.name} {...getTagProps({ index })} />
                      ))
                    }
                  />
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
  blogUpdateAction,
  blogtagsAction,
  blogsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
