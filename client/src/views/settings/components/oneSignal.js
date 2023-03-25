import React, { useState } from "react";
import { Grid, Box, FormControlLabel, Checkbox, Button } from "@mui/material";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components/";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { get } from "lodash";
import theme from "../../../theme/index.js";
import { paymentPaypalUpdateAction } from "../../../store/action";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import { oneSignalUpdateAction } from "../../../store/action/settingAction";
const OneSignalComponent = () => {
    const classes = viewStyles();
    const dispatch = useDispatch();
    const settingState = useSelector((state) => state.settings);
    const [onesignal, setOneSignal] = useState({ enable: false });
    useEffect(() => {
        if (settingState.settings && settingState.settings.paymnet && settingState.settings.paymnet.paypal) {
            setOneSignal({ ...settingState.settings.notification.one_signal })
        }
    }, [get(settingState, "settings")])
    const updateOneSignal = () => {
        dispatch(oneSignalUpdateAction(onesignal));
    };
    return (
        <>
            <Alerts />
            {settingState.loading ? <Loading /> : null}
            <Grid container spacing={2}>

                <Grid item md={6} sm={12} xs={12}>
                    <Box component="div">
                        <SettingTextInput
                            label="APP ID"
                            value={onesignal.app_id}
                            onSettingInputChange={(val) =>
                                setOneSignal({ ...onesignal, app_id: val })
                            }
                        />
                    </Box>
                    <Box component="div">
                        <SettingTextInput
                            label="API Key"
                            value={onesignal.rest_api_key}
                            onSettingInputChange={(val) =>
                                setOneSignal({ ...onesignal, rest_api_key: val })
                            }
                            type="password"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={updateOneSignal}
                    >
                        Save Change
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default function OneSignal() {
    return (
        <ThemeProvider theme={theme}>
            <OneSignalComponent />
        </ThemeProvider>
    );
}
