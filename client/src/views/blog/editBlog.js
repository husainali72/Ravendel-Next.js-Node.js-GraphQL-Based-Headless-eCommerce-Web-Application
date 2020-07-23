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
  Chip,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ImageIcon from "@material-ui/icons/Image";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  blogUpdateAction,
  blogtagsAction,
  blogsAction,
  blogAction,
  blogclearAction,
} from "../../store/action/";
import TinymceEditor from "./TinymceEditor.js";
import clsx from "clsx";
import { isEmpty } from "../../utils/helper";
import Loading from "../utils/loading";
import viewStyles from "../viewStyles";
//import Autocomplete from "@material-ui/lab/Autocomplete";
import Select from "react-select";
import service, { getUpdatedUrl } from "../../utils/service";

const StyledRadio = (props) => {
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

const defaultObj = {
  title: "",
  url: "",
  content: "",
  status: "Publish",
  blog_tag: [],
  feature_image: "",
  meta: {
    title: "",
    description: "",
    keywords: "",
  },
};
const EditBlog = (props) => {
  const classes = viewStyles();
  const [featureImage, setfeatureImage] = useState(null);
  const [blog, setBlog] = useState(defaultObj);
  const [tags, setTags] = useState({ tags: [], defaultTags: [] });
  const [editPremalink, setEditPermalink] = useState(false);

  useEffect(() => {
    if (!isEmpty(props.match.params.id)) {
      props.blogAction(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(props.blogState.blog)) {
      setBlog({ ...blog, ...props.blogState.blog });
      if (
        props.blogState.blog.feature_image &&
        props.blogState.blog.feature_image.original
      ) {
        setfeatureImage(props.blogState.blog.feature_image.original);
      }
      props.blogtagsAction();
    }
  }, [props.blogState.blog]);

  useEffect(() => {
    if (!isEmpty(props.blogState.tags)) {
      setTimeout(() => {
        var defaultTags = [];
        const tagObj = props.blogState.tags.map((tag) => {
          if (~blog.blog_tag.indexOf(tag.id)) {
            defaultTags.push({
              value: tag.id,
              label: tag.name,
            });
          }

          return {
            value: tag.id,
            label: tag.name,
          };
        });
        setTags({ ...tags, tags: tagObj, defaultTags: defaultTags });
      }, 1000);
    }
  }, [props.blogState.tags]);

  const tagChange = (e) => {
    //if (!isEmpty(e)) {
    setBlog({
      ...blog,
      blog_tag: e && e.length > 0 ? e.map((tag) => tag.value) : [],
    });
    setTags({ ...tags, defaultTags: e });
    //}
  };

  const updateBlog = (e) => {
    e.preventDefault();
    props.blogUpdateAction(blog);
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const metaChange = (e) => {
    setBlog({
      ...blog,
      meta: { ...blog.meta, [e.target.name]: e.target.value },
    });
  };

  const fileChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.files[0] });
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
  };

  const changePermalink = () => {
    if (editPremalink) {
      isUrlExist(blog.url);
    }
    setEditPermalink(!editPremalink);
  };

  const isUrlExist = async (url) => {
    let updatedUrl = await getUpdatedUrl("Blog", url);
    setBlog({
      ...blog,
      url: updatedUrl,
    });
  };

  return (
    <Fragment>
      {props.blogState.loading && <Loading />}
      <form>
        <Grid container className="topbar">
          <Grid item lg={6}>
            <Typography variant="h4">
              <Link to="/all-blogs">
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
              <Link
                to="/all-blogs"
                //onClick={() => props.blogclearAction()}
                style={{ color: "#fff" }}
              >
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

                <Grid item md={12}>
                  {blog.url ? (
                    <span style={{ marginBottom: 10, display: "block" }}>
                      <strong>Link: </strong>
                      {window.location.origin}/blog/
                      {editPremalink === false && blog.url}
                      {editPremalink === true && (
                        <input
                          id="url"
                          name="url"
                          value={blog.url}
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

                <Grid container>
                  <Grid item md={12}>
                    {!isEmpty(props.blogState.blog) && (
                      <TinymceEditor value={blog.content} />
                    )}
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
                </CardContent>
              </Card>
              <Select
                isMulti
                value={tags.defaultTags}
                name="blog_tag"
                options={tags.tags}
                onChange={tagChange}
              />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { blogState: state.blogs };
};

const mapDispatchToProps = {
  blogUpdateAction,
  blogtagsAction,
  blogsAction,
  blogAction,
  blogclearAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
