import React, { Fragment, useState } from "react";
import { Grid, TextField, Box, Typography, Button } from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";

const Media = (props) => {
  const classes = viewStyles();
  const [thumbnailSize, setThumbnailSize] = useState({ width: 80, height: 80 });
  const [mediumSize, setMediumSize] = useState({ width: 300, height: 300 });
  const [largeSize, setLargeSize] = useState({ width: 1030, height: 1030 });

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
                value={thumbnailSize.width}
                onChange={(e) =>
                  setThumbnailSize({
                    ...thumbnailSize,
                    width: e.target.value,
                  })
                }
              />
              <TextField
                type="number"
                variant="outlined"
                label="Height"
                className={clsx(classes.settingInput)}
                size="small"
                value={thumbnailSize.height}
                onChange={(e) =>
                  setThumbnailSize({
                    ...thumbnailSize,
                    height: e.target.value,
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
                value={mediumSize.width}
                onChange={(e) =>
                  setMediumSize({
                    ...mediumSize,
                    width: e.target.value,
                  })
                }
              />
              <TextField
                type="number"
                variant="outlined"
                label="Max Height"
                className={clsx(classes.settingInput)}
                size="small"
                value={mediumSize.height}
                onChange={(e) =>
                  setMediumSize({
                    ...mediumSize,
                    height: e.target.value,
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
                value={largeSize.width}
                onChange={(e) =>
                  setLargeSize({
                    ...largeSize,
                    width: e.target.value,
                  })
                }
              />
              <TextField
                type="number"
                variant="outlined"
                label="Max Height"
                className={clsx(classes.settingInput)}
                size="small"
                value={largeSize.height}
                onChange={(e) =>
                  setLargeSize({
                    ...largeSize,
                    height: e.target.value,
                  })
                }
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={12}>
          <Button size="small" color="primary" variant="contained">
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Media;
