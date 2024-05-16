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
import { TabPanel, a11yProps, couponObj } from "./coupon-components";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { isEmpty, client_app_route_url, filterTreeData, getCheckedIds } from "../../utils/helper";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { get } from "lodash";
import {
  EditCategoriesComponent,
} from "../product/components";
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
      Coupons?.coupons?.map((editcoupon) => {
        if (editcoupon.id === id) {
          editcoupon?.code?.toUpperCase();

          let includeCategories = [];
          editcoupon?.includeCategories?.map((includeCategory) => {
            includeCategories.push(includeCategory)
          })
          let val = {
            ...editcoupon,
            code: editcoupon?.code?.toUpperCase(),
            includeCategories,
          }

          setCoupon({ ...coupon, ...val });
        }
      });
      if (isEmpty(get(inputLabel, "current.offsetWidth"))) {
        setLabelWidth(get(inputLabel, "current.offsetWidth"));
      }
    }
  }, [
    get(Coupons, "coupons"),
    get(Products, "category"),
    get(Products, "products"),
  ]);

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
  const handleErrors = (errors) => {
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
  };

  const setDefaultValues = (value) =>
    value === "" || value === null || isNaN(value) ? 0 : value;
  const addUpdateCoupon = () => {
    const { minimumSpend, maximumSpend, includeCategories, code } = coupon;
    const filteredData = filterTreeData(get(coupon, "categoryTree", []));
    const updatedCoupon = {
      ...coupon,
      minimumSpend: setDefaultValues(minimumSpend),
      maximumSpend: setDefaultValues(maximumSpend),
      category: includeCategories.length > 0,
      categoryTree:filteredData,
      code: code?.toUpperCase(),
    };

    let error = validate(["expire", "discountValue", "code"], coupon);
    if (error) {
      handleErrors(error);
    } else {
      if (id) {
        dispatch(couponUpdateAction(updatedCoupon, navigate));
      } else {
        dispatch(couponAddAction(updatedCoupon, navigate));
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
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value =
      name === "code" ? e.target.value?.toUpperCase() : e.target.value;
    if (
      name === "discountValue" ||
      name === "minimumSpend" ||
      name === "maximumSpend"
    ) {
      value = parseInt(value);
    }
    let checkExpireDate = true;
    if (name === "expire") {
      checkExpireDate = name === "expire" && value >= currentDate;
    }
    if (checkExpireDate) {
      setCoupon({ ...coupon, [name]: value });
    }
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
                        <MenuItem value="percentage-discount">
                          Fixed Percentage Discount
                        </MenuItem>
                        <MenuItem value="free-shipping">Free shipping</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {coupon.discountType !== "free-shipping" && (
                    <Grid item md={6} sm={12} xs={12}>
                      <TextInput
                        type="number"
                        value={coupon.discountValue}
                        label={
                          coupon.discountType === "amount-discount"
                            ? "Coupon Amount"
                            : "Coupon Percent"
                        }
                        name="discountValue"
                        onInputChange={handleChange}
                      />
                    </Grid>
                  )}
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
                    label="Discount upto"
                    name="maximumSpend"
                    onInputChange={handleChange}
                    min={0}
                  />
                </Box>
                <CardBlocks title="Categories">
                  <EditCategoriesComponent
                    selectedCategoriesTree={get(coupon, "categoryTree", [])}
                    selectedCategories={get(coupon, "categoryId", [])}
                    onCategoryChange={(items) => {
                      if (items && items?.length > 0) {
                        const checkedIds = getCheckedIds(items);
                        setCoupon({
                          ...coupon,
                          includeCategories: checkedIds,
                          categoryTree: items,
                        });
                      } else {
                        setCoupon({
                          ...coupon,
                          categoryId: [],
                          categoryTree: [],
                        });
                      }
                    }}
                  />
                </CardBlocks>
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
