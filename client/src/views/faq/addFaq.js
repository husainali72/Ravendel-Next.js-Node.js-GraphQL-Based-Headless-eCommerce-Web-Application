import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  useMediaQuery,
} from"@mui/material";
import { useTheme } from"@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { blogAddAction } from "../../store/action/";
import viewStyles from "../viewStyles";
import {
  Alert,
  Loading,
  TopBar,
  StyledRadio,
  CardBlocks,
  TinymceEditor,
} from "../components";
import {client_app_route_url} from '../../utils/helper';

const defaultObj = {
  title: "",
  content: "",
  status: "Publish",
};

const AddFAQ = () => {
  const classes = viewStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blogs);
  const [faq, setFaq] = useState(defaultObj);

  useEffect(() => {
    if (blogState.success) {
      document.forms[0].reset();
      setFaq(defaultObj);
    }
  }, [blogState.success]);

  const addFaq = (e) => {
    e.preventDefault();
    dispatch(blogAddAction(faq));
  };

  const handleChange = (e) => {
    setFaq({ ...faq, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Alert />
      {blogState.loading && <Loading />}
      <form>
        <TopBar
          title='Add FAQ'
          onSubmit={addFaq}
          submitTitle='Add'
          backLink={`${client_app_route_url}all-faq`}
        />

        <Grid
          container
          spacing={isSmall ? 2 : 3}
          className={classes.secondmainrow}
        >
          <Grid item lg={9} md={12} xs={12}>
            <CardBlocks title='FAQ Information' nomargin>
              <Box component='div' mb={2}>
                <TextField
                  id='title'
                  label='Title'
                  name='title'
                  onChange={handleChange}
                  variant='outlined'
                  fullWidth
                />
              </Box>

              <Box component='div'>
                <TinymceEditor
                  value={faq.content}
                  onEditorChange={(value) =>
                    setFaq({ ...faq, ["content"]: value })
                  }
                />
              </Box>
            </CardBlocks>
          </Grid>

          <Grid item lg={3} md={12} xs={12}>
            <CardBlocks title='Status' nomargin>
              <RadioGroup
                defaultValue='Publish'
                name='status'
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value='Publish'
                  control={<StyledRadio />}
                  label='Publish'
                />
                <FormControlLabel
                  value='Draft'
                  control={<StyledRadio />}
                  label='Draft'
                />
              </RadioGroup>
            </CardBlocks>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddFAQ;