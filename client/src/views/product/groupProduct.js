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
import { groupProductDeleteAction, groupProductsAction } from "../../store/action/groupProductAction";


const GroupProductComponent = () => {
  const classes = viewStyles()
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const groupProducts = useSelector((state) => state.groupProducts);
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
      name: "title",
      title: "Title",
      sortingactive: true
    },
    {
      name: "productCounts",
      title: "Products",
      sortingactive: true
    },
    {

      name: "actions",
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {
          navigate(`${client_app_route_url}edit-group/${id}`, { state: { editMode: true } })
        } else if (type === "delete") {
          dispatch(groupProductDeleteAction(id))
        }
      }
    }]


  useEffect(() => {
    dispatch(groupProductsAction());
  }, []);

  useEffect(() => {
    if (!isEmpty(get(groupProducts, 'groupProducts'))) {
      let data = []

      groupProducts.groupProducts.map((product) => {
        let object = {
          id: product.id,
          title: product?.title,
          // date: product.date,
          // status: product.status,
          // name: product.name,
          productCounts: product?.productIds ? (product?.productIds?.length || 0) : 0
        }
        data.push(object)
      })
      setAllproduct(data)
      setfilterdData(data)

    } else {
      setAllproduct([])
      setfilterdData([])
    }

  }, [get(groupProducts, 'groupProducts')])

  // useEffect(() => {
  //   setAllproduct(groupData)
  //   setfilterdData(groupData)
  // }, [])
  

  const handleOnChangeSearch = (filtereData) => {

    setfilterdData(filtereData)
  }

  return (
    <>

      <Grid container spacing={0} className={classes.mainrow}>
        <Grid item xl={12} md={12} >
          <TableComponent
            loading={groupProducts.loading}
            columns={columndata}
            rows={filtered}
            searchdata={Allproducts}
            handleOnChangeSearch={handleOnChangeSearch}
            // statusTabData={statusTabData}
            addpage='add-group'
            showDeleteButton={true}
            searchbydate={true}
            title="Group Products"
          />
        </Grid>
      </Grid >
    </>

  );
}
export default function GroupProducts() {
  return (
    <ThemeProvider theme={theme}>
      <GroupProductComponent />
    </ThemeProvider>
  );
}
