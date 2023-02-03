import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  blogUpdateAction,
  blogtagsAction,
  blogAction,
} from "../../store/action/";
import clsx from "clsx";
import {
  isEmpty,
  client_app_route_url,
  bucketBaseURL,
} from "../../utils/helper";
import viewStyles from "../viewStyles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
import {
  Loading,
  TopBar,
  StyledRadio,
  CardBlocks,
  FeaturedImageComponent,
  URLComponent,
  TinymceEditor,
} from "../components";
import { useNavigate, useParams } from "react-router-dom";
import Alerts from "../components/Alert";
import { get } from "lodash";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";

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
const EditBlogComponenet = ({ params }) => {
  const classes = viewStyles();
  const Id = params.id || "";
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blogs);
  const [featureImage, setfeatureImage] = useState(null);
  const [blog, setBlog] = useState(defaultObj);
  const [tags, setTags] = useState({ tags: [], defaultTags: [] });
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(blogAction(Id));
  }, []);

  useEffect(() => {
    if (!isEmpty(get(blogState, "blog"))) {
      setBlog({ ...blog, ...blogState.blog });
      if (
        blogState.blog.feature_image &&
        blogState.blog.feature_image.original
      ) {
        setfeatureImage(bucketBaseURL + blogState.blog.feature_image.original);
      }
      dispatch(blogtagsAction());
    }
  }, [get(blogState, "blog")]);
  useEffect(() => {
    setloading(get(blogState, "loading"));
  }, [get(blogState, "loading")]);

  useEffect(() => {
    if (!isEmpty(get(blogState, "tags"))) {
      setTimeout(() => {
        var defaultTags = [];
        const tagObj = blogState.tags.map((tag) => {
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
  }, [get(blogState, "tags")]);

  const tagChange = (e) => {
    setBlog({
      ...blog,
      blog_tag: e && e.length > 0 ? e.map((tag) => tag.value) : [],
    });
    setTags({ ...tags, defaultTags: e });
  };

  const updateBlog = (e) => {
    e.preventDefault();
    var errors = validate(["title"], blog);
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else {
      dispatch(blogUpdateAction(blog, navigate));
    }

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
    setBlog({ ...blog, updatedImage: e.target.files[0] });
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Fragment>
      <Alerts />

      {loading ? <Loading /> : null}
      <form>
        <TopBar
          title="Edit Blog"
          onSubmit={updateBlog}
          submitTitle="Update"
          backLink={`${client_app_route_url}all-blogs`}
        />

        <Grid
          container
          spacing={isSmall ? 2 : 3}
          className={classes.secondmainrow}
        >
          <Grid item lg={9} xs={12}>
            <CardBlocks title="Blog Information" nomargin>
              <Box component="div" mb={2}>
                <TextField
                  id="title"
                  label="Title"
                  name="title"
                  onChange={handleChange}
                  variant="outlined"
                  value={blog.title}
                  fullWidth
                />
              </Box>
              <Box component="div" mb={2}>
                <URLComponent
                  url={blog.url}
                  onInputChange={(updatedUrl) => {
                    setBlog({
                      ...blog,
                      url: updatedUrl,
                    });
                  }}
                  pageUrl="blog"
                  tableUrl="Blog"
                />
              </Box>
              <Box component="div">
                <TinymceEditor
                  value={blog.content}
                  onEditorChange={(value) =>
                    setBlog({ ...blog, ["content"]: value })
                  }
                />
              </Box>
            </CardBlocks>

            <CardBlocks title="Meta Information">
              <Grid container spacing={isSmall ? 1 : 2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    label="Meta Title"
                    name="title"
                    value={blog.meta.title}
                    onChange={metaChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    label="Meta Keyword"
                    name="keywords"
                    value={blog.meta.keywords}
                    onChange={metaChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Meta description"
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
            </CardBlocks>
          </Grid>

          <Grid item lg={3} xs={12}>
            <CardBlocks title="Status" nomargin>
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
            </CardBlocks>

            <CardBlocks title="Featured Image">
              <FeaturedImageComponent
                image={featureImage}
                feautedImageChange={(e) => fileChange(e)}
              />
            </CardBlocks>

            <CardBlocks title="Tags">
              <Select
                isMulti
                value={tags.defaultTags}
                name="blog_tag"
                options={tags.tags}
                onChange={tagChange}
              />
            </CardBlocks>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const EditBlog = () => {
  const params = useParams();

  return (
    <ThemeProvider theme={theme}>
      <EditBlogComponenet params={params} />
    </ThemeProvider>
  );
};
export default EditBlog;
