import React, { Fragment, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Paper,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";
import PropTypes from "prop-types";
import CashOnDelivery from "./cod";
import DirectBankTransfer from "./directBankTransfer";
import Paypal from "./paypal";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const Payment = props => {
  const classes = viewStyles();
  const [tabVal, setTabVal] = useState(3);
  const handleChange = (event, newValue) => {
    setTabVal(newValue);
  };
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Paper square>
            <Tabs
              value={tabVal}
              onChange={handleChange}
              aria-label="Shipping Tab"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Cash On Delievery" {...a11yProps(0)} />
              <Tab label="Bank Transfer" {...a11yProps(1)} />
              <Tab label="Stripe" {...a11yProps(2)} />
              <Tab label="Paypal" {...a11yProps(3)} />
            </Tabs>
          </Paper>
          <TabPanel value={tabVal} index={0}>
            <CashOnDelivery />
          </TabPanel>
          <TabPanel value={tabVal} index={1}>
            <DirectBankTransfer />
          </TabPanel>
          <TabPanel value={tabVal} index={2}>
            Coming Soon
          </TabPanel>
          <TabPanel value={tabVal} index={3}>
            <Paypal />
          </TabPanel>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Payment;
