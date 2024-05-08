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
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import clsx from "clsx";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import { bucketBaseURL, getBaseUrl } from "../../../utils/helper";
import CloseIcon from "@mui/icons-material/Close";
import { get } from "lodash";
import { Draggable } from "react-drag-reorder";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "../../../theme";
import { appearanceHomeUpdateAction } from "../../../store/action";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { categoriesAction } from "../../../store/action";
import Alerts from "../../components/Alert";
import { Loading } from "../../components";
import { ALERT_SUCCESS } from "../../../store/reducers/alertReducer";
import AddIcon from "@mui/icons-material/Add";
import ReorderIcon from "@mui/icons-material/Reorder";
import NoImagePlaceHolder from "../../../assets/images/NoImagePlaceHolder.png";
const HomeSettingsTheme = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const [reOrderList, setReOrderList] = useState();
  const [dragItem, updateDragItem] = useState();
  const category = useSelector((state) => state.products);
  const settingState = useSelector((state) => state.settings);
  const [sectionData, setSectionData] = useState([]);
  const [slider, setSlider] = useState({});
  const [settingHome, setsettingHome] = useState({
    ...get(settingState, "settings.appearance.home"),
  });

  useEffect(() => {
    setSectionData(
      get(settingState, "settings.appearance.home.add_section_web", [])
    );
    setSlider(get(settingState, "settings.appearance.home.slider", []));
  }, [get(settingState, "settings.appearance.home")]);

  useEffect(() => {
    if (!category.categories.length) {
      dispatch(categoriesAction());
    }
  }, []);

  useEffect(() => {
    const home = get(settingState, "settings.appearance.home", {});
    setsettingHome({ ...home });
    const newSliderArr = get(home, "slider", [])?.map((sliderItem) => ({
      image: getBaseUrl(settingState) + sliderItem?.image,
    }));
    if(newSliderArr&&newSliderArr?.length>=0){
    setSlider([...newSliderArr]);}else{
      setSlider([])
    }
  }, [get(settingState, "settings.appearance.home.slider")]);

  const addSlide = () => {
    setsettingHome({
      ...settingHome,
      slider: [
        ...settingHome.slider,
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
    settingHome.slider.splice(i, 1);
    slider.splice(i, 1);
    setsettingHome({
      ...settingHome,
      slider: [...settingHome.slider],
    });
    setSlider([...slider]);
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
    const files = get(e, "target.files");
    if (files && files.length > 0) {
      settingHome.slider[i] = {
        ...settingHome.slider[i],
        image: URL.createObjectURL(e.target.files[0]),
        update_image: e.target.files,
      };
      slider[i] = {
        ...slider[i],
        image: URL.createObjectURL(e.target.files[0]),
        update_image: e.target.files,
      };

      setsettingHome({
        ...settingHome,
        slider: [...settingHome.slider],
      });
    }
  };

  const updateHome = () => {
    for (let i in settingHome.slider) {
      delete settingHome.slider[i].__typename;
    }
    for (let i in settingHome.add_section_web) {
      delete settingHome.add_section_web[i].__typename;
    }
    delete settingHome.add_section_in_home.__typename;
    let data = settingHome;
    data.add_section_web = sectionData;
    let error = false;
    sectionData.map((select) => {
      if (
        select.category == null &&
        select.label === "Product from Specific Category"
      ) {
        error = true;
      }
    });
    if (error) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: "Category is required",
          error: true,
        },
      });
    } else {
      dispatch(appearanceHomeUpdateAction(data));
    }
  };

  const reOrder = () => {
    reOrderList ? setReOrderList(false) : setReOrderList(true);
  };

  const onSave = () => {
    dragItem ? setReOrderList(true) : setReOrderList(false);
  };
  const isCategoryUsed = (cat) => {
    return sectionData.find((data) => (data?.category == cat ? true : false));
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
  const handleTypeChange = (event, index) => {
    let data = sectionData;
    if (data && data?.length > 0 && data[index])
      data[index].display_type = event.target.value;
    setSectionData([...data]);
  };
  const handleChangeCategories = (event, index, val) => {
    let data = sectionData;
    data[index].category = event.target.value;
    setSectionData([...data]);
  };

  const addCategory = () => {
    setSectionData([
      ...sectionData,
      {
        label: "Product from Specific Category",
        visible: false,
        category: null,
      },
    ]);
  };

  const onCheckBoxChange = (name, value, index) => {
    let data = sectionData;
    data[index].visible = !data[index].visible
    setSectionData([...data]);
  };
  const removeCategory = (i) => {
    sectionData.splice(i, 1);
    setSectionData([...sectionData]);
  };

  const getChangedPos = (currentPos, newPos) => {
    const reorderedItem = sectionData[currentPos];
    sectionData[currentPos] = sectionData[newPos];
    sectionData[newPos] = reorderedItem;
    let list = sectionData;
    setSectionData([...list]);
  };

  const imageOnError = (event) => {
    event.target.src = NoImagePlaceHolder;
  };

  return (
    <>
      <Alerts />
      {settingState?.loading ? <Loading /> : null}

      {/* ============SLIDER============ */}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div" className={classes.marginBottom3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Slider
                </Typography>
                <Grid container spacing={2}>
                  {get(settingHome,'slider',[])?.map((slide, index) => (
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
                          {slide.image && (
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
                            {slide?.image ? "Change Slider" : "Add Slide Image"}
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
              <Grid item xs={12}>
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

          {/* ===========Add section for Website===========  */}

          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5" className={classes.paddingBottom1}>
              Add Section in Home Page
            </Typography>

            {/* =========REORDER==========  */}

            {reOrderList ? (
              <div>
                <Draggable onPosChange={getChangedPos}>
                  {sectionData?.map((select, index) => {
                    let cat = category.categories.filter(
                      (cat) => cat?.id == select?.category
                    );
                    return (
                      <table>
                        <tbody>
                          <tr style={{ lineHeight: "35px", fontSize: "14px" }}>
                            {select.label} - {!cat.length ? "" : cat[0].name}
                          </tr>
                        </tbody>
                      </table>
                    );
                  })}
                </Draggable>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={onSave}
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
                                              select?.name,
                                              e?.target?.checked,
                                              index
                                            );
                                          }}
                                        />
                                      </>
                                    }
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
                                          value={get(select,'category')}
                                          onChange={(e) =>
                                            handleChangeCategories(e, index)
                                          }
                                          displayEmpty
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
                                          disabled={!select.visible}
                                        >
                                          {get(category,'categories',[])?.map((cat) => {
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
                                          })}
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
                    onClick={reOrder}
                  >
                    <ReorderIcon />
                  </Button>

                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    style={{ marginLeft: "20px", marginTop: "25px" }}
                    onClick={updateHome}
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

export default function HomeSettings() {
  return (
    <ThemeProvider theme={theme}>
      <HomeSettingsTheme />
    </ThemeProvider>
  );
}
