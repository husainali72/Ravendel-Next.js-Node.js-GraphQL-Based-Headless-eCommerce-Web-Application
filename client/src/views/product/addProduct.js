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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ImageIcon from "@material-ui/icons/Image";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TinymceEditor from "./TinymceEditor.js";
import {
  categoriesAction,
  productAddAction,
  shippingAction,
  taxAction
} from "../../store/action/";
import Alert from "../utils/Alert";
import { unflatten } from "../../utils/helper";
import clsx from "clsx";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import "../../App.css";
import viewStyles from "../viewStyles";
import _ from "lodash";

var defaultObj = {
  name: "",
  categoryId: [],
  pricing: {
    price: 0,
    sellprice: 0
  },
  meta: {
    title: "",
    description: "",
    keywords: ""
  },
  shipping: {
    height: 0,
    width: 0,
    depth: 0,
    weight: 0,
    shipping_class: ""
  },
  tax_class: "",
  featured_product: false,
  product_type: {
    virtual: false,
    downloadable: false
  }
};

const AddProduct = props => {
  const classes = viewStyles();

  const [featureImage, setfeatureImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [editPremalink, setEditPermalink] = useState(false);
  const [collapseCategory, setcollapseCategory] = useState({});
  const [product, setProduct] = useState(defaultObj);
  const [productCats, setproductCats] = useState([]);
  const [customfield, setcustomfield] = useState([]);

  useEffect(() => {
    props.shippingAction();
    props.taxAction();
  }, []);

  useEffect(() => {
    if (props.products.categories && props.products.categories.length) {
      //var selectedCat = _.cloneDeep(props.products.categories);
      setproductCats(_.cloneDeep(props.products.categories));
    }
  }, [props.products.categories, props.products.products]);

  useEffect(() => {
    props.categoriesAction();
    document.forms[0].reset();

    setProduct(defaultObj);
    setfeatureImage(null);
  }, [props.products.products]);

  useEffect(() => {
    if (
      props.shippingState.shipping.shipping_class.length &&
      props.taxState.tax.tax_class.length
    ) {
      setProduct({
        ...product,
        shipping: {
          ...product.shipping,
          shipping_class: props.shippingState.shipping.shipping_class[0]._id
        },
        tax_class: props.taxState.tax.tax_class[0]._id
      });
    }
  }, [props.shippingState.shipping, props.taxState.tax]);

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
    console.log(product);
    props.productAddAction(product);
  };

  const handleChange = e => {
    if (e.target.name === "name") {
      var slugVal = e.target.value.replace(/[^a-z0-9]/gi, "-");
      setProduct({
        ...product,
        url: slugVal.toLowerCase(),
        name: e.target.value
      });
      return;
    }
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const fileChange = e => {
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
    setProduct({ ...product, [e.target.name]: e.target.files });
  };

  const addgalleryImg = e => {
    var imagesRes = [...e.target.files];
    var images = [];
    for (let i in imagesRes) {
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

  const handleCategeryCheckbox = category => {
    category.checked = !category.checked;
    var items = document.getElementsByName("categoryIds");
    var selectedItems = [];
    for (let i in items) {
      if (items[i].type === "checkbox" && items[i].checked === true)
        selectedItems.push(items[i].value);
    }
    //product.categoryId = selectedItems;
    setProduct({ ...product, categoryId: selectedItems });
  };

  const changePermalink = () => {
    setEditPermalink(!editPremalink);
  };

  const checkedChildernChecked = cat => {
    var checked = cat.children.filter(child => child.checked === true);
    if (!cat.checked) {
      if (checked.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const addCustomField = () => {
    setcustomfield([...customfield, { key: "", value: "" }]);
  };

  const removeCustomField = i => {
    delete customfield[i];
    setcustomfield([...customfield]);
  };

  const customChange = (e, i) => {
    if (e.target.name === "key") {
      customfield[i].key = e.target.value;
    } else {
      customfield[i].value = e.target.value;
    }

    setcustomfield([...customfield]);
  };

  const menuListing = categories => {
    return categories.map(cat => {
      if (!cat.children.length) {
        return (
          <Grid container alignItems="center" key={cat.name}>
            <Grid item>
              <Box mr={2}>
                <FiberManualRecordTwoToneIcon />
              </Box>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cat.checked}
                    name="categoryIds"
                    onChange={e => handleCategeryCheckbox(cat)}
                    value={cat.id}
                  />
                }
                label={cat.name}
              />
            </Grid>
          </Grid>
        );
      }
      return (
        <Grid key={cat.name}>
          <Grid container alignItems="center" className="category-dropdown">
            <Grid item>
              <Box mr={2}>
                <span
                  className="toggle-icon"
                  onClick={() => collapseToggle(cat)}
                >
                  {collapseCategory[cat.id] ? (
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
                    checked={cat.checked}
                    name="categoryIds"
                    onChange={e => handleCategeryCheckbox(cat)}
                    value={cat.id}
                    indeterminate={checkedChildernChecked(cat)}
                  />
                }
                label={cat.name}
              />
            </Grid>
          </Grid>
          <Box ml={4}>
            <Collapse
              in={collapseCategory[cat.id]}
              timeout="auto"
              unmountOnExit
              className="submenu-sidebar"
            >
              {menuListing(cat.children)}
            </Collapse>
          </Box>
        </Grid>
      );
    });
  };

  const StyledRadio = props => {
    const classes = viewStyles();
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

        <Grid container spacing={4} className={classes.secondmainrow}>
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
                          <strong>Link: </strong>/
                          {editPremalink === false && product.url}
                          {editPremalink === true && (
                            <input
                              id="url"
                              name="url"
                              value={product.url}
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
                    {menuListing(unflatten(productCats))}
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
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                        type="number"
                        onChange={e =>
                          setProduct({
                            ...product,
                            pricing: {
                              ...product.pricing,
                              price: Number(e.target.value)
                            }
                          })
                        }
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        id="sellprice"
                        label="Sale Price"
                        name="sellprice"
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                        type="number"
                        onChange={e =>
                          setProduct({
                            ...product,
                            pricing: {
                              ...product.pricing,
                              sellprice: Number(e.target.value)
                            }
                          })
                        }
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
                              checked={product.product_type.virtual}
                              name="virtual"
                              value="virtual"
                              onChange={e =>
                                setProduct({
                                  ...product,
                                  product_type: {
                                    ...product.product_type,
                                    virtual: e.target.checked
                                  }
                                })
                              }
                            />
                          }
                          label="Virtual"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={product.product_type.downloadable}
                              name="downloadable"
                              value="downloadable"
                              onChange={e =>
                                setProduct({
                                  ...product,
                                  product_type: {
                                    ...product.product_type,
                                    downloadable: e.target.checked
                                  }
                                })
                              }
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

            <Box
              component="span"
              m={1}
              display={product.product_type.virtual ? "none" : "flex"}
            >
              <Card>
                <CardHeader title="Shipping" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={12}>
                      {!props.shippingState.shipping.global.is_global ? (
                        <FormControl className={classes.taxSelect}>
                          <InputLabel id="Shipping-name">Shipping</InputLabel>
                          <Select
                            labelId="Shipping-name"
                            id="Shipping-name"
                            name="Shipping-name"
                            value={product.shipping.shipping_class}
                            onChange={e =>
                              setProduct({
                                ...product,
                                shipping: {
                                  ...product.shipping,
                                  shipping_class: e.target.value
                                }
                              })
                            }
                          >
                            {props.shippingState.shipping.shipping_class.map(
                              (shipping, index) => {
                                return (
                                  <MenuItem value={shipping._id} key={index}>
                                    {shipping.name}
                                  </MenuItem>
                                );
                              }
                            )}
                          </Select>
                        </FormControl>
                      ) : (
                        <b>
                          "The global shipping option is on currently. To
                          configure the shipping for individual products, please
                          turn off the global shipping option first."
                        </b>
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
                        value={product.shipping.height}
                        onChange={e =>
                          setProduct({
                            ...product,
                            shipping: {
                              ...product.shipping,
                              height: e.target.value
                            }
                          })
                        }
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
                        value={product.shipping.width}
                        onChange={e =>
                          setProduct({
                            ...product,
                            shipping: {
                              ...product.shipping,
                              width: e.target.value
                            }
                          })
                        }
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
                        value={product.shipping.depth}
                        onChange={e =>
                          setProduct({
                            ...product,
                            shipping: {
                              ...product.shipping,
                              depth: e.target.value
                            }
                          })
                        }
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
                        value={product.shipping.weight}
                        onChange={e =>
                          setProduct({
                            ...product,
                            shipping: {
                              ...product.shipping,
                              weight: e.target.value
                            }
                          })
                        }
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
                  {!props.taxState.tax.global.is_global ? (
                    <FormControl className={classes.taxSelect}>
                      <InputLabel id="tax-name">Tax Class</InputLabel>
                      <Select
                        labelId="tax-name"
                        id="tax-name"
                        name="tax-name"
                        value={product.tax_class}
                        onChange={e =>
                          setProduct({
                            ...product,
                            tax_class: e.target.value
                          })
                        }
                      >
                        {props.taxState.tax.tax_class.map(tax => {
                          return (
                            <MenuItem value={tax._id} key={tax._id}>
                              {tax.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  ) : (
                    <b>
                      "The global tax option is on currently. To configure the
                      tax for individual products, please turn off the global
                      tax option first."
                    </b>
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
                <CardHeader title="Custom Fields" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    {customfield.map((field, index) => {
                      return (
                        <Grid container spacing={3} key={index}>
                          <Grid item md={4}>
                            <TextField
                              label="Custom Field Name: *"
                              variant="outlined"
                              name="key"
                              className={clsx(
                                classes.marginBottom,
                                classes.width100
                              )}
                              value={field.key}
                              onChange={e => customChange(e, index)}
                            />
                          </Grid>

                          <Grid item md={4}>
                            <TextField
                              label="Custom Field Value: *"
                              variant="outlined"
                              name="value"
                              className={clsx(
                                classes.marginBottom,
                                classes.width100
                              )}
                              value={field.value}
                              onChange={e => customChange(e, index)}
                            />
                          </Grid>
                          <Grid item md={4}>
                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={e => removeCustomField(index)}
                            >
                              -
                            </Button>
                          </Grid>
                        </Grid>
                      );
                    })}
                    <Grid item md={4}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={addCustomField}
                      >
                        + Add Custom Fields
                      </Button>
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
                        onChange={e =>
                          setProduct({
                            ...product,
                            meta: {
                              ...product.meta,
                              title: e.target.value
                            }
                          })
                        }
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        id="meta-keyword"
                        label="Meta Keyword"
                        name="meta-keyword"
                        variant="outlined"
                        className={clsx(classes.width100)}
                        onChange={e =>
                          setProduct({
                            ...product,
                            meta: {
                              ...product.meta,
                              keywords: e.target.value
                            }
                          })
                        }
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
                        onChange={e =>
                          setProduct({
                            ...product,
                            meta: {
                              ...product.meta,
                              description: e.target.value
                            }
                          })
                        }
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
                <CardContent>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={product.featured_product}
                          onChange={e =>
                            setProduct({
                              ...product,
                              featured_product: e.target.checked
                            })
                          }
                        />
                      }
                      label="Featured Product"
                    />
                  </FormGroup>
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
  return {
    products: state.products,
    taxState: state.taxs,
    shippingState: state.shippings
  };
};

const mapDispatchToProps = {
  productAddAction,
  categoriesAction,
  taxAction,
  shippingAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
