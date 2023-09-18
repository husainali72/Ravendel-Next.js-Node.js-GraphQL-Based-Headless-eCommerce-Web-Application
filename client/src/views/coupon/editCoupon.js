import React, { useState, useEffect } from "react";
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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import clsx from "clsx";
import {
  categoriesAction,
  productsAction,
  couponUpdateAction,
  couponsAction,
  couponAddAction,
} from "../../store/action/";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Loading, TopBar, TextInput, CardBlocks } from "../components";
import {
  TabPanel,
  a11yProps,
  couponObj,
  getSelectedName,
  MenuProps,
} from "./coupon-components";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { get } from "lodash";

const EditCouponComponent = ({ params }) => {
  const id = params?.id || "";
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const Products = useSelector((state) => state.products);
  const Coupons = useSelector((state) => state.coupons);
  const dispatch = useDispatch();
  const classes = viewStyles();
  const [tabVal, setTabVal] = useState("general");
  const [coupon, setCoupon] = useState(couponObj);
  const [loading, setloading] = useState(false);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const currentDate = `${yyyy}-${mm}-${dd}`;
  useEffect(() => {
    if (!isEmpty(get(Coupons, "coupons"))) {
      Coupons.coupons.map((editcoupon) => {
        if (editcoupon.id === id) {
          setCoupon({ ...coupon, ...editcoupon });
        }
      });
      if (isEmpty(get(inputLabel, "current.offsetWidth"))) {
        setLabelWidth(get(inputLabel, "current.offsetWidth"));
      }
    }
  }, [get(Coupons, "coupons")]);

  useEffect(() => {
    setloading(get(Coupons, "loading"));
  }, [get(Coupons, "loading")]);

  useEffect(() => {
    setloading(get(Products, "loading"));
  }, [get(Products, "loading")]);

  useEffect(() => {
    if (isEmpty(Products.products)) {
      dispatch(productsAction());
    }
    if (isEmpty(Products.categories)) {
      dispatch(categoriesAction());
    }
    if (isEmpty(get(Coupons, "coupons"))) {
      dispatch(couponsAction());
    }


  }, []);

  const tabChange = (event, newValue) => {
    setTabVal(newValue);
  };

  const addUpdateCoupon = () => {
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
      if (id) {
        if ((coupon.minimumSpend >= 0 || coupon.maximumSpend >= 0) && coupon.minimumSpend > coupon.maximumSpend) {

          showAlert(true, false, 'Maximum spend  must be greater than minimum spend ')
        } else {

          if (coupon.minimumSpend === '' || coupon.minimumSpend === null) {

            coupon.minimumSpend = 0
          } if (coupon.maximumSpend === '' || coupon.maximumSpend === null) {

            coupon.maximumSpend = 0
          }
          coupon.product = coupon.includeProducts.length > 0 || coupon.excludeProducts.length > 0
          coupon.category = coupon.includeCategories.length > 0 || coupon.excludeCategories.length > 0
          dispatch(couponUpdateAction(coupon, navigate));

        }
      } else {
        if ((coupon.minimumSpend >= 0 || coupon.maximumSpend >= 0) && coupon.minimumSpend > coupon.maximumSpend) {
          showAlert(true, false, 'Maximum spend  must be greater than minimum spend ')
        } else {
          if (coupon.minimumSpend === '' || coupon.minimumSpend === null) {
            coupon.minimumSpend = 0
          } if (coupon.maximumSpend === '' || coupon.maximumSpend === null) {
            coupon.maximumSpend = 0
          }
          coupon.product = coupon.includeProducts.length > 0 || coupon.excludeProducts.length > 0
          coupon.category = coupon.includeCategories.length > 0 || coupon.excludeCategories.length > 0
          dispatch(couponAddAction(coupon, navigate));

        }


      }
    }

  };
  const showAlert = (error, success, message) => {
    dispatch({
      type: ALERT_SUCCESS,
      payload: {
        boolean: success,
        message: message,
        error: error,
      },
    });
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "discountValue" || name === "minimumSpend" || name === "maximumSpend") {
      value = parseInt(value);
    }
    setCoupon({ ...coupon, [name]: value });

  };

  const selectChange = (e) => {
    // let include = (e.target.name === 'includeProducts' || e.target.name === 'excludeProducts') ? 'product' : (e.target.name === 'includeCategories' || e.target.name === 'excludeCategories' ? 'category' : null)

    setCoupon({ ...coupon, [e.target.name]: e.target.value, });
  };
  const IncludeProduct = (id) => {

    return coupon.includeProducts?.some((included_product) => {
      return included_product === id
    })

  }
  const ExcludeProduct = (id) => {
    return coupon.excludeProducts.some((excluded_product) => {
      return excluded_product === id
    })
  }
  const IncludeCategories = (id) => {


    return coupon.includeCategories?.some((included_categorie) => {
      return included_categorie === id
    })
  }
  const ExcludeCategories = (id) => {
    return coupon.excludeCategories.some((excluded_categorie) => {
      return excluded_categorie === id
    })
  }

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
            <div style={{ display: "flex", flexWrap: "wrap", }} >
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
      {loading ? <Loading /> : null}
      <TopBar
        title={id ? "Edit Coupon" : "Add Coupon"}
        onSubmit={addUpdateCoupon}
        submitTitle={id ? "Update" : "Add"}
        backLink={`${client_app_route_url}all-coupons`}
      />

      <Grid
        container
        spacing={isSmall ? 1 : 4}
        className={classes.secondmainrow}
      >
        <Grid item md={5} sm={12} xs={12}>
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

        <Grid md={6} sm={12} xs={12} m={4}>
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
                        label="Discount Type"
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
                    <TextInput
                      id="coupon_expiry"
                      value={coupon.expire}
                      label="Coupon Expiry"
                      name="expire"
                      onInputChange={handleChange}
                      variant="outlined"
                      className={clsx(classes.width100, "top-helper")}
                      type="date"
                      min={currentDate}

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
                    min={0}

                  />
                </Box>
                <Box component="div" mb={2}>
                  <TextInput
                    type="Number"
                    value={coupon.maximumSpend}
                    label="Maximum Spend"
                    name="maximumSpend"
                    onInputChange={handleChange}
                    min={0}

                  />
                </Box>

                {/*  ================== Products Select ================== */}
                <SelectOptionField

                  name="includeProducts"
                  label="Products"
                  value={coupon.includeProducts}

                  id="products"

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
                  id="excludeProducts"
                >
                  {Products.products.map((product) =>
                    !IncludeProduct(product._id) ?
                      <MenuItem value={product._id} key={product._id} >

                        {product.name}
                      </MenuItem> : null

                  )}
                </SelectOptionField>

                {/*  ================== Category Select ==================*/}
                <SelectOptionField

                  name="includeCategories"
                  label="Categories"
                  value={coupon.includeCategories}

                  id="categories"
                >
                  {Products.categories.map((category) =>
                    !ExcludeCategories(category.id) ?
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem> : null
                  )}
                </SelectOptionField>

                {/* ================== Exclude Category Select ===================== */}
                <SelectOptionField
                  name="excludeCategories"
                  label="Exclude Categories"
                  value={coupon.excludeCategories}
                  id="excludeCategories"
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

const EditCoupon = () => {
  const params = useParams();
  return (
    <ThemeProvider theme={theme}>
      <EditCouponComponent params={params} />
    </ThemeProvider>
  );
};
export default EditCoupon;
