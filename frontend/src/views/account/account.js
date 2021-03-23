import React, { Fragment, useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Container,
  Grid,
  Paper
} from "@material-ui/core";
import Orders from "./components/orders";
import Address from "./components/address";
import RecentlyViewed from "./components/recently-viewed";
import AccountSetting from "./components/account-setting";
import {TabPanel, PageTitle, Tabprops} from "../components";

const Account = props => {
  var tabID = props.match.params.tabid;
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (props.match.params && tabID) {
      setActiveTab(tabID);
    }
  }, [tabID]);

  const changeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Fragment>
      <PageTitle title="Account" />
      <Container>
        <Grid container className="margin-top-3 margin-bottom-3">
          <Grid item md={12} xs={12}>
            <Paper square>
              <Tabs
                value={activeTab}
                onChange={changeTab}
                aria-label="account-tabs"
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="on"
              >
                <Tab value="orders" label="Orders" {...Tabprops("orders")} />
                <Tab
                  value="address"
                  label="Address"
                  {...Tabprops("address")}
                />
                <Tab
                  value="recently-viewed"
                  label="Recently Viewed"
                  {...Tabprops("recently-viewed")}
                />
                <Tab
                  value="profile"
                  label="Profile"
                  {...Tabprops("profile")}
                />
              </Tabs>
            </Paper>
          </Grid>
          <Grid item md={12} xs={12} className="orders-tabs-wrapper">
            <TabPanel value={activeTab} index="orders">
              <Orders />
            </TabPanel>
            <TabPanel value={activeTab} index="address">
              <Address />
            </TabPanel>
            <TabPanel value={activeTab} index="recently-viewed">
              <RecentlyViewed />
            </TabPanel>
            <TabPanel value={activeTab} index="profile">
              <AccountSetting />
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Account;


