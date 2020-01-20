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
//import { blogAddAction } from "../../store/action/";
import jumpTo, { go } from "../../utils/navigation";
import { categoriesAction, productAddAction } from "../../store/action/";
import Alert from "../utils/Alert";

const AddProduct = props => {
  const [product, setProduct] = useState({
    status: "Publish"
  });

  useEffect(() => {
    props.categoriesAction();
    document.forms[0].reset();
    setProduct({
      status: "Publish"
    });
  }, [props.products.products]);

  useEffect(() => {
    if (props.products.product.description != undefined) {
      setProduct({
        ...product,
        description: props.products.product.description
      });
    }
  }, [props.products.product.description]);

  const addProduct = e => {
    e.preventDefault();
    console.log(product);
    props.productAddAction(product);
  };

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const categoryChange = e => {
    var options = e.target.options;
    var value = [];
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setProduct({ ...product, categoryId: value });
  };

  const fileChange = e => {
    //console.log(e.target.files[0]);
    setProduct({ ...product, [e.target.name]: e.target.files });
  };

  return (
    <Fragment>
      <Alert />
      <Card>
        <CardHeader>
          <strong>
            <i className="icon-plus pr-1"></i>&nbsp; Add Product
          </strong>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    placeholder="Title"
                    name="name"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="role">Category</Label>
                  <Input
                    type="select"
                    name="status"
                    onChange={categoryChange}
                    multiple={true}
                  >
                    <option value="">----Select category----</option>
                    {props.products.categories.map((cat, index) => (
                      <option key={index} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="title">URL</Label>
                  <Input
                    type="text"
                    placeholder="URL"
                    name="slug"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Label for="desc">Description</Label>
                <TinymceEditor />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={4}>
                <FormGroup>
                  <Label for="sku">SKU</Label>
                  <Input
                    type="text"
                    placeholder="THX-123"
                    name="sku"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="qty">Quantity</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    name="quantity"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input
                    type="number"
                    placeholder="$0"
                    name="sellprice"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={4}>
                <FormGroup>
                  <Label for="featured-image">Feature image</Label>
                  <Input
                    type="file"
                    name="feature_image"
                    onChange={fileChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="featured-image">Gallery image</Label>
                  <Input
                    type="file"
                    name="gallery_image"
                    onChange={fileChange}
                    multiple={true}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
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
                <Button color="primary" className="mr-2" onClick={addProduct}>
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
  return { products: state.products };
};

const mapDispatchToProps = {
  productAddAction,
  categoriesAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
