import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ActionButton from "../components/actionbutton";
import { useNavigate } from "react-router-dom";
import { isEmpty, client_app_route_url, bucketBaseURL } from "../../utils/helper";
import { brandDeleteAction, brandsAction, } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
import { get } from 'lodash'
import TableComponent from "../components/table.js";
import viewStyles from "../viewStyles";
const AllbrandComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const Brands = useSelector((state) => state.brands);
  const classes = viewStyles()
  const [Allbrand, setAllbrand] = useState([])
  const [filtered, setfilterdData] = useState([])
  let columndata = [
    {
      name: "image",
      title: "image",
      sortingactive: false
    },
    {
      name: "date",
      title: "date",
      sortingactive: true
    },
    {
      name: "name",
      title: "Name",
      sortingactive: true
    },
    {
      name: "actions",
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {
          navigate(`${client_app_route_url}edit-brand/${id}`)
        } else if (type === "delete") {
          dispatch(brandDeleteAction(id))
        }
      }
    }]
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
          image: bucketBaseURL + brand.brand_logo,
          date: brand.date,
          name: brand.name,
        }
        data.push(object)
      })
      setAllbrand(data)
      setfilterdData(data)
    } else {
      setAllbrand([])
      setfilterdData([])
    }
  }, [get(Brands, 'brands')])

  const handleOnChangeSearch = (filtereData) => {
    setfilterdData(filtereData)
  }
  return (
    <>
      <Grid container spacing={0} className={classes.mainrow}>
        <Grid item xl={12} md={12} >
          <TableComponent
            loading={Brands.loading}
            columns={columndata}
            rows={filtered}
            searchdata={Allbrand}
            handleOnChangeSearch={handleOnChangeSearch}
            showDeleteButton={true}
            editpage='edit-brand'
            addpage='add-brand'
            title="All Brands"
            searchbydate={true}
          />
        </Grid>
      </Grid >
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
