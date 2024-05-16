import React, { useState, useEffect } from "react";
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import viewStyles from "../../viewStyles";
import { get } from "lodash";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { Draggable } from "react-drag-reorder";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import { appearanceMobileUpdateAction } from "../../../store/action/settingAction";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { categoriesAction } from "../../../store/action";
import Alerts from "../../components/Alert";
import { ALERT_SUCCESS } from "../../../store/reducers/alertReducer";
import Loading from "../../components/Loading.js";
import { bucketBaseURL, getBaseUrl } from "../../../utils/helper";
import NoImagePlaceHolder from "../../../assets/images/NoImagePlaceHolder.png";
import AddIcon from "@mui/icons-material/Add";
import ReorderIcon from "@mui/icons-material/Reorder";

const MobileAppSetting = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const [reOrderMobileList, setReOrderMobileList] = useState();
  const [sectionData, setSectionData] = useState([]);
  const [dragComponents, setDragComponents] = useState();
  const category = useSelector((state) => state.products);
  const settingState = useSelector((state) => state.settings);
  const [loading, setloading] = useState(false);
  const [slider, setSlider] = useState({});
  const [settingMobile, setSettingMobile] = useState({
    ...settingState.settings.appearance.mobile,
  });

  useEffect(() => {
    setSectionData(
      get(settingState, "settings.appearance.mobile.mobile_section", [])
    );
    setSlider(get(settingState, "settings.appearance.mobile.slider", []));
  }, [get(settingState, "settings.appearance.mobile")]);

  useEffect(() => {
    setloading(get(settingState, "loading"));
  }, [get(settingState, "loading")]);

  useEffect(() => {
    const mobileSettings = get(settingState, "settings.appearance.mobile", {});
    setSettingMobile({ ...mobileSettings });
    const sliderImages = get(
      settingState,
      "settings.appearance.mobile.slider",
      []
    );
    var newSliderArr = sliderImages?.map((sliderItem) => ({
      image: getBaseUrl(settingState) + get(sliderItem, "image", ""),
    }));
    setSlider(newSliderArr);
  }, [get(settingState, "settings.appearance.mobile.slider")]);

  const addSlide = () => {
    setSettingMobile({
      ...settingMobile,
      slider: [
        ...settingMobile?.slider,
        {
          image: "",
          link: "",
          open_in_tab: false,
        },
      ],
    });
    setSlider([
      ...slider,
      {
        image: "",
        link: "",
        open_in_tab: false,
      },
    ]);
  };

  const removeSlide = (i) => {
    settingMobile?.slider.splice(i, 1);
    slider?.splice(i, 1);
    setSettingMobile({
      ...settingMobile,
      slider: [...get(settingMobile, "slider", [])],
    });
    setSlider([...slider]);
  };

  const handleChange = (e, i) => {
    const updatedSlider = settingMobile.slider.map((sliderItem, index) => {
      if (index === i) {
        if (e.target.name === "link") {
          return { ...sliderItem, link: e.target.value };
        } else if (e.target.name === "open_in_tab") {
          return { ...sliderItem, open_in_tab: e.target.checked };
        }
      }
      return sliderItem;
    });
    setSettingMobile((prevState) => ({
      ...prevState,
      slider: updatedSlider,
    }));
  };

  const fileChange = (e, i) => {
    const files = get(e, "target.files");
    if (files?.length > 0) {
      const updatedSlider = [...get(settingMobile, "slider", [])];
      updatedSlider[i] = {
        ...updatedSlider[i],
        image: URL.createObjectURL(files[0]),
        update_image: files,
      };

      setSettingMobile((prevState) => ({
        ...prevState,
        slider: updatedSlider,
      }));
    }
  };

  useEffect(() => {
    if (!category?.categories?.length) {
      dispatch(categoriesAction());
    }
    setSettingMobile({
      ...get(settingState, "settings.appearance.mobile", []),
    });
  }, []);

  const updateMobileApp = () => {
    const cleanedSlider = get(settingMobile, "slider", [])?.map(
      ({ __typename, ...rest }) => rest
    );
    const cleanedMobileSection = sectionData?.map(
      ({ __typename, ...rest }) => rest
    );
    const data = {
      ...settingMobile,
      slider: cleanedSlider,
      mobile_section: cleanedMobileSection,
    };

    const hasCategoryError = sectionData?.some(
      (select) =>
        !select?.category &&
        select?.label === "Product from Specific Category"
    );

    if (hasCategoryError) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: "Category is required",
          error: true,
        },
      });
    } else {
      dispatch(appearanceMobileUpdateAction(data));
    }
  };

  const reArrange = () => {
    reOrderMobileList
      ? setReOrderMobileList(false)
      : setReOrderMobileList(true);
  };

  const onSavechange = () => {
    dragComponents ? setReOrderMobileList(true) : setReOrderMobileList(false);
  };

  const onCheckBoxChange = (name, value, index) => {
    let data = sectionData;
    data[index].visible = !data[index].visible;
    setSectionData([...data]);
  };

  const handleChangeCategory = (event, index) => {
    let data = sectionData;
    data[index].category = event.target.value;
    setSectionData([...data]);
  };
  const handleTypeChange = (event, index) => {
    let data = sectionData;
    data[index].display_type = event.target.value;
    setSectionData([...data]);
  };

  const isCategoryUsed = (cat) => {
    return sectionData?.find((data) => (data?.category == cat ? true : false));
  };

  const addCategory = () => {
    setSectionData([
      ...sectionData,
      {
        url: "product_from_specific_categories",
        label: "Product from Specific Category",
        visible: false,
        section_img: "",
        category: null,
      },
    ]);
  };

  const removeCategory = (i) => {
    sectionData.splice(i, 1);
    setSectionData([...sectionData]);
  };

  const handleImageChange = (event, index) => {
    const files = get(event, "target.files", []);
    let data = sectionData;
    if (files.length > 0) {
      data[index].section_img = URL.createObjectURL(event.target.files[0]);
      data[index].update_image = event.target.files;
    }

    setSectionData([...data]);
  };

  const getChangedPosition = (currentPos, newPos) => {
    const reorderedItem = sectionData[currentPos];
    const updatedSectionData = [...sectionData]; // Create a copy of sectionData
  
    // Swap the items at currentPos and newPos
    const temp = updatedSectionData[currentPos];
    updatedSectionData[currentPos] = updatedSectionData[newPos];
    updatedSectionData[newPos] = temp;
  
    setSectionData(updatedSectionData); // Update state with the new array
  };
  

  const imageOnError = (event) => {
    event.target.src = NoImagePlaceHolder;
  };
  return (
    <>
      <Alerts />
      {loading ? <Loading /> : null}

      {/* ============SLIDER============ */}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div" className={classes.marginBottom2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Slider
                </Typography>
                <Grid container spacing={2}>
                  {get(settingMobile, "slider", [])?.map((slide, index) => (
                    <Grid item md={4} sm={6} xs={12} key={index}>
                      <Box className={classes.sliderImageWrapper}>
                        <Tooltip title="Remove Slide" aria-label="remove-slide">
                          <IconButton
                            aria-label="remove-slide"
                            onClick={(e) => removeSlide(index)}
                            size="small"
                            className={clsx(
                              classes.deleteicon,
                              classes.slideRemove
                            )}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                        <Box className={classes.sliderImagePreviewWrapper}>
                          {slide?.image && (
                            <img
                              src={slider[index] && slider[index].image}
                              className={classes.sliderImagePreview}
                              alt="Featured"
                              onError={imageOnError}
                            />
                          )}

                          <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: "none" }}
                            id={`slide-${index}`}
                            name={`slide-${index}`}
                            type="file"
                            onChange={(e) => fileChange(e, index)}
                          />

                          <label
                            htmlFor={`slide-${index}`}
                            className={classes.feautedImage}
                          >
                            {slide.image ? "Change Slider" : "Add Slide Image"}
                          </label>
                        </Box>

                        <Box className={classes.slidesInfo}>
                          <TextField
                            label="Slide Link"
                            variant="outlined"
                            name="link"
                            className={clsx(classes.width100)}
                            value={slide.link}
                            onChange={(e) => handleChange(e, index)}
                            size="small"
                          />

                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={slide.open_in_tab}
                                onChange={(e) => handleChange(e, index)}
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
            </Grid>
            <Grid item xs={12} mt={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={addSlide}
                size="small"
              >
                + Add Slide
              </Button>
            </Grid>
          </Box>
          {/* ===========Add section for Website===========  */}

          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5" className={classes.paddingBottom1}>
              Add Section in Mobile App
            </Typography>

            {reOrderMobileList ? (
              <div>
                <Draggable onPosChange={getChangedPosition}>
                  {sectionData?.map((select, index) => {
                    let cat = category?.categories.filter(
                      (cat) => cat?.id == select?.category
                    );
                    return (
                      <table>
                        <tbody>
                          <tr style={{ lineHeight: "35px", fontSize: "14px" }}>
                            {select?.label} -{" "}
                            {!cat?.length ? "" : get(cat, "[0].name")}
                          </tr>
                        </tbody>
                      </table>
                    );
                  })}
                </Draggable>

                <Button
                  color="primary"
                  variant="contained"
                  onClick={onSavechange}
                  style={{ padding: "5px", marginTop: "25px" }}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="faq-table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox" />
                        <TableCell>Image</TableCell>
                        <TableCell colSpan={2}>Section</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sectionData && sectionData?.length > 0
                        ? sectionData?.map((select, index) => (
                            <TableRow>
                              <TableCell padding="checkbox">
                                {
                                  <FormControlLabel
                                    control={
                                      <>
                                        <Checkbox
                                          color="success"
                                          checked={select?.visible || false}
                                          onChange={(e) => {
                                            onCheckBoxChange(
                                              select.name,
                                              e.target.checked,
                                              index
                                            );
                                          }}
                                        />
                                      </>
                                    }
                                    // label={select.label}
                                  />
                                }
                              </TableCell>
                              <TableCell>
                                <label htmlFor={`htmltag${index}`}>
                                  {select?.section_img ? (
                                    <Box className={classes.logoImageBox}>
                                      <img
                                        className="mobileImage"
                                        alt="section"
                                        src={
                                          get(
                                            select,
                                            "section_img",
                                            ""
                                          )?.startsWith("blob")
                                            ? get(select, "section_img", "")
                                            : getBaseUrl(settingState) +
                                              get(select, "section_img", "")
                                        }
                                        onError={imageOnError}
                                      />
                                    </Box>
                                  ) : (
                                    <>
                                      <h6>
                                        <AddPhotoAlternateIcon
                                          color="action"
                                          style={{ marginTop: "8px" }}
                                        />
                                      </h6>
                                    </>
                                  )}
                                </label>

                                <input
                                  key={index}
                                  type="file"
                                  accept="image/*"
                                  id={`htmltag${index}`}
                                  style={{ display: "none" }}
                                  onChange={(e) => handleImageChange(e, index)}
                                />
                              </TableCell>
                              <TableCell>
                                {select?.label && (
                                  <Typography>{select?.label}</Typography>
                                )}
                              </TableCell>
                              <TableCell>
                                {select.label ===
                                "Product from Specific Category" ? (
                                  <>
                                    <Box sx={{ minWidth: 120 }}>
                                      <FormControl fullWidth size="small">
                                        <Select
                                          value={get(select, "category")}
                                          onChange={(e) =>
                                            handleChangeCategory(e, index)
                                          }
                                          displayEmpty
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
                                          disabled={!select.visible}
                                        >
                                          {get(category, "categories", [])?.map(
                                            (cat) => {
                                              return (
                                                <MenuItem
                                                  value={cat?.id}
                                                  disabled={isCategoryUsed(
                                                    cat?.id
                                                  )}
                                                >
                                                  {cat?.name}
                                                </MenuItem>
                                              );
                                            }
                                          )}
                                        </Select>
                                      </FormControl>
                                    </Box>
                                  </>
                                ) : null}
                              </TableCell>
                              <TableCell>
                                <Box sx={{ minWidth: 120 }}>
                                  <FormControl fullWidth size="small">
                                    <Select
                                      displayEmpty
                                      value={get(select, "display_type")}
                                      onChange={(e) =>
                                        handleTypeChange(e, index)
                                      }
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                    >
                                      <MenuItem value="SLIDER">Slider</MenuItem>
                                      <MenuItem value="GRID">Grid</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                {select.label ===
                                "Product from Specific Category" ? (
                                  <Stack
                                    justifyContent="center"
                                    direction="row"
                                    spacing={1}
                                  >
                                    <IconButton
                                      color="error"
                                      aria-label="delete"
                                      onClick={(e) => removeCategory(index)}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </Stack>
                                ) : null}
                              </TableCell>
                            </TableRow>
                          ))
                        : "No data found"}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid item xs={12}>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    style={{ marginTop: "25px", minWidth: "30px" }}
                    onClick={addCategory}
                  >
                    <AddIcon />
                  </Button>

                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    style={{
                      marginLeft: "20px",
                      marginTop: "25px",
                      minWidth: "40px",
                    }}
                    onClick={reArrange}
                  >
                    <ReorderIcon />
                  </Button>

                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    style={{ marginLeft: "20px", marginTop: "25px" }}
                    onClick={updateMobileApp}
                  >
                    Save Change
                  </Button>
                </Grid>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default function MobileSettings() {
  return (
    <ThemeProvider theme={theme}>
      <MobileAppSetting />
    </ThemeProvider>
  );
}
