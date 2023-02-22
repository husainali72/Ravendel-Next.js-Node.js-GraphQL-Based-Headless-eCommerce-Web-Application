import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils/helper";
import { bucketBaseURL } from "../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import { usersAction } from "../../store/action";
import theme from "../../theme/index";
import TableComponent from "../components/table";
import { get } from 'lodash'
const AllUsersComponent = () => {

  const UsersState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [Allblogs, setAllblogs] = useState([])
  const columndata = [{ name: "image", title: "image", sortingactive: false },
  { name: "name", title: "name ", sortingactive: true },
  { name: "email", title: "email ", sortingactive: true },
  { name: "role", title: "role ", sortingactive: true },

  { name: "actions", title: "Actions", sortingactive: false }]
  const [tablehead, setTableHead] = useState([])


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

        setAllblogs([...data])

      })

      setTableHead(columndata)
    }
  }, [get(UsersState, 'users')])
  return (
    <>
      <TableComponent
        loading={UsersState.loading}
        columns={columndata}
        rows={Allblogs}
        editpage='edit-user'

        addpage='add-user'
        title="All Users"

      />
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
