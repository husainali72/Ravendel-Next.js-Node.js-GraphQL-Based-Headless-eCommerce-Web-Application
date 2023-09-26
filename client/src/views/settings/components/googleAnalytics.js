import React, { useState } from "react";
import { Grid, Box, FormControlLabel, Checkbox, Button, TextareaAutosize } from "@mui/material";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { get } from "lodash";
import { Editor } from "@tinymce/tinymce-react";
import theme from "../../../theme/index.js";
import { EditorKey } from "../../utils/apikey";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import { Typography } from "@mui/material";
import { SettingTextInput } from "./setting-components";
// import TextareaAutosize from '@mui/base/TextareaAutosize';
const GoogleAnalyticsComponent = () => {
    const classes = viewStyles();
    const dispatch = useDispatch();
    const settingState = useSelector((state) => state.settings);
    const [googleAnalytics, setGoogleAnalytics] = useState({
        key: '',
        value: ''
    });
    useEffect(() => {
        if (settingState.settings && settingState.settings.paymnet && settingState.settings.paymnet.paypal) {
            // setOneSignal({ ...settingState.settings.notification.one_signal })
        }
    }, [get(settingState, "settings")])
    const updateOneSignal = () => {
        // dispatch(oneSignalUpdateAction(onesignal));
    };
    return (
        <>
            <Alerts />
            {settingState.loading ? <Loading /> : null}
            <Grid container spacing={2} >
                <Grid item md={6} sm={12} xs={12}>
                    <Box component="div">
                        <SettingTextInput
                            label=" Google Analytics Key"
                            value={googleAnalytics.app_id}
                            onSettingInputChange={(val) =>
                                setGoogleAnalytics({ ...googleAnalytics, key: val })
                            }
                        />
                    </Box>
                    <Box component="div" >
                        <div>
                            <TextareaAutosize        label="Google Analytics Key" placeholder="Google Analytics Key" value={googleAnalytics.key} onChange={(e) => { setGoogleAnalytics({ ...googleAnalytics, key: e.target.value }) }} minRows={3} style={{ width: '300px', padding: '10px', borderRadius: '5px' }} />
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={updateOneSignal}
                    >
                        Save Change
                    </Button>
                </Grid>
            </Grid >
        </>
    );
};

export default function GoogleAnalytics() {
    return (
        <ThemeProvider theme={theme}>
            <GoogleAnalyticsComponent />
        </ThemeProvider>
    );
}
