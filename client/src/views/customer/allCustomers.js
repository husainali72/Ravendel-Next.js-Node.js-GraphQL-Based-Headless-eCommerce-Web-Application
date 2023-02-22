import React, { useEffect, useState } from "react";


import { customersAction, } from "../../store/action";
import { isEmpty } from "../../utils/helper";

import { useDispatch, useSelector } from "react-redux";

import { ThemeProvider, } from "@mui/material/styles";

import theme from "../../theme/index";

import { get } from 'lodash'
import TableComponent from "../components/table";
const AllCustomersComponent = () => {


  const dispatch = useDispatch();
  const Customers = useSelector((state) => state.customers);
  const [AllCustomers, setAllCustomer] = useState([])

  const columndata = [{ name: "date", title: "date", sortingactive: true },
  { name: "name", title: "Customer Name", sortingactive: true },
  { name: "actions", title: "Actions", sortingactive: false }]
  useEffect(() => {
    if (isEmpty(Customers.customers)) {
      dispatch(customersAction());
    }
  }, []);
  useEffect(() => {
    if (!isEmpty(get(Customers, 'customers'))) {
      let data = []
      Customers.customers.map((customer) => {
        console.log(customer)
        let object = {
          id: customer.id,
          date: customer.date,
          name: customer.first_name + " " + customer.last_name,
        }
        data.push(object)
      })

      setAllCustomer([...data])

    }



  }, [get(Customers, 'customers')])



  return (
    <>



      <TableComponent
        loading={Customers.loading}
        columns={columndata}
        rows={AllCustomers}
        editpage='edit-customer'
        addpage='add-customer'

        title="All Customers"

      />


    </>
  );
};

export default function AllCustomers() {
  return (
    <ThemeProvider theme={theme}>
      <AllCustomersComponent />
    </ThemeProvider>
  );
}
