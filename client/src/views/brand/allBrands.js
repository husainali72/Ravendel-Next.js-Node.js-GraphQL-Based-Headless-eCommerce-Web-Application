import React, { useState, useEffect } from "react";

import { useTheme } from "@mui/material/styles";

import { isEmpty } from "../../utils/helper";
import { brandsAction, } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
import { get } from 'lodash'
import TableComponent from "../components/table.js";
const AllbrandComponent = () => {
  const dispatch = useDispatch();
  const Brands = useSelector((state) => state.brands);
  const [tablehead, setTableHead] = useState([])
  const [Allorder, setAllorder] = useState([])
  useEffect(() => {
    if (isEmpty(Brands.brands)) {
      dispatch(brandsAction());
    }
  }, []);
  useEffect(() => {
    if (!isEmpty(get(Brands, 'brands'))) {
      let data = []
      Brands.brands.map((brand) => {

        let object = {
          id: brand.id,

          date: brand.date,
          name: brand.name,

        }
        data.push(object)
      })

      setAllorder([...data])

      let columndata = [
        { name: "date", title: "date", sortingactive: true },
        { name: "name", title: "Name", sortingactive: true },
        { name: "actions", title: "Actions", sortingactive: false }]
      setTableHead(columndata)
    }
  }, [get(Brands, 'brands')])



  return (
    <>
      <TableComponent
        loading={Brands.loading}
        columns={tablehead}
        rows={Allorder}
        editpage='edit-brand'
        addpage='add-brand'
        title="All Brands"
      />

    </>
  );
};

export default function AllBrands() {
  return (
    <ThemeProvider theme={theme}>
      <AllbrandComponent />
    </ThemeProvider>
  );
}
