import React, { useState } from "react";
import { Grid, Paper, Tab, Tabs } from "@mui/material";
import { TabPanel, TabProps } from "../../components";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import Alerts from "../../components/Alert";
import OneSignal from "./oneSignal";
import GoogleAnalytics from "./googleAnalytics";
import GoogleManager from "./googlemanager";
const GoogleComponent = () => {
    const [tabVal, setTabVal] = useState(0);
    const handleChange = (event, newValue) => {
        setTabVal(newValue);
    };
    return (
        <>
            <Alerts />
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
                            <Tab label="Google Analytics" {...TabProps(0)} />
                            <Tab label="Google Manager" {...TabProps(1)} />
                        </Tabs>
                    </Paper>
                    <TabPanel value={tabVal} index={0}>
                        <GoogleAnalytics />
                    </TabPanel>
                    <TabPanel value={tabVal} index={1}>
                        <GoogleManager />
                    </TabPanel>
                </Grid>
            </Grid>
        </>
    );
};

export default function Google() {
    return (
        <ThemeProvider theme={theme}>
            <GoogleComponent />
        </ThemeProvider>
    );
}
