import React, { Fragment, useState } from "react";
import { Grid, Box, Button, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import viewStyles from "../../viewStyles";
import { mediaUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput, SettingBlock } from "./setting-components";

const Media = () => {
  const classes = viewStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [media, setMedia] = useState({
    thumbnail: settingState.settings.media.thumbnail,
    medium: settingState.settings.media.medium,
    large: settingState.settings.media.large,
  });

  const updateGeneral = () => {
    dispatch(mediaUpdateAction(media));
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <SettingBlock label='Thumbnail Size'>
            <Box display='flex' flexDirection={isSmall ? "column" : "row"}>
              <SettingTextInput
                value={media.thumbnail.width}
                label='Width'
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
                type='number'
              />
              <SettingTextInput
                value={media.thumbnail.height}
                label='Height'
                onSettingInputChange={(val) => {
                  setMedia({
                    ...media,
                    thumbnail: {
                      ...media.thumbnail,
                      height: val,
                    },
                  });
                }}
                type='number'
              />
            </Box>
          </SettingBlock>
          <SettingBlock label='Medium size'>
            <Box display='flex' flexDirection={isSmall ? "column" : "row"}>
              <SettingTextInput
                value={media.medium.width}
                label='Max Width'
                onSettingInputChange={(val) => {
                  setMedia({
                    ...media,
                    thumbnail: {
                      ...media.thumbnail,
                      width: val,
                    },
                  });
                }}
                type='number'
                otherClass={classes.marginRight2}
              />
              <SettingTextInput
                value={media.medium.height}
                label='Max Height'
                onSettingInputChange={(val) => {
                  setMedia({
                    ...media,
                    thumbnail: {
                      ...media.thumbnail,
                      height: val,
                    },
                  });
                }}
                type='number'
              />
            </Box>
          </SettingBlock>

          <SettingBlock label='Large Size'>
            <Box display='flex' flexDirection={isSmall ? "column" : "row"}>
              <SettingTextInput
                value={media.large.width}
                label='Max Width'
                onSettingInputChange={(val) => {
                  setMedia({
                    ...media,
                    thumbnail: {
                      ...media.thumbnail,
                      width: val,
                    },
                  });
                }}
                type='number'
                otherClass={classes.marginRight2}
              />
              <SettingTextInput
                value={media.large.height}
                label='Max Height'
                onSettingInputChange={(val) => {
                  setMedia({
                    ...media,
                    large: {
                      ...media.large,
                      height: val,
                    },
                  });
                }}
                type='number'
              />
            </Box>
          </SettingBlock>
        </Grid>
        <Grid item md={12} xs={12}>
          <Button
            size='small'
            color='primary'
            variant='contained'
            onClick={updateGeneral}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Media;
