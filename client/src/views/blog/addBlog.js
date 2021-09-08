import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { blogAddAction, blogtagsAction } from "../../store/action/";
import viewStyles from "../viewStyles";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import { getUpdatedUrl } from "../../utils/service";
import {
  Loading,
  TopBar,
  StyledRadio,
  TextInput,
  CardBlocks,
  FeaturedImageComponent,
  URLComponent,
  TinymceEditor
} from "../components";

var defaultObj = {
  status: "Publish",
  blog_tag: [],
  url: "",
  content: "",
  meta: {
    title: "",
    description: "",
    keywords: "",
  },
};

const AddBlog = () => {
  const classes = viewStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blogs);
  const [featureImage, setfeatureImage] = useState(null);
  const [blog, setBlog] = useState(defaultObj);
  const [tags, setTags] = useState([]);
  const [clearTags, setclearTags] = useState([]);

  useEffect(() => {
    dispatch(blogtagsAction());
  }, []);

  useEffect(() => {
    const tagObj = blogState.tags.map((tag) => {
      return {
        value: tag.id,
        label: tag.name,
      };
    });

    setTags([...tagObj]);
  }, [blogState.tags]);

  useEffect(() => {
    if (blogState.success) {
      document.forms[0].reset();
      setBlog(defaultObj);
      setfeatureImage(null);
      setclearTags([]);
    }
  }, [blogState.success]);

  const addBlog = (e) => {
    e.preventDefault();
    dispatch(blogAddAction(blog));
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const tagChange = (e) => {
    if (!isEmpty(e)) {
      setclearTags(e);
      setBlog({ ...blog, blog_tag: e.map((tag) => tag.value) });
    }
  };

  const metaChange = (e) => {
    setBlog({
      ...blog,
      meta: { ...blog.meta, [e.target.name]: e.target.value },
    });
  };

  const fileChange = (e) => {
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
    setBlog({ ...blog, [e.target.name]: e.target.files[0] });
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
      {blogState.loading ? <Loading /> : null}
      <form>
        <TopBar
          title='Add Blog'
          onSubmit={addBlog}
          submitTitle='Add'
          backLink={`${client_app_route_url}all-blogs`}
        />

        <Grid
          container
          spacing={isSmall ? 2 : 3}
          className={classes.secondmainrow}
        >
          <Grid item lg={9} md={12} xs={12}>
            <CardBlocks title='Blog Information' nomargin>
              <Box component='div' mb={2} >
                <TextField
                  label='Title'
                  name='title'
                  onChange={handleChange}
                  onBlur={(e) => !blog.url && isUrlExist(blog.title)}
                  variant='outlined'
                  fullWidth
                />
              </Box>

              <Box component='div' mb={2}>
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

              <Box component='div'>
                <TinymceEditor 
                   value={blog.content}
                   onEditorChange={(value) =>
                    setBlog({ ...blog, ["content"]: value })
                   }
                />
              </Box>
            </CardBlocks>

            <CardBlocks title='Meta Information'>
              <Grid container spacing={isSmall ? 1 : 2}>
                <Grid item md={6} xs={12}>
                  <TextInput
                    value={blog.meta.title}
                    label='Meta Title'
                    name='title'
                    onInputChange={metaChange}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextInput
                    value={blog.meta.keywords}
                    label='Meta Keywords'
                    name='keywords'
                    onInputChange={metaChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    value={blog.meta.description}
                    label='Meta Description'
                    name='description'
                    onInputChange={metaChange}
                    multiline
                    rows='4'
                  />
                </Grid>
              </Grid>
            </CardBlocks>
          </Grid>

          <Grid item lg={3} md={12} xs={12}>
            <CardBlocks title='Status' nomargin>
              <RadioGroup
                defaultValue='Publish'
                name='status'
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value='Publish'
                  control={<StyledRadio />}
                  label='Publish'
                />
                <FormControlLabel
                  value='Draft'
                  control={<StyledRadio />}
                  label='Draft'
                />
              </RadioGroup>
            </CardBlocks>

            <CardBlocks title='Featured Image'>
              <Grid item xs={12}>
                <FeaturedImageComponent 
                  image={featureImage}
                  feautedImageChange={(e) => fileChange(e)}
                />
              </Grid>
            </CardBlocks>

            <CardBlocks title='Tags'>
              <Typography variant='subtitle1' className={classes.marginBottom1}>
                Select Tags
              </Typography>

              <Select
                isMulti
                value={clearTags}
                name='blog_tag'
                options={tags}
                onChange={tagChange}
                // menuPortalTarget={document.querySelector("body")}
              />
            </CardBlocks>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default AddBlog;
