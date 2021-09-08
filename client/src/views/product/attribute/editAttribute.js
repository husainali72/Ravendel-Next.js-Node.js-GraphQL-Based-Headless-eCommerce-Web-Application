import React, { Fragment, useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { attributeUpdateAction, attributeAction } from "../../../store/action/";
import { isEmpty, client_app_route_url } from "../../../utils/helper";
import ReactTags from "react-tag-autocomplete";
import viewStyles from "../../viewStyles";
import { Alert, Loading, TopBar, CardBlocks } from "../../components";

const delimiters = ["Enter", "Tab"];

const EditAttribute = (props) => {
  const classes = viewStyles();
  const [attribute, setattribute] = useState({
    name: "",
    values: [],
  });
  const dispatch = useDispatch();
  const attributeState = useSelector((state) => state.product_attributes);

  useEffect(() => {
    if (!isEmpty(props.match.params.id)) {
      dispatch(attributeAction(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(attributeState.attribute).length) {
      setattribute({
        ...attribute,
        id: attributeState.attribute.id,
        name: attributeState.attribute.name,
        values: attributeState.attribute.values,
      });
    }
  }, [attributeState]);

  const onDeleteTag = (i) => {
    attribute.values.splice(i, 1);
    setattribute({ ...attribute });
    console.log(attribute);
  };

  const onAddTag = (tag) => {
    attribute.values.push(tag);
    setattribute({ ...attribute });
    console.log(attribute);
  };

  const onUpdate = () => {
    dispatch(attributeUpdateAction({ attribute: attribute }));
  };

  return (
    <Fragment>
      <Alert />
      <form>
        <TopBar
          title='Edit Attribute'
          onSubmit={onUpdate}
          submitTitle='Update'
          backLink={`${client_app_route_url}attributes`}
        />

        <Grid container spacing={2} className={classes.secondmainrow}>
          {attributeState.loading ? <Loading /> : null}
          <Grid item lg={6} xs={12}>
            <CardBlocks title='Attribute Information' nomargin>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    id='name'
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

export default EditAttribute;
