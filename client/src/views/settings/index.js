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
} from "@mui/material";
import { useTheme } from "@mui/styles";
import viewStyles from "../viewStyles";
import clsx from "clsx";

import Media from "./components/media";
import SMTP from "./components/smtp";
import SEO from "./components/seo";
import Appearance from "./components/apperance";
import Store from "./components/store";
import Payment from "./components/payment";
import { TabPanel, TabProps } from "../components";
import { getSettings } from "../../store/action";
import { useDispatch } from "react-redux";
import General from "./components/general";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import Notification from "./components/notification";
import ZipCodes from "./components/zipcode";
import Google from "./components/google";
import ImageSetting from "./components/imageSetting";
const SettingsComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(9);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getSettings());
  }, []);

  return (
    <>
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Settings" />
            <Divider />
            <CardContent>
              <div className={classes.settingRoot}>
                <Box
                  display="flex"
                  flexDirection={isSmall ? "column" : "row"}
                  className={classes.width100}
                >
                  <Box className={classes.settingLeft}>
                    <Tabs
                      orientation={isSmall ? "horizontal" : "vertical"}
                      variant="scrollable"
                      value={value}
                      onChange={handleChange}
                      aria-label="Vertical tabs example"
                      className={classes.settingsTabs}
                      indicatorColor="primary"
                    >
                      <Tab label="General" {...TabProps(0)} />
                      <Tab label="SMTP" {...TabProps(1)} />
                      <Tab label="SEO" {...TabProps(2)} />
                      <Tab label="Store" {...TabProps(3)} />
                      <Tab label="Payment" {...TabProps(4)} />
                      <Tab label="Notification" {...TabProps(5)} />
                      <Tab label="ZipCodes" {...TabProps(6)} />
                      <Tab label="Google" {...TabProps(7)} />
                      <Tab label="Image Storage" {...TabProps(8)} />
                      <Tab label="Appearance" {...TabProps(9)} />
                    </Tabs>
                  </Box>
                  <Box
                    className={clsx(classes.flexGrow1, classes.settingRight)}
                  >
                    <Box component="div" className="setting-content">
                      <TabPanel value={value} index={0}>
                        <General />
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <SMTP />
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        <SEO />
                      </TabPanel>
                      <TabPanel value={value} index={3}>
                        <Store />
                      </TabPanel>
                      <TabPanel value={value} index={4}>
                        <Payment />
                      </TabPanel>
                      <TabPanel value={value} index={5}>
                        <Notification />
                      </TabPanel>
                      <TabPanel value={value} index={6}>
                        <ZipCodes />
                      </TabPanel>
                      <TabPanel value={value} index={7}>
                        <Google />
                      </TabPanel>
                      <TabPanel value={value} index={8}>
                        <ImageSetting />
                      </TabPanel>
                      <TabPanel value={value} index={9}>
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
    </>
  );
};

export default function Settings() {
  return (
    <ThemeProvider theme={theme}>
      <SettingsComponent />
    </ThemeProvider>
  );
}
