import React, { Fragment, useState, useEffect } from "react";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { attributeUpdateAction, attributeAction } from "../../../store/action/";
import { isEmpty, client_app_route_url } from "../../../utils/helper";
import ReactTags from "react-tag-autocomplete";
import viewStyles from "../../viewStyles";
import { Alert, Loading, TopBar, CardBlocks } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import { get } from "lodash";
import { SPECIAL_CHARACTER_REGEX, validate, validatenested } from "../../components/validate";
import { ALERT_SUCCESS } from "../../../store/reducers/alertReducer.js";
const delimiters = ["Enter", "Tab"];

const EditAttributeComponent = ({ params }) => {
  const ATTRIBUTE_ID = params.id || "";
  const classes = viewStyles();
  const navigate = useNavigate();
  const [attribute, setattribute] = useState({
    name: "",
    values: [],
    allow_filter:false,
  });
  const dispatch = useDispatch();
  const attributeState = useSelector((state) => state.productAttributes);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    dispatch(attributeAction(ATTRIBUTE_ID));
  }, []);

  useEffect(() => {
    if (!isEmpty(get(attributeState, "attribute"))) {
      if (Object.keys(attributeState.attribute).length) {
        setattribute({
          ...attribute,
          id: attributeState.attribute.id,
          name: attributeState.attribute.name,
          values: attributeState.attribute.values,
          allow_filter: attributeState.attribute.allow_filter
        });
      }
    }
  }, [get(attributeState, "attribute")]);

  useEffect(() => {
    setloading(get(attributeState, "loading"));
  }, [get(attributeState, "loading")]);

  const onDeleteTag = (i) => {
    attribute.values.splice(i, 1);
    setattribute({ ...attribute });
  };

  const onAddTag = (tag) => {
    attribute.values.push(tag);
    setattribute({ ...attribute });
  };

  const onUpdate = () => {
    let errors = validate(["name"], attribute);
    let errorAttributeValue = validatenested("values", [ "name"], attribute);
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

      for (let i of attribute.values) {
        if (!SPECIAL_CHARACTER_REGEX.test(i.name) || i.name.trim() === '') {
          allValid = false; // Set flag to false if validation fails
          dispatch({
            type: ALERT_SUCCESS,
            payload: {
              boolean: false,
              message: 'Attributes can only contain letters, numbers',
              error: true,
            },
          });
          break; // Exit the loop on first validation failure
        }
      }
      if(allValid){
      dispatch(attributeUpdateAction({ attribute: attribute }, navigate));
    }
    }



  };

  return (
    <>
      <Alert />
      <form>
        <TopBar
          title="Edit Attribute"
          onSubmit={onUpdate}
          submitTitle="Update"
          backLink={`${client_app_route_url}attributes`}
        />

        <Grid container spacing={2} className={classes.secondmainrow}>
          {loading ? <Loading /> : null}
          <Grid item lg={6} xs={12}>
            <CardBlocks title="Attribute Information" nomargin>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    id="name"
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

export default function EditAttribute() {
  const params = useParams();
  return (
    <ThemeProvider theme={theme}>
      <EditAttributeComponent params={params} />
    </ThemeProvider>
  );
}
