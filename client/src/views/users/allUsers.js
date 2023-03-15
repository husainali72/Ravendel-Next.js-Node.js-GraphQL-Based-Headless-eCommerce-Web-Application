import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { isEmpty, client_app_route_url } from "../../utils/helper";
import { bucketBaseURL } from "../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import { userDeleteAction, usersAction } from "../../store/action";
import theme from "../../theme/index";
import TableComponent from "../components/table";
import { get } from 'lodash'
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/actionbutton";
import viewStyles from "../viewStyles";
const AllUsersComponent = () => {

  const UsersState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const classes = viewStyles()
  const [AllUsers, setAllUsers] = useState([])
  const [filtered, setfilterdData] = useState([])
  const statusTabData = {
    name: 'role',
    array: ['All', 'USER', 'EDITOR', 'MANAGER', 'SUBSCRIBER', 'AUTHOR']
  }
  const columndata = [
    {
      name: "image",
      title: "image",
      sortingactive: false
    },
    {
      name: "name",
      title: "name ",
      sortingactive: true
    },
    {
      name: "email",
      title: "email ",
      sortingactive: true
    },
    {
      name: "role",
      title: "role ",
      sortingactive: true
    },
    {
      name: "actions",
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {
          navigate(`${client_app_route_url}edit-user/${id}`)
        } else if (type === "delete") {
          dispatch(userDeleteAction(id))
        }
      }
    }]
  useEffect(() => {
    if (isEmpty(UsersState.users)) {
      dispatch(usersAction());
    }
  }, []);
  useEffect(() => {
    if (!isEmpty(get(UsersState, 'users'))) {
      let data = []
      UsersState.users.map((user) => {
        let object = {
          id: user.id,
          image: bucketBaseURL + user.image,
          name: user.name,
          email: user.email,
          role: user.role
        }
        data.push(object)
      })
      setAllUsers(data)
      setfilterdData(data)

    } else {
      setAllUsers([])
      setfilterdData([])
    }
  }, [get(UsersState, 'users')])
  const handleOnChangeSearch = (filtereData) => {
    setfilterdData(filtereData)
  }
  return (
    <>
      <Grid container spacing={0} className={classes.mainrow}>
        <Grid item xl={12} md={12} >
          <TableComponent
            loading={UsersState.loading}
            columns={columndata}
            rows={filtered}
            statusTabData={statusTabData}
            showDeleteButton={true}
            searchdata={AllUsers}
            handleOnChangeSearch={handleOnChangeSearch}
            addpage='add-user'
            searchbydate={false}
            title="All Users" />
        </Grid>
      </Grid >
    </>
  );
};

export default function AllUsers() {
  return (
    <ThemeProvider theme={theme}>
      <AllUsersComponent />
    </ThemeProvider>
  );
}
