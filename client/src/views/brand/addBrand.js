import React, { Fragment, useState } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Box,
  Divider
} from "@material-ui/core";
import Alert from "../utils/Alert";
import HelpPop from "../utils/helpPop.js";
import viewStyles from "../viewStyles.js";
import Loading from "../utils/loading";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import clsx from "clsx";
import { brandAddAction } from "../../store/action/";
import { connect } from "react-redux";

const AddBrands = props => {
  const classes = viewStyles();
  const [newBrands, setNewBrands] = useState(null);

  const addBrands = () => {
    var string = newBrands;
    var newBrandArr = string.split("\n").map(brand => {
      return {
        name: brand
      };
    });
    props.brandAddAction({ brands: newBrandArr });
  };

  const handleChange = e => {
    setNewBrands(e.target.value);
  };

  return (
    <Fragment>
      {props.loading && <Loading />}
      <Alert />
      <Grid container className="topbar">
        <Grid item lg={6}>
          <Typography variant="h4">
            <Link to="/all-brands">
              <IconButton aria-label="Back">
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <span style={{ paddingTop: 10 }}>Add Brands</span>
          </Typography>
        </Grid>

        <Grid item lg={6} className="text-right padding-right-2">
          <Button color="primary" variant="contained" onClick={addBrands}>
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.cancelBtn}
          >
            <Link to="/all-brands" style={{ color: "#fff" }}>
              Discard
            </Link>
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} className={classes.secondmainrow}>
        <Typography variant="subtitle1" className={classes.pl2}>
          Brands can be associated with products, allowing your customers to
          shop by browsing their favorite brands. Add brands by typing them into
          the text box, one brand per line.
        </Typography>
        <Grid item md={6}>
          <Card>
            <CardHeader title="Brand Details" />
            <Divider />
            <CardContent>
              <Grid container spacing={1}>
                <Grid item className={classes.flex1}>
                  <TextField
                    id="brand-name"
                    label="Brand Names"
                    name="brand-name"
                    variant="outlined"
                    className={clsx(classes.marginBottom, classes.width100)}
                    multiline
                    rows="4"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Box component="div">
                    <HelpPop
                      helpmessage={`<span><div><strong>Brand Names</strong><p>Type the brand names you want to add into the text box. Enter one brand per line, such as:</p><ul style="list-style-type:disc"><li>Nike</li><li>ADIDAS</li><li>Apple</li><li>Microsoft</li></ul></div></span>`}
                      className={classes.floatRight}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { brands: state.brands };
};

const mapDispatchToProps = {
  brandAddAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBrands);
