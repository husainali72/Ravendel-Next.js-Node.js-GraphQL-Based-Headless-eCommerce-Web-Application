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

const Settings = () => {
  const classes = viewStyles();
  const [value, setValue] = useState(0);
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
      "aria-controls": `vertical-tabpanel-${index}`
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
                      <Tab label="Store" {...a11yProps(1)} />
                      <Tab label="Product" {...a11yProps(2)} />
                      <Tab label="SEO" {...a11yProps(3)} />
                      <Tab label="Theme" {...a11yProps(4)} />
                      <Tab label="Shipping" {...a11yProps(5)} />
                      <Tab label="Tax" {...a11yProps(6)} />
                    </Tabs>
                  </Grid>
                  <Grid
                    item
                    className={clsx(classes.flexGrow1, classes.settingRight)}
                  >
                    <Box component="div" className="setting-content">
                      <TabPanel value={value} index={0}>
                        Item One
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        Item Two
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        Item Three
                      </TabPanel>
                      <TabPanel value={value} index={3}>
                        Item Four
                      </TabPanel>
                      <TabPanel value={value} index={4}>
                        Item Five
                      </TabPanel>
                      <TabPanel value={value} index={5}>
                        Item Six
                      </TabPanel>
                      <TabPanel value={value} index={6}>
                        Item Seven
                      </TabPanel>
                    </Box>
                    <Box component="div" className="setting-footer"></Box>
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
