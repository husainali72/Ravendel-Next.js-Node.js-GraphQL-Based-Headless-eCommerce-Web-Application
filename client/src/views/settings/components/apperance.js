import React, { Fragment, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";
import PropTypes from "prop-types";
import HomeSettings from "./home";
import Themes from "./themes";

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
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Appearance = (props) => {
  console.log("here comes appearnce");
  const classes = viewStyles();
  const [tabVal, setTabVal] = useState(0);
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
              <Tab label="Home" {...a11yProps(0)} />
              <Tab label="Theme" {...a11yProps(1)} />
            </Tabs>
          </Paper>
          <TabPanel value={tabVal} index={0}>
            <HomeSettings />
          </TabPanel>
          <TabPanel value={tabVal} index={1}>
            <Themes />
          </TabPanel>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Appearance;
