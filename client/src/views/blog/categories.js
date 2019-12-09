import React, {Fragment, useState} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Collapse } from 'reactstrap';
import AddCategory from './addCategory';
import EditCategory from './editCategory';

const Categories = (props) => { 
    const [allCategories, setAllCategories] = useState([
        {
            id: 1,
            name: 'Category One',
            description: 'Category One Description',
            slug: 'category-one',
        },
        {
            id: 2,
            name: 'Category Two',
            description: 'Category Two Description',
            slug: 'category-two',
        },
        {
            id: 3,
            name: 'Category Three',
            description: 'Category Three Description',
            slug: 'category-three',
        }
    ])

    const [addCat, setAddCat] = useState(false)
    const [editCat, setEditCat] = useState(false)

    const deleteCategory = (category) =>{
        console.log('Delete', category);
    }

    const editCategory = (category) => {
        console.log('Edit', category);
        setAddCat(false)
        setEditCat(!editCat)
    }  
    
    const addCategoryShow = () => {
        setEditCat(false)
        setAddCat(!addCat)
    }

    return (
        <Fragment>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <strong><i className="icon-pin pr-1"></i>&nbsp; All Categories</strong>
                            <Button onClick={addCategoryShow} className="float-right">Add New</Button>
                        </CardHeader>
                        <CardBody>
                            <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="text-center"><i className="icon-pin"></i></th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Slug</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allCategories.map((category, index) => 
                                            <tr key={index}>
                                                <td className="text-center">
                                                    <div>{category.id}</div>
                                                </td>
                                                <td>
                                                    <div>{category.name}</div>
                                                </td>
                                                <td>
                                                    <div>
                                                        {category.description}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        {category.slug}
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button size="sm" color="primary" className="mr-2" onClick={()=>editCategory(category)}>Edit</Button>
                                                    <Button size="sm" color="danger" className="mr-2" onClick={()=>deleteCategory(category)}>Delete</Button>
                                                    <Button size="sm" color="primary">View</Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                    
                    <Collapse isOpen={addCat}>                                                   
                        <Row>
                            <Col lg={{size: 4, offset: 4}}>
                                <Card>
                                    <CardHeader>
                                        <strong><i className="icon-pin pr-1"></i>&nbsp; Add Category</strong>
                                    </CardHeader>
                                    <CardBody>                                        
                                        <AddCategory />   
                                    </CardBody>
                                </Card>
                            </Col>                               
                        </Row>  
                    </Collapse>  

                    <Collapse isOpen={editCat}>                                                   
                        <Row>
                            <Col lg={{size: 4, offset: 4}}>
                                <Card>
                                    <CardHeader>
                                        <strong><i className="icon-pin pr-1"></i>&nbsp; Edit Category</strong>
                                    </CardHeader>
                                    <CardBody>                                        
                                        <EditCategory />   
                                    </CardBody>
                                </Card>
                            </Col>                               
                        </Row>  
                    </Collapse>  

                </Col>
            </Row>            
        </Fragment>
    )
}

export default Categories;