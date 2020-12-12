import React, { Fragment, useState } from "react";
import {
  Grid,
  Paper,
  Tab,
  Tabs,
} from "@material-ui/core";
import CashOnDelivery from "./cod";
import DirectBankTransfer from "./directBankTransfer";
import Paypal from "./paypal";
import Stripe from "./stripe";
import { TabPanel, TabProps } from "../../components";

const Payment = () => {
  const [tabVal, setTabVal] = useState(0);
  const handleChange = (event, newValue) => {
    setTabVal(newValue);
  };
  return (
    <Fragment>
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
              <Tab label="Cash On Delievery" {...TabProps(0)} />
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
    </Fragment>
  );
};

export default Payment;
