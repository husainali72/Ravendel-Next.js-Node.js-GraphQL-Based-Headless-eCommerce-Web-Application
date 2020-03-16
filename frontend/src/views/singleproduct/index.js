import React, { Fragment, useState } from "react";
import { Grid, Container, Divider } from "@material-ui/core";
import ProductDetail from "./productdetails";
import GalleryImages from "./galleryimages";
import ProductOtherDetails from "./productotherdetail";

const SingleProduct = () => {
  const [product, setProduct] = useState({
    title: "Product Title",
    price: 125,
    sale_price: 100,
    availablity: "In Stock",
    short_desc:
      "Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.",
    description:
      "Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.",
    categories: [
      {
        name: "Category First"
      },
      {
        name: "Category Second"
      },
      {
        name: "Category Third"
      }
    ],
    gallery_images: [
      {
        image:
          "https://colorlib.com/preview/theme/winter/img/product_details/prodect_details_1.png"
      },
      {
        image:
          "https://colorlib.com/preview/theme/winter/img/product_details/prodect_details_2.png"
      },
      {
        image:
          "https://colorlib.com/preview/theme/winter/img/product_details/prodect_details_3.png"
      },
      {
        image:
          "https://colorlib.com/preview/theme/winter/img/product_details/prodect_details_4.png"
      },
      {
        image:
          "https://colorlib.com/preview/theme/winter/img/product_details/prodect_details_1.png"
      },
      {
        image:
          "https://colorlib.com/preview/theme/winter/img/product_details/prodect_details_2.png"
      },
      {
        image:
          "https://colorlib.com/preview/theme/winter/img/product_details/prodect_details_3.png"
      },
      {
        image:
          "https://colorlib.com/preview/theme/winter/img/product_details/prodect_details_4.png"
      },
      {
        image:
          "https://colorlib.com/preview/theme/winter/img/product_details/prodect_details_1.png"
      },
      {
        image:
          "https://colorlib.com/preview/theme/winter/img/product_details/prodect_details_2.png"
      },
      {
        image:
          "https://colorlib.com/preview/theme/winter/img/product_details/prodect_details_3.png"
      },
      {
        image:
          "https://colorlib.com/preview/theme/winter/img/product_details/prodect_details_4.png"
      }
    ]
  });

  return (
    <Fragment>
      <Grid container>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          className="singleproduct-col singleproduct-leftside"
        >
          <GalleryImages galleryImages={product.gallery_images} />
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          className="singleproduct-col singleproduct-rightside"
        >
          <ProductDetail details={product} />
        </Grid>
      </Grid>
      <Divider />
      <Container>
        <ProductOtherDetails details={product} />
      </Container>
    </Fragment>
  );
};

export default SingleProduct;
