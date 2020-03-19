import React, { useState, Fragment } from "react";
import {
  Grid,
  Tabs,
  Tab,
  Typography,
  Box,
  CardContent,
  Card,
  CardHeader,
  Divider
} from "@material-ui/core";
import viewStyles from "../viewStyles";
import clsx from "clsx";
import General from "./components/general";
import Media from "./components/media";
import SMTP from "./components/smtp";
import SEO from "./components/seo";
import Appearance from "./components/apperance";
import Store from "./components/store";
import Payment from "./components/payment";

const Settings = () => {
  const classes = viewStyles();
  const [value, setValue] = useState(5);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = props => {
    const { children, value, index, ...other } = props;
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  };

  const a11yProps = index => {
    return {
      id: `vertical-tab-${index} vertical-tabs-button`,
      "aria-controls": `vertical-tabpanel-${index}`,
      className: "text-left-tab"
    };
  };

  return (
    <Fragment>
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item md={12}>
          <Card>
            <CardHeader title="Settings" />
            <Divider />
            <CardContent>
              <div className={classes.settingRoot}>
                <Grid container>
                  <Grid item className={classes.settingLeft}>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={value}
                      onChange={handleChange}
                      aria-label="Vertical tabs example"
                      className={classes.settingsTabs}
                      indicatorColor="primary"
                    >
                      <Tab label="General" {...a11yProps(0)} />
                      <Tab label="Media" {...a11yProps(1)} />
                      <Tab label="SMTP" {...a11yProps(2)} />
                      <Tab label="SEO" {...a11yProps(3)} />
                      <Tab label="Store" {...a11yProps(4)} />
                      <Tab label="Payment" {...a11yProps(5)} />
                      <Tab label="Appearance" {...a11yProps(6)} />
                    </Tabs>
                  </Grid>
                  <Grid
                    item
                    className={clsx(classes.flexGrow1, classes.settingRight)}
                  >
                    <Box component="div" className="setting-content">
                      <TabPanel value={value} index={0}>
                        <General />
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <Media />
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        <SMTP />
                      </TabPanel>
                      <TabPanel value={value} index={3}>
                        <SEO />
                      </TabPanel>
                      <TabPanel value={value} index={4}>
                        <Store />
                      </TabPanel>
                      <TabPanel value={value} index={5}>
                        <Payment />
                      </TabPanel>
                      <TabPanel value={value} index={6}>
                        <Appearance />
                      </TabPanel>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Settings;
