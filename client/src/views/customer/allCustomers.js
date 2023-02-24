import React, { useEffect, useState } from "react";
import { customerDeleteAction, customersAction, } from "../../store/action";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import ActionButton from "../components/actionbutton";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, } from "@mui/material/styles";
import theme from "../../theme/index";
import { get } from 'lodash'
import TableComponent from "../components/table";
import { useNavigate } from "react-router-dom";
const AllCustomersComponent = () => {


  const dispatch = useDispatch();
  const Customers = useSelector((state) => state.customers);
  const [AllCustomers, setAllCustomer] = useState([])
  const [filtered, setfilterdData] = useState([])
  const navigate = useNavigate()
  const columndata = [{ name: "date", title: "date", sortingactive: true },
  { name: "name", title: "Customer Name", sortingactive: true },
  { name: "email", title: "Email", sortingactive: true },
  {
    name: "actions", title: "Actions", sortingactive: false, component: ActionButton,
    buttonOnClick: (type, id) => {
      if (type === 'edit') {
        navigate(`${client_app_route_url}edit-customer/${id}`)
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
      Customers.customers.map((customer) => {

        let object = {
          id: customer.id,
          date: customer.date,
          name: customer.first_name + " " + customer.last_name,
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
      <TableComponent
        loading={Customers.loading}
        columns={columndata}
        rows={filtered}
        searchdata={AllCustomers}
        handleOnChangeSearch={handleOnChangeSearch}
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
