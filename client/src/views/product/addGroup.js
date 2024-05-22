import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { validate, validatenested } from "../components/validate";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { getUpdatedUrl } from "../../utils/service";
import GroupAttributes from "./components/groupAttributes";
import {
  groupProductAction,
  groupProductAddAction,
  groupProductUpdateAction,
  groupProductsAction,
} from "../../store/action/groupProductAction";
import { get } from "lodash";

function groupAttributes(attributes) {
  const groupedAttributes = {};

  attributes.forEach((attribute) => {
    if (!groupedAttributes[attribute.attribute_id]) {
      groupedAttributes[attribute.attribute_id] = {
        _id: attribute.attribute_id,
        values: [],
      };
    }
    groupedAttributes[attribute.attribute_id].values.push(
      attribute.attribute_value_id
    );
  });

  return Object.values(groupedAttributes);
}
function getVariants(combinations, groupedAttributes, editingId) {
  // Here we want the combination array of ids to convert in array of objects {attributeID: '', attributeValue: ''}
  const variants = combinations.map((combination) => {
    const obj = {
      productId: combination?.productID,
      productUrl: combination?.productUrl,
      combinations:
        !!combination?.combinations &&
        combination?.combinations.map((combId) => ({
          attributeId: groupedAttributes.find((attri) =>
            attri?.values?.some((id) => id === combId)
          )?._id,
          attributeValueId: combId,
        })),
    };

    return obj;
  });
  return variants;
}

const AddProductTheme = () => {
  const navigate = useNavigate();
  const classes = viewStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { id } = useParams();
  const isEditing = id !== undefined;
  const [featureImage, setfeatureImage] = useState(null);
  const [combination, setCombination] = useState([]);
  const groupLoading = useSelector((state) => state.groupProducts.groupLoading);
  const groupProductState = useSelector((state) => state.groupProducts);
  const [shippingClass, setShippingClass] = useState("");
  const [taxClass, setTaxClass] = useState("");
  const [groupProduct, setGroupProduct] = useState({
    title: "",
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
    attributes: [],
    variant: [],
    short_description: "",
    sku: "",
    quantity: "",
  });
  const addProduct = (e) => {
    e.preventDefault();
    groupProduct.taxClass = taxClass;
    groupProduct.shipping.shippingClass = shippingClass;
    // let errors = validate(["short_description", "quantity", "sku", 'categoryId', "description", "title"], groupProduct);
    let errors = validate(["title"], groupProduct);
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
      let attributes = [];
      if (id && attributes?.length <= 0 && variations?.length <= 0) {
        if (groupProduct?.attributes && !!groupProduct?.attributes?.length) {
          const groupedAttributes = groupAttributes(groupProduct.attributes);
          // groupProduct.attributes = groupedAttributes;
          if (groupedAttributes && !!groupAttributes?.length) {
            const variants = getVariants(combination, groupedAttributes, id);
            attributes = groupedAttributes;
            variations = variants;
            // if(variants){
            //   groupProduct.variations = variants;
            // }
            setGroupProduct({
              ...groupProduct,
              // variations: variants,
              // attributes: groupedAttributes
            });
          }
        }
      } else {
        if (groupProduct?.attribute && !!groupProduct?.attribute?.length) {
          const groupedAttributes = groupAttributes(groupProduct.attribute);
          // groupProduct.attributes = groupedAttributes;
          if (groupedAttributes && !!groupAttributes?.length) {
            const variants = getVariants(combination, groupedAttributes);
            attributes = groupedAttributes;
            variations = variants;
            // if(variants){
            //   groupProduct.variations = variants;
            // }
            setGroupProduct({
              ...groupProduct,
              // variations: variants,
              // attributes: groupedAttributes
            });
          }
        }
      }
      const obj = {
        title: groupProduct?.title,
        status:groupProduct?.status,
        attributes: (id && attributes?.length <= 0) ? groupProduct?.attributes : attributes,
        variations:  (id && variations?.length <= 0) ? groupProduct?.variations : variations,
        productIds: variations?.map(variation => variation?.productId)
      }
      if(id){
        dispatch(groupProductUpdateAction({...obj, updateGroupId: id}, navigate))
      }else{
        dispatch(groupProductAddAction(obj, navigate))
      }
      // if (groupProduct.pricing.price !== 0) {
      //   if (groupProduct.pricing.sellprice < groupProduct.pricing.price) {

      //     dispatch(productAddAction(groupProduct, navigate));
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
  useEffect(() => {
    if (id) {
      dispatch(groupProductAction(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (id && !isEmpty(get(groupProductState, "groupProduct"))) {
      const convertedAttributes = [];
      let convertedVariations = [];
      if (get(groupProductState, "groupProduct.attributes")) {
        groupProductState.groupProduct.attributes?.forEach((item) => {
          item.values.forEach((value) => {
            convertedAttributes.push({
              attribute_id: item._id,
              attribute_value_id: value,
            });
          });
        });
      }
      if (get(groupProductState, "groupProduct.variations")) {
        //   const convertedArray = groupProductState.groupProduct.variations.map(item => {
        //     return {
        //         productId: item.productId,
        //         combinations: item.combinations.map(combination => ({
        //             attributeId: combination.attributeId,
        //             attributeValueId: combination.attributeValueId
        //         }))
        //     };
        // });
        const convertedArray = groupProductState.groupProduct.variations.map(
          (item) => {
            return {
              productID: item.productId,
              productUrl: item?.productUrl,
              combinations: item.combinations.map(
                (combination) => combination.attributeValueId
              ),
            };
          }
        );
        convertedVariations = convertedArray;
      }
      // const productVariants = ['65cb2b0ca9dfee40f95226ff', '65cb2b2ba9dfee40f9522716'];
      setGroupProduct({
        ...groupProduct,
        status:get(groupProductState, 'groupProduct.status'),
        attributes: convertedAttributes,
        variations: convertedVariations,
        // attributes:  get(groupProductState, 'groupProduct.attributes', []),
        title: get(groupProductState, "groupProduct.title"),
        // variant: productVariants
      });
    }
  }, [dispatch, get(groupProductState, "groupProduct"), id]);

  const handleChange = (e) => {
    setGroupProduct({ ...groupProduct, [e.target.name]: e.target.value });
  };

  const isUrlExist = async (url) => {
    let updatedUrl = await getUpdatedUrl("Product", url);
    setGroupProduct({
      ...groupProduct,
      url: updatedUrl,
    });
  };

  return (
    <>
      <Alert />
      {groupLoading ? <Loading /> : null}
      <form>
        <TopBar
          title={id ? "Edit Group" : "Add Group"}
          onSubmit={addProduct}
          submitTitle={id ? "Update" : "Add"}
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
                  name="title"
                  value={groupProduct.title}
                  onChange={handleChange}
                  onBlur={(e) =>
                    !groupProduct.url || groupProduct.url !== e.target.value
                      ? isUrlExist(groupProduct.title)
                      : null
                  }
                  variant="outlined"
                  fullWidth
                />
              </Box>

              {/* ===================Description=================== */}
            </CardBlocks>

            {/* ===================Attributes=================== */}
            <CardBlocks title="Attribute selection">
              <GroupAttributes
                groupId={id}
                product={groupProduct}
                productStateChange={({ ...groupProduct }) =>
                  setGroupProduct({
                    ...groupProduct,
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
                  name="status"
                  value={get(groupProduct,'status','')}
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
