import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pageDeleteAction, pagesAction, } from "../../store/action";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import { get } from 'lodash'
import TableComponent from "../components/table";
import theme from "../../theme/index";
import ActionButton from "../components/actionbutton";
const AllPagesComponent = () => {

  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.pages);
  const [Allpages, setAllpages] = useState([])

  const navigate = useNavigate()
  const columndata = [{ name: "date", title: "date", sortingactive: true },

  { name: "name", title: "Name ", sortingactive: true },

  {
    name: "actions", title: "Actions", sortingactive: false, component: ActionButton,
    buttonOnClick: (type, id) => {
      if (type === 'edit') {
        navigate(`${client_app_route_url}edit-page/${id}`)
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
          name: page.title

        }
        data.push(object)
      })

      setAllpages(data)

    }
    else {
      setAllpages([])

    }


  }, [get(pageState, 'pages')])


  return (
    <>
      <TableComponent
        loading={pageState.loading}
        columns={columndata}
        rows={Allpages}


        addpage='add-page'
        title="All pages"

      />


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
