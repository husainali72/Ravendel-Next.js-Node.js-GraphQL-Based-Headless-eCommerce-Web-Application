import React, { useState } from "react";
import { Grid, Paper, Tab, Tabs, Box } from "@mui/material";
import HomeSettings from "./home";
import Themes from "./themes";
import { TabPanel, TabProps } from "../../components";
import theme from "../../../theme";
import { ThemeProvider } from "@mui/material/styles";
import MobileSettings from "./mobileApp";
const AppearanceComponent = () => {
  const [tabVal, setTabVal] = useState(0);
  const handleChange = (event, newValue) => {
    setTabVal(newValue);
  };

  return (
    <>
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
              <Tab label="Web Application" {...TabProps(0)} />
              <Tab label="Mobile Application" {...TabProps(1)} />
              <Tab label="Theme" {...TabProps(2)} />
            </Tabs>
          </Paper>
          <TabPanel value={tabVal} index={0}>
            <HomeSettings />
          </TabPanel>
          <TabPanel value={tabVal} index={1}>
            <MobileSettings />
          </TabPanel>
          <TabPanel value={tabVal} index={2}>
            <Box mt={2}>
              <Themes />
            </Box>
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
};

const Appearance = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppearanceComponent />
    </ThemeProvider>
  );
};
export default Appearance;
