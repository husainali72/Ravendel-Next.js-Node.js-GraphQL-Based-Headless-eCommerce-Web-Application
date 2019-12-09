import React, { Fragment } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Progress
} from "reactstrap";
import { connect } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../../queries/userQurey";

const AllUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Fragment>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <strong>
                <i className="icon-user pr-1"></i>All Users
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.books.map(book => (
                    <tr key={book.id}>
                      <td className="text-center">
                        <div className="avatar">
                          <img
                            src={"assets/img/avatars/1.jpg"}
                            className="img-avatar"
                            alt="admin@bootstrapmaster.com"
                          />
                        </div>
                      </td>

                      <td>
                        <div>{book.name}</div>
                      </td>
                      <td>
                        <div>John Doe</div>
                      </td>
                      <td>
                        <div>john@ymail.com</div>
                      </td>
                      <td>
                        <div>Customer</div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-pill btn-primary mr-2"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-pill btn-danger mr-2"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-pill btn-primary"
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
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
