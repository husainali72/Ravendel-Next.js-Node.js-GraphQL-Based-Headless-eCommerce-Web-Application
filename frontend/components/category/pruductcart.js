/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Tab, Col, Nav } from 'react-bootstrap';
import OnSaleProductCard from "./onSaleProductCard";
import ProductNav from "./productNavbar";
const PruductCart = ({ productDetail, featureproducts }) => {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(featureproducts)
    }, [items]);
    return (

        <Container>
            <h4 className="theme-color my-5">Feature <span className="text-black">Product</span></h4>
            <div className="Tab-container">
                <Tab.Container id="left-tabs-example" defaultActiveKey="feature">
                    <Col>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item style={{ display: "flex" }}>
                                {/* <Nav.Link className="nav-tab" type="button" eventKey="feature" >Featured</Nav.Link> */}
                                {/* <Nav.Link className="nav-tab" eventKey="new-added">New added</Nav.Link> */}
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="feature">
                                {/* <OnSaleProductCard onSaleProduct={items} hidetitle /> */}
                                <ProductNav items={items} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="new-added">
                                {/* <OnSaleProductCard onSaleProduct={productDetail} hidetitle /> */}
                                <ProductNav items={productDetail} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Tab.Container>
            </div>
        </Container>
    )
}
export default PruductCart;
