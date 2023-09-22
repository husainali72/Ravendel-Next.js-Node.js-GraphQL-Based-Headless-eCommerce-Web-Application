import { useState } from "react";
import Alerts from "../../components/Alert";
import { CardBlocks, Loading, StyledRadio } from "../../components";
import {
    Grid, Box, FormControlLabel, Checkbox, Button, RadioGroup, FormGroup,
} from "@mui/material";
import { SettingTextInput } from "./setting-components";
import { useSelector } from "react-redux";
import { validate } from "../../components/validate";
import { isEmpty } from "../../../utils/helper";
import { useDispatch } from "react-redux";
import { ALERT_SUCCESS } from "../../../store/reducers/alertReducer";
import { ImageStorageUpdateAction } from "../../../store/action/settingAction";
import { useEffect } from "react";
import { get } from "lodash";
const defaultValue = {
    status: 'localStorage',
    s3_id: "",
    s3_key: ""
}
const ImageSetting = () => {
    const [imageSetting, setImageSetting] = useState(defaultValue);
    const settingState = useSelector((state) => state.settings);
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setImageSetting({ ...imageSetting, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        if (!isEmpty(get(settingState, 'settings.imageStorage'))) {
            let setting = settingState?.settings?.imageStorage
            let value = {
                status: setting?.status || 'localStorge',
                s3_id: setting?.s3_id || '',
                s3_key: setting?.s3_key || ''
            }
            setImageSetting({ ...imageSetting, ...value })
        }

    }, [get(settingState, 'settings')])

    const updateImageSetting = () => {
        let errors = ''
        if (imageSetting?.status === 's3') {
            errors = validate(["s3_key", "s3_id"], imageSetting);
        }

        if (!isEmpty(errors)) {
            dispatch({
                type: ALERT_SUCCESS,
                payload: {
                    boolean: false,
                    message: errors,
                    error: true,
                },
            });
        } else {
            let body = {}
            if (imageSetting?.status !== 's3') {
                body = {
                    status: imageSetting?.status
                }
            } else {
                body = { ...imageSetting }
            }
            dispatch(ImageStorageUpdateAction(body))
        }

        // dispatch(oneSignalUpdateAction(imageSetting));
    };

    return (<>
        <>
            <Alerts />
            {settingState.loading ? <Loading /> : null}
            <Grid item md={6} sm={12} xs={12}>
                <Box component="div">
                    <CardBlocks title="Image Storage" nomargin>
                        <RadioGroup
                            value={imageSetting?.status}
                            name="status"
                            onChange={handleChange}
                            column
                        >
                            <FormControlLabel
                                value="localStorage"
                                control={<StyledRadio />}
                                label="Local Storage"
                            />

                            <FormControlLabel
                                value="s3"
                                control={<StyledRadio />}
                                label="S3"
                            />

                            {imageSetting?.status === 's3' ? <Grid item md={6} sm={12} xs={12}>
                                <Box component="div">
                                    <SettingTextInput
                                        label="S3 ID"
                                        value={imageSetting?.s3_id}
                                        onSettingInputChange={(val) =>
                                            setImageSetting({ ...imageSetting, s3_id: val })
                                        }
                                    />
                                </Box>
                                <Box component="div">
                                    <SettingTextInput
                                        label="S3 Key"
                                        value={imageSetting?.s3_key}
                                        onSettingInputChange={(val) =>
                                            setImageSetting({ ...imageSetting, s3_key: val })
                                        }
                                        type="password"
                                    />
                                </Box>
                            </Grid> : null}
                        </RadioGroup>
                        <Grid item xs={12}>
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={updateImageSetting}
                            >
                                Save Change
                            </Button>
                        </Grid>
                    </CardBlocks>

                </Box>


            </Grid>
        </>
    </>)
}
export default ImageSetting