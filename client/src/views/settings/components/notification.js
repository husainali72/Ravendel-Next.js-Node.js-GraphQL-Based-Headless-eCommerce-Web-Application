import React, { useState } from "react";
import { Grid, Paper, Tab, Tabs } from "@mui/material";
import { TabPanel, TabProps } from "../../components";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import Alerts from "../../components/Alert";
import OneSignal from "./oneSignal";
const NotificationComponent = () => {
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
                            <Tab label="One Signal" {...TabProps(0)} />

                        </Tabs>
                    </Paper>
                    <TabPanel value={tabVal} index={0}>
                        <OneSignal />
                    </TabPanel>

                </Grid>
            </Grid>
        </>
    );
};

export default function Notification() {
    return (
        <ThemeProvider theme={theme}>
            <NotificationComponent />
        </ThemeProvider>
    );
}
