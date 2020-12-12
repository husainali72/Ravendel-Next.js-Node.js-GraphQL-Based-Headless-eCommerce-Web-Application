import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
const TinymceEditor = (props) => {
  const handleEditorChange = (e) => {
    props.dispatch({
      type: "TINYMCE_SUCCESS",
      payload: { content: e.target.getContent() },
    });
  };

  return (
    <Editor
      initialValue={props.value}
      apiKey="fe3qpddmthniot1kdjkg6cxbyed9oq0kyvbnkl3mcqm2px4v"
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
  );
};

export default TinymceEditor;
