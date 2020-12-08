import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux";
import { blogAddAction } from "../../store/action/";
import TinymceEditor from "./TinymceEditor.js";
import clsx from "clsx";
import viewStyles from "../viewStyles";
import { Alert, Loading, TopBar, StyledRadio, CardBlocks } from "../components";

var defaultObj = {
  status: "Publish",
  blog_tag: [],
  url: "",
  meta: {
    title: "",
    description: "",
    keywords: "",
  },
};

const AddFAQ = () => {
  const classes = viewStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blogs);
  const [faq, setFaq] = useState(defaultObj);

  useEffect(() => {
    if (blogState.success) {
      document.forms[0].reset();
      setFaq(defaultObj);
    }
  }, [blogState.success]);

  useEffect(() => {
    if (blogState.blog.content !== undefined) {
      setFaq({ ...faq, content: blogState.blog.content });
    }
  }, [blogState.blog.content]);

  const addFaq = (e) => {
    e.preventDefault();
    dispatch(blogAddAction(faq));
  };

  const handleChange = (e) => {
    setFaq({ ...faq, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Alert />
      {blogState.loading && <Loading />}
      <form>
        <TopBar
          title='Add FAQ'
          onSubmit={addFaq}
          submitTitle='Add'
          backLink={"/all-faq"}
        />

        <Grid
          container
          spacing={isSmall ? 2 : 3}
          className={classes.secondmainrow}
        >
          <Grid item lg={9} md={12} xs={12}>
            <CardBlocks title='FAQ Information' nomargin>
              <Box component='div' mb={2}>
                <TextField
                  id='title'
                  label='Title'
                  name='title'
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
              </Box>

              <Box component='div'>
                <TinymceEditor />
              </Box>
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
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default AddFAQ;
