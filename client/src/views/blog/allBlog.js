import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Spinner,
  Row,
  Table,
  Button
} from "reactstrap";

import { connect } from "react-redux";
import { blogsAction, blogDeleteAction } from "../../store/action/";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import Alert from "../utils/Alert";

const AllBlogs = props => {
  useEffect(() => {
    if (isEmpty(props.blogs.blogs)) {
      props.blogsAction();
    }
  }, []);

  return (
    <Fragment>
      <Alert />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <strong>
                <i className="icon-pin pr-1"></i>&nbsp; All Blogs
                {props.blogs.loading && (
                  <Spinner
                    style={{ width: "3rem", height: "3rem" }}
                    color="info"
                  />
                )}
              </strong>
            </CardHeader>
            <CardBody>
              <Table
                hover
                responsive
                className="table-outline mb-0 d-none d-sm-table"
              >
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">
                      <i className="icon-pin"></i>
                    </th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {props.blogs.blogs.map((blog, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        <div className="avatar">
                          <img
                            src={
                              blog.feature_image && blog.feature_image.thumbnail
                            }
                            className="img-avatar"
                          />
                        </div>
                      </td>
                      <td>
                        <div>{blog.title}</div>
                      </td>
                      <td>
                        <div>{blog.date}</div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-pill btn-primary mr-2"
                          onClick={() => jumpTo(`edit-blog/${blog.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-pill btn-danger mr-2"
                          onClick={() => props.blogDeleteAction(blog.id)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-pill btn-primary"
                          disabled
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { blogs: state.blogs };
};

const mapDispatchToProps = {
  blogsAction,
  blogDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBlogs);
