import React from "react";
import theme from "../../../theme/index.js";
import { ThemeProvider, } from "@mui/material/styles";
import TableComponent from "../../components/table.js";
const AllShippingComponentComponent = ({
  shippingState,
  editShippingForm,
  deleteShipping,
}) => {
  const columndata = [
    { name: 'name', title: "Name", sortingactive: true },
    { name: 'amount', title: "amount", sortingactive: true },
    { name: 'same_actions', title: "Actions", sortingactive: false },]

  return (
    <TableComponent
      loading={shippingState.loading}
      columns={columndata}
      rows={shippingState.shipping.shipping_class}
      classname="noclass"
      editfunction={editShippingForm}
      deletefunction={deleteShipping}
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
