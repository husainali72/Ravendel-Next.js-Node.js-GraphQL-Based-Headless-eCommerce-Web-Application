import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDeleteAction, productsAction } from "../../store/action";

import viewStyles from "../viewStyles";

import { isEmpty } from "../../utils/helper";

import { bucketBaseURL } from "../../utils/helper";
import { ThemeProvider, } from "@mui/material/styles";

import theme from "../../theme/index";
import { get } from "lodash";
import TableComponent from "../components/table";
import NoImagePlaceHolder from "../../assets/images/NoImagePlaceHolder.png";
const GlobalThemeOverride = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [Allproducts, setAllproduct] = useState([])
  const columndata = [
    { name: "image", title: "image", sortingactive: false },
    { name: "date", title: "date", sortingactive: true },
    { name: "name", title: "Name", sortingactive: true },
    { name: "actions", title: "Actions", sortingactive: false }]


  useEffect(() => {
    dispatch(productsAction());
  }, []);
  useEffect(() => {
    if (!isEmpty(get(products, 'products'))) {
      let data = []
      products.products.map((product) => {

        let object = {
          id: product._id,
          image: product.feature_image ? bucketBaseURL + product.feature_image : NoImagePlaceHolder,
          date: product.date,
          name: product.name,

        }
        data.push(object)
      })
      setAllproduct(data)
    }

  }, [get(products, 'products')])

  return (
    <>

      <TableComponent
        loading={products.loading}
        columns={columndata}
        rows={Allproducts}
        editpage='edit-product'
        addpage='add-product'
        title="All Products"
        deletefunction={productDeleteAction}
      />

    </>
  );
};

export default function AllProduct() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalThemeOverride />
    </ThemeProvider>
  );
}
