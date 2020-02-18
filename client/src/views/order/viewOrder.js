import React, { Fragment, useState, useEffect } from "react";
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
  Table,
  Input
} from "reactstrap";
import { connect } from "react-redux";
//import { userUpdateAction } from "../../store/action/";
import jumpTo from "../../utils/navigation";
import Alert from "../utils/Alert";

const ViewOrder = props => {
  const [order, setorder] = useState({
    billing: {
      firstname: "",
      lastname: "",
      comapny: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      state: "",
      email: "",
      phone: "",
      payment_method: "",
      transaction_id: ""
    },
    shipping: {
      firstname: "",
      lastname: "",
      comapny: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      state: "",
      notes: ""
    },
    products: [],
    status: "",
    date: ""
  });

  useEffect(() => {
    props.orders.orders.map(order => {
      if (order.id === props.match.params.id) {
        setorder({ ...order });
      }
    });
  }, []);

  const updateOrder = e => {
    e.preventDefault();
    console.log(order);
  };

  const handleChange = e => {
    /* setorder({
      ...order,
      billing: { ...order.billing, [e.target.name]: e.target.value }
    }); */
  };

  return (
    <Fragment>
      <Alert />
      <Card>
        <CardHeader>
          <strong>
            <i className="icon-plus pr-1"></i>&nbsp; View Order
          </strong>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <h3>General</h3>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Date created:</Label>
                  <p>{order.date}</p>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="role">Status:</Label>
                  <Input
                    type="select"
                    name="status"
                    value={order.status}
                    onChange={handleChange}
                    multiple={false}
                  >
                    <option value="">Choose...</option>
                    <option value="Pending-Payment">Pending Payment</option>
                    <option value="Processing">Processing</option>
                    <option value="On-Hold">On-Hold</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <h3>Billing</h3>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">First Name</Label>
                  <Input
                    type="text"
                    value={order.billing.firstname}
                    name="firstname"
                    onChange={e => {
                      setorder({
                        ...order,
                        billing: {
                          ...order.billing,
                          [e.target.name]: e.target.value
                        }
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Last Name</Label>
                  <Input
                    type="text"
                    value={order.billing.lastname}
                    name="lastname"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Company</Label>
                  <Input
                    type="text"
                    value={order.billing.comapny}
                    name="comapny"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Address</Label>
                  <Input
                    type="text"
                    value={order.billing.address}
                    name="address"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">City</Label>
                  <Input
                    type="text"
                    value={order.billing.city}
                    name="city"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Zip</Label>
                  <Input
                    type="text"
                    value={order.billing.zip}
                    name="zip"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Country</Label>
                  <Input
                    type="text"
                    value={order.billing.country}
                    name="country"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">State</Label>
                  <Input
                    type="text"
                    value={order.billing.state}
                    name="state"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Email</Label>
                  <Input
                    type="text"
                    value={order.billing.email}
                    name="email"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Phone</Label>
                  <Input
                    type="text"
                    value={order.billing.phone}
                    name="phone"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Payment Method</Label>
                  <Input
                    type="select"
                    name="payment_method"
                    value={order.billing.payment_method}
                    onChange={handleChange}
                    multiple={false}
                  >
                    <option value="">Choose...</option>
                    <option value="Credit-Card">Credit Card</option>
                    <option value="Paypal">Paypal</option>
                    <option value="Other">Other</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Transaction</Label>
                  <Input
                    type="text"
                    value={order.billing.transaction_id}
                    name="transaction_id"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <h3>Shipping</h3>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">First Name</Label>
                  <Input
                    type="text"
                    value={order.shipping.firstname}
                    name="firstname"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Last Name</Label>
                  <Input
                    type="text"
                    value={order.shipping.lastname}
                    name="lastname"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Company</Label>
                  <Input
                    type="text"
                    value={order.shipping.comapny}
                    name="comapny"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Address</Label>
                  <Input
                    type="text"
                    value={order.shipping.address}
                    name="address"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">City</Label>
                  <Input
                    type="text"
                    value={order.shipping.city}
                    name="city"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Zip</Label>
                  <Input
                    type="text"
                    value={order.shipping.zip}
                    name="zip"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Country</Label>
                  <Input
                    type="text"
                    value={order.shipping.country}
                    name="country"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">State</Label>
                  <Input
                    type="text"
                    value={order.shipping.state}
                    name="state"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Notes</Label>
                  <Input
                    type="text"
                    value={order.shipping.notes}
                    name="notes"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Products</h3>
              </Col>
              <Col md={12}>
                <Table
                  hover
                  responsive
                  className="table-outline mb-0 d-none d-sm-table"
                >
                  <thead className="thead-light">
                    <tr>
                      <th>Item</th>
                      <th>Cost</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <div>{product.name}</div>
                        </td>
                        <td>
                          <div>{product.cost}</div>
                        </td>
                        <td>
                          <div>{product.qty}</div>
                        </td>
                        <td>
                          <div>{product.qty * product.cost}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={12}>
                <Button color="primary" className="mr-2" onClick={updateOrder}>
                  Update
                </Button>
                <Button onClick={() => jumpTo("/all-orders")}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { orders: state.orders };
};

const mapDispatchToProps = {
  //userUpdateAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder);
