import React, { useState, useEffect } from "react";
import { Grid, TextField, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import viewStyles from "../viewStyles.js";
import clsx from "clsx";
import { brandUpdateAction, brandsAction } from "../../store/action/";
import { useDispatch, useSelector } from "react-redux";
import { Loading, TopBar, Alert, TextInput, CardBlocks } from "../components";
import {
  client_app_route_url,
  bucketBaseURL,
  isEmpty,
} from "../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { get } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
const EditBrandComponenet = ({ params }) => {
  const ID = params.id || "";
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = viewStyles();
  const dispatch = useDispatch();
  const Brands = useSelector((state) => state.brands);
  const [logoImage, setLogoImage] = useState(null);
  const [loading, setloading] = useState(false);
  const [brand, setBrand] = useState({
    id: "",
    _id: "",
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
    if (!isEmpty(get(Brands, "brands"))) {
      if (Brands.brands && Brands.brands.length > 0) {
        if (Array.isArray(Brands.brands)) {
          Brands.brands.map((editbrand) => {
            if (editbrand.id === ID) {
              brand.id = editbrand.id;
              setBrand({ ...brand, ...editbrand });
              if (editbrand.brand_logo ) {
                setLogoImage(bucketBaseURL + editbrand.brand_logo);
              }
            }
          });
        }
      }
    }
  }, [get(Brands, "brands")]);

  useEffect(() => {
    setloading(get(Brands, "loading"));
  }, [get(Brands, "loading")]);

  useEffect(() => {
    if (isEmpty(get(Brands, "brands"))) {
      dispatch(brandsAction());
    }
  }, []);
  const updateBrand = () => {
    var errors = validate(["name", 'url'], brand);

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
    else {
      dispatch(brandUpdateAction(brand, navigate));
    }


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

  const toInputLowercase = e => {
    e.target.value = ("" + e.target.value).toLowerCase();
  };

  return (
    <>
      {loading && <Loading />}
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
                  onInput={toInputLowercase}
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
  const params = useParams();
  return (
    <ThemeProvider theme={theme}>
      <EditBrandComponenet params={params} />
    </ThemeProvider>
  );
}
