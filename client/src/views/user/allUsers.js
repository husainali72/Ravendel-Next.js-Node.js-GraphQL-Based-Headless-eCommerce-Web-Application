import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Spinner,
  Toast,
  ToastBody,
  ToastHeader
} from "reactstrap";
import { connect } from "react-redux";
import { usersAction, userDeleteAction } from "../../store/action/";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import Alert from "../utils/Alert";

const AllUsers = props => {
  useEffect(() => {
    if (isEmpty(props.users.users)) {
      props.usersAction();
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
                <i className="icon-user pr-1"></i>All Users
                {props.users.loading && (
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
                      <i className="icon-people"></i>
                    </th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {props.users.users.map(user => (
                    <tr key={user.id}>
                      <td className="text-center">
                        <div className="avatar">
                          <img
                            src={user.image && user.image.thumbnail}
                            className="img-avatar"
                          />
                        </div>
                      </td>

                      <td>
                        <div>{user.name}</div>
                      </td>

                      <td>
                        <div>{user.email}</div>
                      </td>
                      <td>
                        <div>{user.role}</div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-pill btn-primary mr-2"
                          onClick={() => jumpTo(`edit-user/${user.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-pill btn-danger mr-2"
                          onClick={() => props.userDeleteAction(user.id)}
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
  return { users: state.users };
};

const mapDispatchToProps = {
  usersAction,
  userDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
