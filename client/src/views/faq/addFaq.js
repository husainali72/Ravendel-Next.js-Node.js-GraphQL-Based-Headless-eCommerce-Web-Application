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
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { blogAddAction } from "../../store/action/";
import TinymceEditor from "./TinymceEditor.js";
import clsx from "clsx";
import Loading from "../utils/loading";
import viewStyles from "../viewStyles";
import { isEmpty } from "../../utils/helper";

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

const AddFAQ = (props) => {
  const classes = viewStyles();
  const [faq, setFaq] = useState(defaultObj);

  useEffect(() => {
    if (props.blogState.success) {
      document.forms[0].reset();
      setFaq(defaultObj);
    }
  }, [props.blogState.success]);

  useEffect(() => {
    if (props.blogState.blog.content !== undefined) {
      setFaq({ ...faq, content: props.blogState.blog.content });
    }
  }, [props.blogState.blog.content]);

  const addFaq = (e) => {
    e.preventDefault();
    props.blogAddAction(faq);
  };

  const handleChange = (e) => {
    setFaq({ ...faq, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      {props.blogState.loading && <Loading />}
      <form>
        <Grid container className="topbar">
          <Grid item lg={6}>
            <Typography variant="h4">
              <Link to="/all-faq">
                <IconButton aria-label="Back">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <span style={{ paddingTop: 10 }}>Add FAQ</span>
            </Typography>
          </Grid>

          <Grid item lg={6} className="text-right padding-right-2">
            <Button color="primary" variant="contained" onClick={addFaq}>
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.cancelBtn}
            >
              <Link to="/all-faq" style={{ color: "#fff" }}>
                Discard
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} className={classes.secondmainrow}>
          <Grid item lg={9} md={12}>
            <Card>
              <CardHeader title="FAQ Information" />
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

const mapStateToProps = (state) => {
  return {
    blogState: state.blogs,
  };
};

const mapDispatchToProps = {
  blogAddAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFAQ);
