import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  TextField,
  Icon,
} from "@material-ui/core";
import { connect } from "react-redux";
import ProductOtherDetails from "./productotherdetail";

const ProductDetail = (props) => {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setProduct(props.details);
    checkProductCart(props.details);
  }, [props.details]);

  const checkProductCart = (singleProduct) => {
    if (props.cart.products) {
      props.cart.products.map(
        (cartProduct) =>
          cartProduct.id === singleProduct.id && (singleProduct.cart = true)
      );
    } else {
      singleProduct.cart = false;
    }
  };

  const addToCart = (singleProduct) => {
    singleProduct.cartQty = qty;
    if (product.cart) {
      alert("Item already in a Cart ");
    } else {
      singleProduct.cart = true;
      props.dispatch({
        type: "ADD_VALUE",
        payload: singleProduct,
      });
    }
  };

  const handlechange = (e) => {
    setQty(e.target.value);
  };

  return (
    <Fragment>
      {product === null ? null : (
        <Box component="div" display="flex" className="singleproduct-wrapper">
          <Box component="div" className="singleproduct-details">
            {/* ==========Product Availablity ===========*/}

            <div className="title-price-switch">
              {/* ==========Product Title ===========*/}
              <Typography variant="h4" className="product-title">
                {product.name}
              </Typography>
              {/* ==========Product Price ===========*/}
              <Typography variant="h3" className="product-price">
                {product.pricing.sellprice ? (
                  <span className="sale-price">
                    ${product.pricing.sellprice.toFixed(2)}
                  </span>
                ) : null}
                <span
                  className={product.pricing.sellprice ? "has-sale-price" : ""}
                >
                  ${product.pricing.price.toFixed(2)}
                </span>
                {product.pricing.sellprice && (
                  <span className="save-price">
                    <span className="percantage-save">
                      (
                      {Math.round(
                        (100 / product.pricing.price) *
                          (product.pricing.price - product.pricing.sellprice)
                      )}
                      % off)
                    </span>
                  </span>
                )}
              </Typography>
            </div>

            {/* ==========Product Category ===========*/}
            {/* {product.categoryId &&
              product.categoryId.map((cat, index) => (
                <Typography
                  variant="button"
                  className="product-category"
                  key={index}
                >
                  {cat}
                  {product.categoryId.length - 1 === index ? "" : ","}
                </Typography>
              ))} */}

            <div className="custom-divider">
              <hr />
            </div>

            {/* ==========Product Short Desciprtion ===========*/}
            {product.short_description ? (
              <Typography variant="body1" className="product-description">
                {product.short_description}
              </Typography>
            ) : (
              <Typography variant="body1" className="product-description">
                Short Description Coming Soon
              </Typography>
            )}

            {/* ==========Product Attributes ===========*/}
            {product.attributed && (
              <Box
                component="div"
                className="select-attributed-wrapper margin-top-2"
              >
                <FormControl variant="filled" className="select-attributed">
                  <InputLabel htmlFor="size-option">Size</InputLabel>
                  <Select
                    onChange={(e) => console.log(e)}
                    inputProps={{
                      name: "size",
                      id: "size-option",
                    }}
                  >
                    <MenuItem value={10}>Small</MenuItem>
                    <MenuItem value={20}>Medium</MenuItem>
                    <MenuItem value={30}>Large</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled" className="select-attributed">
                  <InputLabel htmlFor="color-option">Color</InputLabel>
                  <Select
                    onChange={(e) => console.log(e)}
                    inputProps={{
                      name: "color",
                      id: "color-option",
                    }}
                  >
                    <MenuItem value={10}>Black</MenuItem>
                    <MenuItem value={20}>Red</MenuItem>
                    <MenuItem value={30}>Orange</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            {/* =======================================Product Qty and AddtoCart================================= */}
            <Box component="div">
              <Box component="div" className="qty-wrapper">
                <Box
                  component="div"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  className="qtyIncDecbtn"
                >
                  <Button onClick={() => setQty(qty - 1)} size="small">
                    <Icon>remove</Icon>
                  </Button>
                  <TextField
                    value={qty}
                    size="small"
                    onChange={handlechange}
                    type="number"
                  />
                  <Button onClick={() => setQty(qty + 1)} size="small">
                    <Icon>add</Icon>
                  </Button>
                </Box>
              </Box>
              <Box component="div" className="addto-cart-singleproduct">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(product)}
                  className="margin-top-2"
                  disabled={product.quantity < 1 ? true : false}
                  size="large"
                >
                  {product.cart ? "Added" : "Add To Cart"}
                </Button>
              </Box>
            </Box>

            {/* ==========Product SKU ===========*/}
            {product.sku && (
              <Typography
                variant="body2"
                className="product-sku margin-bottom-1"
              >
                <strong>SKU</strong>: {product.sku}
              </Typography>
            )}
            {product.quantity && (
              <Typography variant="overline" className="product-availablity">
                {product.quantity < 1 ? (
                  <span className="outofstock">
                    <Icon>sentiment_very_dissatisfied</Icon> Out of Stock
                  </span>
                ) : (
                  <span className="inStock">In Stock</span>
                )}
              </Typography>
            )}

            {/* =======================================Product Other Details================================= */}
            {product && (
              <ProductOtherDetails
                details={product}
                reviews={props.reviews}
                productId={product.id}
              />
            )}
            {/* =======================================End Product Other Details================================= */}
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(ProductDetail);
