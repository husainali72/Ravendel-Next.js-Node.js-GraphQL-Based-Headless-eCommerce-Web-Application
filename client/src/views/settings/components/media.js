import React, { useEffect, useState } from "react";
import { Grid, Box, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput, SettingBlock } from "./setting-components";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import { get } from "lodash";
import { mediaUpdateAction } from "../../../store/action";
import Alerts from "../../components/Alert.js";
import Loading from "../../components/Loading.js";
const MediaComponent = () => {
  const classes = viewStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [media, setMedia] = useState({
    thumbnail: get(settingState,'settings.media.thumbnail'),
    medium: get(settingState,'settings.media.medium'),
    large: get(settingState,'settings.media.large'),
  });
  const updateGeneral = () => {
    dispatch(mediaUpdateAction(media));
  };
  useEffect(() => {
    get(settingState, "settings.media.thumbnail")
    get(settingState, "settings.media.medium")
    get(settingState, "settings.media.large")
  }, [settingState.settings])
  return (
    <>
      <Alerts />
      {settingState.loading ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <SettingBlock label="Thumbnail Size">
            <Box display="flex" flexDirection={isSmall ? "column" : "row"}>
              <SettingTextInput
                value={get(media,'thumbnail.width')}
                label="Width"
                onSettingInputChange={(val) => {
                  setMedia({
                    ...media,
                    thumbnail: {
                      ...media.thumbnail,
                      width: val,
                    },
                  });
                }}
                otherClass={classes.marginRight2}
                type="number"
              />
              <SettingTextInput
                value={get(media,'thumbnail.height')}
                label="Height"
                onSettingInputChange={(val) => {
                  setMedia({
                    ...media,
                    thumbnail: {
                      ...media.thumbnail,
                      height: val,
                    },
                  });
                }}
                type="number"
              />
            </Box>
          </SettingBlock>
          <SettingBlock label="Medium size">
            <Box display="flex" flexDirection={isSmall ? "column" : "row"}>
              <SettingTextInput
                value={get(media,'medium.width')}
                label="Max Width"
                onSettingInputChange={(val) => {
                  setMedia({
                    ...media,
                    medium: {
                      ...media.medium,
                      width: val,
                    },
                  });
                }}
                type="number"
                otherClass={classes.marginRight2}
              />
              <SettingTextInput
                value={get(media,'medium.height')}
                label="Max Height"
                onSettingInputChange={(val) => {
                  setMedia({
                    ...media,
                    medium: {
                      ...get(media,'medium'),
                      height: val,
                    },
                  });
                }}
                type="number"
              />
            </Box>
          </SettingBlock>

          <SettingBlock label="Large Size">
            <Box display="flex" flexDirection={isSmall ? "column" : "row"}>
              <SettingTextInput
                value={get(media,'large.width')}
                label="Max Width"
                onSettingInputChange={(val) => {
                  setMedia({
                    ...media,
                    large: {
                      ...get(media,'large'),
                      width: val,
                    },
                  });
                }}
                type="number"
                otherClass={classes.marginRight2}
              />
              <SettingTextInput
                value={get(media,'large.height')}
                label="Max Height"
                onSettingInputChange={(val) => {
                  setMedia({
                    ...media,
                    large: {
                      ...get(media,'large'),
                      height: val,
                    },
                  });
                }}
                type="number"
              />
            </Box>
          </SettingBlock>
        </Grid>
        <Grid item md={12} xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateGeneral}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function Media() {
  return (
    <ThemeProvider theme={theme}>
      <MediaComponent />
    </ThemeProvider>
  );
}
