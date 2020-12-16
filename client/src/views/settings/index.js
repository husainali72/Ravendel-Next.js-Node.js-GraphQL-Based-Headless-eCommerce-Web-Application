import React, { useState, Fragment, useEffect } from "react";
import {
  Grid,
  Tabs,
  Tab,
  Box,
  CardContent,
  Card,
  CardHeader,
  Divider,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import viewStyles from "../viewStyles";
import clsx from "clsx";
import General from "./components/general";
import Media from "./components/media";
import SMTP from "./components/smtp";
import SEO from "./components/seo";
import Appearance from "./components/apperance";
import Store from "./components/store";
import Payment from "./components/payment";
import { TabPanel, TabProps } from "../components";
import { getSettings } from "../../store/action";
import { useDispatch } from "react-redux";

const Settings = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(6);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getSettings());
  }, []);

  return (
    <Fragment>
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Settings' />
            <Divider />
            <CardContent>
              <div className={classes.settingRoot}>
                <Box
                  display='flex'
                  flexDirection={isSmall ? "column" : "row"}
                  className={classes.width100}
                >
                  <Box className={classes.settingLeft}>
                    <Tabs
                      orientation={isSmall ? "horizontal" : "vertical"}
                      variant='scrollable'
                      value={value}
                      onChange={handleChange}
                      aria-label='Vertical tabs example'
                      className={classes.settingsTabs}
                      indicatorColor='primary'
                    >
                      <Tab label='General' {...TabProps(0)} />
                      <Tab label='Media' {...TabProps(1)} />
                      <Tab label='SMTP' {...TabProps(2)} />
                      <Tab label='SEO' {...TabProps(3)} />
                      <Tab label='Store' {...TabProps(4)} />
                      <Tab label='Payment' {...TabProps(5)} />
                      <Tab label='Appearance' {...TabProps(6)} />
                    </Tabs>
                  </Box>
                  <Box
                    className={clsx(classes.flexGrow1, classes.settingRight)}
                  >
                    <Box component='div' className='setting-content'>
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
                  </Box>
                </Box>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Settings;
