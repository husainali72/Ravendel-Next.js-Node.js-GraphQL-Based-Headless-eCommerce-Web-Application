import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateAction, usersAction } from "../../store/action";
import {
  isEmpty,
  client_app_route_url,
  bucketBaseURL,
} from "../../utils/helper";
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
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
var defaultObj = {
  id: "",
  name: "",
  email: "",
  role: "",
  password: "",
};

const EditUserComponent = (props) => {
  const USER_ID =
    props.match.params && props.match.params.id ? props.match.params.id : "";
  const classes = viewStyles();
  const UsersState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [user, setuser] = useState(defaultObj);
  const [featureImage, setfeatureImage] = useState(null);

  useEffect(() => {
    if (isEmpty(UsersState.users)) {
      dispatch(usersAction());
    }
  }, []);

  useEffect(() => {
    document.forms[0].reset();
    setuser(defaultObj);
    UsersState.users.map((edituser) => {
      if (edituser.id === USER_ID) {
        setuser({ ...edituser });
        if (edituser.image && edituser.image.original) {
          setfeatureImage(bucketBaseURL + edituser.image.original);
        }
      }
    });
  }, [UsersState.users]);

  const fileChange = (e) => {
    setuser({ ...user, ["updatedImage"]: e.target.files[0] });
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
  };

  const updateUser = (e) => {
    e.preventDefault();
    dispatch(userUpdateAction(user));
  };

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Alert />
      {UsersState.loading ? <Loading /> : null}

      <form>
        <TopBar
          title="Edit Users"
          onSubmit={updateUser}
          submitTitle="Update"
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
                        "User",
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

export default function EditUser() {
  return (
    <ThemeProvider theme={theme}>
      <EditUserComponent />
    </ThemeProvider>
  );
}
