import React, { useState, useEffect } from "react";
import theme from "../../../theme/index.js";
import { ThemeProvider, } from "@mui/material/styles";
import TableComponent from "../../components/table.js";
import ActionButton from "../../components/actionbutton.js";

const AllShippingComponentComponent = ({
  shippingState,
  editShippingForm,
  deleteShipping,
}) => {
  const [Allshipping, setAllshipping] = useState([])
  const [filtered, setfilterdData] = useState([])
  const columndata = [
    { name: 'name', title: "Name", sortingactive: true },
    { name: 'amount', title: "amount", sortingactive: true },
    {
      name: 'actions', title: "Actions", sortingactive: false, component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {

          let shipping = Allshipping.find(item => item.id === id);

          editShippingForm(shipping)

        } else if (type === "delete") {
          deleteShipping(id)
        }
      }
    },]

  useEffect(() => {

    let data = []
    shippingState.shipping.shipping_class.map((shipping) => {

      let object = {
        id: shipping._id,
        amount: shipping.amount,
        name: shipping.name,

      }
      data.push(object)
    })
    setAllshipping(data)
    setfilterdData(data)

  }, [shippingState.shipping.shipping_class])
  const handleOnChangeSearch = (filtereData) => {

    setfilterdData(filtereData)
  }
  return (
    <TableComponent
      loading={shippingState.loading}
      columns={columndata}
      rows={filtered}
      searchdata={Allshipping}
      handleOnChangeSearch={handleOnChangeSearch}

      classname="noclass"
      title="All Shippings"
    />

  );
};

const AllShippingComponent = ({
  shippingState,
  editShippingForm,
  deleteShipping,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <AllShippingComponentComponent
        shippingState={shippingState}
        editShippingForm={editShippingForm}
        deleteShipping={deleteShipping}
      />
    </ThemeProvider>
  );
};
export default AllShippingComponent;
