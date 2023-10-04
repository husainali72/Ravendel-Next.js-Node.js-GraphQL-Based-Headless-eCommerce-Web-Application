import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateAction, usersAction, userAddAction } from "../../store/action";
import {
  isEmpty,
  client_app_route_url,
  bucketBaseURL,
  getBaseUrl,
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
import { useNavigate, useParams } from "react-router-dom";
import { get } from "lodash";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
var defaultObj = {
  id: "",
  name: "",
  email: "",
  role: "",
  password: "",
  image: ""
};

const EditUserComponent = ({ params }) => {
  const userId = params.id || "";
  const classes = viewStyles();
  const navigate = useNavigate();
  const UsersState = useSelector((state) => state.users);
  const setting = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [user, setuser] = useState(defaultObj);
  const [featureImage, setfeatureImage] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (isEmpty(get(UsersState, "users"))) {
      dispatch(usersAction());
    }
  }, []);

  useEffect(() => {
    setloading(get(UsersState, "loading"));
  }, [get(UsersState, "loading")]);

  useEffect(() => {
    document.forms[0].reset();
    setuser(defaultObj);
    if (userId) {
      if (!isEmpty(get(UsersState, "users"))) {
        UsersState.users.map((edituser) => {
          if (edituser.id === userId) {
            setuser({ ...edituser });
            if (edituser.image) {
              setfeatureImage(getBaseUrl(setting) + edituser.image);
            }
          }
        });
      }
    } else {
      setuser(defaultObj)
      setfeatureImage(null)
    }
  }, [get(UsersState, "users"), userId]);

  const fileChange = (e) => {
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
    if (userId) {
      setuser({ ...user, ["updatedImage"]: e.target.files[0] });
    }
    else {
      setuser({ ...user, ["image"]: e.target.files[0] });
    }
  };

  const addUpdateUser = (e) => {
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
      if (userId) {
        dispatch(userUpdateAction(user, navigate));
      }
      else {
        dispatch(userAddAction(user, navigate));
      }
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
      {loading ? <Loading /> : null}

      <form>
        <TopBar
          title={userId ? "Edit Users" : "Add Users"}
          onSubmit={addUpdateUser}
          submitTitle={userId ? "Update" : "Add"}
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
                      value={user.role}
                      onSelecteChange={(val) =>
                        setuser({ ...user, ["role"]: val })
                      }
                      items={[
                        "SUBSCRIBER",
                        "MANAGER",
                        "EDITOR",
                        "AUTHOR",
                        "USER",
                      ]}
                      name="role"
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
  const params = useParams();
  return (
    <ThemeProvider theme={theme}>
      <EditUserComponent params={params} />
    </ThemeProvider>
  );
}
