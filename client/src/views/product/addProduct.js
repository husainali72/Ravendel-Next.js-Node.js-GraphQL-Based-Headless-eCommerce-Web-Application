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
  Typography,
  Divider,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Collapse,
  RadioGroup,
  Radio,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ImageIcon from "@material-ui/icons/Image";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import palette from "../../theme/palette";
import TinymceEditor from "./TinymceEditor.js";
import { categoriesAction, productAddAction } from "../../store/action/";
import Alert from "../utils/Alert";
import { unflatten } from "../../utils/helper";
import clsx from "clsx";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import "../../App.css";

const AddProduct = props => {
  const classes = useStyles();
  const [tax, setTax] = useState("Global");
  const [shippingClass, setShippingClass] = useState("Global");
  const [featureImage, setfeatureImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [editPremalink, setEditPermalink] = useState(false);
  const [collapseCategory, setcollapseCategory] = useState({});
  const [checkedCat, setCheckedCat] = useState({});
  const [product, setProduct] = useState({
    name: "",
    downloadable: false,
    virtual: false,
    categoryId: []
  });

  useEffect(() => {
    props.categoriesAction();
    document.forms[0].reset();
    setProduct({
      ...product,
      categoryId: []
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

  useEffect(() => {
    var slugVal = product.name.replace(/[^A-Z0-9]/gi, "-");
    setProduct({ ...product, slug: slugVal.toLowerCase() });
  }, [product.name]);

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

  const handleChangeCheckbox = e => {
    setProduct({ ...product, [e.target.name]: e.target.checked });
  };

  const fileChange = e => {
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
    setProduct({ ...product, [e.target.name]: e.target.files });
  };

  const addgalleryImg = e => {
    var imagesRes = e.target.files;
    var images = [];

    for (var i = 0; i < imagesRes.length; i++) {
      images.push(URL.createObjectURL(imagesRes[i]));
    }

    setGallery([...gallery, ...images]);
    setProduct({ ...product, [e.target.name]: e.target.files });
  };

  const removeImage = img => {
    setGallery(gallery.filter(galleryImg => galleryImg !== img));
  };

  const collapseToggle = category => {
    category.open = !category.open;
    setcollapseCategory({ ...collapseCategory, [category.id]: category.open });
  };

  const handleCategeryCheckbox = (category, e) => {
    category.checked = !category.checked;
    setCheckedCat({ ...checkedCat, [category.id]: category.checked });
    var items = document.getElementsByName("categoryIds");
    var selectedItems = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].type == "checkbox" && items[i].checked == true)
        selectedItems.push(items[i].value);
    }
    product.categoryId = selectedItems;

    console.log(product.categoryId);
  };

  const changePermalink = () => {
    setEditPermalink(!editPremalink);
  };

  const checkedChildernChecked = menu => {
    var checked = menu.children.filter(child => child.checked === true);
    if (!menu.checked) {
      if (checked.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const menuListing = values => {
    return values.map(menu => {
      if (!menu.children.length) {
        return (
          <Grid container alignItems="center" key={menu.name}>
            <Grid item>
              <Box mr={2}>
                <FiberManualRecordTwoToneIcon />
              </Box>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={menu.checked}
                    name="categoryIds"
                    onChange={e => handleCategeryCheckbox(menu, e)}
                    value={menu.id}
                  />
                }
                label={menu.name}
              />
            </Grid>
          </Grid>
        );
      }
      return (
        <Grid key={menu.name}>
          <Grid container alignItems="center" className="category-dropdown">
            <Grid item>
              <Box mr={2}>
                <span
                  className="toggle-icon"
                  onClick={() => collapseToggle(menu)}
                >
                  {collapseCategory[menu.id] ? (
                    <RemoveCircleRoundedIcon
                      style={{ fontSize: 22 }}
                      className="expand-right"
                    />
                  ) : (
                    <AddCircleRoundedIcon
                      style={{ fontSize: 22 }}
                      className="expand-right"
                    />
                  )}
                </span>
              </Box>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={menu.checked}
                    name="categoryIds"
                    onChange={e => handleCategeryCheckbox(menu, e)}
                    value={menu.id}
                    indeterminate={checkedChildernChecked(menu)}
                  />
                }
                label={menu.name}
              />
            </Grid>
          </Grid>
          <Box ml={4}>
            <Collapse
              in={collapseCategory[menu.id]}
              timeout="auto"
              unmountOnExit
              className="submenu-sidebar"
            >
              {menuListing(menu.children)}
            </Collapse>
          </Box>
        </Grid>
      );
    });
  };

  const StyledRadio = props => {
    const classes = useStyles();
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

  return (
    <Fragment>
      <Alert />
      <form>
        <Grid container className="topbar">
          <Grid item lg={6}>
            <Typography variant="h4">
              <Link to="/all-products">
                <IconButton aria-label="Back">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <span style={{ paddingTop: 10 }}>Add product</span>
            </Typography>
          </Grid>

          <Grid item lg={6} className="text-right padding-right-2">
            <Button color="primary" variant="contained" onClick={addProduct}>
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.cancelBtn}
            >
              <Link to="/all-products" style={{ color: "#fff" }}>
                Discard
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} className={classes.mainrow}>
          {props.products.loading && (
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress color="inherit" /> <br /> Loading
            </Backdrop>
          )}
          <Grid item lg={9} md={12}>
            <Box component="span">
              <Card>
                <CardHeader title="Product Information" />
                <Divider />
                <CardContent>
                  <Grid container>
                    <Grid item md={12}>
                      <TextField
                        id="name"
                        label="Name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                      />
                    </Grid>

                    <Grid item md={12}>
                      {product.name ? (
                        <span style={{ marginBottom: 10, display: "block" }}>
                          <strong>Link: </strong>
                          https://www.google.com/product/
                          {editPremalink === false && product.slug}
                          {editPremalink === true && (
                            <input
                              id="url"
                              name="slug"
                              value={product.slug}
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
                  </Grid>

                  <Grid container>
                    <Grid item md={12}>
                      <TinymceEditor />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Categories" />
                <Divider />
                <CardContent>
                  <Grid item md={12}>
                    {menuListing(unflatten(props.products.categories))}
                  </Grid>
                </CardContent>
              </Card>
            </Box>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Pricing" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={4}>
                      <TextField
                        id="price"
                        label="Price"
                        name="price"
                        onChange={handleChange}
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                        type="number"
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        id="sellprice"
                        label="Sell Price"
                        name="sellprice"
                        onChange={handleChange}
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                        type="number"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Product Type" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={12}>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={product.virtual}
                              name="virtual"
                              onChange={handleChangeCheckbox}
                              value={product.virtual}
                            />
                          }
                          label="Virtual"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={product.downloadable}
                              name="downloadable"
                              onChange={handleChangeCheckbox}
                              value={product.downloadable}
                            />
                          }
                          label="Downloadable"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Shipping" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={12}>
                      <RadioGroup
                        value={shippingClass}
                        name="status"
                        onChange={e => setShippingClass(e.target.value)}
                        row
                      >
                        <FormControlLabel
                          value="Global"
                          control={<StyledRadio />}
                          label="Global"
                        />
                        <FormControlLabel
                          value="Custom-shipping"
                          control={<StyledRadio />}
                          label="Custom Shipping"
                        />
                      </RadioGroup>
                      {shippingClass === "Custom-shipping" && (
                        <FormControl className={classes.taxSelect}>
                          <InputLabel id="Shipping-name">Shipping</InputLabel>
                          <Select
                            labelId="Shipping-name"
                            id="Shipping-name"
                            name="Shipping-name"
                            onChange={e => console.log(e)}
                          >
                            <MenuItem value="Shipping-1">Shipping 1</MenuItem>
                            <MenuItem value="Shipping-2">Shipping 2</MenuItem>
                            <MenuItem value="Shipping-3">Shipping 3</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </Grid>
                    <Grid item md={3}>
                      <TextField
                        id="height"
                        label="Height"
                        name="height"
                        onChange={handleChange}
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                        type="number"
                      />
                    </Grid>

                    <Grid item md={3}>
                      <TextField
                        id="width"
                        label="Width"
                        name="width"
                        onChange={handleChange}
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                        type="number"
                      />
                    </Grid>

                    <Grid item md={3}>
                      <TextField
                        id="depth"
                        label="Depth"
                        name="depth"
                        onChange={handleChange}
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                        type="number"
                      />
                    </Grid>

                    <Grid item md={3}>
                      <TextField
                        id="weigth"
                        label="Weigth"
                        name="weigth"
                        onChange={handleChange}
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                        type="number"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>

            <Box component="span">
              <Card>
                <CardHeader title="Tax" />
                <Divider />
                <CardContent>
                  <RadioGroup
                    value={tax}
                    name="status"
                    onChange={e => setTax(e.target.value)}
                    row
                  >
                    <FormControlLabel
                      value="Global"
                      control={<StyledRadio />}
                      label="Global"
                    />
                    <FormControlLabel
                      value="Custom-tax"
                      control={<StyledRadio />}
                      label="Custom Tax"
                    />
                  </RadioGroup>
                  {tax === "Custom-tax" && (
                    <FormControl className={classes.taxSelect}>
                      <InputLabel id="tax-name">Tax</InputLabel>
                      <Select
                        labelId="tax-name"
                        id="tax-name"
                        name="tax-name"
                        onChange={e => console.log(e)}
                      >
                        <MenuItem value="Tax-1">Tax 1</MenuItem>
                        <MenuItem value="Tax-2">Tax 2</MenuItem>
                        <MenuItem value="Tax-3">Tax 3</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </CardContent>
              </Card>
            </Box>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Inventory" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
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
                        type="number"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>

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
                        name="meta-title"
                        variant="outlined"
                        className={clsx(classes.width100)}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        id="meta-keyword"
                        label="Meta Keyword"
                        name="meta-keyword"
                        variant="outlined"
                        className={clsx(classes.width100)}
                      />
                    </Grid>

                    <Grid item md={12}>
                      <TextField
                        id="meta-description"
                        label="Meta-description"
                        name="meta-description"
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
            <Box component="span">
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

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Featured Image" />
                <Divider />
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
                </CardContent>
              </Card>
            </Box>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Gallery Image" />
                <Divider />
                <CardContent>
                  <Grid item md={12}>
                    <div className={classes.galleryImgOuterBox}>
                      {gallery
                        ? gallery.map((img, index) => (
                            <div key={index} className={classes.galleryImgBox}>
                              <span
                                className={classes.galleryImgRemove}
                                onClick={() => removeImage(img)}
                              >
                                x
                              </span>
                              <img src={img} className={classes.galleryImg} />
                            </div>
                          ))
                        : null}
                    </div>
                    <input
                      accept="image/*"
                      className={classes.input}
                      style={{ display: "none" }}
                      id="Gallery-Image"
                      name="gallery_image"
                      type="file"
                      onChange={addgalleryImg}
                      multiple={true}
                    />
                    <label
                      htmlFor="Gallery-Image"
                      className={classes.feautedImage}
                    >
                      <ImageIcon />
                      {" Add Gallery Images"}
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
    padding: theme.spacing(4),
    marginTop: 40
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%"
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
  },
  galleryImgOuterBox: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginBottom: 5
  },
  galleryImgBox: {
    margin: 5,
    width: 60,
    height: 60,
    position: "relative",
    background: "#ddd",
    padding: 5
  },
  galleryImgRemove: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#d80e0e",
    borderRadius: "100%",
    color: "#fff",
    width: 20,
    height: 20,
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "bold"
  },
  galleryImg: { width: "100%", height: "100%" },
  editpermalinkInput: {
    padding: "5px !important",
    height: "25px",
    marginLeft: 10
  },
  editpermalinkInputBtn: {
    height: "25px",
    fontSize: "10px",
    padding: 0,
    marginLeft: 10
  },
  taxSelect: {
    width: 300,
    marginTop: 20
  }
}));

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
