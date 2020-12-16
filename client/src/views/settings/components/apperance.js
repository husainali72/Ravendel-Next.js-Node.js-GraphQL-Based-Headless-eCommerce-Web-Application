import React, { Fragment, useState } from "react";
import { Grid, Paper, Tab, Tabs, Box } from "@material-ui/core";
import HomeSettings from "./home";
import Themes from "./themes";
import { TabPanel, TabProps } from "../../components";

const Appearance = () => {
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
              aria-label='Shipping Tab'
              indicatorColor='primary'
              textColor='primary'
              variant='scrollable'
            >
              <Tab label='Home' {...TabProps(0)} />
              <Tab label='Theme' {...TabProps(1)} />
            </Tabs>
          </Paper>
          <TabPanel value={tabVal} index={0}>
            <HomeSettings />
          </TabPanel>
          <TabPanel value={tabVal} index={1}>
            <Box mt={2}>
              <Themes />
            </Box>
          </TabPanel>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Appearance;
