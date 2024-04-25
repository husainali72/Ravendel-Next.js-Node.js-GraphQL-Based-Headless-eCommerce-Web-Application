import React, { useRef } from "react";
import viewStyles from "../../../viewStyles";
import { Button } from "@mui/material";

const FileImportButton = ({ handleFileChange }) => {
  const classes = viewStyles();
  const fileInputRef = useRef(null);
  const handleClick = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
    document.getElementById("fileInput").click();
  };
  return (
    <>
      <input
        type="file"
        id="fileInput"
        className="input_display"
        onChange={(e) => handleFileChange(e, "file")}
        ref={fileInputRef} 
      />
      <Button
        color="success"
        className={classes.importBtn}
        size="small"
        variant="contained"
        onClick={handleClick}
      >
        Import File
      </Button>
    </>
  );
};

export default FileImportButton;
