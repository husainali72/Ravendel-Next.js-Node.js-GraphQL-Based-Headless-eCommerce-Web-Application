import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
const TinymceEditor = (props) => {
  const handleEditorChange_ = (e) => {
    props.onChangeEditor(e.target.getContent());
  };

  const handleEditorChange = (content) => {
    props.onChangeEditor(content);
  };

  return (
    <Editor
      apiKey="fe3qpddmthniot1kdjkg6cxbyed9oq0kyvbnkl3mcqm2px4v"
      value={props.value}
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
      onEditorChange={handleEditorChange}
    />
  );
};

export default connect()(TinymceEditor);
