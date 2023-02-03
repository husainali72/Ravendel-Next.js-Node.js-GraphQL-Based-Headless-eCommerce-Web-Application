import React, { useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import {get} from "lodash";
import theme from "../../../theme/index.js";
import { seoUpdateAction } from "../../../store/action";
import Alerts from "../../components/Alert";
import Loading from "../../components/Loading.js";

const SEOComponent = () => {
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [seo, setSeo] = useState({});

   useEffect(() => {
    if(settingState, "settings.seo"){
      setSeo({...settingState.settings.seo})
    }
    }, [get(settingState, "settings")])

  const updateSeo = () => {
    dispatch(seoUpdateAction(seo));
  };

  return (
    <>
     <Alerts/>
     {settingState.loading ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div">
            <SettingTextInput
              label="Meta Title"
              value={seo.meta_title}
              onSettingInputChange={(val) =>
                setSeo({ ...seo, meta_title: val })
              }
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              label="Meta Tag"
              value={seo.meta_tag}
              onSettingInputChange={(val) => setSeo({ ...seo, meta_tag: val })}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              label="Meta Desciption"
              value={seo.meta_description}
              onSettingInputChange={(val) =>
                setSeo({ ...seo, meta_description: val })
              }
              multiline
              rows="5"
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateSeo}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function SEO() {
  return (
    <ThemeProvider theme={theme}>
      <SEOComponent />
    </ThemeProvider>
  );
}
