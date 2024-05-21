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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import {
  customerAddAction,
  customerUpdateAction,
  addressbookAddAction,
  addressbookUpdateAction,
  addressbookDeleteAction,
  customersAction,
} from "../../store/action/";
import viewStyles from "../viewStyles.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import Rating from "@mui/material/Rating";
import ApartmentIcon from '@mui/icons-material/Apartment';
import { isEmpty, client_app_route_url } from "../../utils/helper";
import {
  Loading,
  TextInput,
  PasswordInput,
  TopBar,
  Alert,
  CardBlocks,
  SelectComponent,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { get } from "lodash";
import { validate, validatePhone } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import PhoneNumber from "../components/phoneNumberValidation";
var SingleCustomerObject = {
  id: "",
  _id: "",
  firstName: "",
  lastName: "",
  company: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  country: "",
  state: "",
  pincode: "",
  defaultAddress: false,
};
var customerObj = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  company: "",
  phone: "",
};

const EditCustomerComponent = ({ params }) => {
  const ID = params.id || "";
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = viewStyles();
  const dispatch = useDispatch();
  const Customers = useSelector((state) => state.customers);
  const [editMode, setEditMode] = useState(false);
  const [singleCustomer, setSingleCustomer] = useState(SingleCustomerObject);
  const [customer, setcustomer] = useState(customerObj);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setloading(get(Customers, "loading"));
  }, [get(Customers, "loading")]);
  useEffect(() => {
    dispatch(customersAction());
  }, []);
  useEffect(() => {
    document.forms[0].reset();

    if (ID) {
      for (let i in Customers.customers) {
        if (Customers.customers[i].id === ID) {
          SingleCustomerObject.id = Customers.customers[i].id;
          setSingleCustomer(SingleCustomerObject);
          setcustomer({ ...customer, ...Customers.customers[i] });
          break;
        }
      }
      setEditMode(false);
    } else {
      setcustomer(customerObj);
    }
  }, [get(Customers, "customers"), ID]);

  const addUpdateCustomer = (e) => {
    e.preventDefault();
    let errors = validate(
      [ "email", "lastName", "firstName"],
      customer
    );
    let phoneNumberError = validatePhone(["phone"], customer);
    let passwordError = validate(["password"], customer);

    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
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
      if (ID) {
        dispatch(customerUpdateAction(customer, navigate));
      } else {
        if (!isEmpty(passwordError)) {
          dispatch({
            type: ALERT_SUCCESS,
            payload: {
              boolean: false,
              message: passwordError,
              error: true,
            },
          });
        } else {
          dispatch(customerAddAction(customer, navigate));
        }
      }
    }
  };

  const handleChange = (e) => {
    setcustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleOnChange = (value, name) => {
    setcustomer({ ...customer, [name]: value });
  };

  const editAddress = (address) => {
    setEditMode(true);
    setSingleCustomer({ ...SingleCustomerObject, ...address });
  };

  const handleAddressInputField = (e) => {
    setSingleCustomer({ ...singleCustomer, [e.target.name]: e.target.value });
  };

  const AddressBookPhonehandlechange = (value, name) => {
    setSingleCustomer({ ...singleCustomer, [name]: value });
  };

  const addressInput = (label, name,type) => {
    let inputComponent;
  
    switch (type) {
      case 'phone':
        inputComponent = (
          <PhoneNumber
            handleOnChange={AddressBookPhonehandlechange}
            phoneValue={singleCustomer.phone}
            width="100%"
            className="phoneValidation"
          />
        );
        break;
      case 'select':
        inputComponent = (
          <SelectComponent
          label={label}
          labelId="paymentStatus"
          onSelectChange={handleAddressInputField}
          items={[
            { value: "Home", label: "Home" },
            { value: "Office", label: "Office" },
          ]}
          name="addressType"
          value={get(singleCustomer, "addressType", "Home")}
        />
        );
        break;
      default:
        inputComponent = (
          <TextInput
            label={label}
            name={name}
            value={singleCustomer[name]}
            onInputChange={handleAddressInputField}
            sizeSmall
          />
        );
        break;
    }
  
    return (
      <Grid item md={12} sm={6} xs={12}>
        {inputComponent}
      </Grid>
    );
  };
  

  const updateAddress = () => {
    let phoneNumberError = validatePhone(["phone"], singleCustomer);
    let errors = validate(
      [
        "pincode",
        "country",
        "state",
        "city",
        "addressLine1",
        "lastName",
        "firstName",
      ],
      singleCustomer
    );
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
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
      dispatch(addressbookUpdateAction(singleCustomer));
    }
  };

  const addAddress = () => {
    let phoneNumberError = validatePhone(["phone"], singleCustomer);
    let errors = validate(
      [
        "pincode",
        "country",
        "state",
        "city",
        "addressLine1",
        "company",
        "lastName",
        "firstName",
      ],
      singleCustomer
    );
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
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
      dispatch(addressbookAddAction(singleCustomer));
    }
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

  const toInputLowercase = (e) => {
    e.target.value = ("" + e.target.value).toLowerCase();
  };

  return (
    <>
      <Alert />
      {loading && <Loading />}
      <form>
        <TopBar
          title={ID ? "Edit Customer" : "Add Customer"}
          onSubmit={addUpdateCustomer}
          submitTitle={ID ? "Update" : "Add"}
          backLink={`${client_app_route_url}all-customer`}
        />

        {/* ==============Customer Details============== */}

        <Grid
          container
          spacing={isSmall ? 2 : 4}
          className={classes.secondmainrow}
        >
          <Grid item lg={12}>
            <CardBlocks
              title={ID ? "Customer Information" : "Add Customer"}
              nomargin
            >
              <Grid container spacing={isSmall ? 2 : 4}>
                <Grid item md={3} sm={6} xs={12}>
                  <TextInput
                    value={customer.firstName}
                    label="First Name"
                    name="firstName"
                    onInputChange={handleChange}
                  />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <TextInput
                    value={customer.lastName}
                    label="Last Name"
                    name="lastName"
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
                    onInput={toInputLowercase}
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
                  <PhoneNumber
                    handleOnChange={handleOnChange}
                    phoneValue={customer.phone}
                    width="100%"
                  />
                </Grid>
              </Grid>
            </CardBlocks>
          </Grid>

          {/* ==============Address Books============== */}
          {ID ? (
            <>
              <Grid item md={4} sm={12} xs={12}>
                <CardBlocks title={`${editMode ? "Edit" : "Add"} Adress`}>
                  <Grid container spacing={2}>
                    {addressInput("First Name", "firstName")}

                    {addressInput("Last Name", "lastName")}

                    {addressInput("Company", "company")}

                    {addressInput("Phone", "phone","phone")}

                    {addressInput("Address line1", "addressLine1")}

                    {addressInput("Address line2", "addressLine2")}

                    {addressInput("City", "city")}

                    {addressInput("State", "state")}

                    {addressInput("Country", "country")}
                    {addressInput("Address Type", "addressType",'select')}

                    {addressInput("Pincode", "pincode")}
                    <Grid item md={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={singleCustomer.defaultAddress}
                            onChange={(e) =>
                              setSingleCustomer({
                                ...singleCustomer,
                                defaultAddress: e.target.checked,
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
                    customer.addressBook &&
                    customer.addressBook.map((address, index) => (
                      <Grid item md={6} sm={6} xs={12} key={index}>
                        <Box style={{ marginTop: "22px" }}>
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
                                        address.defaultAddress
                                          ? "Default Address"
                                          : "Edit the address and check the 'Default Address' option to make it your default address."
                                      }
                                      aria-label="Default-Address"
                                    >
                                      <Button>
                                        <Rating
                                          name="customized-10"
                                          value={address.defaultAddress ? 1 : 0}
                                          max={1}
                                          readOnly
                                        />
                                      </Button>
                                    </Tooltip>
                                    <Tooltip
                                      title="Edit Address"
                                      aria-label="edit"
                                    >
                                      <Button
                                        onClick={() => editAddress(address)}
                                      >
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
                                {  get(address,'addressType')==='Home'?<HomeIcon/>:<ApartmentIcon/>}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      get(address,'addressType','') 
                                    }
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemIcon>
                                    <AccountCircleIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      address.firstName + " " + address.lastName
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
                                      address.addressLine1 +
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
            </>
          ) : null}
        </Grid>
      </form>
    </>
  );
};

// export default EditCustomer;
export default function EditCustomer() {
  const params = useParams();
  return (
    <ThemeProvider theme={theme}>
      <EditCustomerComponent params={params} />
    </ThemeProvider>
  );
}
