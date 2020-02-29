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

const EditBrand = props => {
  const classes = viewStyles();
  const [logoImage, setLogoImage] = useState(null);
  const [brand, setBrand] = useState({
    name: "abc",
    url: "/abc",
    logo: ""
  });

  const updateBrand = () => {
    console.log("brand", brand);
  };

  const handleChange = e => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const fileChange = e => {
    setLogoImage(null);
    setLogoImage(URL.createObjectURL(e.target.files[0]));
    setBrand({ ...brand, [e.target.name]: e.target.files });
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
            <span style={{ paddingTop: 10 }}>Edit Brand</span>
          </Typography>
        </Grid>

        <Grid item lg={6} className="text-right padding-right-2">
          <Button color="primary" variant="contained" onClick={updateBrand}>
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
        <Grid item md={6}>
          <Card>
            <CardHeader title="Brand Details" />
            <Divider />
            <CardContent>
              <TextField
                label="Brand Name"
                name="name"
                variant="outlined"
                className={clsx(classes.marginBottom, classes.width100)}
                onChange={handleChange}
                value={brand.name}
              />
              <TextField
                label="Url"
                name="url"
                variant="outlined"
                className={clsx(classes.marginBottom, classes.width100)}
                onChange={handleChange}
                value={brand.url}
              />

              <Grid container>
                <Grid item className={classes.flex1}>
                  <TextField
                    helperText="Brand Logo"
                    name="logo"
                    variant="outlined"
                    className={clsx(
                      classes.marginBottom,
                      classes.width100,
                      "top-helper"
                    )}
                    onChange={fileChange}
                    type="file"
                  />
                </Grid>
                <Grid item>
                  {logoImage !== null && (
                    <Box className={classes.logoImageBox}>
                      <img
                        src={logoImage}
                        className={classes.logoImagePreview}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={6}>
          <Card>
            <CardHeader title="Meta Information" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <TextField
                    id="meta-title"
                    label="Meta Title"
                    name="meta-title"
                    variant="outlined"
                    className={clsx(classes.width100)}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    id="meta-keyword"
                    label="Meta Keyword"
                    name="meta-keyword"
                    variant="outlined"
                    className={clsx(classes.width100)}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item md={12}>
                  <TextField
                    id="meta-description"
                    label="Meta-description"
                    name="meta-description"
                    variant="outlined"
                    className={clsx(classes.marginBottom, classes.width100)}
                    onChange={handleChange}
                    multiline
                    rows="4"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EditBrand;
