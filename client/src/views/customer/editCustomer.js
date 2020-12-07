import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  ButtonGroup,
  Tooltip,
  FormControlLabel,
  Checkbox,
  useMediaQuery
} from "@material-ui/core";
import {  useTheme } from '@material-ui/styles';
import {
  customerUpdateAction,
  addressbookAddAction,
  addressbookUpdateAction,
  addressbookDeleteAction,
  customersAction,
} from "../../store/action/";
import viewStyles from "../viewStyles.js";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BusinessIcon from "@material-ui/icons/Business";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import Rating from "@material-ui/lab/Rating";
import { isEmpty } from "../../utils/helper";
import { Loading, TextInput, PasswordInput, TopBar, Alert, CardBlocks } from "../components";
import { useDispatch, useSelector } from "react-redux";

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
  pincode: "",
  default_address: false,
};
var customerObj = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  company: "",
  phone: "",
};

const EditCustomer = (props) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = viewStyles();
  const dispatch = useDispatch();
  const Customers = useSelector((state) => state.customers);
  const [editMode, setEditMode] = useState(false);
  const [singleCustomer, setSingleCustomer] = useState(SingleCustomerObject);
  const [customer, setcustomer] = useState(customerObj);

  useEffect(() => {
    document.forms[0].reset();
    setcustomer(customerObj);

    if (isEmpty(Customers.customers)) {
      dispatch(customersAction());
    }

    for (let i in Customers.customers) {
      if (Customers.customers[i].id === props.match.params.id) {
        SingleCustomerObject.id = Customers.customers[i].id;
        setSingleCustomer(SingleCustomerObject);
        setcustomer({ ...customer, ...Customers.customers[i] });
        break;
      }
    }

    setEditMode(false);
  }, [Customers.customers]);

  const updateCustomer = (e) => {
    e.preventDefault();
    dispatch(customerUpdateAction(customer));
  };

  const handleChange = (e) => {
    setcustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const editAddress = (address) => {
    setEditMode(true);
    setSingleCustomer({ ...SingleCustomerObject, ...address });
  };

  const handleAddressInputField = (e) => {
    setSingleCustomer({ ...singleCustomer, [e.target.name]: e.target.value });
  };

  const addressInput = (label, name) => {
    return (
      <Grid item md={12} sm={6} xs={12}>
        <TextInput
          label={label}
          name={name}
          value={singleCustomer[name]}
          onInputChange={handleAddressInputField}
          sizeSmall
        />
      </Grid>
    );
  };

  const updateAddress = () => {
    dispatch(addressbookUpdateAction(singleCustomer));
  };

  const addAddress = () => {
    dispatch(addressbookAddAction(singleCustomer));
  };

  const deleteAddressBook = (_id) => {
    dispatch(
      addressbookDeleteAction({
        id: SingleCustomerObject.id,
        _id,
      })
    );
  };

  const cancelAddress = () => {
    setEditMode(false);
    setSingleCustomer(SingleCustomerObject);
  };

  return (
    <Fragment>
      <Alert />
      {Customers.loading && <Loading />}
      <form>
        <TopBar
          title="Edit Customer"
          onSubmit={updateCustomer}
          submitTitle="Update"
          backLink={"/all-customer"}
        />

        {/* ==============Customer Details============== */}

        <Grid container spacing={isSmall ? 2 : 4} className={classes.secondmainrow}>
          <Grid item lg={12}>
              <CardBlocks title="Customer Information" nomargin>
                <Grid container spacing={isSmall ? 2 : 4}>
                  <Grid item md={3} sm={6} xs={12}>
                    <TextInput
                      value={customer.first_name}
                      label="First Name"
                      name="first_name"
                      onInputChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={3} sm={6} xs={12}>
                    <TextInput
                      value={customer.last_name}
                      label="Last Name"
                      name="last_name"
                      onInputChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={3} sm={6} xs={12}>
                    <TextInput
                      value={customer.email}
                      label="Email"
                      name="email"
                      onInputChange={handleChange}
                      type="email"
                    />
                  </Grid>
                  <Grid item md={3} sm={6} xs={12}>
                    <PasswordInput
                      name="password"
                      value={customer.password}
                      label="Password"
                      onInputChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={3} sm={6} xs={12}>
                    <TextInput
                      value={customer.company}
                      label="Company"
                      name="company"
                      onInputChange={handleChange}
                    />
                  </Grid>
                  <Grid item md={3} sm={6} xs={12}>
                    <TextInput
                      value={customer.phone}
                      label="Phone"
                      name="phone"
                      onInputChange={handleChange}
                    />
                  </Grid>
                </Grid>
            </CardBlocks>
          </Grid>

          {/* ==============Address Books============== */}

          <Grid item md={4} sm={12} xs={12}>
              <CardBlocks title={`${editMode ? "Edit" : "Add"} Adress`} >
                <Grid container spacing={2}>
                  {addressInput("First Name", "first_name")}

                  {addressInput("Last Name", "last_name")}

                  {addressInput("Company", "company")}

                  {addressInput("Phone", "phone")}

                  {addressInput("Address line1", "address_line1")}

                  {addressInput("Address line2", "address_line2")}

                  {addressInput("City", "city")}

                  {addressInput("State", "state")}

                  {addressInput("Country", "country")}

                  {addressInput("Pincode", "pincode")}
                  <Grid item md={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={singleCustomer.default_address}
                          onChange={(e) =>
                            setSingleCustomer({
                              ...singleCustomer,
                              default_address: e.target.checked,
                            })
                          }
                        />
                      }
                      label="Make it Default Address"
                    />
                  </Grid>
                </Grid>
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
            </CardBlocks>
          </Grid>

          <Grid item md={8} sm={12} xs={12}>
            <Grid container spacing={isSmall ? 2 : 4}>
              {customer &&
                customer.address_book &&
                customer.address_book.map((address, index) => (
                  <Grid item md={6} sm={6} xs={12} key={index}>
                    <Box>
                      <Card>
                        <CardHeader
                          title="Address"
                          action={
                            <Fragment>
                              <ButtonGroup
                                variant="text"
                                aria-label="address-card-action"
                              >
                                <Tooltip
                                  title={
                                    address.default_address
                                      ? "Default Address"
                                      : "Edit the address and check the 'Default Address' option to make it your default address."
                                  }
                                  aria-label="Default-Address"
                                >
                                  <Button>
                                    <Rating
                                      name="customized-10"
                                      value={address.default_address ? 1 : 0}
                                      max={1}
                                      readOnly
                                    />
                                  </Button>
                                </Tooltip>
                                <Tooltip title="Edit Address" aria-label="edit">
                                  <Button onClick={() => editAddress(address)}>
                                    <EditIcon />
                                  </Button>
                                </Tooltip>
                                <Tooltip
                                  title="Delete Address"
                                  aria-label="delete"
                                >
                                  <Button
                                    className={classes.deleteicon}
                                    onClick={() =>
                                      deleteAddressBook(address._id)
                                    }
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </Tooltip>
                              </ButtonGroup>
                            </Fragment>
                          }
                        />
                        <CardContent>
                          <List dense>
                            <ListItem>
                              <ListItemIcon>
                                <AccountCircleIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  address.first_name + " " + address.last_name
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <BusinessIcon />
                              </ListItemIcon>
                              <ListItemText primary={address.company} />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <PhoneIcon />
                              </ListItemIcon>
                              <ListItemText primary={address.phone} />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <HomeIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  address.address_line1 +
                                  ", " +
                                  address.city +
                                  ", " +
                                  address.country +
                                  ", " +
                                  address.state +
                                  ", " +
                                  address.pincode
                                }
                              />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default EditCustomer;
