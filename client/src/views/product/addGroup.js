import React, { useState } from "react";
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
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { productAddAction } from "../../store/action/";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import { isEmpty } from "../../utils/helper";
import viewStyles from "../viewStyles";
import {
  Alert,
  StyledRadio,
  TopBar,
  TinymceEditor,
  CardBlocks,
  FeaturedImageComponent,
  URLComponent,
  TextInput,
  Loading,
} from "../components";
import {
  BrandSelection,
  GalleryImageSelection,
  Attributes,
  TaxComponent,
  ShippingComponent,
  CategoriesComponent,
} from "./components";
import { client_app_route_url } from "../../utils/helper";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { validate, validatenested } from "../components/validate";
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { getUpdatedUrl } from "../../utils/service";
import GroupAttributes from "./components/groupAttributes";
import { groupProductAddAction, groupProductsAction } from "../../store/action/groupProductAction";


function groupAttributes(attributes) {
  const groupedAttributes = {};

  attributes.forEach(attribute => {
    if (!groupedAttributes[attribute.attribute_id]) {
      groupedAttributes[attribute.attribute_id] = {
        id: attribute.attribute_id,
        values: []
      };
    }
    groupedAttributes[attribute.attribute_id].values.push(attribute.attribute_value_id);
  });

  return Object.values(groupedAttributes);
}
function getVariants(combinations, groupedAttributes) {
  // Here we want the combination array of ids to convert in array of objects {attributeID: '', attributeValue: ''}
  const variants = combinations.map((combination) => {
    const obj = { productId: combination?.productID, combinations: !!combination?.combinations && combination?.combinations.map(combId => ({ attributeId: groupedAttributes.find(attri => attri?.values?.some(id => id === combId))?.id, attributeValueId: combId })) }

    return obj;
  })
  return variants;
}

const AddProductTheme = () => {
  const navigate = useNavigate();
  const classes = viewStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [featureImage, setfeatureImage] = useState(null);
  const [combination, setCombination] = useState([]);
  const loading = useSelector((state) => state.products.loading);
  const [shippingClass, setShippingClass] = useState('')
  const [taxClass, setTaxClass] = useState('')
  const [product, setProduct] = useState({
    name: "",
    description: "",
    categoryId: [],
    brand: null,
    pricing: {
      price: 0,
      sellprice: "0",
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
    taxClass: "",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
    },
    custom_field: [],
    attribute: [],
    variant: [],
    short_description: "",
    sku: "",
    quantity: "",
  });
  const addProduct = (e) => {

    e.preventDefault();
    product.taxClass = taxClass
    product.shipping.shippingClass = shippingClass
    // let errors = validate(["short_description", "quantity", "sku", 'categoryId', "description", "name"], product);
    let errors = validate(["name"], product);
    // let Errors = validatenested("pricing", ["price", "sellprice"], product);
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
    // else if (!isEmpty(Errors)) {
    //   dispatch({
    //     type: ALERT_SUCCESS,
    //     payload: {
    //       boolean: false,
    //       message: Errors,
    //       error: true,
    //     },
    //   });
    // }
    else {
      // product.combinations = combination;
      let variations = [];
      let attributes = []
      if (product?.attribute && !!product?.attribute?.length) {
        const groupedAttributes = groupAttributes(product.attribute);
        // product.attributes = groupedAttributes;
        if (groupedAttributes && !!groupAttributes?.length) {
          const variants = getVariants(combination, groupedAttributes)
          attributes = groupedAttributes;
          variations = variants;
          // if(variants){
          //   product.variations = variants;
          // }
          setProduct({
            ...product,
            variations: variants,
            attributes: groupedAttributes
          })
        }
      }
      const obj = {
        title: product?.name,
        attributes,
        variations,
        productIds: variations?.map(variation => variation?.productId)
      }
      dispatch(groupProductAddAction(obj, navigate))
      // if (product.pricing.price !== 0) {
      //   if (product.pricing.sellprice < product.pricing.price) {

      //     dispatch(productAddAction(product, navigate));
      //   }
      //   else {
      //     dispatch({
      //       type: ALERT_SUCCESS,
      //       payload: {
      //         boolean: false,
      //         message: "Sale price couldn't exceed original price",
      //         error: true,
      //       },
      //     })
      //   }
      // } else {
      //   dispatch({
      //     type: ALERT_SUCCESS,
      //     payload: {
      //       boolean: false,
      //       message: "Price is required",
      //       error: true,
      //     },
      //   })
      // }
    }


  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onFeatureImageChange = (e) => {
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));

    setProduct({ ...product, [e.target.name]: e.target.files });
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

  const isUrlExist = async (url) => {
    let updatedUrl = await getUpdatedUrl("Product", url);
    setProduct({
      ...product,
      url: updatedUrl,
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
          title="Add Group"
          onSubmit={addProduct}
          submitTitle="Add"
          backLink={`${client_app_route_url}group-products`}
        />

        <Grid container spacing={4} className={classes.secondmainrow}>
          <Grid item lg={9} md={12}>
            {/* ===================Information=================== */}
            <CardBlocks title="Group Information" nomargin>
              {/* ===================Title=================== */}
              <Box component="div" mb={2}>
                <TextField
                  label="Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  onBlur={(e) => (
                    !product.url || product.url !== e.target.value ? isUrlExist(product.name) : null
                  )}
                  variant="outlined"
                  fullWidth
                />
              </Box>

              {/* ===================Description=================== */}

            </CardBlocks>


            {/* ===================Attributes=================== */}
            <CardBlocks title="Attribute selection">
              <GroupAttributes
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

          </Grid>

          <Grid item lg={3} md={12}>
            {/* ===================Status=================== */}
            <Box component="span">
              <CardBlocks title="Status" nomargin>
                <RadioGroup
                  defaultValue="Draft"
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
          </Grid>
        </Grid>
      </form>
    </>
  );
};

const AddGroup = () => {
  return (
    <ThemeProvider theme={theme}>
      <AddProductTheme p />
    </ThemeProvider>
  );
};
export default AddGroup;

