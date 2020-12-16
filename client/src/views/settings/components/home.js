import React, { Fragment, useState, useEffect } from "react";
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
  Icon,
} from "@material-ui/core";
import clsx from "clsx";
import viewStyles from "../../viewStyles";
import { appearanceHomeUpdateAction } from "../../../store/action";
import {useDispatch, useSelector} from 'react-redux';

const HomeSettings = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [settingHome, setsettingHome] = useState({
    ...settingState.settings.appearance.home,
  });

  useEffect(() => {
    setsettingHome({
      ...settingState.settings.appearance.home,
    });
  }, [settingState.settings.appearance.home]);

  const addSlide = () => {
    setsettingHome({
      ...settingHome,
      slider: [
        ...settingHome.slider,
        {
          image: {},
          link: "",
          open_in_tab: false,
        },
      ],
    });
  };

  const removeSlide = (i) => {
    settingHome.slider.splice(i, 1);
    setsettingHome({
      ...settingHome,
      slider: [...settingHome.slider],
    });
  };

  const handleChange = (e, i) => {
    if (e.target.name === "link") {
      settingHome.slider[i].link = e.target.value;
    } else {
      settingHome.slider[i].open_in_tab = e.target.checked;
    }

    setsettingHome({
      ...settingHome,
      slider: [...settingHome.slider],
    });
  };

  const fileChange = (e, i) => {
    settingHome.slider[i].image.original = URL.createObjectURL(
      e.target.files[0]
    );
    settingHome.slider[i].update_image = e.target.files;
    setsettingHome({
      ...settingHome,
      slider: [...settingHome.slider],
    });
  };

  const updateHome = () => {
    for (let i in settingHome.slider) {
      delete settingHome.slider[i].__typename;
    }
    delete settingHome.add_section_in_home.__typename;
    dispatch(appearanceHomeUpdateAction(settingHome));
  };

  const checkBoxOnChange = (name, value) => {
    setsettingHome({
      ...settingHome,
      add_section_in_home: {
        ...settingHome.add_section_in_home,
        [name]: value,
      },
    })
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component='div' className={classes.marginBottom3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <Typography variant='h5' className={classes.paddingBottom1}>
                  Slider
                </Typography>
                <Grid container spacing={2}>
                  {settingHome.slider.map((slide, index) => (
                    <Grid item md={4} sm={6} xs={12} key={index}>
                      <Box className={classes.sliderImageWrapper}>
                        <Tooltip title='Remove Slide' aria-label='remove-slide'>
                          <IconButton
                            aria-label='remove-slide'
                            onClick={(e) => removeSlide(index)}
                            size='small'
                            className={clsx(
                              classes.deleteicon,
                              classes.slideRemove
                            )}
                          >
                            <Icon>clear</Icon>
                          </IconButton>
                        </Tooltip>
                        <Box className={classes.sliderImagePreviewWrapper}>
                          {slide.image.original && (
                            <img
                              src={slide.image.original}
                              className={classes.sliderImagePreview}
                              alt='Featured'
                            />
                          )}
                          <input
                            accept='image/*'
                            className={classes.input}
                            style={{ display: "none" }}
                            id={`slide-${index}`}
                            name={`slide-${index}`}
                            type='file'
                            onChange={(e) => fileChange(e, index)}
                          />
                          <label
                            htmlFor={`slide-${index}`}
                            className={classes.feautedImage}
                          >
                            {slide.image.original
                              ? "Change Slider"
                              : "Add Slide Image"}
                          </label>
                        </Box>
                        <Box className={classes.slidesInfo}>
                          <TextField
                            label='Slide Link'
                            variant='outlined'
                            name='link'
                            className={clsx(classes.width100)}
                            value={slide.link}
                            onChange={(e) => handleChange(e, index)}
                            size='small'
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                color='primary'
                                checked={slide.open_in_tab}
                                onChange={(e) => handleChange(e, index)}
                              />
                            }
                            label='Open in New Tab'
                          />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={addSlide}
                  size='small'
                >
                  + Add Slide
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box component='div' className={classes.marginBottom2}>
            <Typography variant='h5' className={classes.paddingBottom1}>
              Add Section in Home Page
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={settingHome.add_section_in_home.feature_product}
                    onChange={(e) => checkBoxOnChange('feature_product', e.target.checked)}
                  />
                }
                label='Featured product'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={
                      settingHome.add_section_in_home.recently_added_products
                    }
                    onChange={(e) => checkBoxOnChange('recently_added_products', e.target.checked)}
                  />
                }
                label='Recently Added Products'
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={
                      settingHome.add_section_in_home.most_viewed_products
                    }
                    onChange={(e) => checkBoxOnChange('most_viewed_products', e.target.checked)}
                  />
                }
                label='Most Viewed Products'
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={
                      settingHome.add_section_in_home.recently_bought_products
                    }
                    onChange={(e) => checkBoxOnChange('recently_bought_products', e.target.checked)}
                  />
                }
                label='Recently Bought Products'
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={
                      settingHome.add_section_in_home.product_recommendation
                    }
                    onChange={(e) => checkBoxOnChange('product_recommendation', e.target.checked)}
                  />
                }
                label='Product Recommendation (Based on Your Browsing History)'
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={settingHome.add_section_in_home.products_on_sales}
                    onChange={(e) => checkBoxOnChange('products_on_sales', e.target.checked)}
                  />
                }
                label='Products on Sales'
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={
                      settingHome.add_section_in_home
                        .product_from_specific_categories
                    }
                    onChange={(e) => checkBoxOnChange('product_from_specific_categories', e.target.checked)}
                  />
                }
                label='Product from Specific Categories'
              />
            </FormGroup>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            size='small'
            color='primary'
            variant='contained'
            onClick={updateHome}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default HomeSettings;
