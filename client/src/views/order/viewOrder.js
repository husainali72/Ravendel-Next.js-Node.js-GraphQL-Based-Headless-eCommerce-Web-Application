import React, { useState, useEffect } from "react";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import Alerts from "../components/Alert";
import {
  orderUpdateAction,
  orderAction,
  getSettings,
} from "../../store/action/";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Backdrop,
  CircularProgress,
  Button,
  Box,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";
import "../../App.css";
import { convertDateToStringFormat } from "../utils/convertDate";
import viewStyles from "../viewStyles";
import { client_app_route_url, getPaymentMethodLabel } from "../../utils/helper";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
import { currencyFormat } from "./CurrencyFormat";
import { capitalize, get } from "lodash";
import { validatenested, validateNestedPhone } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { isEmpty } from "../../utils/helper";
import PhoneNumber from "../components/phoneNumberValidation";
import { currencySetter, getPrice } from "./CurrencyFormat";
import TotalSummaryComponent from "./totalSummary";
import { CASH_ON_DELIVERY } from "../../utils/constant";

const ViewOrderComponent = ({ params }) => {
  const ORDERID = params.id || "";
  const classes = viewStyles();
  const [editShipping, setEditShipping] = useState(false);
  const [editBilling, setEditBilling] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const singleOrder = useSelector((state) => state.order);
  const currencyState = useSelector((state) => state.settings);
  const [currency, setcurrency] = useState("usd");
  const [decimal, setdecimal] = useState(2);
  const [loading, setloading] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [order, setorder] = useState({
    billing: {
      firstname: "",
      lastname: "",
      company: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      state: "",
      email: "",
      phone: "",
      paymentMethod: "",
      transaction_id: "",
    },
    shipping: {
      firstname: "",
      lastname: "",
      company: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      state: "",
      notes: "",
    },
    products: [],
    paymentStatus: "",
    shippingStatus: "",
    sub_total_details: {},
    sub_total_summary: [],

    date: "",
  });

  useEffect(() => {
    dispatch(orderAction(ORDERID));
    dispatch(getSettings());
  }, []);
  useEffect(() => {
    if (!isEmpty(get(currencyState, "settings"))) {
      if (!isEmpty(get(currencyState.settings, "store"))) {
        setcurrency(
          get(currencyState.settings.store.currency_options, "currency")
        );
        setdecimal(
          get(
            currencyState.settings.store.currency_options,
            "number_of_decimals"
          )
        );
      }
    }
  }, [get(currencyState, "settings")]);

  useEffect(() => {
    if (!isEmpty(get(singleOrder, "order"))) {
      const singleorder = get(singleOrder, "order");
      setorder({ ...order, ...singleorder });
      setPhoneValue(singleorder.billing.phone);
    }
  }, [get(singleOrder, "order")]);

  useEffect(() => {
    setloading(get(singleOrder, "loading"));
  }, [get(singleOrder, "loading")]);
  const updateOrder = (e) => {
    order.billing.phone = phoneValue;
    e.preventDefault();
    let errors = validatenested(
      "billing",
      [
        "paymentMethod",
        "email",
        "state",
        "country",
        "zip",
        "city",
        "address",
        "company",
        "lastname",
        "firstname",
      ],
      order
    );
    let Errors = validatenested(
      "shipping",
      [
        "state",
        "country",
        "zip",
        "city",
        "address",
        "company",
        "lastname",
        "firstname",
      ],
      order
    );
    let phoneNumberError = validateNestedPhone("billing", ["phone"], order);
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    } else if (!isEmpty(Errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: Errors,
          error: true,
        },
      });
    } else if (!isEmpty(phoneNumberError)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: phoneNumberError,
          error: true,
        },
      });
    } else {
      setEditBilling(false);
      setEditShipping(false);
      dispatch(orderUpdateAction(order, navigate));
      setPhoneValue("");
    }
  };
  const changeBilling = (e) => {
    setorder({
      ...order,
      billing: { ...order.billing, [e.target.name]: e.target.value },
    });
  };
  const changeShipping = (e) => {
    setorder({
      ...order,
      shipping: { ...order.shipping, [e.target.name]: e.target.value },
    });
  };
  const getFirstLetter = (name) => {
    return name ? name.charAt(0) : name;
  };
  const BillingInput = (label, name, type, value) => {
    return (
      <TextField
        type={type}
        label={label}
        name={name}
        variant="outlined"
        size="small"
        value={value}
        onChange={changeBilling}
        className={classes.fullWidth}
      />
    );
  };

  const handleOnChange = (value) => {
    setPhoneValue(value);
  };
  const ShippingInput = (label, name, type, value) => {
    return (
      <TextField
        type={type}
        label={label}
        name={name}
        variant="outlined"
        size="small"
        value={value}
        onChange={changeShipping}
        className={classes.fullWidth}
      />
    );
  };

  const toInputLowercase = (e) => {
    e.target.value = ("" + e.target.value).toLowerCase();
  };

  return (
    <>
      <Alerts />

      {loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" /> <br />
          <Typography variant="h4">Loading</Typography>
        </Backdrop>
      )}
      {order ? (
        <>
          <Grid container className="topbar">
            <Grid item lg={6} md={6} sm={6} xs={12} p={1}>
              <Typography variant="h5">
                <Link to={`${client_app_route_url}all-orders`}>
                  <IconButton aria-label="Back">
                    <ArrowBackIcon />
                  </IconButton>
                </Link>
                <span style={{ paddingTop: 10 }}>View Order</span>
              </Typography>
            </Grid>

            <Grid item lg={6} className="text-right padding-right-2">
              <Button color="primary" variant="contained" onClick={updateOrder}>
                Save
              </Button>
              <Link
                to={`${client_app_route_url}all-orders`}
                style={{ color: "#fff" }}
              >
                <Button
                  variant="contained"
                  color="error"
                  className={classes.cancelBtn}
                >
                  Cancel
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.secondmainrow}>
            <Grid item md={6}>
              {/* {/ ===============Orders Details====================== /} */}
              <Box component="span">
                <Card className={classes.upperCard}>
                  <CardHeader title="Order Details" />
                  <Divider />
                  <CardContent>
                    <Typography variant="body1">
                      Order: {order.orderNumber}
                    </Typography>
                    <Typography variant="body1" mt={2}>
                      Payment via{" "}
                      {
                        getPaymentMethodLabel(
                          get(order, "billing.paymentMethod", CASH_ON_DELIVERY)
                        )
                      }{" "}
                      paid on {convertDateToStringFormat(get(order,'date'),currencyState)}
                      {/* Transaction
                      number {order.billing.transaction_id} */}
                    </Typography>
                    <FormControl className={classes.statusSelect}>
                      <InputLabel id="status" sx={{ marginTop: "20px" }}>
                        Payment Status
                      </InputLabel>
                      <Select
                        label="Payment Status"
                        labelId="paymentStatus
                        "
                        id="paymentStatus"
                        sx={{ marginTop: "20px" }}
                        value={order.paymentStatus}
                        name="paymentStatus"
                        onChange={(e) => {
                          setorder({
                            ...order,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      >
                        <MenuItem value="pending">Pending </MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                        <MenuItem value="success">Completed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl
                      className={classes.statusSelect}
                      sx={{ ml: "20px" }}
                    >
                      <InputLabel id="status" sx={{ marginTop: "20px" }}>
                        Shipping Status
                      </InputLabel>
                      <Select
                        label="Shipping Status"
                        labelId="shippingStatus
                        "
                        id="shippingStatus"
                        sx={{ marginTop: "20px" }}
                        value={order.shippingStatus}
                        name="shippingStatus"
                        onChange={(e) => {
                          setorder({
                            ...order,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      >
                        <MenuItem value="inprogress">Inprogress </MenuItem>
                        <MenuItem value="shipped">Shipped</MenuItem>
                        <MenuItem value="outfordelivery">
                          Out For Delivery
                        </MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                      </Select>
                    </FormControl>
                  </CardContent>
                </Card>
              </Box>
              {/* {/ ===============Billing Address====================== /} */}

              <Box component="span" m={1}>
                <Card className={classes.downCard}>
                  <CardHeader
                    title="Billing Address"
                    action={
                      editBilling ? (
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label="cancel-shipping"
                          onClick={() => setEditBilling(false)}
                        >
                          <CancelIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          size="small"
                          aria-label="edit-shipping"
                          onClick={() => setEditBilling(true)}
                        >
                          <EditIcon />
                        </IconButton>
                      )
                    }
                  />
                  <Divider />
                  <CardContent>
                    {editBilling ? (
                      <Grid container spacing={2}>
                        <Grid item md={4}>
                          {BillingInput(
                            "First Name",
                            "firstname",
                            "text",
                            order.billing.firstname
                          )}
                        </Grid>
                        <Grid item md={4}>
                          {BillingInput(
                            "Last Name",
                            "lastname",
                            "text",
                            order.billing.lastname
                          )}
                        </Grid>
                        <Grid item md={4} onInput={toInputLowercase}>
                          {BillingInput(
                            "Email",
                            "email",
                            "email",
                            order.billing.email
                          )}
                        </Grid>
                        <Grid item md={8}>
                          {BillingInput(
                            "Address",
                            "address",
                            "text",
                            order.billing.address
                          )}
                        </Grid>
                        <Grid item md={4}>
                          {BillingInput(
                            "City",
                            "city",
                            "text",
                            order.billing.city
                          )}
                        </Grid>
                        <Grid item md={4}>
                          {BillingInput(
                            "State",
                            "state",
                            "text",
                            order.billing.state
                          )}
                        </Grid>
                        <Grid item md={4}>
                          {BillingInput(
                            "Country",
                            "country",
                            "text",
                            order.billing.country
                          )}
                        </Grid>
                        <Grid item md={4}>
                          {BillingInput(
                            "Zip",
                            "zip",
                            "text",
                            order.billing.zip
                          )}
                        </Grid>
                        <Grid item md={4}>
                          <PhoneNumber
                            className="phoneValidation"
                            handleOnChange={handleOnChange}
                            phoneValue={phoneValue}
                            width="100%"
                          />
                        </Grid>
                        <Grid item md={4}>
                          {BillingInput(
                            "Company",
                            "company",
                            "text",
                            order.billing.company
                          )}
                        </Grid>
                      </Grid>
                    ) : (
                      <>
                        <Typography variant="body1">
                          {order.billing.firstname +
                            " " +
                            order.shipping.lastname}
                        </Typography>
                        <Typography variant="body1">
                          {order.billing.email}
                        </Typography>
                        <Typography variant="body1">
                          {order.billing.company}
                        </Typography>
                        <Typography variant="body1">
                          {order.billing.phone}
                        </Typography>
                        <Typography variant="body1">
                          {order.billing.address}
                        </Typography>
                        <Typography variant="body1">
                          {order.billing.state}, {order.billing.country},{" "}
                          {order.billing.zip}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid item md={6}>
              {/* {/ ===============Customer Details====================== /} */}
              <Box component="span">
                <Card className={classes.upperCard}>
                  <CardHeader title="Customer Details" />
                  <Divider />
                  <CardContent>
                    <List style={{ padding: 0 }}>
                      <ListItem alignItems="flex-start" style={{ padding: 0 }}>
                        <ListItemAvatar>
                          <Avatar className={classes.purple}>
                            {getFirstLetter(order.billing.firstname)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {order.billing.firstname +
                                " " +
                                order.billing.lastname}
                            </Typography>
                          }
                          variant="h3"
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body1"
                                className={classes.dBlock}
                                color="textPrimary"
                              >
                                {order.billing.email}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body1"
                                className={classes.dBlock}
                                color="textPrimary"
                              >
                                {order.billing.phone}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Box>
              {/* {/ ===============Shipping Address====================== /} */}

              <Box component="span" m={1}>
                <Card className={classes.downCard}>
                  <CardHeader
                    title="Shipping Address"
                    action={
                      editShipping ? (
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label="cancel-shipping"
                          onClick={() => setEditShipping(false)}
                        >
                          <CancelIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          size="small"
                          aria-label="edit-shipping"
                          onClick={() => setEditShipping(true)}
                        >
                          <EditIcon />
                        </IconButton>
                      )
                    }
                  />
                  <Divider />
                  <CardContent>
                    {editShipping ? (
                      <Grid container spacing={2}>
                        <Grid item md={4}>
                          {ShippingInput(
                            "First Name",
                            "firstname",
                            "text",
                            order.shipping.firstname
                          )}
                        </Grid>
                        <Grid item md={4}>
                          {ShippingInput(
                            "Last Name",
                            "lastname",
                            "text",
                            order.shipping.lastname
                          )}
                        </Grid>
                        <Grid item md={4}>
                          {ShippingInput(
                            "Company",
                            "company",
                            "text",
                            order.shipping.company
                          )}
                        </Grid>
                        <Grid item md={8}>
                          {ShippingInput(
                            "Address",
                            "address",
                            "text",
                            order.shipping.address
                          )}
                        </Grid>
                        <Grid item md={4}>
                          {ShippingInput(
                            "City",
                            "city",
                            "text",
                            order.shipping.city
                          )}
                        </Grid>
                        <Grid item md={4}>
                          {ShippingInput(
                            "State",
                            "state",
                            "text",
                            order.shipping.state
                          )}
                        </Grid>
                        <Grid item md={4}>
                          {ShippingInput(
                            "Country",
                            "country",
                            "text",
                            order.shipping.country
                          )}
                        </Grid>
                        <Grid item md={4}>
                          {ShippingInput(
                            "Zip",
                            "zip",
                            "text",
                            order.shipping.zip
                          )}
                        </Grid>
                      </Grid>
                    ) : (
                      <>
                        <Typography variant="body1">
                          {order.shipping.firstname +
                            " " +
                            order.shipping.lastname}
                        </Typography>
                        <Typography variant="body1">
                          {order.shipping.company}
                        </Typography>
                        <Typography variant="body1">
                          {order.shipping.address}
                        </Typography>
                        <Typography variant="body1">
                          {order.shipping.state}, {order.shipping.country},{" "}
                          {order.shipping.zip}
                        </Typography>
                        <Typography variant="body1">
                          {/* <b>Note:</b> <i>{order.shipping.notes}</i> */}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid item md={6}>
              {/* {/ ===============Products====================== /} */}
              <Box component="span">
                <Card>
                  <CardHeader title="Products" />
                  <Divider />
                  <CardContent>
                    <TableContainer className={classes.container}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell variet="contained" color="primary">
                              Item
                            </TableCell>
                            <TableCell variet="contained" color="primary">
                              Cost
                            </TableCell>
                            <TableCell variet="contained" color="primary">
                              Qty
                            </TableCell>
                            <TableCell variet="contained" color="primary">
                              Attributes
                            </TableCell>
                            <TableCell variet="contained" color="primary">
                              Total
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.products.map((product, index) => (
                            <TableRow key={index}>
                              <TableCell>{product?.productTitle}</TableCell>
                              <TableCell>
                                {product?.productPrice &&
                                product?.qty &&
                                !isNaN(product?.qty) &&
                                !isNaN(product?.productPrice)
                                  ? currencyFormat(
                                      product?.productPrice / product?.qty
                                    )
                                  : "0.00"}
                              </TableCell>
                              <TableCell>{product?.qty}</TableCell>

                              <TableCell>
                                {product?.attributes?.map((attribute) => (
                                  <div>
                                    {capitalize(attribute.name)} :{" "}
                                    {capitalize(attribute.value)}
                                  </div>
                                ))}
                              </TableCell>
                              <TableCell>
                                {currencyFormat(product?.productPrice)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Box>
            </Grid>

            <Grid item md={6}>
              <Box component="span">
                <Card style={{ height: "219px" }}>
                  <CardHeader title="Total" />
                  <Divider />
                  <CardContent>
                    <TotalSummaryComponent
                      decimal={decimal}
                      currency={currency}
                      totalSummary={order?.totalSummary}
                      couponCard={order?.couponCard}
                    />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        "No data"
      )}
    </>
  );
};

export default function ViewOrder() {
  const params = useParams();
  return (
    <ThemeProvider theme={theme}>
      <ViewOrderComponent params={params} />
    </ThemeProvider>
  );
}
