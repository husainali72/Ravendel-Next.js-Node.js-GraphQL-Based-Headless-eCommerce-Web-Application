import React, { Fragment, useState, useEffect } from "react";
import TinymceEditor from "./TinymceEditor.js";
import {
  Button,
  Row,
  Col,
  CardHeader,
  CardBody,
  Card,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { connect } from "react-redux";
import { blogUpdateAction } from "../../store/action/";
import jumpTo, { go } from "../../utils/navigation";
import Alert from "../utils/Alert";

const EditBlog = props => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    status: "Publish",
    feature_image: ""
  });

  const updateBlog = e => {
    e.preventDefault();
    console.log(blog);
    props.blogUpdateAction(blog);
  };

  useEffect(() => {
    props.blogs.blogs.map(editblog => {
      if (editblog.id == props.match.params.id) {
        setBlog({ ...editblog });
      }
    });
  }, [props.blogs.blogs]);

  useEffect(() => {
    if (props.blogs.blog.content != undefined) {
      setBlog({ ...blog, content: props.blogs.blog.content });
    }
  }, [props.blogs.blog.content]);

  const handleChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const fileChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.files[0] });
  };

  return (
    <Fragment>
      <Alert />
      <Card>
        <CardHeader>
          <strong>
            <i className="icon-plus pr-1"></i>&nbsp; Edit Blog
          </strong>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={blog.title}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Label for="content">Content</Label>
                <TinymceEditor value={blog.content} />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={3}>
                <div className="avatar">
                  <img
                    src={blog.feature_image && blog.feature_image.thumbnail}
                    className="img-avatar"
                  />
                </div>
                <FormGroup>
                  <Label for="featured-image">Featured image</Label>
                  <Input
                    type="file"
                    name="updatedImage"
                    onChange={fileChange}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="role">Status</Label>
                  <Input
                    type="select"
                    name="status"
                    value={blog.status}
                    onChange={handleChange}
                    multiple={false}
                  >
                    <option value="Publish">Publish</option>
                    <option value="Draft">Draft</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={12}>
                <Button color="primary" className="mr-2" onClick={updateBlog}>
                  Save
                </Button>
                <Button onClick={() => jumpTo("/all-blogs")}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { blogs: state.blogs };
};

const mapDispatchToProps = {
  blogUpdateAction
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
