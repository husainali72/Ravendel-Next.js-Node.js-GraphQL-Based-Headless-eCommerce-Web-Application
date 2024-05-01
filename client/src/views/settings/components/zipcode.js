import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../../utils/helper";
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ActionButton from "../../components/actionbutton";
import theme from "../../../theme/index";
import { capitalize, get } from "lodash";
import TableComponent from "../../components/table";
import viewStyles from "../../viewStyles";
import DialogBox from "./setting-components/dialogBox";
import { useForm } from "react-hook-form";
import {
  getZipCode,
  zipCodeAddAction,
  zipCodeDeleteAction,
  zipCodeUpdateAction,
  zipCodeUploadFileAction,
} from "../../../store/action/settingAction";
import FileImportButton from "./setting-components/importFileButton";
import { showAlertModal } from "../../components/alertModel";
var defaultobj = {
  id: "",
  zipcode: "",
};
const ZipCodesComponent = () => {
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [zipcode, setzipcode] = useState(defaultobj);
  const [allZipcode, setAllZipcode] = useState([]);
  const [filtered, setfilterdData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [loading, setloading] = useState(false);
  const columndata = [
    {
      name: "zipcodes",
      title: "Zipcodes",
      sortingactive: false,
    },
    {
      name: "actions",
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === "edit") {
          setOpen(true);
          setEdit(true);
          dispatch(getZipCode(id));
        } else if (type === "delete") {
          dispatch(zipCodeDeleteAction(id));
        }
      },
    },
  ];
  const onAdd = (data) => {
    setOpen(false);
    setEdit(false);
    let zip = { zipcode: zipcode?.zipcode };
    dispatch(zipCodeAddAction(zip));
    setzipcode(defaultobj);
  };

  const onUpdate = (data) => {
    setOpen(false);
    setEdit(false);
    let zip = zipcode;
    dispatch(zipCodeUpdateAction(zip));
    setzipcode(defaultobj);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: edit ? onUpdate : onAdd,
  });

  const handleClose = () => {
    clearErrors("zip");
    setEdit(false);
    setOpen(false);
    setzipcode(defaultobj);
  };
  useEffect(() => {
    if (!isEmpty(get(settingState, "loading"))) {
      setloading(get(settingState, "loading"));
    }
  }, [get(settingState, "loading")]);
  useEffect(() => {
    const settings = get(settingState, "settings", {});
    if (!isEmpty(settings)) {
      if (Array.isArray(get(settings, "zipcode"))) {
        let data = [];
        get(settingState, "settings.zipcode", [])
          ?.reverse()
          ?.map((zipcode) => {
            let object = {
              id: zipcode?.id,
              zipcodes: zipcode?.zipcode,
            };
            data.push(object);
          });
        setAllZipcode(data);
        setfilterdData(data);
      } else {
        setzipcode(get(settingState, "settings"));
      }
    } else {
      setAllZipcode([]);
      setfilterdData([]);
    }
  }, [get(settingState, "settings")]);

  const handleOnChangeSearch = (filtereData) => {
    setfilterdData(filtereData);
  };
  const uploadZipFile = (zipFile) => {
    dispatch(zipCodeUploadFileAction(zipFile));
  };

  const handlechange = (e, type) => {
    if (type && type === "file") {
      const file = get(e, "target.files[0]");
      if (file) {
        showAlertModal({
          title: `Are you sure you want to upload ${capitalize(file?.name)} file?`,
          showCancelButton: true,
          confirmButtonText: "Upload",
          confirmButtonColor:"#154050",
          ConfirmedButton: () => uploadZipFile(file),
        });
      }
    } else if (get(e, "target.value")?.length <= 10) {
      setzipcode({ ...zipcode, ["zipcode"]: get(e, "target.value") });
    }
  };
  const AddZipCodeDialogBox = () => {
    setOpen(true);
  };
  return (
    <>
      <DialogBox
        open={open}
        handleClose={handleClose}
        title={edit ? "Edit Zipcode " : "Add zip code"}
        onInputChange={handlechange}
        value={get(zipcode, "zipcode")}
        name="zipcode"
        label={edit ? "Edit Zipcode " : "Add zip code"}
        buttonTitle={edit ? "Update" : "Add"}
        onSubmit={edit ? onUpdate : onAdd}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
      />
      <Grid container spacing={0}>
        <Grid item xl={5} md={1}>
          <TableComponent
            loading={loading}
            columns={columndata}
            rows={filtered}
            searchdata={allZipcode}
            handleOnChangeSearch={handleOnChangeSearch}
            AddZipCodeDialogBox={AddZipCodeDialogBox}
            addDialogBox="add-zipcode"
            headerButtons={[
              {
                type: "input",
                component: (
                  <FileImportButton
                    handleFileChange={(e, type) => handlechange(e, type)}
                  />
                ),
              },
            ]}
            showDeleteButton={true}
            searchbydate={false}
            title="All zip codes"
          />
        </Grid>
      </Grid>
    </>
  );
};
export default function ZipCodes() {
  return (
    <ThemeProvider theme={theme}>
      <ZipCodesComponent />
    </ThemeProvider>
  );
}
