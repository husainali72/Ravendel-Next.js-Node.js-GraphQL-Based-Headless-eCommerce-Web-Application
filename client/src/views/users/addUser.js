import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userAddAction } from "../../store/action";
import viewStyles from "../viewStyles";
import {
  Alert,
  Loading,
  TopBar,
  CardBlocks,
  PasswordInput,
  TextInput,
  FeaturedImageComponent,
  SelectComponent,
} from "../components";
import { useNavigate } from "react-router-dom";
import { client_app_route_url } from "../../utils/helper";
import { ThemeProvider } from "@mui/material/styles";
import { validate } from "../components/validate";
import { isEmpty } from "../../utils/helper";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
import theme from "../../theme";
var defaultObj = {
  id: "",
  name: "",
  email: "",
  role: "",
  password: "",
  image: "",
};

const AddUserComponent = () => {
  const classes = viewStyles();
  const UsersState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [user, setuser] = useState(defaultObj);
  const [featureImage, setfeatureImage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    document.forms[0].reset();
    setfeatureImage(null);
    setuser(defaultObj);
  }, [UsersState.users]);

  const fileChange = (e) => {
    setuser({ ...user, ["image"]: e.target.files[0] });
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
  };

  const addUser = (e) => {
    e.preventDefault();
    let errors = validate(["role", "password", 'email', "name"], user);

    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else {
      dispatch(userAddAction(user, navigate));

    }
  };

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const toInputLowercase = e => {
    e.target.value = ("" + e.target.value).toLowerCase();
  };

  return (
    <>
      <Alert />
      {UsersState.loading ? <Loading /> : null}

      <form>
        <TopBar
          title="Add User"
          onSubmit={addUser}
          submitTitle="Add"
          backLink={`${client_app_route_url}all-users`}
        />
        <Grid container spacing={3} className={classes.secondmainrow}>
          <Grid item xs={12}>
            <CardBlocks title="User Information" nomargin>
              <Grid container spacing={4}>
                <Grid item xl={2} lg={3} md={4} xs={12}>
                  <FeaturedImageComponent
                    image={featureImage}
                    feautedImageChange={(e) => fileChange(e)}
                    user
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box component="div" mb={2}>
                    <TextInput
                      value={user.name}
                      label="Name"
                      name="name"
                      onInputChange={handleChange}
                    />
                  </Box>
                  <Box component="div" mb={2}>
                    <TextInput
                      type="email"
                      value={user.email}
                      label="Email"
                      name="email"
                      onInputChange={handleChange}
                      onInput={toInputLowercase}
                    />
                  </Box>
                  <Box component="div" mb={2}>
                    <PasswordInput
                      name="password"
                      value={user.password}
                      label="Password"
                      onInputChange={handleChange}
                    />
                  </Box>
                  <Box component="div">
                    <SelectComponent
                      label="Role"
                      onSelecteChange={(val) =>
                        setuser({ ...user, ["role"]: val })
                      }
                      items={[
                        "Subscriber",
                        "Manager",
                        "Editor",
                        "Author",
                        "USER",
                      ]}
                      name="role"
                      value={user.role}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardBlocks>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default function AddUser() {
  return (
    <ThemeProvider theme={theme}>
      <AddUserComponent />
    </ThemeProvider>
  );
}
