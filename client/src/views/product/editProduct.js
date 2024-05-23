import React, { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Button,
  TextField,
  IconButton,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Tooltip,
  Icon,
  useMediaQuery,
  ThemeProvider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesAction,
  productUpdateAction,
  brandsAction,
  productAction,
  attributesAction,
  productsAction,
} from "../../store/action/";
import { query } from "../../utils/service";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import {
  validatSpecification,
  validate,
  validatenested,
  validatenestedArray,
} from "../components/validate";
import {
  isEmpty,
  client_app_route_url,
  getBaseUrl,
  getCheckedIds,
  calculateDiscount,
} from "../../utils/helper";
import {
  Alert,
  Loading,
  StyledRadio,
  TopBar,
  TinymceEditor,
  CardBlocks,
  FeaturedImageComponent,
  TextInput,
} from "../components";
import { productAddAction } from "../../store/action/";
import {
  BrandSelection,
  EditGalleryImageSelection,
  GalleryImageSelection,
  TaxComponent,
  ShippingComponent,
  EditCategoriesComponent,
} from "./components";
import viewStyles from "../viewStyles";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../theme";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "lodash";
import NoImagePlaceHolder from "../../assets/images/NoImagePlaceHolder.png";
import { CHECK_VALID_URL, GET_PRODUCT } from "../../queries/productQuery";
import ValidUrlComponent from "../components/ValidUrlComponent";
import CustomAutocomplete from "../components/autoComplete";
let defaultobj = {
  _id: "",
  name: "",
  description: "",
  categoryId: [],
  categoryTree: [],
  brand: null,
  pricing: {
    price: "",
    sellprice: "",
    discountPercentage: "",
  },
  status: "Draft",
  meta: {
    title: "",
    description: "",
    keywords: "",
  },
  shipping: {
    height: "0",
    width: "0",
    depth: "0",
    weight: "0",
    shippingClass: "",
  },
  removed_image: [],
  taxClass: "",
  featured_product: false,
  product_type: {
    virtual: false,
    downloadable: false,
  },
  // custom_field: [],
  specifications: [
    {
      group: "",
      customFields: [{ key: null, value: null }],
    },
  ],
  // attribute: [],
  // variant: [],
  short_description: "",
  sku: "",
  quantity: "",
};

const EditProductComponent = ({ params }) => {
  const productId = params.id || "";
  const [clonedId, setClonedId] = useState("");
  const classes = viewStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const productState = useSelector((state) => state.products);
  const navigate = useNavigate();
  const brandState = useSelector((state) => state.brands);
  const [featureImage, setfeatureImage] = useState(null);
  const [loading, setloading] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [taxClass, setTaxClass] = useState("");
  const [shippingClass, setShippingClass] = useState(defaultobj.shipping);
  const [product, setProduct] = useState(defaultobj);
  const [isUrlChanged, setIsUrlChanged] = useState(false);
  const setting = useSelector((state) => state.settings);
  const { attributes } = useSelector((state) => state.productAttributes);
  const baseURl = getBaseUrl(setting);
  useEffect(() => {
    if (productId) {
      dispatch(productAction(productId));
      dispatch(brandsAction());
      dispatch(categoriesAction());
    }
    dispatch(attributesAction());
  }, []);
  useEffect(() => {
    if (
      get(productState, "products") &&
      isEmpty(get(productState, "products"))
    ) {
      dispatch(productsAction());
    }
  }, []);
  const productsOptions = useMemo(() => {
    if (get(productState, "products")) {
      return productState?.products?.map((product) => ({
        label: product?.name,
        value: product?._id,
      }));
    } else {
      return [];
    }
  }, [productState]);
  useEffect(() => {
    setloading(get(productState, "loading"));
  }, [get(productState, "loading")]);
  const getAttributeKeyObject = (attributeId) => {
    if (attributes && !!attributes?.length && attributeId) {
      return attributes?.find((attribute) => attribute?.id === attributeId);
    }
  };
  const getAttributeValueObject = (attributeId, attributeValueId) => {
    if (attributes && !!attributes?.length && attributeId && attributeValueId) {
      const selectedAttribute = attributes?.find(
        (attribute) => attribute?.id === attributeId
      );
      if (selectedAttribute?.values && selectedAttribute?.values?.length) {
        return selectedAttribute?.values?.find(
          (attributeVal) => attributeVal?._id === attributeValueId
        );
      }
    }
  };
  useEffect(() => {
    if (productId) {
      let groupedSpecifications = [];
      if (!isEmpty(get(productState, "product"))) {
        if (!isEmpty(productState.product)) {
          if (productState.product?.specifications) {
            groupedSpecifications = productState.product?.specifications.reduce(
              (acc, spec) => {
                if (!acc.some((ac) => ac?.group === spec.group)) {
                  acc.push({
                    group: spec?.group,
                    customFields: [
                      {
                        attributeId: spec?.attributeId,
                        attributeValueId: spec?.attributeValueId,
                        keyLabel: getAttributeKeyObject(spec?.attributeId)
                          ?.name,
                        valueLabel: getAttributeValueObject(
                          spec?.attributeId,
                          spec?.attributeValueId
                        )?.name,
                        key: getAttributeKeyObject(spec?.attributeId),
                        value: getAttributeValueObject(
                          spec?.attributeId,
                          spec?.attributeValueId
                        ),
                      },
                    ],
                  });
                } else {
                  const Index = acc.findIndex((ac) => ac?.group === spec.group);
                  acc[Index]?.customFields &&
                    acc[Index].customFields.push({
                      attributeId: spec.attributeId,
                      attributeValueId: spec.attributeValueId,
                      keyLabel: getAttributeKeyObject(spec?.attributeId)?.name,
                      valueLabel: getAttributeValueObject(
                        spec?.attributeId,
                        spec?.attributeValueId
                      )?.name,
                      key: getAttributeKeyObject(spec?.attributeId),
                      value: getAttributeValueObject(
                        spec?.attributeId,
                        spec?.attributeValueId
                      ),
                    });
                }
                return acc;
              },
              []
            );
          }
          let defaultBrand = {};
          setTaxClass(productState.product.taxClass);
          setShippingClass({...get(productState,'product.shipping',{})});
          if (productState.product.brand) {
            if (!isEmpty(get(brandState, "brands"))) {
              for (let i in brandState.brands) {
                if (brandState.brands[i].id === productState.product.brand.id) {
                  defaultBrand = {
                    value: brandState.brands[i].id,
                    label: brandState.brands[i].name,
                  };
                  break;
                }
              }
            }
          }
          setProduct({
            ...product,
            ...productState.product,
            specifications: groupedSpecifications,
            categoryId: get(productState, "product.categoryId", [])?.map(
              (cat) => cat.id
            ),
            categoryTree: get(productState, "product.categoryTree", []),
            brand: defaultBrand || "",
          });

          if (productState.product.feature_image) {
            setfeatureImage(baseURl + productState.product.feature_image);
          } else {
            setfeatureImage(NoImagePlaceHolder);
          }
        }
      }
    } else {
      setProduct({
        ...product,
        ...defaultobj,
        shipping: {
          ...product.shipping,
        },
      });

      setfeatureImage(null);
    }
  }, [get(productState, "product"), productId, baseURl, attributes]);
  const filterTreeData = (data) => {
    return data.reduce((acc, category) => {
      const filteredCategory = {
        id: category?.id,
        name: category.name,
        checked: category.checked,
      };
      if (category?.children && category?.children?.length > 0) {
        filteredCategory.children = category?.children;
      }

      if (category?.checked) {
        acc.push(filteredCategory);
      } else if (category?.children && category?.children?.length > 0) {
        filteredCategory.children = filterTreeData(category?.children);
        if (filteredCategory.children.length > 0) {
          acc.push(filteredCategory);
        }
      }

      return acc;
    }, []);
  };
  const addUpdateProduct = (e) => {
    // product.combinations = combination;
    product.taxClass = taxClass;
    product.shipping = shippingClass;
    let combination_error = "";
    let combination_price_error = "";
    e.preventDefault();
    let errors = validate(
      [
        "short_description",
        "quantity",
        "sku",
        "categoryId",
        "description",
        "name",
      ],
      product
    );
    let specifications = "";

    if (product.specifications && product.specifications.length > 0) {
      specifications = validatSpecification(product?.specifications);
    }
    if (product.combinations && product.combinations.length > 0) {
      combination_error = validatenested(
        "combinations",
        ["sku", "quantity"],
        product,
        "Variant"
      );
      combination_price_error = validatenestedArray(
        "pricing",
        ["price"],
        product.combinations,
        "Variant"
      );
    }

    let Errors = validatenested("pricing", ["price"], product);
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    } else if (!isEmpty(Errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: Errors,
          error: true,
        },
      });
    } else if (!isEmpty(combination_price_error)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: combination_price_error,
          error: true,
        },
      });
    } else if (!isEmpty(combination_error)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: combination_error,
          error: true,
        },
      });
    } else if (!isEmpty(specifications)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: specifications,
          error: true,
        },
      });
    } else {
      const transformedSpecifications =
        product?.specifications &&
        !!product?.specifications?.length &&
        product?.specifications.flatMap((spec) => {
          if (spec?.customFields && !!spec?.customFields?.length) {
            return spec.customFields.map((field) => ({
              attributeId: field?.attributeId,
              key: field?.keyLabel, // Assuming you have a mapping for attributeId to key
              attributeValueId: field?.attributeValueId,
              value: field?.valueLabel, // Assuming you have a mapping for attributeValueId to value
              group: spec.group,
            }));
          }
          return [];
        });
      // product.specifications = transformedSpecifications ? transformedSpecifications : product?.specifications
      let price = get(product, "pricing.price");
      let sellprice = get(product, "pricing.sellprice");
      if (price >= sellprice && sellprice <= price) {
        const filteredData = filterTreeData(get(product, "categoryTree", []));
        let singleProductPayload = {
          ...product,
          categoryTree: filteredData,
          shipping: {
            ...product.shipping,
            height: String(product.shipping?.height ?? ""),
            width: String(product.shipping?.width ?? ""),
            depth: String(product.shipping?.depth ?? ""),
            weight: String(product.shipping?.weight ?? ""),
          },
        };
        if (productId) {
          singleProductPayload.update_gallery_image = gallery;
          dispatch(
            productUpdateAction(
              {
                ...singleProductPayload,
                specifications: transformedSpecifications
                  ? transformedSpecifications
                  : singleProductPayload?.specifications,
              },
              navigate
            )
          );
        } else {
          singleProductPayload.gallery_image = gallery;
          dispatch(
            productAddAction(
              {
                ...singleProductPayload,
                specifications: transformedSpecifications
                  ? transformedSpecifications
                  : singleProductPayload?.specifications,
              },
              navigate
            )
          );
        }
      } else {
        dispatch({
          type: ALERT_SUCCESS,
          payload: {
            boolean: false,
            message: "Sale price couldn't exceed original price",
            error: true,
          },
        });
      }
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onFeatureImageChange = (e) => {
    const files = get(e, "target.files");

    if (files && files.length > 0) {
      const newFeatureImage = URL.createObjectURL(files[0]);
      setfeatureImage(newFeatureImage);

      const updatedProduct = productId
        ? { ...product, ["update_feature_image"]: files }
        : { ...product, [e.target.name]: files };

      setProduct(updatedProduct);
    } else {
      setfeatureImage(featureImage);
    }
  };
  const updateUrl = async (url, setEditPermalink) => {
    if (productId) {
      await query(CHECK_VALID_URL, { url: url, entryId: productId }).then(
        (res) => {
          if (get(res, "data.validateUrl.url")) {
            const newUrl = get(res, "data.validateUrl.url");
            setProduct({
              ...product,
              url: newUrl,
            });
            setEditPermalink((previous) => !previous);
          }
        }
      );
    } else {
      await query(CHECK_VALID_URL, { url: url }).then((res) => {
        if (get(res, "data.validateUrl.url")) {
          const newUrl = get(res, "data.validateUrl.url");
          setProduct({
            ...product,
            url: newUrl,
          });
          setEditPermalink((previous) => !previous);
        }
      });
    }
  };
  const isUrlExist = async (url) => {
    if (url && !productId) {
      updateUrlOnBlur(url);
    }
  };
  const [selectedClonedProject, setSelectedClonedProject] = useState("");

  const addCustomField = () => {
    setProduct({
      ...product,
      custom_field: [...product.custom_field, { key: null, value: null }],
    });
  };

  const removeCustomField = (i) => {
    product.custom_field.splice(i, 1);
    setProduct({
      ...product,
      custom_field: [...product.custom_field],
    });
  };

  const customChange = (e, i) => {
    if (e.target.name === "key") {
      product.custom_field[i].key = e.target.value;
    } else {
      product.custom_field[i].value = e.target.value;
    }

    setProduct({
      ...product,
      custom_field: [...product.custom_field],
    });
  };

  const onMetaChange = (e) => {
    setProduct({
      ...product,
      meta: {
        ...product?.meta,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleSpecificationKeyChange = (e, newValue, index, secIndex) => {
    // Create a copy of the product state
    const updatedProduct = { ...product };

    // Update the selected value in the specifications array
    updatedProduct.specifications[index].customFields[secIndex].key = newValue;
    updatedProduct.specifications[index].customFields[secIndex].attributeId =
      newValue?.id;
    updatedProduct.specifications[index].customFields[secIndex].keyLabel =
      newValue?.name;

    // Clear the value if it is selected
    const selectedValue = get(
      updatedProduct,
      `specifications[${index}].customFields[${secIndex}].value`
    );
    if (selectedValue) {
      updatedProduct.specifications[index].customFields[secIndex].value = "";
    }

    // Set the updated product state
    setProduct(updatedProduct);
  };
  const handleGrpupnameChange = (e, index) => {
    const { value } = e.target;
    const updatedProduct = { ...product };
    updatedProduct.specifications[index].group = value;
    setProduct(updatedProduct);
  };

  const handleSpecificationValueChange = (e, newValue, index, secIndex) => {
    // Create a copy of the product state
    const updatedProduct = { ...product };

    // Update the selected value in the specifications array
    updatedProduct.specifications[index].customFields[secIndex].value =
      newValue;
    updatedProduct.specifications[index].customFields[secIndex].valueLabel =
      newValue?.name;
    updatedProduct.specifications[index].customFields[
      secIndex
    ].attributeValueId = newValue?._id;

    // Set the updated product state
    setProduct(updatedProduct);
  };
  const getSpecificationValueOptions = (index, secIndex) => {
    const selectedKey = get(
      product,
      `specifications[${index}].customFields[${secIndex}].attributeId`
    );
    if (!selectedKey) {
      return [{ id: "", name: "Select any attribute first", type:"default" }];
    }
    const selectedAttribute = attributes?.find(
      (attribute) => attribute?.id === selectedKey
    );
    if (selectedAttribute?.values && selectedAttribute?.values?.length) {
      return selectedAttribute.values;
    }
    return [];
  };
  const cloneProject = async (event, value) => {
    let groupedSpecifications = [];
    let shipping;
    if (get(value, "value") && productState?.products) {
      const productToClone = productState?.products.find(
        (product) => product?._id === value?.value
      );
      if (!isEmpty(productToClone)) {
        if (productToClone?.specifications) {
          groupedSpecifications = productToClone?.specifications.reduce(
            (acc, spec) => {
              if (!acc.some((ac) => ac?.group === spec?.group)) {
                acc.push({
                  group: spec?.group,
                  customFields: [
                    {
                      attributeId: spec?.attributeId,
                      attributeValueId: spec?.attributeValueId,
                      key: getAttributeKeyObject(spec?.attributeId),
                      value: getAttributeValueObject(
                        spec?.attributeId,
                        spec?.attributeValueId
                      ),
                      keyLabel: getAttributeKeyObject(spec?.attributeId)?.name,
                      valueLabel: getAttributeValueObject(
                        spec?.attributeId,
                        spec?.attributeValueId
                      )?.name,
                    },
                  ],
                });
              } else {
                const Index = acc.findIndex((ac) => ac?.group === spec?.group);
                acc[Index]?.customFields &&
                  acc[Index].customFields.push({
                    attributeId: spec?.attributeId,
                    attributeValueId: spec?.attributeValueId,
                    key: getAttributeKeyObject(spec?.attributeId),
                    value: getAttributeValueObject(
                      spec?.attributeId,
                      spec?.attributeValueId
                    ),
                    keyLabel: getAttributeKeyObject(spec?.attributeId)?.name,
                    valueLabel: getAttributeValueObject(
                      spec?.attributeId,
                      spec?.attributeValueId
                    )?.name,
                  });
              }
              return acc;
            },
            []
          );
        }
        let defaultBrand = {};
        setTaxClass(productToClone?.taxClass);
        setShippingClass({...get(productToClone,'shipping',{})})
        if (productToClone.brand) {
          if (!isEmpty(get(brandState, "brands"))) {
            for (let i in brandState.brands) {
              if (brandState.brands[i].id === productToClone.brand.id) {
                defaultBrand = {
                  value: brandState.brands[i].id,
                  label: brandState.brands[i].name,
                };
                break;
              }
            }
          }
        }
        if (productToClone?.shipping) {
          shipping = productToClone?.shipping;
        }
        const categoryIds =
          !!productToClone.categoryId &&
          productToClone.categoryId?.map((cat) => cat.id);
        if (get(productToClone, "_id")) {
          setClonedId(get(productToClone, "_id"));
        }
        const { url, ...rest } = productToClone;
        setProduct({
          ...product,
          ...rest,
          name: productToClone?.name && `${productToClone.name} copy`,
          specifications: groupedSpecifications,
          categoryId: categoryIds,
          categoryTree: get(productToClone, "categoryTree", []),
          brand: defaultBrand || "",
          shipping,
        });
        if (productToClone.feature_image) {
          setfeatureImage(baseURl + productToClone.feature_image);
        } else {
          setfeatureImage(NoImagePlaceHolder);
        }
      }
    }
  };
  const addSpecificationField = (index) => {
    const updatedProduct = { ...product };
    updatedProduct.specifications[index].customFields.push({
      key: null,
      value: null,
    });
    setProduct(updatedProduct);
  };
  const removeSpecificationField = (index) => {
    const updatedProduct = { ...product };
    updatedProduct.specifications.splice(index, 1);
    setProduct(updatedProduct);
  };
  const removeCustomSpecField = (index, secIndex) => {
    const updatedProduct = { ...product };
    updatedProduct.specifications[index].customFields.splice(secIndex, 1);
    setProduct(updatedProduct);
  };
  const addSpecificationGroup = () => {
    const updatedProduct = { ...product };
    updatedProduct.specifications.push({
      group: "",
      customFields: [{ key: null, value: null }],
    });
    setProduct(updatedProduct);
  };

  const updateUrlOnBlur = async (url) => {
    if (url) {
      await query(CHECK_VALID_URL, { url: url }).then((res) => {
        if (get(res, "data.validateUrl.url")) {
          const newUrl = get(res, "data.validateUrl.url");
          setProduct({
            ...product,
            url: newUrl,
          });
          setIsUrlChanged(true);
        }
      });
    }
  };
  const getDiscountPrice = (discountPrice) => {
    return discountPrice ? `${discountPrice}% OFF` : "No Discount";
  };
  return (
    <>
      <Alert />
      {loading ? <Loading /> : null}
      <form>
        <TopBar
          title={productId ? "Edit Product" : "Add product"}
          onSubmit={addUpdateProduct}
          submitTitle={productId ? "Update" : "Add"}
          backLink={`${client_app_route_url}all-products`}
        />

        <Grid container spacing={4} className={classes.secondmainrow}>
          <Grid item lg={9} md={12}>
            {/* ===================Information=================== */}
            <CardBlocks title="Product Information" nomargin>
              {/* ===================Title=================== */}
              <Box component="div" mb={2}>
                <TextField
                  label="Name"
                  name="name"
                  value={get(product, "name", "")}
                  onChange={handleChange}
                  onBlur={(e) =>
                    !product?.url || product?.url !== e?.target?.value
                      ? !isUrlChanged && isUrlExist(product?.name)
                      : null
                  }
                  variant="outlined"
                  fullWidth
                />
              </Box>

              {/* ===================Url=================== */}
              <Box component="div" mb={2}>
                <ValidUrlComponent
                  url={get(product, "url")}
                  onSubmit={updateUrl}
                  onInputChange={(updatedUrl) => {
                    setProduct({
                      ...product,
                      url: updatedUrl,
                    });
                  }}
                  pageUrl="product"
                  tableUrl="Product"
                />
              </Box>

              {/* ===================Description=================== */}
              <Box component="div">
                <TinymceEditor
                  value={get(product, "description")}
                  onEditorChange={(value) =>
                    setProduct({ ...product, description: value })
                  }
                />
              </Box>
            </CardBlocks>
            {/* ===================Categories=================== */}
            <CardBlocks title="Categories">
              <EditCategoriesComponent
                selectedCategoriesTree={get(product, "categoryTree", [])}
                selectedCategories={get(product, "categoryId", [])}
                onCategoryChange={(items) => {
                  if (items && items?.length > 0) {
                    const checkedIds = getCheckedIds(items);
                    setProduct({
                      ...product,
                      categoryId: checkedIds,
                      categoryTree: items,
                    });
                  } else {
                    setProduct({
                      ...product,
                      categoryId: [],
                      categoryTree: [],
                    });
                  }
                }}
              />
            </CardBlocks>
            {/* ===================Pricing=================== */}
            <CardBlocks title="Pricing">
              <Grid container spacing={3}>
                <Grid item md={4}>
                  <TextField
                    label="Price"
                    name="price"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={product.pricing.price}
                    onBlur={(e) => {
                      let value = get(e, "target.value");
                      if (value >= 0) {
                        value < get(product, "pricing.sellprice") &&
                          dispatch({
                            type: ALERT_SUCCESS,
                            payload: {
                              boolean: false,
                              message:
                                "Sale price couldn't exceed original price",
                              error: true,
                            },
                          });
                      }
                    }}
                    onChange={(e) => {
                      let price = get(e, "target.value");
                      let sellprice = get(product, "pricing.sellprice");
                      if (price >= 0) {
                        setProduct({
                          ...product,
                          pricing: {
                            ...product.pricing,
                            price: Number(price),
                            discountPercentage: calculateDiscount(
                              price,
                              sellprice
                            ),
                          },
                        });
                      }
                    }}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    label="Sale Price"
                    name="sellprice"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={product.pricing.sellprice}
                    onBlur={(e) => {
                      let value = get(e, "target.value");
                      if (value >= 0) {
                        value > get(product, "pricing.price") &&
                          dispatch({
                            type: ALERT_SUCCESS,
                            payload: {
                              boolean: false,
                              message:
                                "Sale price couldn't exceed original price",
                              error: true,
                            },
                          });
                      }
                    }}
                    onChange={(e) => {
                      let sellprice = get(e, "target.value");
                      let price = get(product, "pricing.price");
                      if (sellprice >= 0) {
                        setProduct({
                          ...product,
                          pricing: {
                            ...product.pricing,
                            sellprice: Number(sellprice),
                            discountPercentage: calculateDiscount(
                              price,
                              sellprice
                            ),
                          },
                        });
                      }
                    }}
                  />
                </Grid>
                <Grid className={classes.discountAmount}>
                  <Typography fontWeight="700" variant="body1" ml={2}>
                    Discount Percentage :
                  </Typography>
                  <Typography fontWeight="400" variant="body1" ml={2}>
                    {getDiscountPrice(
                      get(product, "pricing.discountPercentage", 0)
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </CardBlocks>
            {/* ===================Product Type=================== */}
            <CardBlocks title="Product Type">
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={get(product, "product_type.virtual", false)}
                          name="virtual"
                          value="virtual"
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              product_type: {
                                ...product?.product_type,
                                virtual: e.target.checked,
                              },
                            })
                          }
                        />
                      }
                      label="Virtual"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={get(
                            product,
                            "product_type.downloadable",
                            false
                          )}
                          name="downloadable"
                          value="downloadable"
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              product_type: {
                                ...product?.product_type,
                                downloadable: e.target.checked,
                              },
                            })
                          }
                        />
                      }
                      label="Downloadable"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </CardBlocks>
            {/* ===================Shipping=================== */}
            {!product.product_type?.virtual && (
              <CardBlocks title="Shipping">
                <ShippingComponent
                  product={shippingClass}
                  onShippingInputChange={(name, value) => {
                    setShippingClass({...shippingClass,  [name]: value,})
                  }}
                  onShippingClassChange={(value) => {
                    setShippingClass({...shippingClass,  'shippingClass': value,})
                  }}
                />
              </CardBlocks>
            )}
            {/* ===================Tax=================== */}
            <CardBlocks title="Tax">
              <TaxComponent
                product={taxClass}
                taxClass={taxClass}
                onTaxInputChange={(value) => {
                  setTaxClass(value);
                }}
                onTaxClassChange={(value) => {
                  setTaxClass(value);
                }}
              />
            </CardBlocks>
            {/* ===================Inventory=================== */}
            <CardBlocks title="Inventory">
              <Grid container spacing={3}>
                <Grid item md={4}>
                  <TextInput
                    label="SKU"
                    name="sku"
                    onChange={handleChange}
                    value={product.sku}
                  />
                </Grid>
                {get(setting, "settings.store.inventory.manage_stock") && (
                  <Grid item md={4}>
                    <TextInput
                      id="quantity"
                      label="Quantity"
                      name="quantity"
                      onChange={handleChange}
                      type="number"
                      value={product.quantity}
                    />
                  </Grid>
                )}
              </Grid>
            </CardBlocks>

            {/* ===================Specifications=================== */}

            <CardBlocks title="Specifications">
              <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                  {product?.specifications &&
                    product.specifications?.length > 0 &&
                    product.specifications.map((group, index) => (
                      <Box
                        key={index}
                        // display="flex"
                        // justifyContent="flex-start"
                        alignItems="center"
                        className={classes.customFieldRow}
                      >
                        <Box
                          py={3}
                          px={2}
                          sx={{ border: "2px solid #26323833" }}
                        >
                          {/* <Typography fontWeight="400" variant="body1">
                            {group.group}
                          </Typography> */}
                          <Stack
                            direction="row"
                            width="100%"
                            justifyContent="space-between"
                            alignItems="flex-start"
                          >
                            <Box>
                              <TextField
                                label="Group Name"
                                variant="outlined"
                                name="group"
                                className={classes.customFieldInput}
                                value={get(
                                  product,
                                  `specifications[${index}].group`,
                                  ""
                                )}
                                onChange={(e) =>
                                  handleGrpupnameChange(e, index)
                                }
                                size="small"
                                sx={{ mb: 2 }}
                              />
                              <Stack
                                direction="row"
                                alignItems="start"
                                justifyContent="space-between"
                              >
                                <Box>
                                  {group?.customFields &&
                                    !!group.customFields?.length &&
                                    group.customFields?.map(
                                      (field, secIndex) => (
                                        <Stack
                                          alignItems="start"
                                          justifyContent="space-between"
                                          direction="row"
                                          gap={2}
                                        >
                                          <Stack
                                            alignItems="center"
                                            direction="row"
                                            gap={2}
                                          >
                                            <FormControl
                                              className={classes.cstmSelect}
                                              variant="standard"
                                            >
                                              <CustomAutocomplete
                                                id="key"
                                                name="key"
                                                label="Key"
                                                options={attributes || []}
                                                value={get(
                                                  product,
                                                  `specifications[${index}].customFields[${secIndex}].key`,
                                                  ""
                                                )}
                                                onChange={(e, newValue) =>
                                                  handleSpecificationKeyChange(
                                                    e,
                                                    newValue,
                                                    index,
                                                    secIndex
                                                  )
                                                }
                                                getOptionLabel={(option) =>
                                                  option.name || ""
                                                }
                                                isOptionEqualToValue={(
                                                  option,
                                                  value
                                                ) => option.id === value.id}
                                                getOptionDisabled={(option) =>
                                                  get(
                                                    product,
                                                    `specifications[${index}].customFields`,
                                                    []
                                                  ).some(
                                                    (attri) =>
                                                      attri.attributeId ===
                                                      option.id
                                                  )
                                                }
                                              />
                                            </FormControl>
                                            <FormControl
                                              className={classes.cstmSelect}
                                              variant="standard"
                                            >
                                              <CustomAutocomplete
                                                id="value"
                                                name="value"
                                                label="Value"
                                                options={getSpecificationValueOptions(
                                                  index,
                                                  secIndex
                                                )}
                                                value={get(
                                                  product,
                                                  `specifications[${index}].customFields[${secIndex}].value`,
                                                  ""
                                                )}
                                                onChange={(e, newValue) =>
                                                  handleSpecificationValueChange(
                                                    e,
                                                    newValue,
                                                    index,
                                                    secIndex
                                                  )
                                                }
                                                getOptionLabel={(option) =>
                                                  option.name || ""
                                                }
                                                getOptionDisabled={(option)=>option?.type==='default'}
                                                isOptionEqualToValue={(
                                                  option,
                                                  value
                                                ) => option._id === value._id}
                                              />
                                            </FormControl>
                                            <Tooltip
                                              title="Remove Field"
                                              aria-label="remove-field"
                                            >
                                              <IconButton
                                                sx={{ mt: "20px" }}
                                                aria-label="delete"
                                                onClick={(e) =>
                                                  removeCustomSpecField(
                                                    index,
                                                    secIndex
                                                  )
                                                }
                                                disabled={
                                                  group.customFields?.length <=
                                                  1
                                                }
                                              >
                                                <CloseIcon color="error" />
                                              </IconButton>
                                            </Tooltip>
                                          </Stack>
                                        </Stack>
                                      )
                                    )}
                                  <IconButton
                                    aria-label="add"
                                    onClick={(e) =>
                                      addSpecificationField(index)
                                    }
                                    sx={{ pl: 0, mt: 1 }}
                                  >
                                    <AddCircleOutlineIcon color="success" />
                                  </IconButton>
                                </Box>
                              </Stack>
                            </Box>
                            <Tooltip
                              title="Remove Group"
                              aria-label="remove-group"
                            >
                              <IconButton
                                aria-label="remove"
                                onClick={(e) => removeSpecificationField(index)}
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Box>
                      </Box>
                    ))}
                </Grid>
                <Grid item lg={4} md={12}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={addSpecificationGroup}
                  >
                    + Add Group
                  </Button>
                </Grid>
              </Grid>
            </CardBlocks>
            {/* ===================Short Description=================== */}
            <CardBlocks title="Short Description">
              <TextInput
                value={product.short_description}
                label="Short Description"
                name="short_description"
                onInputChange={handleChange}
                multiline
                rows="4"
              />
            </CardBlocks>
            {/* ===================Meta Information=================== */}
            <CardBlocks title="Meta Information">
              <Grid container spacing={isSmall ? 1 : 2}>
                <Grid item md={6} xs={12}>
                  <TextInput
                    value={product?.meta?.title || ""}
                    label="Meta Title"
                    name="title"
                    onInputChange={onMetaChange}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextInput
                    value={product?.meta?.keywords || ""}
                    label="Meta Keywords"
                    name="keywords"
                    onInputChange={onMetaChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    value={product?.meta?.description || ""}
                    label="Meta Description"
                    name="description"
                    onInputChange={onMetaChange}
                    multiline
                    rows="4"
                  />
                </Grid>
              </Grid>
            </CardBlocks>
          </Grid>

          <Grid item lg={3} md={12}>
            {/* ===================Clone=================== */}
            {!productId && (
              <Box component="span" m={1}>
                <CardBlocks title="Clone Product" >
                  <Autocomplete
                    disablePortal
                    id="select-product"
                    options={productsOptions}
                    onChange={cloneProject}
                    renderInput={(params) => (
                      <TextField {...params} label="Select product" />
                    )}
                  />
                </CardBlocks>
              </Box>
            )}
            {/* ===================Status=================== */}
            <Box component="span">
              <CardBlocks title="Status" nomargin>
                <RadioGroup
                  value={product.status}
                  name="status"
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="Publish"
                    control={<StyledRadio />}
                    label="Publish"
                  />
                  <FormControlLabel
                    value="Draft"
                    control={<StyledRadio />}
                    label="Draft"
                  />
                </RadioGroup>
              </CardBlocks>
            </Box>
            {/* ===================Featured Product=================== */}
            <Box component="span" m={1}>
              <CardBlocks title="Featured Product">
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={product.featured_product}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            featured_product: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Featured Product"
                  />
                </FormGroup>
              </CardBlocks>
            </Box>
            {/* ===================Featured Image=================== */}
            <Box component="span" m={1}>
              <CardBlocks title="Featured Image">
                <FeaturedImageComponent
                  name="feature_image"
                  image={featureImage}
                  feautedImageChange={(e) => onFeatureImageChange(e)}
                />
              </CardBlocks>
            </Box>
            {/* ===================Gallery Images=================== */}
            <Box component="span" m={1}>
              <CardBlocks title="Gallery Image">
                {productId || clonedId ? (
                  <EditGalleryImageSelection
                    onAddGalleryImage={(e) => {
                      var imagesRes = [...e.target.files];
                      var images = [];
                      for (let i in imagesRes) {
                        images.push(URL.createObjectURL(get(imagesRes, [i])));
                      }
                      setGallery([...gallery, ...imagesRes]);
                    }}
                    onRemoveGalleryImage={(images) => {
                      setProduct({ ...product, ["gallery_image"]: images });
                    }}
                    onRemoveOldImage={(gallery_image, removed_image) => {
                      setProduct({
                        ...product,
                        gallery_image: gallery_image,
                        removed_image: removed_image,
                      });
                    }}
                    product={product}
                    setting={setting}
                  />
                ) : (
                  <GalleryImageSelection
                    onAddGalleryImage={(e) => {
                      var imagesRes = [...e.target.files];

                      var images = [];
                      for (let i in imagesRes) {
                        if (get(imagesRes, [i])) {
                          images.push(URL.createObjectURL(get(imagesRes, [i])));
                        }
                      }
                      setGallery([...gallery, ...imagesRes]);
                    }}
                    onRemoveGalleryImage={(images) => {
                      setProduct({ ...product, ["gallery_image"]: images });
                    }}
                  />
                )}
              </CardBlocks>
            </Box>
            {/* ===================Brands=================== */}
            <Box component="span" m={1}>
              <CardBlocks title="Brands">
                <BrandSelection
                  value={product.brand}
                  onBrandChange={(brand) => {
                    setProduct({ ...product, brand });
                  }}
                />
              </CardBlocks>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default function EditProduct() {
  const params = useParams();
  return (
    <ThemeProvider theme={theme}>
      <EditProductComponent params={params} />
    </ThemeProvider>
  );
}
