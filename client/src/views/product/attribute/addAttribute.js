import React, { useState } from "react";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import ReactTags from "react-tag-autocomplete";
import viewStyles from "../../viewStyles";
import { Alert, Loading, TopBar, CardBlocks } from "../../components";
import { client_app_route_url, isEmpty } from "../../../utils/helper";
import theme from "../../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { attributeAddAction } from "../../../store/action";
import { SPECIAL_CHARACTER_REGEX, validate, validatenested } from "../../components/validate";
import { ALERT_SUCCESS } from "../../../store/reducers/alertReducer.js";
import { useNavigate } from "react-router-dom";

const delimiters = ["Enter", "Tab"];

const AddAttributeTheme = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const classes = viewStyles();
  const [attribute, setattribute] = useState({
    name: "",
    values: [],
    allow_filter: false,
  });
  const attributeState = useSelector((state) => state.productAttributes);

  const onDeleteTag = (i) => {
    attribute.values.splice(i, 1);
    setattribute({ ...attribute });
  };

  const onAddTag = (tag) => {
    attribute.values.push(tag);
    setattribute({ ...attribute });
  };

  const onAdd = () => {

    let errors = validate(["name"], attribute);
    let errorAttributeValue = validatenested("values", ["name"], attribute);
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else if (!isEmpty(errorAttributeValue)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errorAttributeValue,
          error: true,
        },
      });
    }
    else {
      let allValid = true; // Validation flag
      let  payload = {
        ...attribute,
      };
      for (let i of payload.values) {
        let trimmedName = i?.name?.trim(); // Remove leading and trailing spaces
        i.name = trimmedName;
        if (!SPECIAL_CHARACTER_REGEX.test(i.name) || i.name.trim() === '') {
          allValid = false; // Set flag to false if validation fails
          dispatch({
            type: ALERT_SUCCESS,
            payload: {
              boolean: false,
              message: 'Attributes can only contain letters, numbers, and spaces',
              error: true,
            },
          });
          break; // Exit the loop on first validation failure
        }
      }
    
      if (allValid) {
        dispatch(attributeAddAction({ attribute: payload }, navigate));
      }
    }


  };

  return (
    <>
      <form>
        <Alert />
        <TopBar
          title="Add Attribute"
          onSubmit={onAdd}
          submitTitle="Add"
          backLink={`${client_app_route_url}attributes`}
        />

        <Grid container spacing={2} className={classes.secondmainrow}>
          {attributeState.loading ? <Loading /> : null}
          <Grid item lg={6} xs={12}>
            <CardBlocks title="Attribute Information" nomargin>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    name="name"
                    value={attribute.name}
                    onChange={(e) =>
                      setattribute({ ...attribute, name: e.target.value })
                    }
                    variant="outlined"
                    className={classes.marginBottom}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <ReactTags
                    tags={attribute.values}
                    onDelete={onDeleteTag}
                    onAddition={onAddTag}
                    delimiters={delimiters}
                    allowNew={true}
                    minQueryLength={1}
                  />
                  <em className={classes.noteline}>
                    Press tab after adding each tag.
                  </em>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                  sx={{mt:1}}
                    control={
                      <Checkbox
                        color="primary"
                        checked={attribute.allow_filter}
                        name="allow_filter"
                        value="allow_filter"
                        onChange={(e) =>
                          setattribute({
                            ...attribute,
                            allow_filter: e.target.checked
                          })
                        }
                      />
                    }
                    label="Allow Filter"
                  />
                </Grid>
              </Grid>
            </CardBlocks>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

const AddAttribute = () => {
  return (
    <ThemeProvider theme={theme}>
      <AddAttributeTheme />
    </ThemeProvider>
  );
};
export default AddAttribute;
