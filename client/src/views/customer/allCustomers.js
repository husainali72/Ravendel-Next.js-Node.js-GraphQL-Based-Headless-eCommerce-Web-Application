import React, { useEffect, useState } from "react";
import { customerDeleteAction, customersAction, } from "../../store/action";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import ActionButton from "../components/actionbutton";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, } from "@mui/material/styles";
import theme from "../../theme/index";
import { get } from 'lodash'
import { Grid } from "@mui/material";
import TableComponent from "../components/table";
import { useNavigate } from "react-router-dom";
import viewStyles from "../viewStyles";
const AllCustomersComponent = () => {
  const classes = viewStyles()
  const dispatch = useDispatch();
  const Customers = useSelector((state) => state.customers);
  const [AllCustomers, setAllCustomer] = useState([])
  const [filtered, setfilterdData] = useState([])
  const navigate = useNavigate()
  const columndata = [
    {
      name: "date",
      type: "date",
      title: "date",
      sortingactive: true
    },
    {
      name: "name",
      type: "text",
      title: "Customer Name",
      sortingactive: true
    },
    {
      name: "email",
      type: "email",
      title: "Email",
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
          navigate(`${client_app_route_url}edit-customer/${id}`, { state: { editMode: true } })
        } else if (type === "delete") {
          dispatch(customerDeleteAction(id))
        }
      }
    }]
  useEffect(() => {
    if (isEmpty(Customers.customers)) {
      dispatch(customersAction());
    }
  }, []);
  useEffect(() => {
    if (!isEmpty(get(Customers, 'customers'))) {
      let data = []
      Customers?.customers?.map((customer) => {
        let object = {
          id: customer.id,
          date: customer.date,
          name: customer.firstName + " " + customer.lastName,
          email: customer.email
        }
        data.push(object)
      })
      setfilterdData(data)
      setAllCustomer(data)
    } else {
      setAllCustomer([])
      setfilterdData([])
    }
  }, [get(Customers, 'customers')])
  const handleOnChangeSearch = (filtereData) => {
    setfilterdData(filtereData)
  }
  return (
    <>
      <Grid container spacing={0} className={classes.mainrow}>
        <Grid item xl={12} md={12} >
          <TableComponent
            loading={Customers.loading}
            columns={columndata}
            rows={filtered}
            searchdata={AllCustomers}
            handleOnChangeSearch={handleOnChangeSearch}
            addpage='add-customer'
            showDeleteButton={true}
            searchbydate={true}
            title="All Customers"
          />
        </Grid>
      </Grid >
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
