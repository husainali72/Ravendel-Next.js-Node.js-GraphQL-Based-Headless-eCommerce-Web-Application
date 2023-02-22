import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils/helper";
import viewStyles from "../viewStyles";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { couponsAction } from "../../store/action";
import { get } from 'lodash'
import TableComponent from "../components/table";
const AllCouponsTheme = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const Coupons = useSelector((state) => state.coupons);
  const [Allcoupon, setAllcoupon] = useState([])

  const columndata = [
    { name: "code", title: "Code", sortingactive: true },
    { name: "discount_value", title: "Discount Value", sortingactive: true },
    { name: "discount_type", title: "Discount type", sortingactive: true },
    { name: "expire", title: "Expire date", sortingactive: true },
    { name: "actions", title: "Actions", sortingactive: false }]
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
          expire: coupon.expire,
          discount_type: coupon.discount_type,
          discount_value: coupon.discount_value
        }
        data.push(object)
      })

      setAllcoupon([...data])



    }
  }, [get(Coupons, 'coupons')])

  return (
    <>
      <TableComponent
        loading={Coupons.loading}
        columns={columndata}
        rows={Allcoupon}
        editpage='edit-coupon'
        addpage='add-coupon'
        title="All Coupons"
      />


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
