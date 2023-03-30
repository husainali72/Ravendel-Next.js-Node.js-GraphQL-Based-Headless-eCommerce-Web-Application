import React, { useState } from "react";
import { Grid, Paper, Tab, Tabs } from "@mui/material";
import CashOnDelivery from "./cod";
import DirectBankTransfer from "./directBankTransfer";
import Paypal from "./paypal";
import Stripe from "./stripe";
import { TabPanel, TabProps } from "../../components";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import Alerts from "../../components/Alert";
import OneSignal from "./oneSignal";
const PaymentComponent = () => {
  const [tabVal, setTabVal] = useState(0);
  const handleChange = (event, newValue) => {
    setTabVal(newValue);
  };
  return (
    <>
      <Alerts />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper square>
            <Tabs
              value={tabVal}
              onChange={handleChange}
              aria-label="Shipping Tab"
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
            >
              <Tab label="Cash On Delivery" {...TabProps(0)} />
              <Tab label="Bank Transfer" {...TabProps(1)} />
              <Tab label="Stripe" {...TabProps(2)} />
              <Tab label="Paypal" {...TabProps(3)} />
            </Tabs>
          </Paper>
          <TabPanel value={tabVal} index={0}>
            <CashOnDelivery />
          </TabPanel>
          <TabPanel value={tabVal} index={1}>
            <DirectBankTransfer />
          </TabPanel>
          <TabPanel value={tabVal} index={2}>
            <Stripe />
          </TabPanel>
          <TabPanel value={tabVal} index={3}>
            <Paypal />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default function Payment() {
  return (
    <ThemeProvider theme={theme}>
      <PaymentComponent />
    </ThemeProvider>
  );
}
