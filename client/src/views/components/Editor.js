import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { EditorKey } from "../utils/apikey";
import { CircularProgress, Box } from "@material-ui/core";

const TinymceEditor = ({ value, onEditorChange }) => {
  const [show, setShow] = useState(false);
  const handleEditorChange = (e) => {
    onEditorChange(e.target.getContent());
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
    return () => {
      setShow(false);
    };
  }, []);

  return (
    <>
      {show ? (
        <Editor
          initialValue={value}
          apiKey={EditorKey}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline backcolor forecolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help | image | code",
            images_upload_url: "/api/files/upload",
            paste_data_images: true,
            convert_urls: false,
          }}
          onChange={handleEditorChange}
          onBlur={handleEditorChange}
        />
      ) : (
        <Box component='div' display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default TinymceEditor;
