import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSettings, productDeleteAction, productsAction } from "../../store/action";
import { baseUrl, client_app_route_url, getBaseUrl } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { isEmpty } from "../../utils/helper";
import { bucketBaseURL } from "../../utils/helper";
import { ThemeProvider, } from "@mui/material/styles";
import ActionButton from "../components/actionbutton";
import theme from "../../theme/index";
import { get } from "lodash";
import TableComponent from "../components/table";
import NoImagePlaceHolder from "../../assets/images/NoImagePlaceHolder.png";
import viewStyles from "../viewStyles";
const AllproductComponent = () => {
  const classes = viewStyles()
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const setting = useSelector((state) => state.settings)
  const navigate = useNavigate()
  const [Allproducts, setAllproduct] = useState([])
  const [filtered, setfilterdData] = useState([])
  const statusTabData = {
    name: 'status',
    array: ['All', 'Publish', 'Draft']
  }
  const columndata = [
    {
      name: "image",
      type: "image",
      title: "image",
      sortingactive: false
    },
    {
      name: "name",
      type: "name",
      title: "Name",
      sortingactive: true
    },
    {
      name: "brand",
      type: "brand",
      title: "Brand",
      sortingactive: true
    },
    {
      name: "date",
      type: "date",
      title: "date",
      sortingactive: true
    },
    {
      name: "status",
      type: "badge",
      title: "Status",
      sortingactive: true
    },
    {

      name: "actions",
      type: "actions",
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {
          navigate(`${client_app_route_url}edit-product/${id}`, { state: { editMode: true } })
        } else if (type === "delete") {
          dispatch(productDeleteAction(id))
        }
      }
    }]


  useEffect(() => {
    dispatch(productsAction());

  }, []);

  useEffect(() => {
    if (!isEmpty(get(products, 'products'))) {
      let data = []

      products.products.map((product) => {
        const { brand, _id, feature_image, date, status, name} = product
        let object = {
          id:  _id,
          image:feature_image || NoImagePlaceHolder,
          date: date,
          brand: get(brand,'name',''),
          status: status,
          name: name,
        }
        data.push(object)
      })
      setAllproduct(data)
      setfilterdData(data)

    } else {
      setAllproduct([])
      setfilterdData([])
    }

  }, [get(products, 'products')])

  const handleOnChangeSearch = (filtereData) => {

    setfilterdData(filtereData)
  }

  return (
    <>

      <Grid container spacing={0} className={classes.mainrow}>
        <Grid item xl={12} md={12} >
          <TableComponent
            loading={products.loading}
            columns={columndata}
            rows={filtered}
            searchdata={Allproducts}
            handleOnChangeSearch={handleOnChangeSearch}
            statusTabData={statusTabData}
            addpage='add-product'
            showDeleteButton={true}
            searchbydate={true}
            title="All Products"
          />
        </Grid>
      </Grid >
    </>

  );
}
export default function AllProduct() {
  return (
    <ThemeProvider theme={theme}>
      <AllproductComponent />
    </ThemeProvider>
  );
}
