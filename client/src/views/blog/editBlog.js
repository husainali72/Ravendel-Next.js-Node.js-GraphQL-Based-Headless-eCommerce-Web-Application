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
  Input
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ImageIcon from "@material-ui/icons/Image";
import Alert from "../utils/Alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { blogUpdateAction } from "../../store/action/";
import palette from "../../theme/palette";
import TinymceEditor from "./TinymceEditor.js";
import clsx from "clsx";
import { isEmpty } from "../../utils/helper";

const useStyles = makeStyles(theme => ({
  cancelBtn: {
    background: palette.error.dark,
    color: "#fff",
    marginLeft: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  mainrow: {
    padding: theme.spacing(4)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  width100: {
    width: "100%"
  },
  formbottom: {
    marginTop: theme.spacing(3)
  },
  secondRow: {
    marginTop: theme.spacing(3)
  },
  marginBottom: {
    marginBottom: theme.spacing(3)
  },
  feautedImage: {
    color: "#0073aa",
    textDecoration: "underline",
    display: "flex",
    cursor: "pointer"
  },
  feautedImageBox: {
    background: "rgb(240,240,240)",
    height: "250px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2)
  },
  feautedImageBoxPreview: {
    maxWidth: "90%",
    maxHeight: "90%"
  }
}));

const EditBlog = props => {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = useState(0);
  const [featureImage, setfeatureImage] = useState(null);
  const inputLabel = React.useRef(null);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    status: "Publish",
    feature_image: ""
  });

  const updateBlog = e => {
    e.preventDefault();
    console.log(blog);
    props.blogUpdateAction(blog);
  };

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    props.blogs.blogs.map(editblog => {
      if (editblog.id === props.match.params.id) {
        setBlog({ ...editblog });
        if (editblog.feature_image.original) {
          setfeatureImage(editblog.feature_image.original);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!isEmpty(props.blogs.blog.content)) {
      setBlog({ ...blog, content: props.blogs.blog.content });
    }
  }, [props.blogs.blog.content]);

  const handleChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const fileChange = e => {
    console.log(e.target.name);
    setBlog({ ...blog, [e.target.name]: e.target.files[0] });
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Fragment>
      <Alert />
      <form>
        <Grid container spacing={4} className={classes.mainrow}>
          <Grid item lg={9} md={12}>
            <Card>
              <CardHeader
                action={
                  <Link to="/all-blog">
                    <IconButton aria-label="Back">
                      <ArrowBackIcon />
                    </IconButton>
                  </Link>
                }
                title="Edit Blog"
              />
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

                {props.blogs.loading && (
                  <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress color="inherit" /> <br /> Loading
                  </Backdrop>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={3} md={12}>
            <Box>
              <Card mb={4}>
                <CardHeader title="Publish" />
                <CardContent>
                  <Grid item md={12}>
                    <FormControl
                      variant="outlined"
                      className={clsx(classes.marginBottom, classes.width100)}
                    >
                      <InputLabel ref={inputLabel} id="status">
                        Status
                      </InputLabel>
                      <Select
                        labelId="status"
                        id="status"
                        name="status"
                        onChange={handleChange}
                        labelWidth={labelWidth}
                        value={blog.status}
                      >
                        <MenuItem value="Publish">Publish</MenuItem>
                        <MenuItem value="Draft">Draft</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid container>
                    <Grid item md={12}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={updateBlog}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.cancelBtn}
                      >
                        <Link to="/all-blogs" style={{ color: "#fff" }}>
                          Cancel
                        </Link>
                      </Button>
                    </Grid>
                  </Grid>
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
  blogUpdateAction
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
