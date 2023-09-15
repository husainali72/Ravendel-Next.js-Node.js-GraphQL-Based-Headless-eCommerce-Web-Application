import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { pageDeleteAction, pagesAction, } from "../../store/action";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import { get } from 'lodash'
import TableComponent from "../components/table";
import theme from "../../theme/index";
import ActionButton from "../components/actionbutton";
import viewStyles from "../viewStyles";
const AllPagesComponent = () => {
  const classes = viewStyles()
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.pages);
  const [Allpages, setAllpages] = useState([])
  const [filtered, setfilterdData] = useState([])
  const navigate = useNavigate()
  const statusTabData = {
    name: 'status',
    array: ['All', 'Publish', 'Draft']
  }
  const columndata = [
    {
      name: "date",
      title: "date",
      sortingactive: true
    },
    {
      name: "name",
      title: "Name ",
      sortingactive: true
    },
    {
      name: "status",
      title: "Status ",
      sortingactive: true
    },
    {
      name: "actions",
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {
          navigate(`${client_app_route_url}edit-page/${id}`, {state : {editMode: true}})
        } else if (type === "delete") {
          dispatch(pageDeleteAction(id))
        }
      }
    }]
  useEffect(() => {
    if (isEmpty(pageState.pages)) {
      dispatch(pagesAction());
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(get(pageState, 'pages'))) {
      let data = []
      pageState.pages.map((page) => {
        let object = {
          id: page.id,
          date: page.createdAt,
          name: page.title,
          status: page.status
        }
        data.push(object)
      })
      setAllpages(data)
      setfilterdData(data)
    }
    else {
      setAllpages([])
      setfilterdData([])
    }
  }, [get(pageState, 'pages')])
  const handleOnChangeSearch = (filtereData) => {
    setfilterdData(filtereData)
  }
  return (
    <>
      <Grid container spacing={0} className={classes.mainrow}>
        <Grid item xl={12} md={12} >
          <TableComponent
            loading={pageState.loading}
            columns={columndata}
            rows={filtered}
            searchdata={Allpages}
            handleOnChangeSearch={handleOnChangeSearch}
            addpage='add-page'
            title="All pages"
            statusTabData={statusTabData}
            showDeleteButton={true}
            searchbydate={true}
          />
        </Grid>
      </Grid >

    </>
  );
};

export default function AllPages() {
  return (
    <ThemeProvider theme={theme}>
      <AllPagesComponent />
    </ThemeProvider>
  );
}
