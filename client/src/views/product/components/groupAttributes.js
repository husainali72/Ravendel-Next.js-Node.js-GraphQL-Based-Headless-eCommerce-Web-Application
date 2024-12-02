import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Tooltip,
  Checkbox,
  IconButton,
  Divider,
  Box,
  MenuItem,
  TextField,
  CircularProgress,
} from "@mui/material";
import ReactSelect from "react-select";
import { useSelector, useDispatch } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  isEmpty,
  allPossibleCases,
  bucketBaseURL,
  baseUrl,
  imageOnError,
  getBaseUrl,
} from "../../../utils/helper";
import { CardBlocks } from "../../components";
import { attributesAction, productsAction } from "../../../store/action";
import viewStyles from "../../viewStyles";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/index.js";
import { ALERT_SUCCESS } from "../../../store/reducers/alertReducer";
import { availbleProductsAction } from "../../../store/action/productAction.js";
import { get } from "lodash";
import CustomAutocomplete from "../../components/autoComplete.js";
const AttributesComponent = ({
  product,
  productStateChange,
  onCombinationUpdate,
  EditMode,
  setting,
  groupId,
}) => {
  const classes = viewStyles();

  const dispatch = useDispatch();
  const inputLabel = useRef(null);
  const attributeState = useSelector((state) => state.productAttributes);
  const { availableProduct: products } = useSelector(
    (state) => state.groupProducts
  );
  const [labelWidth, setLabelWidth] = useState(0);
  const [currentVariants, setcurrentVariants] = useState({
    combinations: [],
    allValues: {},
  });
  const [currentAttribute, setCurrentAttribute] = useState({
    id: "",
    attribute_list: [],
  });

  const [loading, setLoading] = useState(false);
  const [variantImage, setVariantImage] = useState(null);

  useEffect(() => {
    onCombinationUpdate(currentVariants.combinations);
  }, [currentVariants.combinations]);

  useEffect(() => {
    dispatch(availbleProductsAction({ groupId: groupId }));
  }, []);

  useEffect(() => {
    // setLabelWidth(inputLabel.current.offsetWidth);
    if (!isEmpty(attributeState)) {
      dispatch(attributesAction());
    }
  }, []);

  useEffect(() => {
    for (let i of attributeState.attributes) {
      for (let j of i.values) {
        currentVariants.allValues[j._id] = j.name;
      }
    }
    if (product && attributeState.attributes.length) {
      let attrWithValue = {};
      for (const attr of product.attributes) {
        if (!Array.isArray(attrWithValue[attr.attribute_id])) {
          attrWithValue[attr.attribute_id] = [];
        }

        attrWithValue[attr.attribute_id].push(attr.attribute_value_id);
      }
      currentAttribute.attribute_list = [];
      for (let i in attrWithValue) {
        let values = [];
        let selected_values = [];

        for (let attr of attributeState.attributes) {
          if (i === attr.id) {
            for (let j of attr.values) {
              if (~attrWithValue[i].indexOf(j._id)) {
                selected_values.push({ value: j._id, label: j.name });
              }
              values.push({ value: j._id, label: j.name });
            }

            currentAttribute.attribute_list.push({
              id: attr.id,
              name: attr.name,
              isVariant: ~product.variant.indexOf(attr.id),
              selected_values: selected_values,
              values: values,
            });

            break;
          }
        }
      }
      let selected_variants = [];
      let allAttributes = [];

      for (const [key, attribute] of attributeState.attributes.entries()) {
        for (const value of attribute.values) {
          product.variation_master?.forEach((variation_master) => {
            if (
              variation_master?.combinations.includes(value._id) &&
              !selected_variants.some(
                (selected) => selected.id === variation_master.id
              )
            ) {
              selected_variants.push(variation_master);
            }
          });
        }
      }
      currentVariants.combinations = selected_variants;

      setCurrentAttribute({
        ...currentAttribute,
      });

      setcurrentVariants({
        ...currentVariants,
      });
      if (product?.variations) {
        setcurrentVariants({
          ...currentVariants,
          combinations: product?.variations,
        });
      }
    }
  }, [
    attributeState.attributes,
    product.variation_master,
    // product?.attributes,
    product?.variations,
  ]);
  const changeSelectedValue = (e, i) => {
    currentAttribute.attribute_list[i].selected_values = e;
    setCurrentAttribute({
      ...currentAttribute,
    });

    createVariants();
  };

  const deleteAttribute = (i) => {
    currentAttribute.attribute_list.splice(i, 1);
    setCurrentAttribute({
      ...currentAttribute,
    });
    saveAttribute();
  };
  const addAttribute = () => {
    if (!currentAttribute.id) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: "Please Select The Correct Attribute",
          error: true,
        },
      });
      return;
    }

    let values = [];
    let name = "";
    for (let i of attributeState.attributes) {
      if (i.id === currentAttribute.id) {
        name = i.name;
        for (let j of i.values) {
          values.push({ value: j._id, label: j.name });
        }
        break;
      }
    }

    let attribute_list = {
      id: currentAttribute.id,
      name: name,
      isVariant: true,
      selected_values: [],
      values: values,
    };

    currentAttribute.attribute_list.push(attribute_list);
    currentAttribute.id = "";
    setCurrentAttribute({
      ...currentAttribute,
    });
  };
  const saveAttribute = () => {
    // setLoading(true);
    product.attribute = [];
    product.variant = [];
    let isValidattribute = false;
    if (
      currentAttribute.attribute_list &&
      currentAttribute.attribute_list.length > 0
    ) {
      currentAttribute.attribute_list.forEach((attr, index) => {
        if (attr.selected_values.length > 0) {
          attr.selected_values.forEach((val) => {
            product.attribute.push({
              attribute_id: attr.id,
              attribute_value_id: val.value,
            });
            product.attributes.push({
              attribute_id: attr.id,
              attribute_value_id: val.value,
            });
          });

          // if (attr.isVariant) {
          product.variant.push(attr.id);
          // }
          isValidattribute = true;
        } else {
          isValidattribute = false;
          dispatch({
            type: ALERT_SUCCESS,
            payload: {
              boolean: false,
              message: "Attribute value is required",
              error: true,
            },
          });
        }
      });
    } else {
      isValidattribute = true;
      product.attributes = [];
    }
    if (isValidattribute) {
      productStateChange({
        ...product,
      });

      createVariants();
    } else {
      setLoading(false);
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: "Attribute value is required",
          error: true,
        },
      });
    }
  };
  const createVariants = () => {
    let variants = {};
    for (const i of product.variant) {
      variants[i] = [];
    }
    if (product && product?.attribute && product?.attribute.length >= 0) {
      for (let attr of product.attribute) {
        if (variants.hasOwnProperty(attr.attribute_id)) {
          variants[attr.attribute_id].push(attr.attribute_value_id);
        }
      }
    } 

    if (!Object.keys(variants).length) {
      setcurrentVariants({
        ...currentVariants,
        combinations: [], // Clear combinations
      });
      setLoading(false);
      return ;
    } 

    variants = Object.values(variants);
    let combinations = allPossibleCases(variants);
    let countMatch = [];
    let generatedVariants = [];
    combinations.forEach((comb, i) => {
      countMatch = [];
      currentVariants.combinations?.forEach((prevComb, j) => {
        countMatch[j] = 0;
        prevComb.combinations.forEach((v) => {
          if (~comb.indexOf(v)) {
            countMatch[j] = countMatch[j] + 1;
          }
        });
      });

      var max = 0;
      var index = 0;
      countMatch.forEach((val, key) => {
        if (val > max) {
          max = countMatch[key];
          index = key;
        }
      });

      if (max && index >= 0) {
        generatedVariants.push({
          combinations: comb,
          productID: currentVariants?.combinations[index]?.productID,
          productUrl: currentVariants?.combinations[index]?.productUrl,
          // sku: currentVariants.combinations[index].sku,
          // quantity: currentVariants.combinations[index].quantity,
          // pricing: {
          //   price: currentVariants.combinations[index].pricing.price,
          //   sellprice: currentVariants.combinations[index].pricing.sellprice,
          // },
          // image: currentVariants.combinations[index].image || ""
        });

        currentVariants.combinations.splice(index, 1);
      } else {
        generatedVariants.push({
          combinations: comb,
          productID: "",
          productUrl: "",
          sku: "",
          quantity: 0,
          pricing: {
            price: 0,
            sellprice: 0,
          },
          image: "",
        });
      }
    });
    currentVariants.combinations = generatedVariants;
    setcurrentVariants({
      ...currentVariants,
    });
    setLoading(false);
  };

  const variantChange = (newValue, index) => {
    let productUrl = products?.find(
      (singleProduct) => singleProduct?._id === newValue?._id
    )?.url;
    currentVariants.combinations[index]["productUrl"] = productUrl;
    currentVariants.combinations[index]["productID"] = newValue?._id;
    setcurrentVariants({
      ...currentVariants,
    });
    onCombinationUpdate(currentVariants.combinations);
  };

  const variantDelete = (i) => {
    currentVariants.combinations.splice(i, 1);
    setcurrentVariants({
      ...currentVariants,
    });
  };
  const handleAttributeChange = (event, newValue) => {
    if (newValue) {
      setCurrentAttribute({
        ...currentAttribute,
        id: newValue.id,
      });
    }
  };
  return (
    <>
      {loading ? (
        <Box component="div" display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <FormControl style={{ width: 250 }} variant="outlined">
                <CustomAutocomplete
                  id="attribute-name"
                  name="attribute"
                  label="Select Attribute"
                  options={get(attributeState, "attributes", [])}
                  value={
                    attributeState?.attributes?.find(
                      (attr) => attr?.id === currentAttribute?.id
                    ) || null
                  }
                  onChange={handleAttributeChange}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionDisabled={(option) =>
                    get(currentAttribute, "attribute_list", [])?.some(
                      (i) => i?.id === option?.id
                    )
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={addAttribute}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          {currentAttribute.attribute_list.length > 0 ? (
            <>
              <CardBlocks title="Attributes">
                <TableContainer>
                  <Table
                    stickyHeader
                    aria-label="attributes-table"
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Values</TableCell>
                        {/* <TableCell>Variation</TableCell> */}
                        <TableCell>Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.container}>
                      {currentAttribute.attribute_list.map(
                        (attribute, index) => (
                          <TableRow key={attribute.id} hover>
                            <TableCell>{attribute.name}</TableCell>
                            <TableCell>
                              <ReactSelect
                                isMulti
                                value={attribute.selected_values}
                                options={attribute.values}
                                onChange={(e) => {
                                  changeSelectedValue(e, index);
                                }}
                                styles={{
                                  menu: (provided) => ({
                                    ...provided,
                                    zIndex: 9999,
                                  }),
                                }}
                                menuPortalTarget={document.querySelector(
                                  "body"
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <Tooltip title="Delete" aria-label="delete">
                                <IconButton
                                  aria-label="Delete"
                                  className={classes.deleteicon}
                                  onClick={(e) => deleteAttribute(index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardBlocks>
              <Divider />
              <Box mt={1}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={saveAttribute}
                >
                  Save Attribute
                </Button>
              </Box>
            </>
          ) : (
            ""
          )}
          {currentVariants.combinations &&
          currentVariants.combinations.length ? (
            <Box component="span" m={1}>
              <CardBlocks title="Variants">
                <TableContainer >
                  <Table stickyHeader aria-label="variant-table" size="small">
                    <TableHead >
                      <TableRow>
                        <TableCell  sx={{zIndex:1}}>Variant</TableCell>
                        <TableCell sx={{zIndex:1}}>Product</TableCell>
                        {/* <TableCell>Remove</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.container}>
                      {currentVariants.combinations.map((variant, index) => (
                        <TableRow hover key={index}>
                          <TableCell>
                            {variant.combinations
                              .map((val) => currentVariants.allValues[val])
                              .join(" / ")}
                          </TableCell>
                          <TableCell>
                            <FormControl
                              style={{ width: 250 }}
                              variant="outlined"
                            >
                              {products?.length > 0 ? (
                                <CustomAutocomplete
                                  id="productID"
                                  name="productID"
                                  label="Select Product"
                                  options={products || []}
                                  value={products?.find(
                                    (singleProduct) =>
                                      variant.productID === singleProduct._id
                                  )}
                                  onChange={(e, newValue) =>
                                    variantChange(newValue, index)
                                  }
                                  getOptionLabel={(option) => option.name}
                                  isOptionEqualToValue={(option, value) =>
                                    option?._id === value?._id
                                  }
                                  getOptionDisabled={(option) =>
                                    currentVariants.combinations.some(
                                      (variant) =>
                                        variant.productID === option._id
                                    )
                                  }
                                />
                              ) : (
                                <>No Product</>
                              )}
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardBlocks>
            </Box>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

const GroupAttributes = ({
  product,
  productStateChange,
  onCombinationUpdate,
  EditMode,
  setting,
  groupId,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <AttributesComponent
        product={product}
        productStateChange={productStateChange}
        onCombinationUpdate={onCombinationUpdate}
        EditMode={EditMode}
        setting={setting}
        groupId={groupId}
      />
    </ThemeProvider>
  );
};
export default GroupAttributes;
