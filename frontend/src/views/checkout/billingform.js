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
  Collapse
} from "@material-ui/core";

const BillingForm = props => {
  const [billingInfo, setBillingInfo] = useState([]);
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
      <TextField
        label={label}
        type={type}
        value={value}
        name={name}
        onChange={billingInfoChange}
        variant="outlined"
        size="small"
        className="billing-textfield"
      />
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

  const billingInfoChange = e => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const shippingInfoChange = e => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      {/* ====================Billing Information================================= */}
      <Typography variant="h3" className="margin-bottom-2">
        Billing Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          {BillingInputs("text", "First Name", "firstname", "")}
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          {BillingInputs("text", "Last Name", "lastname", "")}
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          {BillingInputs("email", "Email", "email", "")}
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          {BillingInputs("tel", "Phone", "phone", "")}
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {BillingInputs("text", "company Name", "company", "")}
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
          {BillingInputs("text", "Address Line 1", "address_line_1", "")}
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {BillingInputs("text", "Address Line 2", "address_line_2", "")}
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          {BillingInputs("text", "City", "city", "")}
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          {BillingInputs("text", "State", "state", "")}
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          {BillingInputs("number", "Poscode", "poscode", "")}
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            label="Orders Notes"
            value=""
            name="orer_notes"
            onChange={e => console.log(e)}
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
                onChange={e => setCreateAccount(e.target.checked)}
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
              onChange={e => setShippingAdd(e.target.checked)}
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

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(BillingForm);
