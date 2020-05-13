import React, { Fragment, useState } from "react";
import { Grid, TextField, Box, Button } from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";
import { seoUpdateAction } from "../../../store/action";
import { connect } from "react-redux";

const SEO = (props) => {
  const classes = viewStyles();
  const [seo, setSeo] = useState({ ...props.settingState.settings.seo });

  const updateSeo = () => {
    props.seoUpdateAction(seo);
  };

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
              value={seo.meta_title}
              onChange={(e) => setSeo({ ...seo, meta_title: e.target.value })}
            />
          </Box>
          <Box component="div">
            <TextField
              type="text"
              variant="outlined"
              label="Meta Tag"
              className={clsx(classes.settingInput)}
              size="small"
              value={seo.meta_tag}
              onChange={(e) => setSeo({ ...seo, meta_tag: e.target.value })}
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
              value={seo.meta_description}
              onChange={(e) =>
                setSeo({ ...seo, meta_description: e.target.value })
              }
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
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { settingState: state.settings };
};

const mapDispatchToProps = {
  seoUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SEO);
