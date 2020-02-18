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
import { ordersAction, orderDeleteAction } from "../../store/action";
import jumpTo from "../../utils/navigation";
import { isEmpty } from "../../utils/helper";
import Alert from "../utils/Alert";

const AllOrder = props => {
  useEffect(() => {
    if (isEmpty(props.orders.orders)) {
      props.ordersAction();
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
                <i className="icon-pin pr-1"></i>&nbsp; All Oders
                {props.orders.loading && (
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
                    <th>Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {props.orders.orders.map((order, index) => (
                    <tr key={index}>
                      <td>
                        <div>
                          {order.shipping.firstname +
                            " " +
                            order.shipping.lastname}
                        </div>
                      </td>
                      <td>
                        <div>{order.date}</div>
                      </td>
                      <td>
                        <div>{order.status}</div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-pill btn-primary mr-2"
                          onClick={() => jumpTo(`view-order/${order.id}`)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-pill btn-danger mr-2"
                          onClick={() => props.orderDeleteAction(order.id)}
                        >
                          Delete
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
  return { orders: state.orders };
};

const mapDispatchToProps = {
  ordersAction,
  orderDeleteAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrder);
