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
  IconButton,
} from "@mui/material";
import viewStyles from "../../viewStyles";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { Draggable } from "react-drag-reorder";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import { appearanceMobileUpdateAction } from "../../../store/action/settingAction";
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { categoriesAction } from "../../../store/action";
import Alerts from "../../components/Alert";
import { ALERT_SUCCESS } from "../../../store/reducers/alertReducer";
import Loading from "../../components/Loading.js";
import { bucketBaseURL } from "../../../utils/helper"; 

const MobileAppSetting = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const [reOrderMobileList, setReOrderMobileList] = useState();
  const [sectionData, setSectionData] = useState([]);
  const [dragComponents, setDragComponents] = useState();
  const category = useSelector((state) => state.products);
  const settingState = useSelector((state) => state.settings);
  const [settingMobile, setSettingMobile] = useState({
    ...settingState.settings.appearance.mobile,
  });

  useEffect(() => {
    if (settingState.settings.appearance.mobile && settingState.settings.appearance.mobile.mobile_section && settingState.settings.appearance.mobile.mobile_section.length > 0) {
      setSectionData(settingState.settings.appearance.mobile.mobile_section)
    }
  }, [get(settingState, "settings.appearance.mobile")])

  useEffect(() => {
    if (!category.categories.length) {
      dispatch(categoriesAction());
    }
  }, []);

  useEffect(() => {
    setSettingMobile({
      ...settingState.settings.appearance.mobile,
    });
  }, [])

  const updateMobileApp = () => {
    for (let i in settingMobile.mobile_section) {
      delete settingMobile.mobile_section[i].__typename;
    }
    delete settingMobile.mobile_section.__typename;
    let data = settingMobile;
    data.mobile_section = sectionData;

    let error = false;
    sectionData.map(select => {
      if (select.category == null && select.label === "Product from Specific Categories") {
        error = true
      }
    })
    if (error) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: { boolean: false, message: "Category is required", error: true },

      });
    }
    else {
      dispatch(appearanceMobileUpdateAction(data));
    }
  };

  const reArrange = () => {
    reOrderMobileList ? setReOrderMobileList(false) : setReOrderMobileList(true)
  }

  const onSavechange = () => {
    dragComponents ? setReOrderMobileList(true) : setReOrderMobileList(false)
  }

  const onCheckBoxChange = (name, value, index) => {
    let data = sectionData;
    data[index].visible = !data[index].visible
    setSectionData([...data]);
  };


  const handleChangeCategory = (event, index) => {
    let data = sectionData;
    data[index].category = event.target.value
    setSectionData([...data]);
  };

  const isCategoryUsed = (cat) => {
    return sectionData.find((data) => data.category == cat ? true : false)
  }

  const addCategory = () => {
    setSectionData([
      ...sectionData,
      {
        url: "product_from_specific_categories",
        label: "Product from Specific Categories",
        visible: false,
        section_img: {
          thumbnail: "",
          large: "",
          medium: "",
          original: ""
        },
        category: null
      }
    ]
    )
  }

  const removeCategory = (i) => {
    sectionData.splice(i, 1);
    setSectionData([...sectionData]);
  }

  // const handleImageChange = (event, index) => {
  //   let data = sectionData;
  //   data[index].section_img.original =  URL.createObjectURL(event.target.files[0]),
  //   data[index].section_img.update_img = event.target.files
  //   setSectionData([...data]);
  // };

  const handleImageChange = (event, index) => {
    let data = sectionData;
    data[index].section_img.original = URL.createObjectURL(event.target.files[0]);
    data[index].update_image = event.target.files
    setSectionData([...data]);
  };


  const getChangedPosition = (currentPos, newPos) => {
    const reorderedItem = sectionData[currentPos];
    sectionData[currentPos] = sectionData[newPos];
    sectionData[newPos] = reorderedItem
    setSectionData(...reorderedItem)
  };


  return (
    <>
      <Alerts />
      {settingState.loading ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div" className={classes.marginBottom2}>

            <Typography variant="h5" className={classes.paddingBottom1}>
              Add Section in Mobile App
            </Typography>

            {reOrderMobileList ?
              <div>

                <Draggable onPosChange={getChangedPosition}>
                  {sectionData.map((select, index) => {
                    let cat = category.categories.filter(cat => cat.id == select.category)
                    return (
                      <table>
                        <tbody>
                          <tr style={{ lineHeight: "35px", fontSize: "14px" }}>
                            {select.label}  - {!cat.length ? "" : cat[0].name}
                          </tr>
                        </tbody>
                      </table>
                    );
                  })}
                </Draggable>

                <Button
                  color='primary'
                  variant='contained'
                  onClick={onSavechange}
                  style={{ padding: "5px", marginTop: "25px" }}
                >
                  Save
                </Button>

              </div>

              :

              <div>

                <FormGroup>
                  {sectionData.map((select, index) => {
                    return (
                      <>
                        <div style={{ display: "flex" }}>

                          <FormControlLabel
                            control={

                              <>
                                <Checkbox
                                  color="success"
                                  checked={select.visible}
                                  onChange={(e) => { onCheckBoxChange(select.name, e.target.checked, index) }}
                                />
                              </>

                            }
                            label={select.label}
                          />

                          {select.label === "Product from Specific Categories" ?
                            <> <Box sx={{ minWidth: 120 }}>
                              <FormControl fullWidth size="small">
                                <Select
                                  value={select.category}
                                  onChange={(e) => handleChangeCategory(e, index)}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                  disabled={!select.visible}
                                >
                                  {category.categories.map(cat => {
                                    return (
                                      <MenuItem
                                        value={cat.id}
                                        disabled={isCategoryUsed(cat.id)}>
                                        {cat.name}
                                      </MenuItem>
                                    )
                                  })}

                                </Select>
                              </FormControl>
                            </Box>


                              <Stack direction="row" spacing={1}>
                                <IconButton color="error" aria-label="delete" onClick={(e) => removeCategory(index)}>
                                  <CloseIcon />
                                </IconButton>
                              </Stack>
                            </>

                            : null}

                          <label htmlFor={`htmltag${index}`}>
                            {select.section_img && select.section_img.original ? (
                              <img src={select.section_img.original.startsWith("blob") ? select.section_img.original : bucketBaseURL + select.section_img.original}
                                alt="img"
                                width="50"
                                height="50" />
                            ) : (
                              <>
                                <h6><AddPhotoAlternateIcon color="action" style={{ marginTop: "8px" }} /></h6>
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

                        </div>

                      </>

                    )
                  }
                  )}
                </FormGroup>

                <Grid item xs={12}>
                  <Button
                    size='small'
                    color='primary'
                    variant='contained'
                    style={{ marginTop: "25px" }}
                    onClick={addCategory}
                  >
                    Add Category
                  </Button>

                  <Button
                    size='small'
                    color='primary'
                    variant='contained'
                    style={{ marginLeft: "20px", marginTop: "25px" }}
                    onClick={reArrange}
                  >
                    Re-order
                  </Button>

                  <Button
                    size='small'
                    color='primary'
                    variant='contained'
                    style={{ marginLeft: "20px", marginTop: "25px" }}
                    onClick={updateMobileApp}
                  >
                    Save Change
                  </Button>


                </Grid>
              </div>
            }
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
