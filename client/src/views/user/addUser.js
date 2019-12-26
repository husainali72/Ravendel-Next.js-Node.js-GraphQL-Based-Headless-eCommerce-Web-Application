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
  Input,
  Spinner
} from "reactstrap";
import { connect } from "react-redux";
import { userAddAction } from "../../store/action/";
import jumpTo, { go } from "../../utils/navigation";
import Alert from "../utils/Alert";
const AddUser = props => {
  const [user, setuser] = useState({});

  useEffect(() => {
    document.forms[0].reset();
    setuser({});
  }, [props.users.users]);

  const addUser = e => {
    e.preventDefault();
    props.userAddAction(user);
  };

  const handleChange = e => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const fileChange = e => {
    setuser({ ...user, [e.target.name]: e.target.files[0] });
  };

  return (
    <Fragment>
      <Alert />
      <Card>
        <CardHeader>
          <strong>
            <i className="icon-plus pr-1"></i>&nbsp; Add User
          </strong>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Username</Label>
                  <Input
                    type="text"
                    placeholder="Username"
                    name="name"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="role">Role</Label>
                  <Input
                    type="select"
                    name="role"
                    onChange={handleChange}
                    multiple={false}
                  >
                    <option>Choose...</option>
                    <option value="Subscriber">Subscriber</option>
                    <option value="Manager">Manager</option>
                    <option value="Editor">Editor</option>
                    <option value="Author">Author</option>
                    <option value="User">User</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Password</Label>
                  <Input
                    type="text"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="featured-image">Featured image</Label>
                  <Input type="file" name="image" onChange={fileChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={12}>
                <Button color="primary" className="mr-2" onClick={addUser}>
                  Add
                </Button>
                <Button onClick={() => jumpTo("/all-users")}>Cancel</Button>
                {props.users.loading && (
                  <Spinner
                    style={{ width: "3rem", height: "3rem" }}
                    color="info"
                  />
                )}
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { users: state.users };
};

const mapDispatchToProps = {
  userAddAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
