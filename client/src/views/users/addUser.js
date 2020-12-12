import React, { Fragment, useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
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

var defaultObj = {
  id: "",
  name: "",
  email: "",
  role: "",
  password: "",
  image: "",
};

const AddUser = () => {
  const classes = viewStyles();
  const UsersState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [user, setuser] = useState(defaultObj);
  const [featureImage, setfeatureImage] = useState(null);

  useEffect(() => {
    document.forms[0].reset();
    setfeatureImage(null);
    setuser(defaultObj);
  }, [UsersState.users]);

  const fileChange = (e) => {
    setuser({ ...user, ['image']: e.target.files[0] });
    setfeatureImage(null);
    setfeatureImage(URL.createObjectURL(e.target.files[0]));
  };

  const addUser = (e) => {
    e.preventDefault();
    dispatch(userAddAction(user));
  };

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Alert />
      {UsersState.loading ? <Loading /> : null}

      <form>
        <TopBar
          title='Add User'
          onSubmit={addUser}
          submitTitle='Add'
          backLink={"/all-users"}
        />
        <Grid container spacing={3} className={classes.secondmainrow}>
          <Grid item xs={12}>
            <CardBlocks title='User Information' nomargin>
              <Grid container spacing={4}>
                <Grid item xl={2} lg={3} md={4} xs={12}>
                  <FeaturedImageComponent
                    image={featureImage}
                    feautedImageChange={(e) => fileChange(e)}
                    user
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box component='div' mb={2}>
                    <TextInput
                      value={user.name}
                      label='Name'
                      name='name'
                      onInputChange={handleChange}
                    />
                  </Box>
                  <Box component='div' mb={2}>
                    <TextInput
                      type='email'
                      value={user.email}
                      label='Email'
                      name='email'
                      onInputChange={handleChange}
                    />
                  </Box>
                  <Box component='div' mb={2}>
                    <PasswordInput
                      name='password'
                      value={user.password}
                      label='Password'
                      onInputChange={handleChange}
                    />
                  </Box>
                  <Box component='div'>
                    <SelectComponent
                      label='Role'
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
                      name='role'
                      value={user.role}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardBlocks>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default AddUser;


// Backup for user upload image
//   const [featureImage, setfeatureImage] = useState(null);

//   useEffect(() => {
//     document.forms[0].reset();
//     setfeatureImage(null);
//     setuser({});
//     setLabelWidth(inputLabel.current.offsetWidth);
//   }, [props.users.users]);

//   const addUser = e => {
//     e.preventDefault();
//     props.userAddAction(user);
//   };

//   const handleChange = e => {
//     setuser({ ...user, [e.target.name]: e.target.value });
//   };

//   const fileChange = e => {
//     setuser({ ...user, [e.target.name]: e.target.files[0] });
//     setfeatureImage(null);
//     setfeatureImage(URL.createObjectURL(e.target.files[0]));
//   };




  // {featureImage !== null && (
  //   <Box className={classes.feautedImageBox}>
  //     <img
  //       src={featureImage}
  //       className={classes.feautedImageBoxPreview}
  //       alt="user-thumbnail"
  //     />
  //   </Box>
  // )}
  // <Input
  //   className={classes.input}
  //   style={{ display: "none" }}
  //   id="image"
  //   type="file"
  //   onChange={fileChange}
  //   name="image"
  // />
  // <label htmlFor="image" className={classes.feautedImage}>
  //   {featureImage !== null
  //     ? "Change Featured Image"
  //     : "Set Featured Image"}
  // </label>
