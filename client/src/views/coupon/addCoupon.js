import React, { useState, useEffect, useRef } from "react";
import viewStyles from "../viewStyles";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Tab,
  Tabs,
  Input,
  Chip,
  FormControlLabel,
  Checkbox,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { categoriesAction, couponAddAction, productsAction } from "../../store/action/";
import { Alert, Loading, TopBar, TextInput, CardBlocks } from "../components";
import {
  TabPanel,
  a11yProps,
  MenuProps,
  couponObj,
  getSelectedName,
} from "./coupon-components";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import theme from "../../theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { useNavigate } from "react-router-dom";
const AddCouponComponent = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const Products = useSelector((state) => state.products);
  const Coupons = useSelector((state) => state.coupons);
  const dispatch = useDispatch();
  const classes = viewStyles();
  const [tabVal, setTabVal] = useState("general");
  const [coupon, setCoupon] = useState(couponObj);
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(() => {
    if (isEmpty(Products.products)) {
      dispatch(productsAction());
    }
    if (isEmpty(Products.categories)) {
      dispatch(categoriesAction());
    }
  }, []);

  useEffect(() => {
    setCoupon(couponObj);
  }, [Coupons.coupons]);

  const tabChange = (event, newValue) => {
    setTabVal(newValue);
  };

  const addCoupon = () => {
    var errors = validate(["code", "expire"], coupon);

    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else {
      dispatch(couponAddAction(coupon, navigate));
    }
  };

  const handleChange = (e) => {

    let name = e.target.name;
    let value = e.target.value;
    if (name === "discountValue" || name === "minimumSpend" || name === "maximumSpend") {
      value = parseInt(value);
    }
    setCoupon({ ...coupon, [name]: value });

  };
  const IncludeProduct = (id) => {
    return coupon.products.some((included_product) => {
      return included_product === id
    })

  }
  const ExcludeProduct = (id) => {
    return coupon.excludeProducts.some((excluded_product) => {
      return excluded_product === id
    })
  }
  const IncludeCategories = (id) => {
    return coupon.categories.some((included_categorie) => {

      return included_categorie === id
    })
  }
  const ExcludeCategories = (id) => {
    return coupon.excludeCategories.some((excluded_categorie) => {
      return excluded_categorie === id
    })
  }
  const selectChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  /* ==================Component for Select===================== */

  const SelectOptionField = ({ label, name, value, children, id }) => {

    return (
      <FormControl
        variant="outlined"
        className={classes.marginBottom}
        fullWidth
      >
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          multiple
          onChange={selectChange}
          input={<Input id="select-multiple-chip" variant="outlined" />}
          value={value}
          name={name}
          renderValue={(selected) => (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={getSelectedName(
                    value,
                    name,
                    Products.products,
                    Products.categories
                  )}
                  style={{ margin: 2 }}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
          fullWidth
        >
          {children}
        </Select>
      </FormControl>
    );
  };

  return (
    <>
      <Alert />
      {Products.loading || Coupons.loading ? <Loading /> : null}
      <TopBar
        title="Add Coupon"
        onSubmit={addCoupon}
        submitTitle="Add"
        backLink={`${client_app_route_url}all-coupons`}
      />

      <Grid
        container
        spacing={isSmall ? 1 : 4}
        className={classes.secondmainrow}
      >
        <Grid item md={6} sm={12} xs={12}>
          <CardBlocks title="Coupon Information" nomargin>
            <Box component="div" mb={2}>
              <TextInput
                value={coupon.code}
                label="Coupon Code"
                name="code"
                onInputChange={handleChange}
              />
            </Box>
            <Box component="div" mb={2}>
              <TextInput
                value={coupon.description}
                label="Description"
                name="description"
                onInputChange={handleChange}
                multiline
                rows="4"
              />
            </Box>
          </CardBlocks>
        </Grid>

        <Grid item md={6} sm={12} xs={12}>
          <CardBlocks title="Coupon Data" nomargin>
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
                <Grid container spacing={2}>
                  <Grid item md={12} sm={12} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel ref={inputLabel} id="products-select">
                        Discount Type
                      </InputLabel>
                      <Select
                        label=" Discount Type"
                        labelWidth={labelWidth}
                        onChange={handleChange}
                        inputProps={{
                          name: "discountType",
                          value: coupon.discountType,
                        }}
                      >
                        <MenuItem value="amount-discount">
                          Fixed Amount Discount
                        </MenuItem>
                        <MenuItem value="precantage-discount">
                          Fixed Percentage Discount
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextInput
                      type="number"
                      value={coupon.discountValue}
                      label={coupon.discountType === 'amount-discount' ? "Coupon Amount" : 'Coupon Percent'}
                      name="discountValue"
                      onInputChange={handleChange}

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
                      checked={coupon.freeShipping}
                      onChange={(e) =>
                        setCoupon({
                          ...coupon,
                          freeShipping: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Free shipping"
                />
              </TabPanel>

              {/*  ==================Usage Restriction Tab ================== */}
              <TabPanel value={tabVal} index="usage-restriction">
                <Box component="div" mb={2}>
                  <TextInput
                    type="Number"
                    value={coupon.minimumSpend}
                    label="Minimum Spend"
                    name="minimumSpend"
                    onInputChange={handleChange}

                  />
                </Box>
                <Box component="div" mb={2}>
                  <TextInput
                    type="Number"
                    value={coupon.maximumSpend}
                    label="Maximum Spend"
                    name="maximumSpend"
                    onInputChange={handleChange}

                  />
                </Box>

                {/*  ==================Products Select ================== */}
                <SelectOptionField
                  name="products"
                  label="Products"
                  value={coupon.products}
                >
                  {Products.products.map((product) =>
                    !ExcludeProduct(product._id) ?
                      < MenuItem value={product._id} key={product._id} >
                        {product.name}
                      </MenuItem>
                      : null
                  )}
                </SelectOptionField>

                {/* ================== Exclude Products Select ================== */}
                <SelectOptionField
                  name="excludeProducts"
                  label="Exclude Products"
                  value={coupon.excludeProducts}
                >
                  {Products.products.map((product) =>
                    !IncludeProduct(product._id) ?
                      <MenuItem value={product._id} key={product._id} >

                        {product.name}
                      </MenuItem> : null

                  )}
                </SelectOptionField>

                {/*  ==================Category Select  ==================*/}
                <SelectOptionField
                  name="categories"
                  label="Categories"
                  value={coupon.categories}
                >
                  {Products.categories.map((category) =>
                    !ExcludeCategories(category.id) ?
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem> : null
                  )}
                </SelectOptionField>

                {/* ==================Exclude Category Select===================== */}
                <SelectOptionField
                  name="excludeCategories"
                  label="Exclude Categories"
                  value={coupon.excludeCategories}
                >
                  {Products.categories.map((category) =>
                    !IncludeCategories(category.id) ?
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem> : null

                  )}
                </SelectOptionField>
              </TabPanel>
            </Box>
          </CardBlocks>
        </Grid>
      </Grid>
    </>
  );
};

const AddCoupon = () => {
  return (
    <ThemeProvider theme={theme}>
      <AddCouponComponent />
    </ThemeProvider>
  );
};
export default AddCoupon;
