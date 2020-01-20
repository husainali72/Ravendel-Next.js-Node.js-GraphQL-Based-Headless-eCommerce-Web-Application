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
import { blogAddAction } from "../../store/action/";
import jumpTo, { go } from "../../utils/navigation";
import Alert from "../utils/Alert";

const AddBlog = props => {
  const [blog, setBlog] = useState({
    status: "Publish"
  });

  useEffect(() => {
    if (props.blogs.success) {
      document.forms[0].reset();
      setBlog({
        status: "Publish"
      });
    }
  }, [props.blogs.success]);

  useEffect(() => {
    if (props.blogs.blog.content != undefined) {
      setBlog({ ...blog, content: props.blogs.blog.content });
    }
  }, [props.blogs.blog.content]);

  const addBlog = e => {
    e.preventDefault();
    console.log(blog);
    props.blogAddAction(blog);
  };

  const handleChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const fileChange = e => {
    //console.log(e.target.files[0]);
    setBlog({ ...blog, [e.target.name]: e.target.files[0] });
  };

  return (
    <Fragment>
      <Alert />
      <Card>
        <CardHeader>
          <strong>
            <i className="icon-plus pr-1"></i>&nbsp; Add Blog
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
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Label for="content">Content</Label>
                <TinymceEditor />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={3}>
                <FormGroup>
                  <Label for="featured-image">Featured image</Label>
                  <Input
                    type="file"
                    name="feature_image"
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
                <Button color="primary" className="mr-2" onClick={addBlog}>
                  Save
                </Button>
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
  blogAddAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);
