import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
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
  blogAddAction,
} from "../../store/action/";
import clsx from "clsx";
import {
  isEmpty,
  client_app_route_url,
  bucketBaseURL,
  getBaseUrl,
} from "../../utils/helper";
import viewStyles from "../viewStyles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
import {
  Loading,
  TopBar,
  StyledRadio,
  CardBlocks,
  TextInput,
  FeaturedImageComponent,
  URLComponent,
  TinymceEditor,
} from "../components";
import { useNavigate, useParams } from "react-router-dom";
import Alerts from "../components/Alert";
import { get } from "lodash";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { getUpdatedUrl } from "../../utils/service";

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
  const setting = useSelector((state) => state.settings);
  const [featureImage, setfeatureImage] = useState(null);
  const [blog, setBlog] = useState(defaultObj);
  const [tags, setTags] = useState({ tags: [], defaultTags: [] });
  const [clearTags, setclearTags] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const baseURl = getBaseUrl(setting);
  useEffect(() => {
    if (Id) {
      dispatch(blogAction(Id));
    } else {
      dispatch(blogtagsAction());
    }
  }, []);

  useEffect(() => {
    if (Id) {
      if (!isEmpty(get(blogState, "blog"))) {
        setBlog({ ...blog, ...blogState.blog });
        if (blogState.blog.feature_image) {
          setfeatureImage(baseURl + blogState.blog.feature_image);
        }
        dispatch(blogtagsAction());
      }
    } else {
      setBlog(defaultObj);
      setfeatureImage(null);
    }
  }, [get(blogState, "blog"), Id, baseURl]);

  useEffect(() => {
    if (!Id) {
      if (isEmpty(get(blogState, "success"))) {
        document.forms[0].reset();
        setBlog(defaultObj);
        setfeatureImage(null);
        setclearTags([]);
      }
    }
  }, [get(blogState, "success")]);

  useEffect(() => {
    setloading(get(blogState, "loading"));
  }, [get(blogState, "loading")]);

  useEffect(() => {
    if (!isEmpty(get(blogState, "tags"))) {
      if (Id) {
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
      } else {
        const tagObj = blogState.tags.map((tag) => {
          return {
            value: tag.id,
            label: tag.name,
          };
        });

        setTags({ ...tagObj, tags: tagObj });
      }
    }
  }, [get(blogState, "tags")]);

  const tagChange = (e) => {
    if (Id) {
      setBlog({
        ...blog,
        blog_tag: e && e.length > 0 ? e.map((tag) => tag.value) : [],
      });
      setTags({ ...tags, defaultTags: e });
    } else {
      if (!isEmpty(e)) {
        setclearTags(e);
        setBlog({ ...blog, blog_tag: e.map((tag) => tag.value) });
      }
    }
  };

  const addUpdateBlog = (e) => {
    e.preventDefault();
    var errors = validate(["content", "title"], blog);
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    } else {
      if (Id) {
        dispatch(blogUpdateAction(blog, navigate));
      } else {
        dispatch(blogAddAction(blog, navigate));
      }
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

  const onBlur = (e) => {
    if (!blog.url || blog.url !== e.target.value) {
      isUrlExist(blog.title);
    }
  };

  const fileChange = (e) => {
    const files = get(e, "target.files");

    if (files && files.length > 0) {
      setfeatureImage(URL.createObjectURL(files[0]));

      const updatedImageApiName = Id ? "updatedImage" : e.target.name;
      setBlog({ ...blog, [updatedImageApiName]: files[0] });
    } else {
      setfeatureImage(featureImage);
    }
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
      <Alerts />

      {loading ? <Loading /> : null}
      <form>
        <TopBar
          title={Id ? "Edit Blog" : "Add Blog"}
          onSubmit={addUpdateBlog}
          submitTitle={Id ? "Update" : "Add"}
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
                  onBlur={onBlur}
                  fullWidth
                />
              </Box>
              <Box component="div" mb={2}>
                <URLComponent
                  url={blog.url}
                  onBlur={onBlur}
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
              <Typography variant="subtitle1" className={classes.marginBottom1}>
                Select Tags
              </Typography>
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
