import React, { Fragment, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Tooltip,
  IconButton,
  Icon
} from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";

const HomeSettings = props => {
  const classes = viewStyles();
  const [featureImage, setfeatureImage] = useState(null);
  const [slider, setSlider] = useState([
    { slide_image: null, slide_link: "", open_newtab: false }
  ]);
  const [homePageSetting, setHomePageSetting] = useState({
    featured_product: false,
    recently_added_products: false,
    most_viewed_products: false,
    recently_bought_products: false,
    product_recommendation: false,
    products_on_sales: false,
    product_from_specific_categories: false
  });

  const addSlide = () => {
    setSlider([
      ...slider,
      { slide_image: null, slide_link: "", open_newtab: false }
    ]);
  };

  const removeCustomField = i => {
    slider.splice(i, 1);
    setSlider([...slider]);
  };

  const fileChange = (e, i) => {
    slider[i].slide_image = URL.createObjectURL(e.target.files[0]);
    setSlider([...slider]);
    console.log(slider);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box component="div" className={classes.marginBottom3}>
            <Grid container spacing={2}>
              <Grid item md={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                  {slider.map((slide, index) => (
                    <Grid item md={4} sm={12} xs={12} key={index}>
                      <Box className={classes.sliderImageWrapper}>
                        <Tooltip title="Remove Slide" aria-label="remove-slide">
                          <IconButton
                            aria-label="remove-slide"
                            onClick={e => removeCustomField(index)}
                            size="small"
                            className={clsx(
                              classes.deleteicon,
                              classes.slideRemove
                            )}
                          >
                            <Icon>clear</Icon>
                          </IconButton>
                        </Tooltip>
                        <Box className={classes.sliderImagePreviewWrapper}>
                          {slide.slide_image !== null && (
                            <img
                              src={slide.slide_image}
                              className={classes.sliderImagePreview}
                              alt="Featured"
                            />
                          )}
                          <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: "none" }}
                            id={`featured-image-${index}`}
                            name={`featured-image-${index}`}
                            type="file"
                            onChange={e => fileChange(e, index)}
                          />
                          <label
                            htmlFor={`featured-image-${index}`}
                            className={classes.feautedImage}
                          >
                            {slide.slide_image !== null
                              ? "Change Slider"
                              : "Add Slide Image"}
                          </label>
                        </Box>
                        <Box className={classes.slidesInfo}>
                          <TextField
                            label="Slide Link"
                            variant="outlined"
                            name="Slide Link"
                            className={clsx(classes.width100)}
                            value={slide.slide_link}
                            size="small"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={slide.open_newtab}
                              />
                            }
                            label="Open in New Tab"
                          />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={addSlide}
                  size="small"
                >
                  + Add Slide
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5" className={classes.paddingBottom1}>
              Add Section in Home Page
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={homePageSetting.featured_product}
                    onChange={e =>
                      setHomePageSetting({
                        ...homePageSetting,
                        featured_product: e.target.checked
                      })
                    }
                  />
                }
                label="Featured product"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={homePageSetting.recently_added_products}
                    onChange={e =>
                      setHomePageSetting({
                        ...homePageSetting,
                        recently_added_products: e.target.checked
                      })
                    }
                  />
                }
                label="Recently Added Products"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={homePageSetting.most_viewed_products}
                    onChange={e =>
                      setHomePageSetting({
                        ...homePageSetting,
                        most_viewed_products: e.target.checked
                      })
                    }
                  />
                }
                label="Most Viewed Products"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={homePageSetting.recently_bought_products}
                    onChange={e =>
                      setHomePageSetting({
                        ...homePageSetting,
                        recently_bought_products: e.target.checked
                      })
                    }
                  />
                }
                label="Recently Bought Products"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={homePageSetting.product_recommendation}
                    onChange={e =>
                      setHomePageSetting({
                        ...homePageSetting,
                        product_recommendation: e.target.checked
                      })
                    }
                  />
                }
                label="Product Recommendation (Based on Your Browsing History)"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={homePageSetting.products_on_sales}
                    onChange={e =>
                      setHomePageSetting({
                        ...homePageSetting,
                        products_on_sales: e.target.checked
                      })
                    }
                  />
                }
                label="Products on Sales"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={homePageSetting.product_from_specific_categories}
                    onChange={e =>
                      setHomePageSetting({
                        ...homePageSetting,
                        product_from_specific_categories: e.target.checked
                      })
                    }
                  />
                }
                label="Product from Specific Categories"
              />
            </FormGroup>
          </Box>
        </Grid>
        <Grid item md={12}>
          <Button size="small" color="primary" variant="contained">
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default HomeSettings;
