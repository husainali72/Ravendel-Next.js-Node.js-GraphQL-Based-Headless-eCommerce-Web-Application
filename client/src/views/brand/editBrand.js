import React, { Fragment, useState, useEffect } from "react";
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
import viewStyles from "../viewStyles.js";
import Loading from "../utils/loading";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import clsx from "clsx";
import { brandUpdateAction } from "../../store/action/";
import { isEmpty } from "../../utils/helper";
import { connect } from "react-redux";

const EditBrand = props => {
  const classes = viewStyles();
  const [logoImage, setLogoImage] = useState(null);
  const [brand, setBrand] = useState({
    name: "",
    url: "",
    brand_logo: "",
    meta: {
      title: "",
      description: "",
      keywords: ""
    }
  });

  useEffect(() => {
    props.brands.brands.map(editbrand => {
      if (editbrand.id === props.match.params.id) {
        setBrand({ ...brand, ...editbrand });
        if (editbrand.brand_logo && editbrand.brand_logo.original) {
          setLogoImage(editbrand.brand_logo.original);
        }
      }
    });
  }, []);

  const updateBrand = () => {
    console.log("brand", brand);
    props.brandUpdateAction(brand);
  };

  const handleChange = e => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const metaChange = e => {
    //brand.meta[e.target.name] = e.target.value;
    setBrand({
      ...brand,
      meta: { ...brand.meta, [e.target.name]: e.target.value }
    });
  };

  const fileChange = e => {
    setLogoImage(null);
    setLogoImage(URL.createObjectURL(e.target.files[0]));
    setBrand({ ...brand, [e.target.name]: e.target.files[0] });
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
                    name="updated_brand_logo"
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
                        alt="Brand Logo"
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
                    name="title"
                    variant="outlined"
                    value={brand.meta.title}
                    className={clsx(classes.width100)}
                    onChange={metaChange}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    id="meta-keyword"
                    label="Meta Keyword"
                    name="keywords"
                    variant="outlined"
                    value={brand.meta.keywords}
                    className={clsx(classes.width100)}
                    onChange={metaChange}
                  />
                </Grid>

                <Grid item md={12}>
                  <TextField
                    id="meta-description"
                    label="Meta-description"
                    name="description"
                    variant="outlined"
                    value={brand.meta.description}
                    className={clsx(classes.marginBottom, classes.width100)}
                    onChange={metaChange}
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

const mapStateToProps = state => {
  return { brands: state.brands };
};

const mapDispatchToProps = {
  brandUpdateAction
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBrand);
