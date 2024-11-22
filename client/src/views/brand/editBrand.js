import React, { useState, useEffect } from "react";
import { Grid, TextField, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import viewStyles from "../viewStyles.js";
import clsx from "clsx";
import { brandUpdateAction, brandsAction } from "../../store/action/";
import { useDispatch, useSelector } from "react-redux";
import {
  Loading,
  TopBar,
  Alert,
  TextInput,
  CardBlocks,
  FeaturedImageComponent,
  URLComponent,
} from "../components";
import {
  client_app_route_url,
  bucketBaseURL,
  isEmpty,
  baseUrl,
  getBaseUrl,
} from "../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { get } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { getUpdatedUrl } from "../../utils/service.js";
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
  const setting = useSelector((state) => state.settings);
  const baseURl = getBaseUrl(setting);
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
              if (editbrand.brand_logo) {
                setLogoImage(baseURl + editbrand.brand_logo);
              }
            }
          });
        }
      }
    }
  }, [get(Brands, "brands"), baseURl]);

  useEffect(() => {
    setloading(get(Brands, "loading"));
  }, [get(Brands, "loading")]);

  useEffect(() => {
    if (isEmpty(get(Brands, "brands"))) {
      dispatch(brandsAction());
    }
  }, []);
  const updateBrand = () => {
    let errors = validate([ "url","name",], brand);
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    } else {
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
    const files = get(e, "target.files");

    setLogoImage(get(files, "[0]") ? URL.createObjectURL(files[0]) : logoImage);

    setBrand({
      ...brand,
      updated_brand_logo: get(files, "[0]", null),
    });
  };

  const isUrlExist = async (url) => {
    setBrand({
      ...brand,
      url: url,
    });
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
                  onBlur={(e) =>
                    !brand.url || e.target.value !== brand.url
                      ? isUrlExist(brand.name)
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <URLComponent
                  url={brand.url}
                  onInputChange={(updatedUrl) => {
                    setBrand({
                      ...brand,
                      url: updatedUrl,
                    });
                  }}
                  pageUrl="brand"
                  tableUrl="Brand"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Box component="span" m={1}>
                    <CardBlocks title="Brand Logo Image">
                      <FeaturedImageComponent
                        image={logoImage}
                        feautedImageChange={(e) => fileChange(e)}
                      />
                    </CardBlocks>
                  </Box>
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
