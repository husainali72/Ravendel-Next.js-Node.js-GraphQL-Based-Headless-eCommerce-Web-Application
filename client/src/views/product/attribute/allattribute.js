import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { attributeDeleteAction } from "../../../store/action";
import { attributesAction } from "../../../store/action";
import { isEmpty } from "../../../utils/helper";
import { get } from 'lodash'
import theme from "../../../theme";
import { ThemeProvider } from "@mui/material/styles";
import TableComponent from "../../components/table";
const AllAttributeComponent = () => {
  const dispatch = useDispatch();
  const attributeState = useSelector((state) => state.product_attributes);
  const columndata = [
    { name: 'name', title: "name", sortingactive: true },
    { name: 'values', title: "Values", sortingactive: true },

    { name: 'actions', title: "Actions", sortingactive: false },]
  const [AllAttribute, setAllAttributes] = useState([]);
  console.log(attributeState)

  useEffect(() => {
    dispatch(attributesAction());
  }, []);

  useEffect(() => {
    if (attributeState.render) {
      dispatch(attributesAction());
    }
  }, [attributeState.render]);
  useEffect(() => {
    if (!isEmpty(get(attributeState, 'attributes'))) {
      let data = []
      attributeState.attributes.map((attribute) => {

        let object = {
          id: attribute.id,
          values: attribute.values.map((val) => val.name).join(","),
          name: attribute.name,

        }
        data.push(object)
      })
      setAllAttributes(data)
    }
  }, [get(attributeState, 'attributes')])

  return (
    <>
      <TableComponent
        loading={attributeState.loading}
        columns={columndata}
        rows={AllAttribute}
        editpage='edit-attribute'
        addpage='add-attribute'
        title="All Attributes"
        deletefunction={attributeDeleteAction}
      />

    </>
  );
};

const AllAttribute = () => {
  return (
    <ThemeProvider theme={theme}>
      <AllAttributeComponent />
    </ThemeProvider>
  );
};
export default AllAttribute;
