import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Box,
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
import PageTitle from "../components/pageTitle";

const Account = props => {
  useEffect(() => {
    console.log(props.match.params.tabid);
    if (props.match.params && props.match.params.tabid) {
      setActiveTab(props.match.params.tabid);
    }
  }, [props.match.params.tabid]);

  const [activeTab, setActiveTab] = useState("orders");

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
                // variant="fullWidth"
                variant="scrollable"
                scrollButtons="on"
              >
                <Tab value="orders" label="Orders" {...a11yProps("orders")} />
                <Tab
                  value="address"
                  label="Address"
                  {...a11yProps("address")}
                />
                <Tab
                  value="recently-viewed"
                  label="Recently Viewed"
                  {...a11yProps("recently-viewed")}
                />
                <Tab
                  value="profile"
                  label="Profile"
                  {...a11yProps("profile")}
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

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Account);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`
  };
}
