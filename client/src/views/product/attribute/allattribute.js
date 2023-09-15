import React, { useEffect, useState } from "react";
import viewStyles from "../../viewStyles";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { attributeDeleteAction } from "../../../store/action";
import { attributesAction } from "../../../store/action";
import { isEmpty, client_app_route_url } from "../../../utils/helper";
import { get } from 'lodash'
import theme from "../../../theme";
import { ThemeProvider } from "@mui/material/styles";
import TableComponent from "../../components/table";
import ActionButton from "../../components/actionbutton";
const AllAttributeComponent = () => {
  const dispatch = useDispatch();
  const classes = viewStyles()
  const attributeState = useSelector((state) => state.productAttributes);
  const [filtered, setfilterdData] = useState([])
  const navigate = useNavigate()
  const [AllAttribute, setAllAttributes] = useState([]);
  const columndata = [
    {
      name: 'name',
      title: "name",
      sortingactive: true
    },
    {
      name: 'values',
      title: "Values",
      sortingactive: true
    },
    {
      name: 'actions',
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {
          navigate(`${client_app_route_url}edit-attribute/${id}`)
        } else if (type === "delete") {
          dispatch(attributeDeleteAction(id))
        }
      }
    },]
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
      setfilterdData(data)
    } else {
      setAllAttributes([])
      setfilterdData([])
    }
  }, [get(attributeState, 'attributes')])
  const handleOnChangeSearch = (filtereData) => {
    setfilterdData(filtereData)
  }

  return (
    <>
      <Grid container spacing={0} className={classes.mainrow}>
        <Grid item xl={12} md={12} >
          <TableComponent
            loading={attributeState.loading}
            columns={columndata}
            rows={filtered}
            searchdata={AllAttribute}
            handleOnChangeSearch={handleOnChangeSearch}
            addpage='add-attribute'
            title="All Attributes"
            showDeleteButton={true}
            searchbydate={false}
          />
        </Grid>
      </Grid >
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
