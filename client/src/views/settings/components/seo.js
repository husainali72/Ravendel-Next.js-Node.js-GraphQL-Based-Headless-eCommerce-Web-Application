import React, { Fragment, useState } from "react";
import { Grid, TextField, Box, Button } from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";

const SEO = props => {
  const classes = viewStyles();
  const [seo, setSeo] = useState({
    seoTitle: "",
    seoTag: "",
    seoDescription: ""
  });
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="Meta Title"
              className={clsx(classes.settingInput)}
              size="small"
              value={seo.seoTitle}
              onChange={e => setSeo({ ...seo, seoTitle: e.target.value })}
            />
          </Box>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="Meta Tag"
              className={clsx(classes.settingInput)}
              size="small"
              value={seo.seoTag}
              onChange={e => setSeo({ ...seo, seoTag: e.target.value })}
            />
          </Box>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="Meta Desciption"
              className={clsx(classes.settingInput)}
              size="small"
              multiline
              rows="5"
              value={seo.seoDescription}
              onChange={e => setSeo({ ...seo, seoDescription: e.target.value })}
            />
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

export default SEO;
