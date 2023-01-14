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
import { get } from "lodash";
import { Draggable } from "react-drag-reorder";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRef } from "react";
import theme from "../../../theme";
import { select } from "react-cookies";
import { appearanceHomeUpdateAction } from "../../../store/action";
import { set } from "mongoose";
import { SETTING_SUCCESS } from "../../../store/action/settingAction";
// import { application } from "express";
const HomeSettingsTheme = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const [reOrderList, setReOrderList] = useState();
 
  const [dragItem, updateDragItem] = useState();

  const settingState = useSelector((state) => state.settings);
  const [settingHome, setsettingHome] = useState({
    ...settingState.settings.appearance.home,
  });
  // const [sectionData, setSectionData] = useState([]);
  const [slider, setSlider] = useState({
    ...settingState.settings.appearance.home.slider,
  });


  console.log('settingState', settingState)

  // doubt
  useEffect(() => {
    if(settingState.settings.appearance.home && settingState.settings.appearance.home.add_section_web && settingState.settings.appearance.home.add_section_web.length > 0){
      setSectionData(settingState.settings.appearance.home.add_section_web)
    }
  }, [settingState.settings.appearance.home])


  useEffect(() => {
    setsettingHome({
      ...settingState.settings.appearance.home,
      // get (settingState, "settings.appearance.home")
      // get (settingState, "settings.appearance.home.slider")

    });

    var newSliderArr = [];
    for (
      let i = 0;
      i < settingState.settings.appearance.home.slider.length;
      i++
    ) {
      let newImge =
        bucketBaseURL +
        settingState.settings.appearance.home.slider[i].image.original;
      newSliderArr.push({ image: { original: newImge } });
    }
    setSlider(newSliderArr) 
    console.log('settingHome===========>',settingHome)
    console.log("settingState", settingState)
  },
    [settingState.settings.appearance.home.slider]
    // [settingState.settings]
  )

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
    setSlider([
      ...slider,
      {
        image: {},
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
    settingHome.slider[i].image.original = URL.createObjectURL(
      e.target.files[0]
    );
    slider[i].image.original = URL.createObjectURL(e.target.files[0]);

    settingHome.slider[i].update_image = e.target.files;
    slider[i].update_image = e.target.files;

    setsettingHome({
      ...settingHome,
      slider: [...settingHome.slider],
    });
  };

  const updateHome = () => {

    for (let i in settingHome.slider) {
      delete settingHome.slider[i].__typename;
    } 
   
    // delete settingHome.add_section_in_home.__typename;
   delete settingHome.add_section_web.__typename;
   
   dispatch(appearanceHomeUpdateAction(settingHome));
  };


  // const updateHome = () => {
  //   // setSectionData(settingState.settings.appearance.home.add_section_web)
  //   let item = sectionData
  //   console.log(item, "setSectionData")
  //   // dispatch(appearanceHomeUpdateAction(sectionData))
  //   // dispatch({
  //   //   type: SETTING_SUCCESS,
  //   //   payload: sectionData
  //   // })
  //   // fetch("sectionData", {
  //   //   method: "PUT",
  //   //   headers: {
  //   //     "Accept":" application/json",
  //   //     "Content-type": "application/json"
  //   //   },
  //   //   body:JSON.stringify(item)
  //   // }).then((result) => {
  //   //   result.json().then((resp) => {
  //   //     console.log(resp)
  //   //     setSectionData()
  //   //   })
  //   // })
  // }



  const reOrder = () => {
    reOrderList ? setReOrderList(false) : setReOrderList(true)
  }

 
  const onSave = () => {
    dragItem ? setReOrderList(true) : setReOrderList(false)
  }

 

  const checkBoxOnChange = (name, value) => {
    setsettingHome({
      ...settingHome,
      // add_section_in_home: {
        // ...settingHome.add_section_in_home,
        add_section_web: {
          ...settingHome.add_section_web,
        [name]: value,
      },
    });
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



  // const handleDrop = (droppedItem) => {
  //   if (!droppedItem.destination) return;
  // var updatedList = [...settingSection];
  // const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
  // updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
  // setSettingSection(updatedList);
  // setReOrderList(true);
  // };

  const getChangedPos = (currentPos, newPos) => {
    console.log(currentPos, newPos);
    const reorderedItem = sectionData[currentPos];
    sectionData[currentPos]=sectionData[newPos];
    sectionData[newPos] = reorderedItem
    let list = sectionData;
    // console.log(reorderedItem)
    // list.splice(newPos, 0, reorderedItem);
    // console.log(list)
    setSectionData([...list])
    // updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // setSettingSection(updatedList);
    // setReOrderList(true);

  };


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div" className={classes.marginBottom3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" className={classes.paddingBottom1}>
                  Slider
                </Typography>
                <Grid container spacing={2}>
                  {settingHome.slider.map((slide, index) => (
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
                          // className= {classes.deleteicon}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                        <Box className={classes.sliderImagePreviewWrapper}>
                          {slide.image.original && (
                            <img
                              src={slider[index].image.original}
                              className={classes.sliderImagePreview}
                              alt="Featured"
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
                            {slide.image.original
                              ? "Change Slider"
                              : "Add Slide Image"}
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

{/* Add section for Website  */}

          <Box component="div" className={classes.marginBottom2}>
            <Typography variant="h5" className={classes.paddingBottom1}>
              Add Section in Home Page
            </Typography>



            {reOrderList ?

              <div>
                <Draggable onPosChange={getChangedPos}>
                  {sectionData.map((select, index) => {
                    return (
                      <table>
                        <tr style={{ lineHeight: "35px", fontSize: "14px" }}
                        >
                          {select.label}
                        </tr>
                      </table>
                    );
                  })}
                </Draggable>
                <Button
              
                  color='primary'
                  variant='contained'
                  onClick={onSave}
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
                          // checked={settingHome.add_section_in_home[select.name]}
                          checked={settingHome.add_section_web[select.name]}
                          onChange={(e) => checkBoxOnChange(select.name, e.target.checked)}
                        />
                      }
                      label={select.label}
                    />

                  )}

                </FormGroup>
                <Grid item xs={12}>
                  <Button
                    size='small'
                    color='primary'
                    variant='contained'
                    style={{ marginTop: "25px" }}
                    onClick={reOrder}
                  >
                    Re-order
                  </Button>
                  <Button
                    size='small'
                    color='primary'
                    variant='contained'
                    style={{ marginLeft: "20px", marginTop: "25px" }}
                    onClick={updateHome}
                  >
                    Save Change
                  </Button>
                </Grid>
              </div>
            }
          </Box>


        
        </Grid>
        {/* <Grid item xs={12}>
        <Button
            size='small'
            color='primary'
            variant='contained'
            onClick={reOrder}
          >
            Re-order
          </Button>
          <Button
            size='small'
            color='primary'
            variant='contained'
            style={{marginLeft: "20px"}}
            onClick={updateHome}
          >
            Save Change
          </Button>
          </Grid> */}
      </Grid>
    </>
  );
};

// export default HomeSettings;

// import React, { Fragment, useState, useEffect } from "react";
// import {
//   Grid,
//   TextField,
//   Box,
//   Typography,
//   Button,
//   FormControlLabel,
//   Checkbox,
//   FormGroup,
//   Tooltip,
//   IconButton,
//   Icon,
// } from"@material-ui/core";
// import clsx from "clsx";
// import viewStyles from "../../viewStyles";
// import { appearanceHomeUpdateAction } from "../../../store/action";
// import { useDispatch, useSelector } from 'react-redux';
// import { bucketBaseURL } from "../../../utils/helper";

// const HomeSettings = () => {
//   const classes = viewStyles();
//   const dispatch = useDispatch();
//   const settingState = useSelector((state) => state.settings);
//   const [settingHome, setsettingHome] = useState({
//     ...settingState.settings.appearance.home,
//   });

//   // console.log("setting--", settingHome)

//   useEffect(() => {
//     // setsettingHome({
//     //   ...settingState.settings.appearance.home,
//     // });
//     for (let i in settingState.settings.appearance.home.slider) {
//       let newImge = bucketBaseURL + settingState.settings.appearance.home.slider[i].image.original
//       console.log("slid---", newImge)
//       setsettingHome({
//         ...settingHome,
//         slider: [...settingHome.slider, {
//           image: {
//             original: bucketBaseURL + settingState.settings.appearance.home.slider[i].image.original
//           }
//         }]
//       })
//     }
//   }, [settingState.settings.appearance.home]);

//   const addSlide = () => {
//     setsettingHome({
//       ...settingHome,
//       slider: [
//         ...settingHome.slider,
//         {
//           image: {},
//           link: "",
//           open_in_tab: false,
//         },
//       ],
//     });
//   };

//   const removeSlide = (i) => {
//     settingHome.slider.splice(i, 1);
//     setsettingHome({
//       ...settingHome,
//       slider: [...settingHome.slider],
//     });
//   };

//   const handleChange = (e, i) => {
//     if (e.target.name === "link") {
//       settingHome.slider[i].link = e.target.value;
//     } else {
//       settingHome.slider[i].open_in_tab = e.target.checked;
//     }

//     setsettingHome({
//       ...settingHome,
//       slider: [...settingHome.slider],
//     });
//   };

//   const fileChange = (e, i) => {
//     settingHome.slider[i].image.original = URL.createObjectURL(
//       e.target.files[0]
//     );
//     settingHome.slider[i].update_image = e.target.files;
//     setsettingHome({
//       ...settingHome,
//       slider: [...settingHome.slider],
//     });
//   };

//   const updateHome = () => {
//     for (let i in settingHome.slider) {
//       delete settingHome.slider[i].__typename;
//     }
//     delete settingHome.add_section_in_home.__typename;
//     dispatch(appearanceHomeUpdateAction(settingHome));
//   };

//   const checkBoxOnChange = (name, value) => {
//     setsettingHome({
//       ...settingHome,
//       add_section_in_home: {
//         ...settingHome.add_section_in_home,
//         [name]: value,
//       },
//     })
//   };

//   return (
//     <Fragment>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Box component='div' className={classes.marginBottom3}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Typography variant='h5' className={classes.paddingBottom1}>
//                   Slider
//                 </Typography>
//                 <Grid container spacing={2}>
//                   {settingHome.slider.map((slide, index) => (

//                     <Grid item md={4} sm={6} xs={12} key={index}>
//                       <Box className={classes.sliderImageWrapper}>
//                         <Tooltip title='Remove Slide' aria-label='remove-slide'>
//                           <IconButton
//                             aria-label='remove-slide'
//                             onClick={(e) => removeSlide(index)}
//                             size='small'
//                             className={clsx(
//                               classes.deleteicon,
//                               classes.slideRemove
//                             )}
//                           >
//                             <Icon>clear</Icon>
//                           </IconButton>
//                         </Tooltip>
//                         <Box className={classes.sliderImagePreviewWrapper}>
//                           {slide.image.original && (
//                             <img
//                               src={slide.image.original}
//                               className={classes.sliderImagePreview}
//                               alt='Featured'
//                             />
//                           )}
//                           <input
//                             accept='image/*'
//                             className={classes.input}
//                             style={{ display: "none" }}
//                             id={`slide-${index}`}
//                             name={`slide-${index}`}
//                             type='file'
//                             onChange={(e) => fileChange(e, index)}
//                           />
//                           <label
//                             htmlFor={`slide-${index}`}
//                             className={classes.feautedImage}
//                           >
//                             {slide.image.original
//                               ? "Change Slider-"
//                               : "Add Slide Image"}
//                           </label>
//                         </Box>
//                         <Box className={classes.slidesInfo}>
//                           <TextField
//                             label='Slide Link'
//                             variant='outlined'
//                             name='link'
//                             className={clsx(classes.width100)}
//                             value={slide.link}
//                             onChange={(e) => handleChange(e, index)}
//                             size='small'
//                           />
//                           <FormControlLabel
//                             control={
//                               <Checkbox
//                                 color='primary'
//                                 checked={slide.open_in_tab}
//                                 onChange={(e) => handleChange(e, index)}
//                               />
//                             }
//                             label='Open in New Tab'
//                           />
//                         </Box>
//                       </Box>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Grid>
//               <Grid item xs={12}>
//                 <Button
//                   color='primary'
//                   variant='contained'
//                   onClick={addSlide}
//                   size='small'
//                 >
//                   + Add Slide
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>

//           <Box component='div' className={classes.marginBottom2}>
//             <Typography variant='h5' className={classes.paddingBottom1}>
//               Add Section in Home Page
//             </Typography>
//             <FormGroup>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     color='primary'
//                     checked={settingHome.add_section_in_home.feature_product}
//                     onChange={(e) => checkBoxOnChange('feature_product', e.target.checked)}
//                   />
//                 }
//                 label='Featured product'
//               />
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     color='primary'
//                     checked={
//                       settingHome.add_section_in_home.recently_added_products
//                     }
//                     onChange={(e) => checkBoxOnChange('recently_added_products', e.target.checked)}
//                   />
//                 }
//                 label='Recently Added Products'
//               />

//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     color='primary'
//                     checked={
//                       settingHome.add_section_in_home.most_viewed_products
//                     }
//                     onChange={(e) => checkBoxOnChange('most_viewed_products', e.target.checked)}
//                   />
//                 }
//                 label='Most Viewed Products'
//               />

//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     color='primary'
//                     checked={
//                       settingHome.add_section_in_home.recently_bought_products
//                     }
//                     onChange={(e) => checkBoxOnChange('recently_bought_products', e.target.checked)}
//                   />
//                 }
//                 label='Recently Bought Products'
//               />

//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     color='primary'
//                     checked={
//                       settingHome.add_section_in_home.product_recommendation
//                     }
//                     onChange={(e) => checkBoxOnChange('product_recommendation', e.target.checked)}
//                   />
//                 }
//                 label='Product Recommendation (Based on Your Browsing History)'
//               />

//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     color='primary'
//                     checked={settingHome.add_section_in_home.products_on_sales}
//                     onChange={(e) => checkBoxOnChange('products_on_sales', e.target.checked)}
//                   />
//                 }
//                 label='Products on Sales'
//               />

//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     color='primary'
//                     checked={
//                       settingHome.add_section_in_home
//                         .product_from_specific_categories
//                     }
//                     onChange={(e) => checkBoxOnChange('product_from_specific_categories', e.target.checked)}
//                   />
//                 }
//                 label='Product from Specific Categories'
//               />
//             </FormGroup>
//           </Box>
//         </Grid>
//         <Grid item xs={12}>
//           <Button
//             size='small'
//             color='primary'
//             variant='contained'
//             onClick={updateHome}
//           >
//             Save Change
//           </Button>
//         </Grid>
//       </Grid>
//     </Fragment>
//   );
// };

export default function HomeSettings() {
  return (
    <ThemeProvider theme={theme}>
      <HomeSettingsTheme />
    </ThemeProvider>
  );
}
