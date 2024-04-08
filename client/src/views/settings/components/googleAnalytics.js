import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import { SettingTextInput } from "./setting-components";
import { useSelector } from "react-redux";
const GoogleAnalyticsComponent = () => {
  const settingState = useSelector((state) => state.settings);
  const [googleAnalytics, setGoogleAnalytics] = useState({
    key: "",
    value: "",
  });
  const updateOneSignal = () => {};
  return (
    <>
      <Alerts />
      {settingState.loading ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <Box component="div">
            <SettingTextInput
              label=" Google Analytics Key"
              value={googleAnalytics.app_id}
              onSettingInputChange={(val) =>
                setGoogleAnalytics({ ...googleAnalytics, app_id: val })
              }
            />
          </Box>
          <Box component="div">
            <div>
              <TextareaAutosize
                label="Google Analytics Key"
                placeholder="Google Analytics Key"
                value={googleAnalytics.key}
                onChange={(e) => {
                  setGoogleAnalytics({
                    ...googleAnalytics,
                    key: e.target.value,
                  });
                }}
                minRows={3}
                style={{ width: "300px", padding: "10px", borderRadius: "5px" }}
              />
            </div>
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

export default function GoogleAnalytics() {
  return (
    <ThemeProvider theme={theme}>
      <GoogleAnalyticsComponent />
    </ThemeProvider>
  );
}
