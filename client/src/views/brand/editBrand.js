import React, { useState, useEffect } from "react";
import { Grid, TextField, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import viewStyles from "../viewStyles.js";
import clsx from "clsx";
import { brandUpdateAction } from "../../store/action/";
import { useDispatch, useSelector } from "react-redux";
import { Loading, TopBar, Alert, TextInput, CardBlocks } from "../components";
import { client_app_route_url, bucketBaseURL } from "../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
const EditBrandComponenet = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = viewStyles();
  const dispatch = useDispatch();
  const Brands = useSelector((state) => state.brands);
  const [logoImage, setLogoImage] = useState(null);
  const [brand, setBrand] = useState({
    name: "",
    url: "",
    brand_logo: "",
    meta: {
      title: "",
      description: "",
      keywords: "",
    },
  });

  useEffect(() => {
    Brands.brands.map((editbrand) => {
      if (editbrand.id === "63402d07469a96c8a3cb7238") {
        setBrand({ ...brand, ...editbrand });
        if (editbrand.brand_logo && editbrand.brand_logo.original) {
          setLogoImage(bucketBaseURL + editbrand.brand_logo.original);
        }
      }
    });
  }, []);

  const updateBrand = () => {
    dispatch(brandUpdateAction(brand));
  };

  const handleChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const metaChange = (e) => {
    setBrand({
      ...brand,
      meta: { ...brand.meta, [e.target.name]: e.target.value },
    });
  };

  const fileChange = (e) => {
    setLogoImage(null);
    setLogoImage(URL.createObjectURL(e.target.files[0]));
    setBrand({ ...brand, [e.target.name]: e.target.files[0] });
  };

  return (
    <>
      {Brands.loading && <Loading />}
      <Alert />
      <TopBar
        title="Edit Brands"
        onSubmit={updateBrand}
        submitTitle="Update"
        backLink={`${client_app_route_url}all-brands`}
      />
      <Grid
        container
        spacing={isSmall ? 2 : 4}
        className={classes.secondmainrow}
      >
        <Grid item md={6} sm={12} xs={12}>
          <CardBlocks title="Brand Details" nomargin>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextInput
                  value={brand.name}
                  label="Brand Name"
                  name="name"
                  onInputChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  value={brand.url}
                  label="Url"
                  name="url"
                  onInputChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
          </CardBlocks>
        </Grid>

        <Grid item md={6} sm={12} xs={12}>
          <CardBlocks title="Meta Information" nomargin>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextInput
                  value={brand.meta.title}
                  label="Meta Title"
                  name="title"
                  onInputChange={metaChange}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextInput
                  value={brand.meta.keywords}
                  label="Meta Keyword"
                  name="keywords"
                  onInputChange={metaChange}
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
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
          </CardBlocks>
        </Grid>
      </Grid>
    </>
  );
};

export default function EditBrand() {
  return (
    <ThemeProvider theme={theme}>
      <EditBrandComponenet />
    </ThemeProvider>
  );
}
