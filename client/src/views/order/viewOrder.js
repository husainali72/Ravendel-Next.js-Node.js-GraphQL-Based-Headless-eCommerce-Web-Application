import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import Alert from "../utils/Alert";
import { orderUpdateAction, orderAction } from "../../store/action/";

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
import { isEmpty, client_app_route_url } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";

const ViewOrderComponent = ({ params }) => {
  const classes = viewStyles();
  const [editShipping, setEditShipping] = useState(false);
  const [editBilling, setEditBilling] = useState(false);

  const dispatch = useDispatch();
  const singleOrder = useSelector((state) => state.order);

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
      payment_method: "",
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
    status: "",
    sub_total_details: {},
    sub_total_summary: [],

    date: "",
  });

  useEffect(() => {
    if (isEmpty(singleOrder.order)) {
      dispatch(orderAction(params));
    } else {
      setorder({ ...singleOrder.order });
      console.log(singleOrder.order);
    }
  }, [singleOrder.order]);

  const updateOrder = (e) => {
    e.preventDefault();

    setEditBilling(false);
    setEditShipping(false);
    dispatch(orderUpdateAction(order));
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
  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return (
    <>
      <Alert />
      {singleOrder.order.loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" /> <br />
          <Typography variant="h4">Loading</Typography>
        </Backdrop>
      )}
      {singleOrder.order ? (
        <>
          <Grid container className="topbar">
            <Grid item lg={6}>
              <Typography variant="h5">
                <Link to={`${client_app_route_url}all-orders`}>
                  <IconButton aria-label="Back">
                    <ArrowBackIcon />
                  </IconButton>
                </Link>
                <span style={{ paddingTop: 10 }}>View Orders</span>
              </Typography>
            </Grid>

            <Grid item lg={6} className="text-right padding-right-2">
              <Button color="primary" variant="contained" onClick={updateOrder}>
                Save
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.cancelBtn}
              >
                <Link
                  to={`${client_app_route_url}all-orders`}
                  style={{ color: "#fff" }}
                >
                  Cancel
                </Link>
              </Button>
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
                    <Typography variant="body1">Order: {order.id}</Typography>
                    <Typography variant="body1" mt={2}>
                      Payment via {order.billing.payment_method} paid on{" "}
                      {convertDateToStringFormat(order.date)}, Transaction
                      number {order.billing.transaction_id}
                    </Typography>
                    <FormControl className={classes.statusSelect}>
                      <InputLabel id="status">
                        {singleOrder.order.payment_status}
                      </InputLabel>
                      <Select
                        label={singleOrder.order.payment_status}
                        labelId="status"
                        id="status"
                        value={order.status}
                        name="status"
                        onChange={(e) =>
                          setorder({
                            ...order,
                            [e.target.name]: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="Pending">Pending Payment</MenuItem>
                        <MenuItem value="Failed">Failed</MenuItem>
                        <MenuItem value="Success">Completed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
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
                        <Grid item md={4}>
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
                          {BillingInput(
                            "Phone",
                            "phone",
                            "tel",
                            order.billing.phone
                          )}
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
                        <Typography variant="h6">
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
                        <Typography variant="h6">
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
                              Total
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.products.map((product, index) => (
                            <TableRow key={index}>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>
                                {currencyFormat(product.cost)}
                              </TableCell>
                              <TableCell>{product.qty}</TableCell>
                              <TableCell>
                                {currencyFormat(product.qty * product.cost)}
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

            {/* <Grid item md={6}>
              <Box component="span">
                <Card>
                  <CardHeader title="Subtotal" />
                  <Divider />
                  <CardContent>
                    <Grid container justify="flex-end">
                      <Grid item className={classes.textRight}>
                        <Typography variant="h5" className={classes.mtb2}>
                          Total
                        </Typography>
                        <Typography variant="h5" className={classes.mtb2}>
                          Coupon{" "}
                          <b>
                            {singleOrder.order.sub_total_details.coupon_code}
                          </b>{" "}
                          {singleOrder.order.sub_total_details.coupon_value}%
                        </Typography>
                        <Typography variant="h5" className={classes.mtb2}>
                          {singleOrder.order.sub_total_details.shipping_name}
                        </Typography>
                        <Typography variant="h5" className={classes.mtb2}>
                          {singleOrder.order.sub_total_details.tax_name}
                        </Typography>
                        <Divider />
                        <Typography variant="h5" className={classes.mtb2}>
                          SubTotal
                        </Typography>
                      </Grid>
                      {order.sub_total_summary.map((subTotal, index) => (
                        <Grid item md={3} className={classes.textRight}>
                          <Typography variant="h4" className={classes.mtb2}>
                            {currencyFormat(subTotal.sub_total)}
                          </Typography>
                          <Typography variant="h4" className={classes.mtb2}>
                            <span className={classes.discount}>
                              {subTotal.coupon_value}
                            </span>
                          </Typography>
                          <Typography variant="h4" className={classes.mtb2}>
                            {subTotal.shipping_value}
                          </Typography>
                          <Typography variant="h4" className={classes.mtb2}>
                            {subTotal.tax_value}
                          </Typography>
                          <Divider />
                          <Typography variant="h4" className={classes.mtb2}>
                            {currencyFormat(subTotal.total)}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid> */}
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
