import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesAction,
  productUpdateAction,
  brandsAction,
  productAction,
} from "../../store/action/";
import { getUpdatedUrl } from "../../utils/service";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { validate, validatenested } from "../components/validate";
import {
  isEmpty,
  client_app_route_url,
  bucketBaseURL,
} from "../../utils/helper";
import {
  Alert,
  Loading,
  StyledRadio,
  TopBar,
  TinymceEditor,
  CardBlocks,
  FeaturedImageComponent,
  URLComponent,
  TextInput,
} from "../components";
import {
  BrandSelection,
  EditGalleryImageSelection,
  Attributes,
  TaxComponent,
  ShippingComponent,
  EditCategoriesComponent,
} from "./components";
import viewStyles from "../viewStyles";
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import theme from "../../theme";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "lodash";
import NoImagePlaceHolder from "../../assets/images/NoImagePlaceHolder.png";

const EditProductComponent = ({ params }) => {
  const Product_id = params.id || "";
  const classes = viewStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const productState = useSelector((state) => state.products);
  const navigate = useNavigate();
  const brandState = useSelector((state) => state.brands);
  const [featureImage, setfeatureImage] = useState(null);
  const [combination, setCombination] = useState([]);
  const [loading, setloading] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [product, setProduct] = useState({
    _id: "",
    name: "",

    categoryId: [],
    brand: "",
    sku: "",
    quantity: "",
    status: "Draft",
    pricing: {
      price: "",
      sellprice: "",
    },
    meta: {
      title: "",
      description: "",
      keywords: "",
    },
    shipping: {
      height: "",
      width: "",
      depth: "",
      weight: "",
      shipping_class: "",
    },
    tax_class: "",
    removed_image: [],
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
    },
    custom_field: [],
    short_description: "",
    description: "",
    attribute: [],
    variant: [],
  });

  useEffect(() => {
    dispatch(productAction(Product_id));
    dispatch(brandsAction());
    dispatch(categoriesAction());
  }, []);

  useEffect(() => {
    setloading(get(productState, "loading"));
  }, [get(productState, "loading")]);

  useEffect(() => {
    if (!isEmpty(get(productState, "product"))) {
      if (!isEmpty(productState.product)) {
        let defaultBrand = {};
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
          categoryId: productState.product.categoryId.map((cat) => cat.id),
          brand: defaultBrand || "",

        });

        if (productState.product.feature_image) {
          setfeatureImage(
            bucketBaseURL + productState.product.feature_image
          );
        } else {
          setfeatureImage(
            NoImagePlaceHolder
          );

        }
      }
    }
  }, [get(productState, "product")]);

  const updateProduct = (e) => {

    product.update_gallery_image = gallery
    console.log(product)
    e.preventDefault();
    let errors = validate(["short_description", "quantity", "sku", 'categoryId', "description", "name"], product);
    let Errors = validatenested("pricing", ["price", "sellprice"], product);
    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else if (!isEmpty(Errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: Errors,
          error: true,
        },
      });
    }
    else {
      product.combinations = combination;

      dispatch(productUpdateAction(product, navigate));
    }



  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onFeatureImageChange = (e) => {
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
    setProduct({ ...product, ["update_feature_image"]: e.target.files });
  };

  const isUrlExist = async (url) => {
    let updatedUrl = await getUpdatedUrl("Product", url);
    setProduct({
      ...product,
      url: updatedUrl,
    });
  };

  const addCustomField = () => {
    setProduct({
      ...product,
      custom_field: [...product.custom_field, { key: "", value: "" }],
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
        ...product.meta,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <>
      <Alert />
      {loading ? <Loading /> : null}
      <form>
        <TopBar
          title="Edit Product"
          onSubmit={updateProduct}
          submitTitle="Update"
          backLink={`${client_app_route_url}all-products`}
        />

        {!isEmpty(product._id) ? (
          <Grid container spacing={4} className={classes.secondmainrow}>
            <Grid item lg={9} md={12}>
              {/* ===================Information=================== */}
              <CardBlocks title="Product Information" nomargin>
                {/* ===================Title=================== */}
                <Box component="div" mb={2}>
                  <TextField
                    label="Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    onBlur={(e) => !product.url && isUrlExist(product.name)}
                    variant="outlined"
                    fullWidth
                  />
                </Box>

                {/* ===================Url=================== */}
                <Box component="div" mb={2}>
                  <URLComponent
                    url={product.url}
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
                    value={product.description}
                    onEditorChange={(value) =>
                      setProduct({ ...product, description: value })
                    }
                  />
                </Box>
              </CardBlocks>
              {/* ===================Categories=================== */}
              <CardBlocks title="Categories">
                <EditCategoriesComponent
                  selectedCategories={product.categoryId}
                  onCategoryChange={(items) => {
                    setProduct({ ...product, categoryId: items });
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
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          pricing: {
                            ...product.pricing,
                            price: Number(e.target.value),
                          },
                        })
                      }
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
                      onChange={(e) => e.target.value < product.pricing.price ?
                        setProduct({
                          ...product,
                          pricing: {
                            ...product.pricing,
                            sellprice: Number(e.target.value),
                          },
                        })
                        : dispatch({
                          type: ALERT_SUCCESS,
                          payload: {
                            boolean: false,
                            message: "Sale price couldn't exceed original price",
                            error: true,
                          },
                        })
                      }
                    />
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
                            checked={product.product_type.virtual}
                            name="virtual"
                            value="virtual"
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                product_type: {
                                  ...product.product_type,
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
                            checked={product.product_type.downloadable}
                            name="downloadable"
                            value="downloadable"
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                product_type: {
                                  ...product.product_type,
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
              {!product.product_type.virtual && (
                <CardBlocks title="Shipping">
                  <ShippingComponent
                    product={product}
                    onShippingInputChange={(name, value) => {
                      setProduct({
                        ...product,
                        shipping: {
                          ...product.shipping,
                          [name]: value,
                        },
                      });
                    }}
                    onShippingClassChange={(value) => {
                      setProduct({
                        ...product,
                        shipping: {
                          ...product.shipping,
                          shipping_class: value,
                        },
                      });
                    }}
                  />
                </CardBlocks>
              )}
              {/* ===================Tax=================== */}
              <CardBlocks title="Tax">
                <TaxComponent
                  product={product}
                  onTaxInputChange={(name, value) => {
                    setProduct({
                      ...product,
                      [name]: value,
                    });
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
                </Grid>
              </CardBlocks>
              {/* ===================Attributes=================== */}
              <CardBlocks title="Attribute selection">
                <Attributes
                  EditMode
                  product={product}
                  productStateChange={({ ...product }) =>
                    setProduct({
                      ...product,
                    })
                  }
                  onCombinationUpdate={(combination) => {
                    setCombination(combination);
                  }}
                />
              </CardBlocks>
              {/* ===================Custom Fields=================== */}
              <CardBlocks title="Custom Fields">
                <Grid container spacing={2}>
                  <Grid item md={12} sm={12} xs={12}>
                    {product.custom_field.map((field, index) => (
                      <Box
                        key={index}
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        className={classes.customFieldRow}
                      >
                        <TextField
                          label="Custom Field Name: *"
                          variant="outlined"
                          name="key"
                          className={classes.customFieldInput}
                          value={field.key}
                          onChange={(e) => customChange(e, index)}
                          size="small"
                        />
                        <TextField
                          label="Custom Field Value: *"
                          variant="outlined"
                          name="value"
                          className={classes.customFieldInput}
                          value={field.value}
                          onChange={(e) => customChange(e, index)}
                          size="small"
                        />
                        <Tooltip title="Remove Field" aria-label="remove-field">
                          <Stack direction="row" spacing={1}>
                            <IconButton aria-label="delete" onClick={(e) => removeCustomField(index)}>
                              <CloseIcon />
                            </IconButton>
                          </Stack>
                        </Tooltip>
                      </Box>
                    ))}
                  </Grid>
                  <Grid item lg={4} md={12}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={addCustomField}
                    >
                      + Add Custom Fields
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
                      value={product.meta.title}
                      label="Meta Title"
                      name="title"
                      onInputChange={onMetaChange}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextInput
                      value={product.meta.keywords}
                      label="Meta Keywords"
                      name="keywords"
                      onInputChange={onMetaChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextInput
                      value={product.meta.description}
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
              {/* ===================Status=================== */}
              <Box component="span">
                <CardBlocks title="Status" nomargin>
                  <RadioGroup
                    defaultValue={product.status}
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
                    image={featureImage}
                    feautedImageChange={(e) => onFeatureImageChange(e)}
                  />
                </CardBlocks>
              </Box>
              {/* ===================Gallery Images=================== */}
              <Box component="span" m={1}>
                <CardBlocks title="Gallery Image">
                  <EditGalleryImageSelection
                    onAddGalleryImage={(e) => {

                      var imagesRes = [...e.target.files];
                      var images = [];
                      for (let i in imagesRes) {
                        images.push(URL.createObjectURL(imagesRes[i]));
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
                  />
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
        ) : null}
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
