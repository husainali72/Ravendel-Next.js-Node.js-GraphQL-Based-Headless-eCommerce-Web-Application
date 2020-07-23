import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
const TinymceEditor = (props) => {
  const handleEditorChange_ = (e) => {
    //console.log("Content was updated:", e.target.getContent());
    /* props.dispatch({
      type: "TINYMCE_DESCRIPTION",
      payload: { description: e.target.getContent() }
    }); */

    props.onChangeEditor(e.target.getContent());
  };

  const handleEditorChange = (content) => {
    props.onChangeEditor(content);
  };

  return (
    <Editor
      /*initialValue={props.value}*/
      /*apiKey="v2hjstbxulr41w4f0l84z1q1bdnvlvqylhg0wbpy5yo7xghu"*/
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
      /*onChange={handleEditorChange}*/
      onEditorChange={handleEditorChange}
      /*onBlur={handleEditorChange}*/
    />
  );
};

/* const mapStateToProps = state => {
  return { blogs: state.blogs };
}; */

//const mapDispatchToProps = dispatch => {};

export default connect()(TinymceEditor);
