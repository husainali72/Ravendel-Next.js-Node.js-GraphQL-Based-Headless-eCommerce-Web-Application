import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  IconButton,
  FormControl,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  CardActions,
  InputAdornment,
  OutlinedInput,
  InputLabel
} from "@material-ui/core";
import { connect } from "react-redux";
import {
  customerUpdateAction,
  addressbookAddAction,
  addressbookUpdateAction,
  addressbookDeleteAction
} from "../../store/action/";
import Alert from "../utils/Alert";
import Loading from "../utils/loading";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import viewStyles from "../viewStyles.js";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

var SingleCustomerObject = {
  id: "",
  _id: "",
  first_name: "",
  last_name: "",
  company: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  city: "",
  country: "",
  state: "",
  pincode: ""
};

const EditCustomer = props => {
  const classes = viewStyles();
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [singleCustomer, setSingleCustomer] = useState(SingleCustomerObject);
  const [customer, setcustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    company: "",
    phone: ""
  });

  useEffect(() => {
    document.forms[0].reset();
    setcustomer({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      company: "",
      phone: ""
    });
    props.customers.customers.map(editcustomer => {
      if (editcustomer.id === props.match.params.id) {
        SingleCustomerObject.id = editcustomer.id;
        setSingleCustomer(SingleCustomerObject);
        setcustomer({ ...editcustomer });
      }
    });
  }, [props.customers.customers]);

  const updateCustomer = e => {
    e.preventDefault();
    props.customerUpdateAction(customer);
  };

  const handleChange = e => {
    setcustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const editAddress = address => {
    setEditMode(true);
    setSingleCustomer(address);
  };

  const handleChangeEditAdd = e => {
    setSingleCustomer({ ...singleCustomer, [e.target.name]: e.target.value });
  };

  const addressInput = (label, name, type, value) => {
    return (
      <TextField
        type={type}
        label={label}
        name={name}
        variant="outlined"
        size="small"
        value={value}
        onChange={handleChangeEditAdd}
        className={classes.width100}
      />
    );
  };

  const customerInput = (label, name, type, value) => {
    return (
      <TextField
        type={type}
        label={label}
        name={name}
        variant="outlined"
        value={value}
        onChange={handleChange}
        className={classes.width100}
      />
    );
  };

  const updateAddress = () => {
    console.log("Update", singleCustomer);
    props.addressbookAddAction(singleCustomer);
    setSingleCustomer(SingleCustomerObject);
  };

  const addAddress = () => {
    console.log("Add", singleCustomer);
    props.addressbookAddAction(singleCustomer);
    setSingleCustomer(SingleCustomerObject);
  };

  const cancelAddress = () => {
    setEditMode(false);
    setSingleCustomer(SingleCustomerObject);
  };

  return (
    <Fragment>
      <Alert />
      {props.customers.loading && <Loading />}
      <form>
        <Grid container className="topbar">
          <Grid item lg={6}>
            <Typography variant="h4">
              <Link to="/all-customer">
                <IconButton aria-label="Back">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <span style={{ paddingTop: 10 }}>Edit Customer</span>
            </Typography>
          </Grid>

          <Grid item lg={6} className="text-right padding-right-2">
            <Button
              color="primary"
              variant="contained"
              onClick={updateCustomer}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.cancelBtn}
            >
              <Link to="/all-customer" style={{ color: "#fff" }}>
                Discard
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} className={classes.secondmainrow}>
          <Grid item lg={12}>
            <Card>
              <CardHeader
                action={
                  <Link to="/all-customer">
                    <IconButton aria-label="Back">
                      <ArrowBackIcon />
                    </IconButton>
                  </Link>
                }
                title="Customer Information"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                    {/* <TextField
    label="First Name"
    name="first_name"
    onChange={handleChange}
    variant="outlined"
    className={classes.width100}
    value={customer.first_name}
  /> */}
                    {customerInput(
                      "First Name",
                      "first_name",
                      "text",
                      customer.first_name
                    )}
                  </Grid>
                  <Grid item md={3}>
                    {/* <TextField
    label="Last Name"
    name="last_name"
    onChange={handleChange}
    variant="outlined"
    className={classes.width100}
    value={customer.last_name}
  /> */}
                    {customerInput(
                      "Last Nam",
                      "last_name",
                      "text",
                      customer.last_name
                    )}
                  </Grid>
                  <Grid item md={3}>
                    {/* <TextField
    type="email"
    label="Email"
    name="email"
    onChange={handleChange}
    variant="outlined"
    className={classes.width100}
    value={customer.email}
  /> */}
                    {customerInput("Email", "email", "tel", customer.email)}
                  </Grid>
                  <Grid item md={3}>
                    <FormControl
                      className={clsx(
                        classes.margin,
                        classes.textField,
                        classes.width100
                      )}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="customer_password">
                        Password
                      </InputLabel>

                      <OutlinedInput
                        id="customer_password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={customer.password}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={3}>
                    {/* <TextField
    label="Company"
    name="company"
    onChange={handleChange}
    variant="outlined"
    className={classes.width100}
    value={customer.company}
    type="text"
  /> */}
                    {customerInput(
                      "Company",
                      "company",
                      "Text",
                      customer.company
                    )}
                  </Grid>
                  <Grid item md={3}>
                    {/* <TextField
      label="Phone"
      name="phone"
      onChange={handleChange}
      variant="outlined"
      className={classes.width100}
      value={customer.phone}
      type="tel"
    /> */}
                    {customerInput("Phone", "phone", "tel", customer.phone)}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={8}>
            <Card>
              <CardHeader title="Customer Address" />
              <Divider />
              <CardContent>
                <TableContainer className={classes.container}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customer &&
                        customer.address_book &&
                        customer.address_book.map(address => (
                          <TableRow key={address._id}>
                            <TableCell>
                              {address.first_name + " " + address.last_name}{" "}
                            </TableCell>
                            <TableCell>{address.phone}</TableCell>
                            <TableCell>
                              <Typography variant="body1">
                                {address.address_line1}, {address.city},{" "}
                                {address.country}, {address.state},{" "}
                                {address.pincode}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <IconButton
                                aria-label="Edit"
                                onClick={() => editAddress(address)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="Delete"
                                className={classes.deleteicon}
                                onClick={() => console.log("delete")}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card>
              <CardHeader title={`${editMode ? "Edit" : "Add"} Adress`} />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    {addressInput(
                      "First Name",
                      "first_name",
                      "text",
                      singleCustomer.first_name
                    )}
                  </Grid>
                  <Grid item md={12}>
                    {addressInput(
                      "Last Name",
                      "last_name",
                      "text",
                      singleCustomer.last_name
                    )}
                  </Grid>
                  <Grid item md={12}>
                    {addressInput(
                      "Company",
                      "company",
                      "text",
                      singleCustomer.company
                    )}
                  </Grid>
                  <Grid item md={12}>
                    {addressInput(
                      "Phone",
                      "phone",
                      "tel",
                      singleCustomer.phone
                    )}
                  </Grid>
                  <Grid item md={12}>
                    {addressInput(
                      "Address line1",
                      "address_line1",
                      "text",
                      singleCustomer.address_line1
                    )}
                  </Grid>
                  <Grid item md={12}>
                    {addressInput(
                      "Address line2",
                      "address_line2",
                      "text",
                      singleCustomer.address_line2
                    )}
                  </Grid>
                  <Grid item md={12}>
                    {addressInput("City", "city", "text", singleCustomer.city)}
                  </Grid>
                  <Grid item md={12}>
                    {addressInput(
                      "Country",
                      "country",
                      "text",
                      singleCustomer.country
                    )}
                  </Grid>
                  <Grid item md={12}>
                    {addressInput(
                      "State",
                      "state",
                      "text",
                      singleCustomer.state
                    )}
                  </Grid>
                  <Grid item md={12}>
                    {addressInput(
                      "Pincode",
                      "pincode",
                      "text",
                      singleCustomer.pincode
                    )}
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={editMode ? updateAddress : addAddress}
                  variant="contained"
                >
                  {editMode ? "Update" : "Add"}
                </Button>
                <Button
                  size="small"
                  onClick={cancelAddress}
                  variant="contained"
                  className={classes.cancelBtn}
                >
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { customers: state.customers };
};

const mapDispatchToProps = {
  customerUpdateAction,
  addressbookAddAction,
  addressbookUpdateAction,
  addressbookDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);
