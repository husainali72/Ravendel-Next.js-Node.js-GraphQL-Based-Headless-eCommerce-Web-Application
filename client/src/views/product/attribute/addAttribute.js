import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Backdrop,
  CircularProgress,
  TextField,
  IconButton,
  Typography,
  Divider,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Collapse,
  RadioGroup,
  Radio,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Tooltip,
  Icon,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ImageIcon from "@material-ui/icons/Image";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { attributeAddAction } from "../../../store/action/";
import clsx from "clsx";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import ReactTags from "react-tag-autocomplete";
import "../../../App.css";
import viewStyles from "../../viewStyles";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

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

  return (
    <Fragment>
      <form>
        <Grid container className="topbar">
          <Grid item lg={6}>
            <Typography variant="h4">
              <Link to="/attributes">
                <IconButton aria-label="Back">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <span style={{ paddingTop: 10 }}>Add Attribute</span>
            </Typography>
          </Grid>

          <Grid item lg={6} className="text-right padding-right-2">
            <Button
              color="primary"
              variant="contained"
              onClick={() =>
                dispatch(attributeAddAction({ attribute: attribute }))
              }
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.cancelBtn}
            >
              <Link to="/attributes" style={{ color: "#fff" }}>
                Discard
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} className={classes.secondmainrow}>
          {attributeState.loading && (
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress color="inherit" /> <br /> Loading
            </Backdrop>
          )}
          <Grid item lg={9} md={12}>
            <Box component="span">
              <Card>
                <CardHeader title="Attribute Information" />
                <Divider />
                <CardContent>
                  <Grid container>
                    <Grid item md={12}>
                      <TextField
                        id="name"
                        label="Name"
                        name="name"
                        value={attribute.name}
                        onChange={(e) =>
                          setattribute({ ...attribute, name: e.target.value })
                        }
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                      />
                    </Grid>

                    <Grid item md={12}>
                      <ReactTags
                        tags={attribute.values}
                        onDelete={onDeleteTag}
                        onAddition={onAddTag}
                        delimiters={delimiters}
                        allowNew={true}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default AddAttribute;
