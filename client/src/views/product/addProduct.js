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
  Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ImageIcon from "@material-ui/icons/Image";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import palette from "../../theme/palette";
import renderHTML from "react-render-html";
import TinymceEditor from "./TinymceEditor.js";
import { categoriesAction, productAddAction } from "../../store/action/";
import Alert from "../utils/Alert";
import { unflatten, printTree, categoriesPrint } from "../../utils/helper";
import clsx from "clsx";

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

const AddProduct = props => {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = useState(0);
  const [featureImage, setfeatureImage] = useState(null);
  const inputLabel = React.useRef(null);

  const [product, setProduct] = useState({
    status: "Publish"
  });

  useEffect(() => {
    if (props.products.categories) {
      printTree(unflatten(props.products.categories));
      setProduct({
        status: "Publish",
        categories: categoriesPrint
      });
    }
  }, [props.products.categories]);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    props.categoriesAction();
    document.forms[0].reset();
    setProduct({
      status: "Publish"
    });
    setfeatureImage(null);
  }, [props.products.products]);

  useEffect(() => {
    if (props.products.product.description != undefined) {
      setProduct({
        ...product,
        description: props.products.product.description
      });
    }
  }, [props.products.product.description]);

  const addProduct = e => {
    e.preventDefault();
    product.pricing = {};
    product.pricing.sellprice = product.sellprice;
    console.log(product);
    props.productAddAction(product);
  };

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  /* const categoryChange = e => {
    var options = e.target.options;
    var value = [];
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setProduct({ ...product, categoryId: value });
  }; */

  const fileChange = e => {
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
    setProduct({ ...product, [e.target.name]: e.target.files });
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
                  <Link to="/all-products">
                    <IconButton aria-label="Back">
                      <ArrowBackIcon />
                    </IconButton>
                  </Link>
                }
                title="Add Product"
              />

              {props.products.loading && (
                <Backdrop className={classes.backdrop} open={true}>
                  <CircularProgress color="inherit" /> <br /> Loading
                </Backdrop>
              )}

              <Divider />

              <CardContent>
                <Grid container>
                  <Grid item md={4}>
                    <TextField
                      id="name"
                      label="Name"
                      name="name"
                      onChange={handleChange}
                      variant="outlined"
                      className={clsx(classes.marginBottom, classes.width100)}
                    />
                  </Grid>

                  <Grid item md={4}>
                    {renderHTML(categoriesPrint)}
                  </Grid>

                  <Grid item md={4}>
                    <TextField
                      id="url"
                      label="URL"
                      name="slug"
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

                <Grid container>
                  <Grid item md={4}>
                    <TextField
                      id="sku"
                      label="SKU"
                      name="sku"
                      onChange={handleChange}
                      variant="outlined"
                      className={clsx(classes.marginBottom, classes.width100)}
                    />
                  </Grid>

                  <Grid item md={4}>
                    <TextField
                      id="quantity"
                      label="Quantity"
                      name="quantity"
                      onChange={handleChange}
                      variant="outlined"
                      className={clsx(classes.marginBottom, classes.width100)}
                    />
                  </Grid>

                  <Grid item md={4}>
                    <TextField
                      id="sellprice"
                      label="Price"
                      name="sellprice"
                      onChange={handleChange}
                      variant="outlined"
                      className={clsx(classes.marginBottom, classes.width100)}
                    />
                  </Grid>
                </Grid>
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
                        onClick={addProduct}
                      >
                        Save
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
                    <input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      id="featured-image"
                      name="feature_image"
                      type="file"
                      onChange={fileChange}
                    />
                    <label
                      htmlFor="featured-image"
                      className={classes.feautedImage}
                    >
                      <ImageIcon />{" "}
                      {featureImage !== null
                        ? "Change Featured Image"
                        : "Set Featured Image"}
                    </label>
                  </Grid>

                  <Grid item md={12}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      id="Gallery-Image"
                      name="gallery_image"
                      type="file"
                      onChange={fileChange}
                      multiple={true}
                    />
                    <label
                      htmlFor="Gallery-Image"
                      className={classes.feautedImage}
                    >
                      {"Set Gallery Images"}
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
  return { products: state.products };
};

const mapDispatchToProps = {
  productAddAction,
  categoriesAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
