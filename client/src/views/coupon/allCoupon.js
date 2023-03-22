import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { couponDeleteAction, couponsAction } from "../../store/action";
import { get } from 'lodash'
import ActionButton from "../components/actionbutton";
import TableComponent from "../components/table";
import viewStyles from "../viewStyles";
import { convertDateToStringFormat } from "../utils/convertDate";
const AllCouponsTheme = () => {
  const classes = viewStyles()
  const dispatch = useDispatch();
  const Coupons = useSelector((state) => state.coupons);
  const [Allcoupon, setAllcoupon] = useState([])
  const [filtered, setfilterdData] = useState([])
  const navigate = useNavigate()
  const columndata = [
    {
      name: "code",
      title: "Code",
      sortingactive: true
    },
    {
      name: "discount_value",
      title: "Discount Value",
      sortingactive: true
    },
    {
      name: "discount_type",
      title: "Discount type",
      sortingactive: true
    },
    {
      name: "date",
      title: "Expire date",
      sortingactive: true
    },
    {
      name: "actions",
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {
          navigate(`${client_app_route_url}edit-coupon/${id}`)
        } else if (type === "delete") {
          dispatch(couponDeleteAction(id))
        }
      }
    }]
  useEffect(() => {
    if (isEmpty(Coupons.coupons)) {
      dispatch(couponsAction());

    }
  }, []);
  useEffect(() => {
    if (!isEmpty(get(Coupons, 'coupons'))) {
      let data = []
      Coupons.coupons.map((coupon) => {
        let object = {
          id: coupon.id,
          code: coupon.code,
          date: coupon.expire,
          discount_type: coupon.discount_type,
          discount_value: coupon.discount_value
        }
        data.push(object)
      })
      setAllcoupon(data)
      setfilterdData(data)
    } else {
      setAllcoupon([])
      setfilterdData([])
    }
  }, [get(Coupons, 'coupons')])
  const handleOnChangeSearch = (filtereData) => {
    setfilterdData(filtereData)
  }
  return (
    <>
      <Grid container spacing={0} className={classes.mainrow}>
        <Grid item xl={12} md={12} >
          <TableComponent
            loading={Coupons.loading}
            columns={columndata}
            rows={filtered}
            searchdata={Allcoupon}
            handleOnChangeSearch={handleOnChangeSearch}
            editpage='edit-coupon'
            addpage='add-coupon'
            title="All Coupons"
            searchbydate={true}
            showDeleteButton={true}
          />
        </Grid>
      </Grid >

    </>
  );
};

const AllCoupons = () => {
  return (
    <ThemeProvider theme={theme}>
      <AllCouponsTheme />
    </ThemeProvider>
  );
};
export default AllCoupons;
