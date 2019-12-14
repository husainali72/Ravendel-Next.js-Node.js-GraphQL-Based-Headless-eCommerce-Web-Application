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
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { userUpdateAction } from "../../store/action/";
import jumpTo from "../../utils/navigation";

const EditUser = props => {
  const [user, setuser] = useState({});

  const updateUser = e => {
    e.preventDefault();
    props.userUpdateAction(user);
    jumpTo("/all-users");
  };

  useEffect(() => {
    props.users.users.map(user => {
      if (user.id == props.match.params.id) {
        setuser(user);
      }
    });
  }, []);

  const handleChange = e => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <strong>
            <i className="icon-plus pr-1"></i>&nbsp; Edit User
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
                    value={user.name}
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
                    value={user.email}
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
                    value={user.role}
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
              {/* <Col md={3}>
                <FormGroup>
                  <Label for="featured-image">Featured image</Label>
                  <Input type="file" onChange={handleChange("featuredimage")} />
                </FormGroup>
              </Col> */}
            </Row>
            <Row className="mt-2">
              <Col md={12}>
                <Button color="primary" className="mr-2" onClick={updateUser}>
                  Update
                </Button>
                <Button onClick={() => jumpTo("/all-users")}>Cancel</Button>
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
  userUpdateAction
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
