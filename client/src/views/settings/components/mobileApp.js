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
  Icon,
} from "@mui/material";
import clsx from "clsx";
import viewStyles from "../../viewStyles";
import { useDispatch, useSelector } from "react-redux";
import { bucketBaseURL } from "../../../utils/helper";
import CloseIcon from '@mui/icons-material/Close';
import { Draggable } from "react-drag-reorder";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "../../../theme";
import { appearanceMobileUpdateAction } from "../../../store/action/settingAction";
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const MobileAppSetting = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const [reOrderMobileList, setReOrderMobileList] = useState();
  const [sectionData, setSectionData] = useState([]);
  const [dragComponents, setDragComponents] = useState();
  const settingState = useSelector((state) => state.settings);
  console.log("mobile section settings state===", settingState.settings.appearance.mobile)
  const [settingMobile, setSettingMobile] = useState({
    ...settingState.settings.appearance.mobile,
  });

  // doubt
  useEffect(() => {
    if(settingState.settings.appearance.mobile && settingState.settings.appearance.mobile.mobile_section && settingState.settings.appearance.mobile.mobile_section.length > 0){
      setSectionData(settingState.settings.appearance.mobile.mobile_section)
    }
  }, [settingState.settings.appearance.mobile])


    useEffect(() => {
        setSettingMobile({
        ...settingState.settings.appearance.mobile,
     });
  }, [])

  const updateMobileApp = () => {
    for (let i in settingMobile.mobile_section) {
      delete settingMobile.mobile_section[i].__typename;
    }
    dispatch(appearanceMobileUpdateAction(settingMobile));
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
    console.log(data, "dataaaa")
    setSectionData([...data]);
  };

  // const [sectionData, setSectionData] = useState([
  //   {
  //     id: 1,
  //     name: "feature_product",
  //     label: "Featured product",
  //     visible: false,
  //     sectionImg: {
  //       preview: "",
  //       raw: ""
  //     },
  //   },

  //   {
  //     id: 2,
  //     name: "recently_added_products",
  //     label: "Recently Added Products",
  //     visible: false,
  //     sectionImg: {
  //       preview: "",
  //       raw: ""
  //     },
  //   },

  //   {
  //     id: 3,
  //     name: "most_viewed_products",
  //     label: "Most Viewed Products",
  //     visible: false,
  //     sectionImg: {
  //       preview: "",
  //       raw: ""
  //     },
  //   },

  //   {
  //     id: 4,
  //     name: "recently_bought_products",
  //     label: "Recently Bought Products",
  //     visible: false,
  //     sectionImg: {
  //       preview: "",
  //       raw: ""
  //     },
  //   },

  //   {
  //     id: 5,
  //     name: "product_recommendation",
  //     label: "Product Recommendation (Based on Your Browsing History)",
  //     visible: false,
  //     sectionImg: {
  //       preview: "",
  //       raw: ""
  //     },
  //   },

  //   {
  //     id: 6,
  //     name: "products_on_sales",
  //     label: "Products on Sales",
  //     visible: false,
  //     sectionImg: {
  //       preview: "",
  //       raw: ""
  //     },
  //   },

  //   {
  //     id: 7,
  //     name: "product_from_specific_categories",
  //     label: "Product from Specific Categories",
  //     visible: false,
  //     sectionImg: {
  //       prview: "",
  //       raw: ""
  //     },
  //     category: null
  //   }
  // ]);

  const handleChangeCategory = (event, index) => {
    let data = sectionData;
    data[index].category = event.target.value
    console.log(data)
    setSectionData([...data]);
  };

  const addCategory = () => {
    setSectionData([
      ...sectionData,
      {
        id: 8,
        name: "product_from_specific_categories",
        label: "Product from Specific Categories",
        visible: false,
        sectionImg: {
          preview: "",
          raw: ""
        },
        category: null
      }
    ]
    )
  }

  const removeCategory = (i) => {
    console.log(i, "iiiiiiiiiii");
    sectionData.splice(i, 1);
    setSectionData([...sectionData]);
  }

  const handleImageChange = (event, index) => {
    let data = sectionData;
    data[index].sectionImg = {
      preview: URL.createObjectURL(event.target.files[0]),
      raw: event.target.files[0]
    }
    setSectionData([...data]);
    console.log(index, "iiii")
  };

  const getChangedPosition = (currentPos, newPos) => {
    const reorderedItem = sectionData[currentPos];
    sectionData[currentPos] = sectionData[newPos];
    sectionData[newPos] = reorderedItem
    setSectionData(...reorderedItem)
  };


  return (
    <>
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
                    return (
                      <table>
                        <tbody>
                          <tr style={{ lineHeight: "35px", fontSize: "14px" }}>
                            {select.label}  - {select.category}
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
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={select.category}
                                  label="Category"
                                  onChange={(e) => handleChangeCategory(e, index)}
                                  style={{ paddingTop: "-20px" }}
                                  disabled={!select.visible}
                                >
                                  <MenuItem value="men">Men</MenuItem>
                                  <MenuItem value="women">Women</MenuItem>
                                  <MenuItem value="girl">Girl</MenuItem>
                                  <MenuItem value="boy">Boy</MenuItem>
                                  <MenuItem value="newborn">Newborn</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>

                              <Stack direction="row" spacing={1}>
                                <IconButton color="success" aria-label="add" onClick={addCategory}>
                                  <AddIcon />
                                </IconButton>
                              </Stack>

                              <Stack direction="row" spacing={1}>
                                <IconButton color="error" aria-label="delete" onClick={(e) => removeCategory(index)}>
                                  <CloseIcon />
                                </IconButton>
                              </Stack>
                            </>

                            : null}

                          {/* <label htmlFor={`htmltag${index}`}>
                            {select.sectionImg.thumbnail ? (
                              <img src={select.sectionImg.thumbnail} alt="dummy" width="50" height="50" />
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
                          /> */}

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
