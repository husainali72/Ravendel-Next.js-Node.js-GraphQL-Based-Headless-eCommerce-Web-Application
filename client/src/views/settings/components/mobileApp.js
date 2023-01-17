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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
      
const MobileAppSetting = () => {
    const classes = viewStyles();
    const dispatch = useDispatch();
    
    const [reOrderMobileList, setReOrderMobileList] = useState();
   
    const [dragComponents, setDragComponents] = useState();
    const settingState = useSelector((state) => state.settings);
    const [settingMobile, setSettingMobile] = useState({
      ...settingState.settings.appearance.mobile,
    });
  
    const [category, setCategory] = useState(false);
  
  
  
    // doubt
    // useEffect(() => {
    //   if(settingState.settings.appearance.home && settingState.settings.appearance.home.add_section_web && settingState.settings.appearance.home.add_section_web.length > 0){
    //     setSectionData(settingState.settings.appearance.home.add_section_web)
    //   }
    // }, [settingState.settings.appearance.home])
  
  
  //   useEffect(() => {
  //       setSettingMobile({
  //       ...settingState.settings.appearance.mobile,
  //    });
  // })
  
    const updateMobileApp = () => {
     dispatch(appearanceMobileUpdateAction(settingMobile));
    };

    const reArrange = () => {
        reOrderMobileList ? setReOrderMobileList(false) : setReOrderMobileList(true)
    }
   
    const onSavechange = () => {
        dragComponents ? setReOrderMobileList(true) : setReOrderMobileList(false)
    }
  

    const onCheckBoxChange = (name, value) => {
        setSettingMobile({
        ...settingMobile,
        mobile_section: {
          ... settingMobile.mobile_section,
          [name]: value,
        },
      });
    };
  
    const handleChangeCategory = (event) => {
      setCategory(event.target.value);
    };
    
    const [sectionData, setSectionData] = useState([
      {
        id: 1,
        name: "feature_product",
        label: "Featured product"
      },
      {
        id: 2,
        name: "recently_added_products",
        label: "Recently Added Products"
      },
      {
        id: 3,
        name: "most_viewed_products",
        label: "Most Viewed Products"
      },
      {
        id: 4,
        name: "recently_bought_products",
        label: "Recently Bought Products"
      },
      {
        id: 5,
        name: "product_recommendation",
        label: "Product Recommendation (Based on Your Browsing History)"
      },
      {
        id: 6,
        name: "products_on_sales",
        label: "Products on Sales"
      },
      {
        id: 7,
        name: "product_from_specific_categories",
        label: "Product from Specific Categories"
      }
    ]);
  
   
    
    const [settingSection, setSettingSection] = useState(sectionData);

    
  
  
   
  
    const getChangedPosition = (currentPos, newPos) => {
      console.log(currentPos, newPos);
      const reorderedItem = sectionData[currentPos];
      sectionData[currentPos] = sectionData[newPos];
      sectionData[newPos] = reorderedItem
    // const reorderedItem = sectionData[newPos];
    // sectionData[newPos] = sectionData[currentPos];
    // sectionData[currentPos] = reorderedItem
    // console.log(reorderedItem, "reorder---")
    //   let list = sectionData;
    // [sectionData[currentPos], sectionData.length[newPos]] = [sectionData[newPos], sectionData[currentPos]]
    // [sectionData[currentPos], sectionData[sectionData.length-newPos]] = [sectionData[sectionData.length-newPos], sectionData[currentPos]]
    // const reorderedItem =   [sectionData[currentPos], sectionData[sectionData.length-newPos]];
    // [sectionData[currentPos], sectionData[sectionData.length-newPos]] = [sectionData[sectionData.length-newPos], sectionData[currentPos]];
    // [sectionData[sectionData.length-newPos], sectionData[currentPos]] = reorderedItem;
      setSectionData(...reorderedItem) 
    // setSectionData(...reorderedItem);
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
                          <tr style={{ lineHeight: "35px", fontSize: "14px" }}
                          >
                            {select.label}
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
                    {sectionData.map((select) =>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="success"
                            // checked={settingMobile.mobile_section[select.name]}
                            checked={settingMobile.mobile_section[select.name]}
                            onChange={(e) => {
                              if (select.id == 7 && e.target.checked === (true)){
                              category?  setCategory(false):setCategory(true)
                              // onCheckBoxChange(select.name, e.target.checked)
                              }else{
                                setCategory(false)
                          //  onCheckBoxChange(select.name, e.target.checked)
                          }
                          onCheckBoxChange(select.name, e.target.checked)}
                              }
                          />
                        }
                        label={select.label}
                      />
  
                    )}
                    {category?
               
                   
                    <Box sx={{ minWidth: 120 }} style = {{paddingRight: "1200px"}}>
                    <FormControl fullWidth >
                      <InputLabel id="demo-simple-select-label">Category</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={handleChangeCategory}
                        style={{paddingTop: "-20px"}}
                      >
                        <MenuItem value="men">Men</MenuItem>
                        <MenuItem value="women">Women</MenuItem>
                        <MenuItem value="children">Children</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                                : null} 
  
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
  