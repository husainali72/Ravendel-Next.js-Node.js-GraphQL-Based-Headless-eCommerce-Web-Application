import React, { useState } from "react";
import { Grid, Typography, TextField, Box } from "@mui/material";
import HelpPop from "../utils/helpPop.js";
import viewStyles from "../viewStyles.js";
import clsx from "clsx";
import { brandAddAction } from "../../store/action/";
import { useDispatch, useSelector } from "react-redux";
import { Loading, TopBar, Alert, CardBlocks } from "../components";
import { client_app_route_url } from "../../utils/helper";
import theme from "../../theme/index.js";
import { ThemeProvider } from "@mui/material/styles";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer.js";
const AddBrandsComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const Brands = useSelector((state) => state.brands);
  const [newBrands, setNewBrands] = useState(null);

  const addBrands = () => {
    var string = newBrands;
    if (string) {
      var newBrandArr = string.split("\n").map((brand) => {
        return {
          name: brand,
        };
      });
      dispatch(brandAddAction({ brands: newBrandArr }));
    } else {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: "Brand Field Is Required",
          error: true,
        },
      });
    }
  };

  const handleChange = (e) => {
    setNewBrands(e.target.value);
  };

  return (
    <>
      {Brands.loading && <Loading />}
      <Alert />
      <TopBar
        title="Add Brands"
        onSubmit={addBrands}
        submitTitle="Add"
        backLink={`${client_app_route_url}all-brands`}
      />

      <Grid container spacing={4} className={classes.secondmainrow}>
        <Typography variant="subtitle1" className={classes.pl2}>
          Brands can be associated with products, allowing your customers to
          shop by browsing their favorite brands. Add brands by typing them into
          the text box, one brand per line.
        </Typography>
        <Grid item md={6} sm={12} xs={12}>
          <CardBlocks title="Brand Details">
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
          </CardBlocks>
        </Grid>
      </Grid>
    </>
  );
};

const AddBrands = () => {
  return (
    <ThemeProvider theme={theme}>
      <AddBrandsComponent />
    </ThemeProvider>
  );
};
export default AddBrands;
