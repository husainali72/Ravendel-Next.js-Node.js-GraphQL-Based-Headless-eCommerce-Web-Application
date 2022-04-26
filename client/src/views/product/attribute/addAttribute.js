import React, { Fragment, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { attributeAddAction } from "../../../store/action/";
import ReactTags from "react-tag-autocomplete";
import viewStyles from "../../viewStyles";
import { Alert, Loading, TopBar, CardBlocks } from "../../components";
import {client_app_route_url} from '../../../utils/helper';

const delimiters = ["Enter", "Tab"];

const AddAttribute = () => {
  const classes = viewStyles();
  const [attribute, setattribute] = useState({
    name: "",
    values: [],
  });
  const attributeState = useSelector((state) => state.product_attributes);
  const dispatch = useDispatch();

  const onDeleteTag = (i) => {
    attribute.values.splice(i, 1);
    setattribute({ ...attribute });
  };

  const onAddTag = (tag) => {
    attribute.values.push(tag);
    setattribute({ ...attribute });
  };

  const onAdd = () => {
    dispatch(attributeAddAction({ attribute: attribute }));
  };

  return (
    <Fragment>
      <form>
        <Alert />
        <TopBar
          title='Add Attribute'
          onSubmit={onAdd}
          submitTitle='Add'
          backLink={`${client_app_route_url}attributes`}
        />

        <Grid container spacing={2} className={classes.secondmainrow}>
          {attributeState.loading ? <Loading /> : null}
          <Grid item lg={6} xs={12}>
            <CardBlocks title='Attribute Information' nomargin>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label='Name'
                    name='name'
                    value={attribute.name}
                    onChange={(e) =>
                      setattribute({ ...attribute, name: e.target.value })
                    }
                    variant='outlined'
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
                  />
                  <em className={classes.noteline}>
                    Press tab after adding each tag.
                  </em>
                </Grid>
              </Grid>
            </CardBlocks>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default AddAttribute;
