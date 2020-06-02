import React, { Fragment, useState } from "react";
import { Grid, TextField, Box, Typography, Button } from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";
import { mediaUpdateAction } from "../../../store/action";
import { connect } from "react-redux";

const Media = (props) => {
  const classes = viewStyles();
  const [media, setmedia] = useState({
    thumbnail: props.settingState.settings.media.thumbnail,
    medium: props.settingState.settings.media.medium,
    large: props.settingState.settings.media.large,
  });

  const updateGeneral = () => {
    props.mediaUpdateAction(media);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div">
            <Typography variant="h5" className={classes.marginBottom2}>
              Thumbnail Size
            </Typography>
            <Box display="flex">
              <TextField
                type="number"
                variant="outlined"
                label="Width"
                className={clsx(classes.settingInput, classes.marginRight2)}
                size="small"
                value={media.thumbnail.width}
                onChange={(e) =>
                  setmedia({
                    ...media,
                    thumbnail: {
                      ...media.thumbnail,
                      width: e.target.value,
                    },
                  })
                }
              />
              <TextField
                type="number"
                variant="outlined"
                label="Height"
                className={clsx(classes.settingInput)}
                size="small"
                value={media.thumbnail.height}
                onChange={(e) =>
                  setmedia({
                    ...media,
                    thumbnail: {
                      ...media.thumbnail,
                      height: e.target.value,
                    },
                  })
                }
              />
            </Box>
          </Box>
          <Box component="div">
            <Typography variant="h5" className={classes.marginBottom2}>
              Medium size
            </Typography>
            <Box display="flex">
              <TextField
                type="number"
                variant="outlined"
                label="Max Width"
                className={clsx(classes.settingInput, classes.marginRight2)}
                size="small"
                value={media.medium.width}
                onChange={(e) =>
                  setmedia({
                    ...media,
                    medium: {
                      ...media.medium,
                      width: e.target.value,
                    },
                  })
                }
              />
              <TextField
                type="number"
                variant="outlined"
                label="Max Height"
                className={clsx(classes.settingInput)}
                size="small"
                value={media.medium.height}
                onChange={(e) =>
                  setmedia({
                    ...media,
                    medium: {
                      ...media.medium,
                      height: e.target.value,
                    },
                  })
                }
              />
            </Box>
          </Box>
          <Box component="div">
            <Typography variant="h5" className={classes.marginBottom2}>
              Large size
            </Typography>
            <Box display="flex">
              <TextField
                type="number"
                variant="outlined"
                label="Max Width"
                className={clsx(classes.settingInput, classes.marginRight2)}
                size="small"
                value={media.large.width}
                onChange={(e) =>
                  setmedia({
                    ...media,
                    large: {
                      ...media.large,
                      width: e.target.value,
                    },
                  })
                }
              />
              <TextField
                type="number"
                variant="outlined"
                label="Max Height"
                className={clsx(classes.settingInput)}
                size="small"
                value={media.large.height}
                onChange={(e) =>
                  setmedia({
                    ...media,
                    large: {
                      ...media.large,
                      height: e.target.value,
                    },
                  })
                }
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={12}>
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
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { settingState: state.settings };
};

const mapDispatchToProps = {
  mediaUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Media);
