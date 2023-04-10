import React, { useState } from "react";
import { Grid, Box, FormControlLabel, Checkbox, Button } from "@mui/material";
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
// import { oneSignalUpdateAction } from "../../../store/action/settingAction";

const GoogleManagerComponent = () => {
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
        console.log(googleAnalytics)
        // dispatch(oneSignalUpdateAction(onesignal));
    };
    const handleEditorChange = (e, name) => {

        if (e.target) {
            console.log(e.target.getContent(), name)
            setGoogleAnalytics({ ...googleAnalytics, [name]: e.target.getContent() });
        }
    };
    return (
        <>
            <Alerts />
            {settingState.loading ? <Loading /> : null}



            <Grid container spacing={2} >
                {/* 
                <Grid item sm={9} xs={12} sx={{ display: 'flex', }}>
                    <Box component="div" m={2} >
                        <Typography variant="h5" ml={1} mb={1}>
                            Google Analytics Key
                        </Typography>
                        <Editor
                            initialValue={googleAnalytics.key}
                            apiKey={EditorKey}
                            onEditorChange={(e) => handleEditorChange(e, 'key')}
                            onBlur={(e) => handleEditorChange(e, 'key')}
                        />

                    </Box>
                    <Box component="div" m={2}>
                        <Typography variant="h5" ml={1} mb={1}>
                            Google Analytics Key
                        </Typography>
                        <Editor
                            initialValue={googleAnalytics.value}
                            apiKey={EditorKey}
                            onEditorChange={(e) => handleEditorChange(e, 'value')}
                            onBlur={(e) => handleEditorChange(e, 'value')}
                        />
                    </Box>
                </Grid> */}


                <Grid item md={6} sm={12} xs={12}>
                    <Box component="div" >
                        <SettingTextInput
                            label=" Google Manager Key"
                            value={googleAnalytics.app_id}
                            onSettingInputChange={(val) =>
                                setGoogleAnalytics({ ...googleAnalytics, key: val })
                            }
                        />
                    </Box>
                    <Box component="div">
                        {/* <Editor
                            initialValue={googleAnalytics.value}
                            apiKey={EditorKey}
                            onEditorChange={(e) => handleEditorChange(e, 'value')}
                            onBlur={(e) => handleEditorChange(e, 'value')}
                        /> */}

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

export default function GoogleManager() {
    return (
        <ThemeProvider theme={theme}>
            <GoogleManagerComponent />
        </ThemeProvider>
    );
}
