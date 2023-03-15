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
const OneSignalComponent = () => {
    const classes = viewStyles();
    const dispatch = useDispatch();
    const settingState = useSelector((state) => state.settings);
    const [paypalInfo, setPaypalInfo] = useState({ enable: false });
    useEffect(() => {
        if (settingState.settings && settingState.settings.paymnet && settingState.settings.paymnet.paypal) {
            setPaypalInfo({ ...settingState.settings.paymnet.paypal })
        }
    }, [get(settingState, "settings")])
    const updatePaypal = () => {
        dispatch(paymentPaypalUpdateAction(paypalInfo));
    };
    return (
        <>
            <Alerts />
            {settingState.loading ? <Loading /> : null}
            <Grid container spacing={2}>
                <Grid item md={6} sm={12} xs={12}>
                    <Box component="div" className={classes.marginBottom2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={paypalInfo.enable}
                                    onChange={(e) =>
                                        setPaypalInfo({ ...paypalInfo, enable: e.target.checked })
                                    }
                                />
                            }
                            label="Enable OneSignal Standard"
                        />
                    </Box>
                    {paypalInfo.enable && (
                        <Box component="div">
                            <Box component="div">
                                <SettingTextInput
                                    label="Title"
                                    value={paypalInfo.title}
                                    onSettingInputChange={(val) =>
                                        setPaypalInfo({ ...paypalInfo, title: val })
                                    }
                                />
                            </Box>
                            <Box component="div">
                                <SettingTextInput
                                    label="Description"
                                    value={paypalInfo.description}
                                    onSettingInputChange={(val) =>
                                        setPaypalInfo({ ...paypalInfo, description: val })
                                    }
                                    multiline
                                    rows="5"
                                />
                            </Box>
                            <Box component="div">
                                <SettingTextInput
                                    label="OneSignal email"
                                    value={paypalInfo.paypal_email}
                                    onSettingInputChange={(val) =>
                                        setPaypalInfo({ ...paypalInfo, paypal_email: val })
                                    }
                                    type="email"
                                />
                            </Box>
                            <Box component="div" className={classes.marginBottom2}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={paypalInfo.ipn_email_notification}
                                            onChange={(e) =>
                                                setPaypalInfo({
                                                    ...paypalInfo,
                                                    ipn_email_notification: e.target.checked,
                                                })
                                            }
                                        />
                                    }
                                    label="Enable IPN email notifications"
                                />
                            </Box>
                            <Box component="div">
                                <SettingTextInput
                                    label="Receiver email"
                                    value={paypalInfo.receiver_email}
                                    onSettingInputChange={(val) =>
                                        setPaypalInfo({ ...paypalInfo, receiver_email: val })
                                    }
                                    type="email"
                                />
                            </Box>
                            <Box component="div">
                                <SettingTextInput
                                    label="OneSignal identity token"
                                    value={paypalInfo.paypal_identity_token}
                                    onSettingInputChange={(val) =>
                                        setPaypalInfo({ ...paypalInfo, paypal_identity_token: val })
                                    }
                                />
                            </Box>
                            <Box component="div">
                                <SettingTextInput
                                    label="Invoice prefix"
                                    value={paypalInfo.invoice_prefix}
                                    onSettingInputChange={(val) =>
                                        setPaypalInfo({ ...paypalInfo, invoice_prefix: val })
                                    }
                                />
                            </Box>
                        </Box>
                    )}
                </Grid>
                {/* ===================SandBox ANd Live=================== */}
                {paypalInfo.enable && (
                    <Grid item md={6} sm={12} xs={12}>
                        <Box component="div" className={classes.marginBottom2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        checked={paypalInfo.test_mode}
                                        onChange={(e) =>
                                            setPaypalInfo({
                                                ...paypalInfo,
                                                test_mode: e.target.checked,
                                            })
                                        }
                                    />
                                }
                                label="Enable OneSignal sandbox"
                            />
                        </Box>
                        <Box component="div">
                            <SettingTextInput
                                label="API Username"
                                value={paypalInfo.api_username}
                                onSettingInputChange={(val) =>
                                    setPaypalInfo({ ...paypalInfo, api_username: val })
                                }
                            />
                        </Box>
                        <Box component="div">
                            <SettingTextInput
                                label="API password"
                                value={paypalInfo.api_password}
                                onSettingInputChange={(val) =>
                                    setPaypalInfo({ ...paypalInfo, api_password: val })
                                }
                                type="password"
                            />
                        </Box>
                        <Box component="div">
                            <SettingTextInput
                                label="API signature"
                                value={paypalInfo.api_signature}
                                onSettingInputChange={(val) =>
                                    setPaypalInfo({ ...paypalInfo, api_signature: val })
                                }
                                type="password"
                            />
                        </Box>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={updatePaypal}
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
