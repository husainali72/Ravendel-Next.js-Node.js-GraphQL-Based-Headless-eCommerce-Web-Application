import React, { Fragment, useState } from "react";
import { Grid, Box, Button } from"@mui/material";
import { seoUpdateAction } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components";
import { useEffect } from "react";
import {get} from "lodash";

const SEO = () => {
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [seo, setSeo] = useState({ 
    // ...settingState.settings.seo
   });

   useEffect(() => {
    get(settingState, "settings.seo")
    }, [settingState.settings])

  const updateSeo = () => {
    console.log(seo)
    // dispatch(seoUpdateAction(seo));
  };

  return (
    <>
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
    </>
  );
};

export default SEO;
