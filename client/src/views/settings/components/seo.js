import React, { Fragment, useState } from "react";
import { Grid, Box, Button } from "@material-ui/core";
import { seoUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components";

const SEO = () => {
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [seo, setSeo] = useState({ ...settingState.settings.seo });

  const updateSeo = () => {
    dispatch(seoUpdateAction(seo));
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component='div'>
            <SettingTextInput
              label='Meta Title'
              value={seo.meta_title}
              onSettingInputChange={(val) =>
                setSeo({ ...seo, meta_title: val })
              }
            />
          </Box>
          <Box component='div'>
            <SettingTextInput
              label='Meta Tag'
              value={seo.meta_tag}
              onSettingInputChange={(val) => setSeo({ ...seo, meta_tag: val })}
            />
          </Box>
          <Box component='div'>
            <SettingTextInput
              label='Meta Desciption'
              value={seo.meta_description}
              onSettingInputChange={(val) =>
                setSeo({ ...seo, meta_description: val })
              }
              multiline
              rows='5'
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Button
            size='small'
            color='primary'
            variant='contained'
            onClick={updateSeo}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SEO;
