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
} from "@material-ui/core";
import ReactSelect from "react-select";
import { useSelector, useDispatch } from "react-redux";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";
import { isEmpty, allPossibleCases } from "../../../utils/helper";
import { CardBlocks } from "../../components";
import { attributesAction } from "../../../store/action/";
import viewStyles from "../../viewStyles";

const Attributes = ({ product, productStateChange, onCombinationUpdate, EditMode }) => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const inputLabel = useRef(null);
  const attributeState = useSelector((state) => state.product_attributes);
  const [labelWidth, setLabelWidth] = useState(0);
  const [currentVariants, setcurrentVariants] = useState({
    combinations: [],
    allValues: {},
  });
  const [currentAttribute, setcurrentAttribute] = useState({
    id: "",
    attribute_list: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onCombinationUpdate(currentVariants.combinations);
  }, [currentVariants.combinations]);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
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

    if(EditMode && product && attributeState.attributes.length){
      let attrWithValue = {};
      for (const attr of product.attribute) {
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

      currentVariants.combinations = product.variation_master;

      setcurrentAttribute({
        ...currentAttribute,
      });

      setcurrentVariants({
        ...currentVariants,
      });
    }

  }, [attributeState.attributes]);

  const changeSelectedValue = (e, i) => {
    currentAttribute.attribute_list[i].selected_values = e;
    setcurrentAttribute({
      ...currentAttribute,
    });

    createVariants();
  };

  const deleteAttribute = (i) => {
    currentAttribute.attribute_list.splice(i, 1);
    setcurrentAttribute({
      ...currentAttribute,
    });

    createVariants();
  };

  const addAttribute = () => {
    if (!currentAttribute.id) {
      alert("invalid");
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
      isVariant: false,
      selected_values: [],
      values: values,
    };

    currentAttribute.attribute_list.push(attribute_list);
    currentAttribute.id = "";
    setcurrentAttribute({
      ...currentAttribute,
    });
  };

  const saveAttribute = () => {
    setLoading(true);
    product.attribute = [];
    product.variant = [];
    currentAttribute.attribute_list.forEach((attr, index) => {
      if (attr.selected_values.length) {
        attr.selected_values.forEach((val) => {
          product.attribute.push({
            attribute_id: attr.id,
            attribute_value_id: val.value,
          });
        });

        if (attr.isVariant) {
          product.variant.push(attr.id);
        }
      }
    });

    productStateChange({
      ...product,
    });

    createVariants();
  };

  const createVariants = () => {
    let variants = {};
    for (const i of product.variant) {
      variants[i] = [];
    }

    for (let attr of product.attribute) {
      if (variants.hasOwnProperty(attr.attribute_id)) {
        variants[attr.attribute_id].push(attr.attribute_value_id);
      }
    }

    if (!Object.keys(variants).length) {
      setLoading(false);
      return;
    }

    variants = Object.values(variants);
    let combinations = allPossibleCases(variants);

    let countMatch = [];
    let generatedVariants = [];

    combinations.forEach((comb, i) => {
      countMatch = [];
      currentVariants.combinations.forEach((prevComb, j) => {
        countMatch[j] = 0;
        prevComb.combination.forEach((v) => {
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

      if (max) {
        generatedVariants.push({
          combination: comb,
          sku: currentVariants.combinations[index].sku,
          quantity: currentVariants.combinations[index].quantity,
          price: currentVariants.combinations[index].price,
          image: currentVariants.combinations[index].image,
        });

        currentVariants.combinations.splice(index, 1);
      } else {
        generatedVariants.push({
          combination: comb,
          sku: "",
          quantity: "",
          price: "",
          image: {},
        });
      }
    });

    currentVariants.combinations = generatedVariants;
    setcurrentVariants({
      ...currentVariants,
    });

    setLoading(false);
  };

  const variantChange = (e, index) => {
    console.log(currentVariants);
    if (e.target.name === "image") {
      currentVariants.combinations[index][e.target.name].file = e.target.files;
      currentVariants.combinations[index][
        e.target.name
      ].view = URL.createObjectURL(e.target.files[0]);
    } else {
      currentVariants.combinations[index][e.target.name] = e.target.value;
    }
    setcurrentVariants({
      ...currentVariants,
    });
  };

  const variantDelete = (i) => {
    currentVariants.combinations.splice(i, 1);
    setcurrentVariants({
      ...currentVariants,
    });
  };

  return (
    <>
      {loading ? (
        <Box component='div' display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={1} alignItems='center'>
            <Grid item>
              <FormControl style={{ width: 250 }} variant='outlined'>
                <InputLabel ref={inputLabel} id='attribute-name'>
                  Select Attribute
                </InputLabel>
                <Select
                  labelWidth={labelWidth}
                  labelId='attribute-name'
                  value={currentAttribute.id}
                  onChange={(e) =>
                    setcurrentAttribute({
                      ...currentAttribute,
                      id: e.target.value,
                    })
                  }
                >
                  {attributeState.attributes.map((attr, index) => {
                    return (
                      <MenuItem
                        disabled={currentAttribute.attribute_list.some(
                          (i) => i.id === attr.id
                        )}
                        value={attr.id}
                        key={index}
                      >
                        {attr.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                color='primary'
                variant='contained'
                onClick={addAttribute}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          {currentAttribute.attribute_list.length > 0 ? (
            <>
              <CardBlocks title='Attributes'>
                <TableContainer>
                  <Table
                    stickyHeader
                    aria-label='attributes-table'
                    size='small'
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Values</TableCell>
                        <TableCell>Variation</TableCell>
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
                                  console.log("e", e);
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
                              <Checkbox
                                color='primary'
                                checked={attribute.isVariant}
                                onChange={(e) => {
                                  attribute.isVariant = e.target.checked;
                                  setcurrentAttribute({
                                    ...currentAttribute,
                                  });
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Tooltip title='Delete' aria-label='delete'>
                                <IconButton
                                  aria-label='Delete'
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
                  color='primary'
                  variant='contained'
                  onClick={saveAttribute}
                >
                  Save Attribute
                </Button>
              </Box>
            </>
          ) : (
            ""
          )}
          {currentVariants.combinations.length ? (
            <Box component='span' m={1}>
              <CardBlocks title='Variants'>
                <TableContainer>
                  <Table stickyHeader aria-label='variant-table' size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Variant</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.container}>
                      {currentVariants.combinations.map((variant, index) => (
                        <TableRow hover key={index}>
                          <TableCell>
                            {variant.combination
                              .map((val) => currentVariants.allValues[val])
                              .join(" / ")}
                          </TableCell>
                          <TableCell>
                            <TextField
                              label='Price'
                              variant='outlined'
                              name='price'
                              fullWidth
                              type='number'
                              value={variant.price}
                              onChange={(e) => variantChange(e, index)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              label='Quantity'
                              variant='outlined'
                              fullWidth
                              type='number'
                              name='quantity'
                              value={variant.quantity}
                              onChange={(e) => variantChange(e, index)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              label='SKU'
                              variant='outlined'
                              fullWidth
                              name='sku'
                              value={variant.sku}
                              onChange={(e) => variantChange(e, index)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Box m={1}>
                              {!isEmpty(variant.image) ? (
                                <img
                                  src={
                                    variant.image.view ||
                                    variant.image.thumbnail
                                  }
                                  className={classes.variantImage}
                                  alt='variant'
                                />
                              ) : (
                                ""
                              )}
                            </Box>

                            <input
                              accept='image/*'
                              className={classes.input}
                              style={{ display: "none" }}
                              id={`variant-image-${index}`}
                              name='image'
                              type='file'
                              onChange={(e) => variantChange(e, index)}
                            />
                            <label
                              htmlFor={`variant-image-${index}`}
                              className={classes.feautedImage}
                            >
                              <ImageIcon />
                              {"Set Image"}
                            </label>
                          </TableCell>
                          <TableCell>
                            <Tooltip title='Delete' aria-label='delete'>
                              <IconButton
                                aria-label='Delete'
                                className={classes.deleteicon}
                                onClick={() => variantDelete(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
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

export default Attributes;
