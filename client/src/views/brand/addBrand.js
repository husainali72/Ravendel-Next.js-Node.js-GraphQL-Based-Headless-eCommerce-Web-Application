import React, { Fragment, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Box,
  Divider
} from "@material-ui/core";
import HelpPop from "../utils/helpPop.js";
import viewStyles from "../viewStyles.js";
import clsx from "clsx";
import { brandAddAction } from "../../store/action/";
import { useDispatch, useSelector } from "react-redux";
import { Loading, TopBar, Alert } from "../components";

const AddBrands = props => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const Brands = useSelector(state => state.brands);
  const [newBrands, setNewBrands] = useState(null);

  const addBrands = () => {
    var string = newBrands;
    var newBrandArr = string.split("\n").map(brand => {
      return {
        name: brand
      };
    });
    dispatch(brandAddAction({ brands: newBrandArr }));
  };

  const handleChange = e => {
    setNewBrands(e.target.value);
  };

  return (
    <Fragment>
      {Brands.loading && <Loading />}
      <Alert />
      <TopBar 
          title="Add Brands"
          onSubmit={addBrands}
          submitTitle="Add"
          backLink={"/all-brands"}
      />

      <Grid container spacing={4} className={classes.secondmainrow}>
        <Typography variant="subtitle1" className={classes.pl2}>
          Brands can be associated with products, allowing your customers to
          shop by browsing their favorite brands. Add brands by typing them into
          the text box, one brand per line.
        </Typography>
        <Grid item md={6} sm={12} xs={12}>
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

export default AddBrands;
