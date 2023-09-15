import React, { useState, useEffect } from "react";
import theme from "../../../theme";
import TableComponent from "../../components/table";
import { ThemeProvider } from "@mui/material/styles";
import ActionButton from "../../components/actionbutton";
const AllTaxesComponents = ({ taxState, editTaxChange, deleteTaxChange }) => {
  const [Alltaxes, setAlltaxes] = useState([])
  const [filtered, setfilterdData] = useState([])
  const columndata = [
    {
      name: 'name',
      title: "Name",
      sortingactive: true
    },
    {
      name: 'percentage',
      title: "Percentage",
      sortingactive: true
    },
    {
      name: 'actions',
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {
          let tax = Alltaxes.find(item => item.id === id);
          editTaxChange(tax)
        } else if (type === "delete") {
          deleteTaxChange(id)
        }
      }
    },]
  useEffect(() => {
    let data = []
    taxState.tax.taxClass.map((tax) => {
      let object = {
        id: tax._id,
        percentage: tax.percentage,
        name: tax.name,
        system: tax.system
      }
      data.push(object)
    })
    setfilterdData(data)
    setAlltaxes(data)
  }, [taxState.tax.taxClass])
  const handleOnChangeSearch = (filtereData) => {
    setfilterdData(filtereData)
  }
  return (
    <TableComponent
      loading={taxState.loading}
      columns={columndata}
      rows={filtered}
      searchdata={Alltaxes}
      handleOnChangeSearch={handleOnChangeSearch}
      showDeleteButton={true}
      classname="table-container"
      title="All Taxes"
      searchbydate={false}
    />);
};
const AllTaxesComponent = ({ taxState, editTaxChange, deleteTaxChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <AllTaxesComponents
        taxState={taxState}
        editTaxChange={editTaxChange}
        deleteTaxChange={deleteTaxChange}
      />
    </ThemeProvider>
  );
};
export default AllTaxesComponent;
