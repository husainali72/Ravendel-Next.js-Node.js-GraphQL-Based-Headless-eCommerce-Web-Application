import React, { Fragment, useState, useEffect } from "react";
import viewStyles from "../viewStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import Alert from "../utils/Alert";
import Loading from "../utils/loading";
import { isEmpty } from "../../utils/helper";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Box,
  Typography,
  Tab,
  Tabs,
  Input,
  Chip
} from "@material-ui/core";
import clsx from "clsx";
import { connect } from "react-redux";
import { categoriesAction, productsAction } from "../../store/action/";

const AddCoupon = props => {
  const classes = viewStyles();
  const [tabVal, setTabVal] = useState("general");
  const [products, setProducts] = useState([]);
  const [excludeProducts, setExcludeProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [excludeCategories, setExcludeCategories] = useState([]);
  const [allCategroies, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    if (isEmpty(props.products.categories)) {
      props.categoriesAction();
    }
  }, []);

  useEffect(() => {
    if (isEmpty(props.products.products)) {
      props.productsAction();
    }
  }, []);

  useEffect(() => {
    setAllProducts(props.products.products);
  }, [props.products.products]);

  useEffect(() => {
    setAllCategories(props.products.categories);
  }, [props.products.categories]);

  const tabChange = (event, newValue) => {
    setTabVal(newValue);
  };
  const addCoupon = () => {
    console.log("Coupon Added");
  };
  const handleChange = e => {
    console.log("Name / Value", e.target.name + "/" + e.target.value);
  };
  const selectChange = e => {
    switch (e.target.name) {
      case "Products":
        setProducts(e.target.value);
        break;
      case "ExcludeProducts":
        setExcludeProducts(e.target.value);
        break;
      case "Categories":
        setCategories(e.target.value);
        break;
      case "ExcludeCategories":
        setExcludeCategories(e.target.value);
        break;
      default:
        console.log("No Match any State");
        break;
    }
  };

  /* ==================Component for Select===================== */

  const SelectOptionField = props => {
    return (
      <FormControl
        variant="outlined"
        className={clsx(classes.marginBottom, classes.width100)}
      >
        <InputLabel id="products-select">{props.label}</InputLabel>
        <Select
          labelId="products-select"
          multiple
          onChange={selectChange}
          input={<Input id="select-multiple-chip" variant="outlined" />}
          value={props.value}
          name={props.name}
          renderValue={selected => (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {selected.map(value => (
                <Chip key={value} label={value} style={{ margin: 2 }} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {props.children}
        </Select>
      </FormControl>
    );
  };

  return (
    <Fragment>
      <Alert />
      {props.loading && <Loading />}
      <Grid container className="topbar">
        <Grid item lg={6}>
          <Typography variant="h4">
            <Link to="/all-coupons">
              <IconButton aria-label="Back">
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <span style={{ paddingTop: 10 }}>Add Coupon</span>
          </Typography>
        </Grid>

        <Grid item lg={6} className="text-right padding-right-2">
          <Button color="primary" variant="contained" onClick={addCoupon}>
            Add
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.cancelBtn}
          >
            <Link to="/all-coupons" style={{ color: "#fff" }}>
              Discard
            </Link>
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} className={classes.secondmainrow}>
        <Grid item md={6}>
          <Card>
            <CardHeader title="Coupon Information" />
            <Divider />
            <CardContent>
              <Box component="div">
                <TextField
                  id="coupon_code"
                  label="Coupon Code"
                  name="coupon_code"
                  onChange={handleChange}
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                />
              </Box>
              <Box component="div">
                <TextField
                  id="coupon_discription"
                  label="Description"
                  name="coupon_discription"
                  onChange={handleChange}
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                  multiline
                  rows="4"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={6}>
          <Card>
            <CardHeader title="Copon Data" />
            <Divider />
            <CardContent>
              <Box component="div" className={classes.tabsHeader}>
                <Tabs
                  value={tabVal}
                  onChange={tabChange}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab
                    value="general"
                    label="General"
                    {...a11yProps("general")}
                  />
                  <Tab
                    value="usage-restriction"
                    label="Usage restriction"
                    {...a11yProps("usage-restriction")}
                  />
                </Tabs>
              </Box>
              <Box component="div" className={classes.tabsBody}>
                {/*  ==================Genreal Tab ================== */}
                <TabPanel value={tabVal} index="general">
                  <FormControl
                    variant="outlined"
                    className={clsx(classes.marginBottom, classes.width100)}
                  >
                    <InputLabel id="products-select">Discount Type</InputLabel>
                    <Select
                      onChange={handleChange}
                      inputProps={{
                        name: "parentId"
                      }}
                    >
                      <MenuItem value="fixed-cart-discount">
                        Fixed Cart Discount
                      </MenuItem>
                      <MenuItem value="fixed-product-discount">
                        Fixed Product Discount
                      </MenuItem>
                      <MenuItem value="precantage-discount">
                        Precantage Discount
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="coupon_amount"
                    label="Coupon Amount"
                    name="coupon_amount"
                    onChange={handleChange}
                    variant="outlined"
                    className={clsx(classes.marginBottom, classes.width100)}
                  />
                  <TextField
                    id="coupon_expiry"
                    helperText="Coupon Expiry"
                    name="coupon_expiry"
                    onChange={handleChange}
                    variant="outlined"
                    className={clsx(
                      classes.marginBottom,
                      classes.width100,
                      "top-helper"
                    )}
                    type="date"
                  />
                </TabPanel>

                {/*  ==================Usage Restriction Tab ================== */}
                <TabPanel value={tabVal} index="usage-restriction">
                  <TextField
                    id="minimum-spend"
                    label="Minimum Spend"
                    name="minimum-spend"
                    onChange={handleChange}
                    variant="outlined"
                    className={clsx(classes.marginBottom, classes.width100)}
                  />
                  <TextField
                    id="maximum-spend"
                    label="Maximum Spend"
                    name="maximum-spend"
                    onChange={handleChange}
                    variant="outlined"
                    className={clsx(classes.marginBottom, classes.width100)}
                  />

                  {/*  ==================Products Select ================== */}
                  <SelectOptionField
                    name="Products"
                    value={products}
                    label="Products"
                  >
                    {allProducts &&
                      allProducts.map(product => (
                        <MenuItem value={product.name} key={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                  </SelectOptionField>

                  {/* ================== Exclude Products Select ================== */}
                  <SelectOptionField
                    name="ExcludeProducts"
                    value={excludeProducts}
                    label="Exclude Products"
                  >
                    {allProducts &&
                      allProducts.map(product => (
                        <MenuItem value={product.name} key={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                  </SelectOptionField>

                  {/*  ==================Category Select  ==================*/}
                  <SelectOptionField
                    name="Categories"
                    value={categories}
                    label="Categories"
                  >
                    {allCategroies &&
                      allCategroies.map(category => (
                        <MenuItem value={category.name} key={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </SelectOptionField>

                  {/* ==================Exclude Category Select===================== */}
                  <SelectOptionField
                    name="ExcludeCategories"
                    value={excludeCategories}
                    label="Exclude Categories"
                  >
                    {allCategroies &&
                      allCategroies.map(category => (
                        <MenuItem value={category.name} key={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </SelectOptionField>
                </TabPanel>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

/* ==================Component for Tabpanel===================== */

const TabPanel = props => {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

/* ==================Component for Tabpanel===================== */

const a11yProps = index => {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`
  };
};

/* ==================Component for Tabpanel===================== */

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const mapStateToProps = state => {
  return { products: state.products };
};

const mapDispatchToProps = {
  categoriesAction,
  productsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCoupon);
