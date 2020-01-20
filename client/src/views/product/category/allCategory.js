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
import { categoriesAction, categoryDeleteAction } from "../../../store/action/";
import jumpTo from "../../../utils/navigation";
import { isEmpty } from "../../../utils/helper";
import Alert from "../../utils/Alert";

const AllCategory = props => {
  useEffect(() => {
    if (isEmpty(props.products.categories)) {
      props.categoriesAction();
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
                <i className="icon-pin pr-1"></i>&nbsp; All Categories
                {props.products.loading && (
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
                    <th>Name</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {props.products.categories.map((cat, index) => (
                    <tr key={index}>
                      <td>
                        <div>{cat.name}</div>
                      </td>
                      <td>
                        <div>{cat.date}</div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-pill btn-primary mr-2"
                          onClick={() => jumpTo(`edit-category/${cat.id}`)}
                          disabled
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-pill btn-danger mr-2"
                          onClick={() => props.categoryDeleteAction(cat.id)}
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
  return { products: state.products };
};

const mapDispatchToProps = {
  categoriesAction,
  categoryDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCategory);
