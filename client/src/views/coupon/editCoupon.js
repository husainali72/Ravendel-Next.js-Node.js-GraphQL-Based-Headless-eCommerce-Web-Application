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
  Chip,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import clsx from "clsx";
import { connect } from "react-redux";
import {
  categoriesAction,
  productsAction,
  couponUpdateAction
} from "../../store/action/";

var stateObj = {
  code: "",
  description: "",
  discount_type: "amount-discount",
  discount_value: "0",
  free_shipping: false,
  expire: "",
  minimum_spend: "0",
  maximum_spend: "0",
  products: [],
  exclude_products: [],
  categories: [],
  exclude_categories: []
};

const EditCoupon = props => {
  const classes = viewStyles();
  const [tabVal, setTabVal] = useState("general");
  const [coupon, setCoupon] = useState(stateObj);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(() => {
    props.categoriesAction();
    props.productsAction();

    props.couponState.coupons.map(editcoupon => {
      if (editcoupon.id === props.match.params.id) {
        setCoupon({ ...coupon, ...editcoupon });
      }
    });
  }, []);

  const tabChange = (event, newValue) => {
    setTabVal(newValue);
  };

  const updateCoupon = () => {
    console.log(coupon);
    props.couponUpdateAction(coupon);
  };

  const handleChange = e => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const selectChange = e => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const getName = (id, element) => {
    if (element === "products" || element === "exclude_products") {
      for (let i in props.productState.products) {
        if (id === props.productState.products[i].id) {
          return props.productState.products[i].name;
        }
      }
    } else {
      for (let i in props.productState.categories) {
        if (id === props.productState.categories[i].id) {
          return props.productState.categories[i].name;
        }
      }
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
                <Chip
                  key={value}
                  label={getName(value, props.name)}
                  style={{ margin: 2 }}
                />
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
            <span style={{ paddingTop: 10 }}>Edit Coupon</span>
          </Typography>
        </Grid>

        <Grid item lg={6} className="text-right padding-right-2">
          <Button color="primary" variant="contained" onClick={updateCoupon}>
            Update
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
                  name="code"
                  value={coupon.code}
                  onChange={handleChange}
                  variant="outlined"
                  className={clsx(classes.marginBottom, classes.width100)}
                />
              </Box>
              <Box component="div">
                <TextField
                  id="coupon_discription"
                  label="Description"
                  name="description"
                  value={coupon.description}
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
                    <InputLabel ref={inputLabel} id="products-select">
                      Discount Type
                    </InputLabel>
                    <Select
                      labelWidth={labelWidth}
                      onChange={handleChange}
                      inputProps={{
                        name: "discount_type",
                        value: coupon.discount_type
                      }}
                    >
                      <MenuItem value="amount-discount">
                        Fixed Amount Discount
                      </MenuItem>
                      <MenuItem value="precantage-discount">
                        Fixed Precantage Discount
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <Grid container spacing={1}>
                    <Grid item md={6} sm={12} xs={12}>
                      <TextField
                        type="number"
                        id="coupon_amount"
                        label="Coupon Amount"
                        name="discount_value"
                        value={coupon.discount_value}
                        onChange={handleChange}
                        variant="outlined"
                        className={clsx(classes.width100)}
                      />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <TextField
                        id="coupon_expiry"
                        helperText="Coupon Expiry"
                        name="expire"
                        value={coupon.expire}
                        onChange={handleChange}
                        variant="outlined"
                        className={clsx(classes.width100, "top-helper")}
                        type="date"
                      />
                    </Grid>
                  </Grid>

                  <FormControlLabel
                    className={clsx(classes.marginTop1, classes.width100)}
                    control={
                      <Checkbox
                        color="primary"
                        checked={coupon.free_shipping}
                        onChange={e =>
                          setCoupon({
                            ...coupon,
                            free_shipping: e.target.checked
                          })
                        }
                      />
                    }
                    label="Free shipping"
                  />
                </TabPanel>

                {/*  ==================Usage Restriction Tab ================== */}
                <TabPanel value={tabVal} index="usage-restriction">
                  <TextField
                    id="minimum-spend"
                    label="Minimum Spend"
                    name="minimum_spend"
                    value={coupon.minimum_spend}
                    onChange={handleChange}
                    variant="outlined"
                    className={clsx(classes.marginBottom, classes.width100)}
                  />
                  <TextField
                    id="maximum-spend"
                    label="Maximum Spend"
                    name="maximum_spend"
                    value={coupon.maximum_spend}
                    onChange={handleChange}
                    variant="outlined"
                    className={clsx(classes.marginBottom, classes.width100)}
                  />

                  {/*  ================== Products Select ================== */}
                  <SelectOptionField
                    name="products"
                    label="Products"
                    value={coupon.products}
                  >
                    {props.productState.products.map(product => (
                      <MenuItem value={product.id} key={product.id}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </SelectOptionField>

                  {/* ================== Exclude Products Select ================== */}
                  <SelectOptionField
                    name="exclude_products"
                    label="Exclude Products"
                    value={coupon.exclude_products}
                  >
                    {props.productState.products.map(product => (
                      <MenuItem value={product.id} key={product.id}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </SelectOptionField>

                  {/*  ================== Category Select ==================*/}
                  <SelectOptionField
                    name="categories"
                    label="Categories"
                    value={coupon.categories}
                  >
                    {props.productState.categories.map(category => (
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </SelectOptionField>

                  {/* ================== Exclude Category Select ===================== */}
                  <SelectOptionField
                    name="exclude_categories"
                    label="Exclude Categories"
                    value={coupon.exclude_categories}
                  >
                    {props.productState.categories.map(category => (
                      <MenuItem value={category.id} key={category.id}>
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
  return { productState: state.products, couponState: state.coupons };
};

const mapDispatchToProps = {
  categoriesAction,
  productsAction,
  couponUpdateAction
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCoupon);
