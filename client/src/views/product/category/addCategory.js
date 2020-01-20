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
import { categoryAddAction, categoriesAction } from "../../../store/action/";
import jumpTo, { go } from "../../../utils/navigation";
import Alert from "../../utils/Alert";
import { isEmpty } from "../../../utils/helper";

const AddCategory = props => {
  const [cat, setCat] = useState({
    parentId: null
  });

  const [pCat, setpCat] = useState([]);

  useEffect(() => {
    if (isEmpty(pCat)) {
      props.categoriesAction();
    }
  }, []);

  useEffect(() => {
    document.forms[0].reset();
    setCat({
      parentId: null
    });
    setpCat(props.products.categories);
  }, [props.products.categories]);

  const addCat = e => {
    e.preventDefault();
    console.log(cat);
    props.categoryAddAction(cat);
  };

  const handleChange = e => {
    setCat({ ...cat, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Alert />
      <Card>
        <CardHeader>
          <strong>
            <i className="icon-plus pr-1"></i>&nbsp; Add Category
          </strong>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">Name</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="role">Parent Category</Label>
                  <Input
                    type="select"
                    name="parentId"
                    onChange={handleChange}
                    multiple={false}
                  >
                    <option value="">-- No Parent Category --</option>
                    {pCat.map((cat, index) => (
                      <option key={index} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={12}>
                <Button color="primary" className="mr-2" onClick={addCat}>
                  Add
                </Button>
                <Button onClick={() => jumpTo("/all-categories")}>
                  Cancel
                </Button>
                {props.products.loading && (
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
  return { products: state.products };
};

const mapDispatchToProps = {
  categoryAddAction,
  categoriesAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
