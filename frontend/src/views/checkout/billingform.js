import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Box,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Collapse,
} from "@material-ui/core";
import { useForm } from "react-hook-form";

var billingInfoObject = {
  orer_notes: "Order",
  poscode: 12124,
  state: "state",
  city: "city",
  address_line_2: "address_line_2",
  address_line_1: "address_line_1",
  phone: "phone",
  company: "company",
  email: "email@emial.com",
  lastname: "lastname",
  firstname: "firstname",
};

const BillingForm = (props) => {
  const [billingInfo, setBillingInfo] = useState(billingInfoObject);
  const [shippingInfo, setShippingInfo] = useState([]);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [createAccount, setCreateAccount] = useState(false);
  const [shippingAdd, setShippingAdd] = useState(false);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const BillingInputs = (type, label, name, value) => {
    return (
      <Fragment>
        <TextField
          label={label}
          type={type}
          value={value}
          name={name}
          onChange={billingInfoChange}
          variant="outlined"
          size="small"
          className="billing-textfield"
          inputRef={props.registerRef({ required: true, maxLength: 20 })}
        />
        {props.errorRef.name?.type === "required" && name + "is required"}
      </Fragment>
    );
  };

  const ShippingInputs = (type, label, name, value) => {
    return (
      <TextField
        label={label}
        type={type}
        value={value}
        name={name}
        onChange={shippingInfoChange}
        variant="outlined"
        size="small"
        className="billing-textfield"
      />
    );
  };

  const billingInfoChange = (e) => {
    console.log(e.target.name, e.target.value);
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const shippingInfoChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      {/* ====================Billing Information================================= */}

      <Typography variant="h3" className="margin-bottom-2">
        Billing Details
      </Typography>
      <Grid container spacing={2}>
        {/* <TextField
          inputRef={props.registerRef({ required: true, maxLength: 20 })}
          label="First Name"
          name="firstName"
        />
        {props.errorRef.firstName?.type === "required" &&
          "First Name is required"}
        {props.errorRef.firstName?.type === "maxLength" &&
          "First Name exceed maxLength"}
        <TextField
          inputRef={props.registerRef({ required: true })}
          label="Last Name"
          name="lastName"
        />
        {props.errorRef.lastName && "Last name is required"}
        <TextField
          inputRef={props.registerRef({ required: true, min: 18, max: 99 })}
          label="Age"
          name="age"
          type="number"
        />
        {props.errorRef.age?.type === "required" && "age is required"}
        {props.errorRef.age?.type === "max" && "age max 99"}
        {props.errorRef.age?.type === "min" && "age min 18"} */}
        <Grid item lg={6} md={12} sm={12} xs={12}>
          {BillingInputs(
            "text",
            "First Name",
            "firstname",
            billingInfo.firstname
          )}
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          {BillingInputs("text", "Last Name", "lastname", billingInfo.lastname)}
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          {BillingInputs("email", "Email", "email", billingInfo.email)}
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          {BillingInputs("tel", "Phone", "phone", billingInfo.phone)}
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {BillingInputs(
            "text",
            "company Name",
            "company",
            billingInfo.company
          )}
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <FormControl
            variant="outlined"
            className="billing-textfield"
            size="small"
          >
            <InputLabel ref={inputLabel} id="country-label">
              Country
            </InputLabel>
            <Select
              labelId="country-label"
              id="demo-simple-select-outlined"
              labelWidth={labelWidth}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="US">United State</MenuItem>
              <MenuItem value="IN">India</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {BillingInputs(
            "text",
            "Address Line 1",
            "address_line_1",
            billingInfo.address_line_1
          )}
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {BillingInputs(
            "text",
            "Address Line 2",
            "address_line_2",
            billingInfo.address_line_2
          )}
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          {BillingInputs("text", "City", "city", billingInfo.city)}
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          {BillingInputs("text", "State", "state", billingInfo.state)}
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          {BillingInputs("number", "Poscode", "poscode", billingInfo.poscode)}
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            label="Orders Notes"
            value={billingInfo.orer_notes}
            name="orer_notes"
            onChange={(e) => console.log(e)}
            variant="outlined"
            size="small"
            className="billing-textfield"
            multiline
            rows="5"
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={createAccount}
                onChange={(e) => setCreateAccount(e.target.checked)}
                color="primary"
              />
            }
            label="Create an account?"
          />
        </Grid>
      </Grid>

      {/* ====================Shipping Information================================= */}

      <Box component="div">
        <Typography variant="h3" className="margin-top-2 margin-bottom-1">
          Shipping Details
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={shippingAdd}
              onChange={(e) => setShippingAdd(e.target.checked)}
              color="primary"
            />
          }
          label="Ship to a diffrent address?"
        />
        <Collapse in={shippingAdd}>
          <Grid container spacing={2} className="margin-top-2 margin-bottom-3">
            <Grid item lg={6} md={12} sm={12} xs={12}>
              {ShippingInputs("text", "First Name", "firstname", "")}
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              {ShippingInputs("text", "Last Name", "lastname", "")}
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              {ShippingInputs("email", "Email", "email", "")}
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              {ShippingInputs("tel", "Phone", "phone", "")}
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              {ShippingInputs("text", "company Name", "company", "")}
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <FormControl
                variant="outlined"
                className="billing-textfield"
                size="small"
              >
                <InputLabel ref={inputLabel} id="country-label">
                  Country
                </InputLabel>
                <Select
                  labelId="country-label"
                  id="demo-simple-select-outlined"
                  labelWidth={labelWidth}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="US">United State</MenuItem>
                  <MenuItem value="IN">India</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              {ShippingInputs("text", "Address Line 1", "address_line_1", "")}
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              {ShippingInputs("text", "Address Line 2", "address_line_2", "")}
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              {ShippingInputs("text", "City", "city", "")}
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              {ShippingInputs("text", "State", "state", "")}
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              {ShippingInputs("number", "Poscode", "poscode", "")}
            </Grid>
          </Grid>
        </Collapse>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(BillingForm);
