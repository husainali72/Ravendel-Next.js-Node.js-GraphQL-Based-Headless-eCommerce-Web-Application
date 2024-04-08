import React, { useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";
import { SettingTextInput } from "./setting-components";
import { get } from "lodash";
const GoogleManagerComponent = () => {
  const settingState = useSelector((state) => state.settings);
  const [googleAnalytics, setGoogleAnalytics] = useState({
    key: "",
    value: "",
  });
  const updateOneSignal = () => {};

  return (
    <>
      <Alerts />
      {get(settingState, "loading") ? <Loading /> : null}

      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <Box component="div">
            <SettingTextInput
              label=" Google Manager Key"
              value={get(googleAnalytics, "app_id")}
              onSettingInputChange={(val) =>
                setGoogleAnalytics({ ...googleAnalytics, key: val })
              }
            />
          </Box>
          <Box component="div"></Box>
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

export default function GoogleManager() {
  return (
    <ThemeProvider theme={theme}>
      <GoogleManagerComponent />
    </ThemeProvider>
  );
}
