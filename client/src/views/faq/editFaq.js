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
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { blogUpdateAction, blogAction } from "../../store/action/";
import TinymceEditor from "./TinymceEditor.js";
import clsx from "clsx";
import { isEmpty } from "../../utils/helper";
import Loading from "../utils/loading";
import viewStyles from "../viewStyles";

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
const EditFAQ = (props) => {
  const classes = viewStyles();
  const [faq, setFaq] = useState(defaultObj);

  useEffect(() => {
    if (!isEmpty(props.match.params.id)) {
      props.blogAction(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(props.blogState.blog)) {
      setFaq({ ...faq, ...props.blogState.blog });
    }
  }, [props.blogState.blog]);

  const updateFaq = (e) => {
    e.preventDefault();
    props.blogUpdateAction(faq);
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
              <span style={{ paddingTop: 10 }}>Edit FAQ</span>
            </Typography>
          </Grid>

          <Grid item lg={6} className="text-right padding-right-2">
            <Button color="primary" variant="contained" onClick={updateFaq}>
              Update
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
                      value={faq.title}
                      className={clsx(classes.marginBottom, classes.width100)}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item md={12}>
                    {!isEmpty(props.blogState.blog) && (
                      <TinymceEditor value={faq.content} />
                    )}
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
                    value={faq.status}
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
  return { blogState: state.blogs };
};

const mapDispatchToProps = {
  blogUpdateAction,
  blogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFAQ);
